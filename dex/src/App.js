import React from "react";
import "./App.css";
import Header from "./components/Header";
import Swap from "./components/Swap";
import Tokens from "./components/Tokens";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Web3 from "web3";

const AppWithWeb3 = () => {
  return <App web3={web3} account={account} />;
};

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        try {
          // Request user accounts
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        console.error("Ethereum provider not found. Install MetaMask.");
      }
    };

    initializeWeb3();
  }, []);
  return (
    <div className="App">
      <Header />
      <div className="mainWindow">
        <Routes>
          <Route path="/" element={<Swap />} />{" "}
          <Route path="/tokens" element={<Tokens />} />{" "}
        </Routes>{" "}
      </div>{" "}
    </div>
  );
}

export default App;
