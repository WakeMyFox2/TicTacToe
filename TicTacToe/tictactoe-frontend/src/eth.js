import { ethers } from 'ethers';

// Your contract ABI and address
const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "winner",
        "type": "address"
      }
    ],
    "name": "GameOver",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "row",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "col",
        "type": "uint8"
      }
    ],
    "name": "Move",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "board",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "currentPlayer",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "moves",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "player1",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "player2",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "row",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "col",
        "type": "uint8"
      }
    ],
    "name": "makeMove",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const address = '0x839d78090e2F18FeD2e69D21aa667D7AaA10659e'; // Use your deployed contract address

// Connect to the local Ethereum node provided by Ganache
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Get the contract instance
const contract = new ethers.Contract(address, abi, provider.getSigner());

const getAccounts = async () => {
  const accounts = await provider.listAccounts();
  return accounts;
};

const getBalance = async (account) => {
  const balance = await provider.getBalance(account);
  return ethers.utils.formatEther(balance);
};

export { provider, contract, getAccounts, getBalance };
