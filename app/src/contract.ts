// src/contract.ts

import { ethers } from "ethers";

const contractAddress = "0x416034cfb10ddfaa5cf1a34503771af7ca8e4496";
const abi = [
  // ABI copied from the provided export
  {
    "inputs": [
      { "internalType": "address", "name": "user_address", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "purchaseTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // other ABI items here...
];

export const getContract = (signerOrProvider: any) => {
  return new ethers.Contract(contractAddress, abi, signerOrProvider);
};
