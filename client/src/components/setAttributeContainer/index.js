import React, { useState, useEffect } from "react";
import getWeb3 from "../../getWeb3";

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const SetAttributeContainer = () => {
  const [attributeResult, setAttributeResult] = useState(null);

  let web3 = getWeb3();
  const DidRegistryContract = require("ethr-did-registry");
  const Contract = require("@truffle/contract");

  let DidReg = Contract(DidRegistryContract);
  DidReg.setProvider(web3.currentProvider);

  const buttonHandler = async (e) => {
    e.preventDefault();
    let didRegContractInstance = await DidReg.deployed();
    // const result = await didRegContractInstance.setAttribute("0x722d7ca2905317780e7195119d3257be1aff492b", 0x6469642f7376632f6167656e7400000000000000000000000000000000000000, 0x687474703a2f2f6465762d6d656d6265723a383038302f6170692f76312f696e626f78, 65356000);
    const resultOwner = await didRegContractInstance.identityOwner("0x9035298a35E1278E165d17077c5F3d68D333CDB1");
    
    //Change owner function works//
    // const result = await didRegContractInstance.changeOwner(
    //   "0xbCB5bA4AAC9c050183927A7655B82c06158E9854",
    //   "0xbCB5bA4AAC9c050183927A7655B82c06158E9854",
    //   { from: "0xbCB5bA4AAC9c050183927A7655B82c06158E9854" }
    // );
    // console.log("-----", result); 
    
    console.log("------", resultOwner);
    // setAttributeResult(result);
  };

  return (
    <React.Fragment>
      <Container style={{ marginTop: "80px" }}>
        <Typography variant="h5" style={{ marginBottom: "15px" }}>
          Set Attribute Demo
        </Typography>
        <form onSubmit={buttonHandler}>
          <Button type="submit" variant="contained" color="primary">
            Set Attribute
          </Button>
        </form>
        <div>
          <p>Result: {attributeResult}</p>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SetAttributeContainer;
