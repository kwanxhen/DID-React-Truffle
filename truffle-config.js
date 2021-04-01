const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic =
  "snow pattern spoon daring milk dice enlist denial explain repair dune genius like rhythm shove";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
    },
  },
  // ropsten: {
  //   provider: () => {
  //     new HDWalletProvider(
  //       mnemonic,
  //       "https://ropsten.infura.io/v3/a10e367404ae4c3ab0eae42eba9b05bb"
  //     );
  //   },
  //   network_id: 3,
  // },
};
