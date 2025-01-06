import React from "react";
import Logo from "../moralis-logo.svg";
import Eth from "../eth.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Web3 from "web3";
import App from "../App";

function Header() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  const AppWithWeb3 = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      try {
        // Request user accounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.error("Ethereum provider not found. Install MetaMask.");
    }
    return <App web3={web3} account={account} />;
  };

  return (
    <header>
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo" />
        <Link to="/" className="link">
          <div className="headerItem"> Swap </div>{" "}
        </Link>{" "}
        <Link to="/tokens" className="link">
          <div className="headerItem"> Tokens </div>{" "}
        </Link>{" "}
      </div>{" "}
      <div className="rightH">
        <div className="headerItem">
          <img src={Eth} alt="eth" className="eth" />
          Ethereum{" "}
        </div>{" "}
        <div className="connectButton" onClick={AppWithWeb3}>
          {" "}
          Connect{" "}
        </div>{" "}
      </div>{" "}
    </header>
  );
}

export default Header;
