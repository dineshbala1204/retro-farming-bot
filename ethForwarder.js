require("dotenv").config();
const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider("https://mainnet.base.org"); // or any main chain you prefer
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const MAIN_WALLET = "0x7b5A4C23F288470CF696410746adB9f147B1B06b"; // your MetaMask

async function main() {
  const balance = await provider.getBalance(wallet.address);
  const gasPrice = await provider.getGasPrice();
  const gasLimit = 21000;

  const fee = gasPrice * BigInt(gasLimit);
  const amountToSend = balance - fee;

  if (amountToSend <= 0n) {
    console.log("⚠️ Not enough ETH to forward after gas.");
    return;
  }

  const tx = await wallet.sendTransaction({
    to: MAIN_WALLET,
    value: amountToSend,
    gasLimit,
    gasPrice
  });

  console.log(`✅ Forwarded ${ethers.formatEther(amountToSend)} ETH to ${MAIN_WALLET}`);
  console.log("🔗 TX Hash:", tx.hash);
}

main().catch((err) => console.error("❌ ETH Forwarder Error:", err));

