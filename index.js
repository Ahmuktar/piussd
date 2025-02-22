require("dotenv").config();
const express = require("express");
const ethers = require("ethers");
const axios = require("axios");
const africaTalking = require("africastalking");

const app = express();
app.use(express.json());

// USSD Provider API (Africa's Talking)
const at = africaTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
});

// Blockchain Setup
// const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC);
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
// const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, [
//   "function registerUser(string memory phoneNumber, address wallet) public",
//   "function sendCrypto(string memory senderPhone, string memory recipientPhone, uint256 amount) public"
// ], wallet);

// USSD Session Handling
app.post("/ussd", async (req, res) => {
  const { sessionId, phoneNumber, text } = req.body;

  let response = "";
  const input = text.split("*");

  if (text === "") {
    response =
      "CON Welcome to Crypto USSD\n1. Register\n2. Send Crypto\n3. Check Balance";
  } else if (input[0] === "1") {
    response = "CON Enter your wallet address:";
  }
  //   else if (input.length === 2 && input[0] === "1") {
  //     await contract.registerUser(phoneNumber, input[1]);
  //     response = "END Wallet registered successfully!";
  //   } else if (input[0] === "2") {
  //     response = "CON Enter recipient phone number:";
  //   } else if (input.length === 2 && input[0] === "2") {
  //     response = "CON Enter amount to send:";
  //   } else if (input.length === 3 && input[0] === "2") {
  //     const recipient = input[1];
  //     const amount = ethers.parseUnits(input[2], 6); // USDT uses 6 decimal places
  //     await contract.sendCrypto(phoneNumber, recipient, amount);
  //     response = "END Transaction successful!";
  //   } else if (input[0] === "3") {
  //     const balance = await provider.getBalance(phoneNumber);
  //     response = `END Your balance: ${ethers.formatUnits(balance, 6)} USDT`;
  //   } else {
  //     response = "END Invalid option!";
  //   }

  res.send(response);
});

// Start Server
app.listen(8080, () => console.log("Server running on port 3000"));
