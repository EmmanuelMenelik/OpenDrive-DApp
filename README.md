
# OpenDrive-Inspired DApp

## Overview
This is a decentralized file upload and tracking DApp that works with MetaMask and the Pinata API using IPFS, Ethereum (Hardhat), and a JAMstack-compatible frontend. 

## How It Works

- Files are uploaded from the frontend (React) to a backend server (Node.js/Express)
- The backend sends the file to **Pinata** which pins it on **IPFS**
- The returned IPFS hash is stored on the blockchain via a **Solidity smart contract**
- Users sign blockchain transactions through **MetaMask**, connected to a **Hardhat local testnet**
- make sure to add a .env file in the backend folder containing your pinata api and secret api keys
  PINATA_API_KEY=your_key
  PINATA_SECRET_API_KEY=your_secret


---

## Running Locally

### Backend
```
cd backend
npm install
node server.js
```

### Smart Contract
```
cd contracts
npm install
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### Frontend
```
cd frontend
npm install
npm start
```
