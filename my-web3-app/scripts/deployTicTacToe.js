// scripts/deployTicTacToe.js

async function main() {
  const { ethers } = require("hardhat");

  const TicTacToe = await ethers.getContractFactory("TicTacToe");
  console.log("Deploying TicTacToe...");

  const ticTacToe = await TicTacToe.deploy();
  await ticTacToe.deployed();

  console.log("TicTacToe deployed to:", ticTacToe.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
