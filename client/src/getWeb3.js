import Web3 from "web3";

//Web3.givenProvider is injected by metamask an object window.ethereum
const getWeb3 = () => {
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  return web3;
};

export default getWeb3;
