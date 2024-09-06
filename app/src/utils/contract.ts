import { ethers } from "ethers";
import { Web3Provider } from "ethers/providers";  // Import Web3Provider directly.
import { Contract } from "ethers";  // Import Contract directly.
import { IBlog } from "../types/contract";
import abi from './contractABI.json';

const contractAddress = "0x416034CfB10ddFaa5cf1A34503771af7CA8E4496";
// Ensure window.ethereum is available
if (!window.ethereum) {
    throw new Error("No crypto wallet found. Please install MetaMask.");
}
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer) as IBlog;

export { contract, signer };
