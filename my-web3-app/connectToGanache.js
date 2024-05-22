const { ethers } = require("ethers");

async function connectToGanache() {
    // Connect to Ganache RPC endpoint
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");

    // Get information about the connected network
    const network = await provider.getNetwork();
    console.log("Connected to network:", network.name);

    // Get the list of accounts available in Ganache
    const accounts = await provider.listAccounts();
    console.log("Available accounts:", accounts);

    // Example: Get balance of the first account
    const balance = await provider.getBalance(accounts[0]);
    console.log("Balance of first account:", ethers.utils.formatEther(balance));
}

connectToGanache().catch(console.error);
