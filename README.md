
# OpenDrive-Inspired DApp

## Overview
This is a decentralized file upload and tracking DApp using IPFS, Ethereum (Hardhat), and a JAMstack-compatible frontend.

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
