import React, { Component } from "react";
import SimpleStorage from "./contracts/SimpleStorage";
import getWeb3 from "./utils/getWeb3";
import Web3 from 'web3'
import "./App.css";
import Speedtest from './Speedtest.js'
import  Testrun from './Testrun.js'
let web3


class App extends Component {
  state = { deviceName: '', storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('https://ugly-badger-93.localtunnel.me');
    }
    web3 = new Web3(App.web3Provider);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SimpleStorage.networks[networkId];
    const instance = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork && deployedNetwork.address,
      );
    const accounts = await web3.eth.getAccounts();

    this.setState({ web3, accounts, contract: instance }, this.runExample);
    
  };

  
  setVal = async(speed) => {
    speed = Number(speed)
    let contract = this.state.contract;
    let accounts = this.state.accounts;
    contract.methods.set(speed).send({ from: accounts[0] });
    const response = await contract.methods.get().call();
    this.setState({ storageValue: response });
  }

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   //await contract.methods.set(40).send({ from: accounts[0] });
  //   //await contract.methods.set("New Karl").send({ from: accounts[0] });
    
  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();
  //   const device = await contract.methods.getName().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  //   this.setState({ deviceName: device });
  // };
  
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
      <Testrun />
      <Speedtest onTest={(z) => {this.setVal(z)}} />
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default) but Karl changed it to =4.
        </p>
        <p>Then stored name is: {this.state.deviceName}</p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
