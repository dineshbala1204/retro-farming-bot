// zoraFarming.js — Free Retro Farming Only

const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider("https://rpc.zora.energy");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function main() {
  console.log("🔁 Starting Zora Retro Farming (Free Only)...");

  try {
    // Try a harmless read to simulate contract interaction (optional)
    const contract = new ethers.Contract(
      "0xca21d4228cdcc6fabaB20cf10c1345fe5cc06df4",
      ["function name() view returns (string)"],
      provider
    );
    const name = await contract.name();
    console.log("📛 NFT Contract Name:", name);
  } catch (err) {
    console.log("⚠️ Skipping contract read due to checksum error:", err.message);
  }

  try {
    const tx = {
      to: wallet.address,
      value: 0,
    };

    const estimatedGas = await provider.estimateGas({ ...tx, from: wallet.address });

    if (estimatedGas.toString() === "0") {
      console.log("✅ Free interaction allowed. Sending transaction...");
      const sentTx = await wallet.sendTransaction(tx);
      await sentTx.wait();
      console.log("🎉 Interaction done on Zora (simulated). TX Hash:", sentTx.hash);
    } else {
      console.log("❌ Skipped: Transaction requires gas. Waiting for real airdrop tasks...");
    }
  } catch (err) {
    console.log("⚠️ Error simulating transaction:", err.message);
  }

  console.log("✅ Finished Zora Free Farming");
}

main();

