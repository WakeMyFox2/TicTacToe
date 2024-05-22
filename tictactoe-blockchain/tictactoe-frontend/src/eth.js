// src/eth.js
import { ethers } from 'ethers';

// Connect to the local Ganache instance
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

const getAccounts = async () => {
  // Get list of accounts
  const accounts = await provider.listAccounts();
  return accounts;
};

const getBalance = async (address) => {
  // Get balance of an account
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
};

// Your contract's ABI and address (replace with your actual values)
const contractABI = [
  // Your contract's ABI goes here
];
const contractAddress = '0xYourContractAddress';

// Set up a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, provider);

export { provider, contract, getAccounts, getBalance };
