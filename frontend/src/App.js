import React, { useState } from 'react';
import { ethers } from 'ethers';
import FileStorageABI from './FileStorageABI.json';
import axios from 'axios';
import './App.css';

const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // Make sure this is correct!

function App() {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [txStatus, setTxStatus] = useState("");
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } else {
      alert("MetaMask not detected");
    }
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const uploadToIPFS = async () => {
    if (!file) return alert("Please choose a file first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      setIpfsHash(res.data.ipfsHash);
      alert("File uploaded to IPFS!\n" + res.data.ipfsHash);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  const uploadToBlockchain = async () => {
    if (!window.ethereum || !ipfsHash) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, FileStorageABI, signer);

      const tx = await contract.uploadFile(ipfsHash);
      setTxStatus("Transaction sent. Waiting...");
      await tx.wait();
      setTxStatus("✅ File hash stored on blockchain!");
    } catch (err) {
      console.error("Contract call failed:", err);
      setTxStatus("❌ Blockchain transaction failed.");
    }
  };

  return (
    <div className="container">
      <h1>📁 OpenDrive DApp</h1>

      <button onClick={connectWallet}>🔐 Connect MetaMask</button>
      {account && <p className="account">Connected: {account}</p>}

      <input type="file" onChange={handleFileChange} />
      <div className="button-group">
        <button onClick={uploadToIPFS}>☁️ Upload to IPFS</button>
        <button onClick={uploadToBlockchain}>📦 Store on Blockchain</button>
      </div>

      {ipfsHash && (
        <div className="ipfs-box">
          <strong>IPFS Hash:</strong><br />
          <code>{ipfsHash}</code>
        </div>
      )}

      {txStatus && <p className="status">{txStatus}</p>}
    </div>
  );
}

export default App;
