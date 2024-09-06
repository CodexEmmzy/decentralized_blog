


import fetch from "node-fetch";
import { ethers } from "ethers";
import fs from "fs/promises"; // Use the promise-based fs API

async function fetchWithRetry(url, options = {}, retries = 3, backoff = 3000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text(); // Return raw text instead of JSON
        } catch (error) {
            console.error(`Attempt ${i + 1} failed. ${error.message}`);
            if (i < retries - 1) {
                console.log(`Retrying in ${backoff}ms...`);
                await new Promise(res => setTimeout(res, backoff));
            } else {
                throw new Error(`All ${retries} attempts failed.`);
            }
        }
    }
}

async function main() {
    const etherscanApiKey = "KCGW1SIXPTHTP6VQKIPN3CGV22TRNEZB3U";
    const contractAddress = "0x416034CfB10ddFaa5cf1A34503771af7CA8E4496";  // Replace with your actual contract address
    const privateKey = "0x8e02a44b3f210173c85f02fca9853de251d0fb32841ddac2c05db0b9a97933fc";
    const nodeUrl = "https://sepolia-rollup.arbitrum.io/rpc";

    const abiUrl = `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${etherscanApiKey}`;

    try {
        const rawData = await fetchWithRetry(abiUrl);
        console.log("Raw response data:", rawData); // Log the raw response
        const data = JSON.parse(rawData); // Attempt to parse JSON
        const abi = JSON.parse(data.result);

        // Write ABI to a file
        await fs.writeFile('contractABI.json', JSON.stringify(abi, null, 2), 'utf8');
        console.log("ABI has been written to contractABI.json");

        const provider = new ethers.JsonRpcProvider(nodeUrl);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(contractAddress, abi, wallet);

        console.log("Connected to contract:", contractAddress);
        console.log("Using wallet address:", wallet.address);

        // Additional code for interacting with the contract...

    } catch (error) {
        console.error("Failed to fetch ABI:", error);
    }
}

main().catch(error => {
    console.error("Error:", error);
});
