import React, { useState } from "react";
import { ethers } from "ethers";
import { contract, signer } from "../utils/contract"; // Import contract and signer

const PurchaseTokens: React.FC = () => {
  const [amount, setAmount] = useState<string>("");

  const handlePurchase = async () => {
    try {
      // Get user address from the signer
      const userAddress = await signer.getAddress();
      
      // Convert amount to BigNumber using ethers
      const tx = await contract.purchaseTokens(userAddress, ethers.utils.parseUnits(amount, 18));
      
      // Wait for the transaction to be mined
      await tx.wait();
      
      alert("Tokens purchased successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to purchase tokens.");
    }
  };

  return (
    <div>
      <h2>Purchase Tokens</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handlePurchase}>Purchase</button>
    </div>
  );
};

export default PurchaseTokens;
