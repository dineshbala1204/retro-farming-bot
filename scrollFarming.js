// scrollFarming.js — Free Retro Farming Only

const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider("https://rpc.scroll.io");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function main() {
  console.log("🔁 Starting Scroll Retro Farming (Free Only)...");

  try {
    const tx = {
      to: wallet.address,
      value: 0,
    };

    const estimatedGas = await wallet.estimateGas(tx);
    
    // Convert to string and compare
    if (estimatedGas.toString() === "0") {
      console.log("✅ Free interaction allowed. Sending transaction...");
      const sentTx = await wallet.sendTransaction(tx);
      await sentTx.wait();
      console.log("🎉 Interaction done on Scroll (simulated). TX Hash:", sentTx.hash);
    } else {
      console.log("❌ Skipped: Transaction requires gas. Waiting for real airdrop tasks...");
    }
  } catch (err) {
    console.log("⚠️ Error simulating transaction:", err.message);
  }

  console.log("✅ Finished Scroll Free Farming");
}

main();

