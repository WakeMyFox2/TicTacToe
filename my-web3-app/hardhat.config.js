require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache RPC URL
      chainId: 1337 // Ganache chain ID
    }
  }
};