// multiFarming.js — Final Retro Airdrop Farming Script

const { ethers } = require("ethers");
require("dotenv").config();

const networks = [
  {
    name: "Zora",
    rpc: "https://rpc.zora.energy",
    address: "0xCa21D4228cDcc6FabaB20cF10c1345FE5CC06dF4",
  },
  {
    name: "Base",
    rpc: "https://mainnet.base.org",
    address: "0xCa21D4228cDcc6FabaB20cF10c1345FE5CC06dF4",
  },
  {
    name: "Scroll",
    rpc: "https://rpc.scroll.io",
    address: "0xCa21D4228cDcc6FabaB20cF10c1345FE5CC06dF4",
  },
  {
    name: "Linea",
    rpc: "https://rpc.linea.build",
    address: "0xCa21D4228cDcc6FabaB20cF10c1345FE5CC06dF4",
  },
  {
    name: "zkSync",
    rpc: "https://mainnet.era.zksync.io",
    address: "0xCa21D4228cDcc6FabaB20cF10c1345FE5CC06dF4",
  },
  {
    name: "Blast",
    rpc: "https://rpc.blast.io",
    address: "0xCa21D4228cDcc6FabaB20cF10c1345FE5CC06dF4",
  },
];

async function runOnNetwork({ name, rpc, address }) {
  const provider = new ethers.JsonRpcProvider(rpc);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log(`🔁 Running: ${name} Farming Check...`);

  try {
    const tx = {
      to: wallet.address,
      value: 0,
    };

    const estimatedGas = await wallet.estimateGas(tx);

    if (BigInt(estimatedGas.toString()) === 0n) {
      console.log(`✅ ${name}: Free interaction allowed. Sending TX...`);
      const sentTx = await wallet.sendTransaction(tx);
      await sentTx.wait();
      console.log(`🎉 ${name} TX Success: ${sentTx.hash}`);
    } else {
      console.log(`❌ ${name}: Gas required. Skipping...`);
    }
  } catch (err) {
    console.log(`⚠️ ${name}: Connection Error: ${err.message}`);
  }
}

async function main() {
  for (const net of networks) {
    await runOnNetwork(net);
  }

  console.log("\n📊 Farming Run Complete.");
}

main();

