import React, { useState, useEffect } from "react";
import getWeb3 from "../../getWeb3";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { stringToBytes32 } from "ethr-did-resolver";

const SetAttributeContainer = () => {
  const [attributeResult, setAttributeResult] = useState(null);

  let web3 = getWeb3();
  const DidRegistryContract = require("ethr-did-registry");
  const Contract = require("@truffle/contract");

  let DidReg = Contract(DidRegistryContract);
  DidReg.setProvider(web3.currentProvider);

  const buttonHandler = async (e) => {
    //Attribute key and value that are resolvable can only be in these format.
    //Check ethr-did-resolver for more info.
    let key = "did/svc/HubService";
    let value = "https://hubs.uport.me";

    e.preventDefault();
    let didRegContractInstance = await DidReg.deployed();
    
    //Attribute is set to this DID: did:ethr:0x9035298a35E1278E165d17077c5F3d68D333CDB1
    const result = await didRegContractInstance.setAttribute(
      "0x9035298a35E1278E165d17077c5F3d68D333CDB1",
      stringToBytes32(key),
      attributeToHex(key, value),
      86400,
      { from: "0x9035298a35E1278E165d17077c5F3d68D333CDB1" }
    );

    // const resultOwner = await didRegContractInstance.identityOwner(
    //   "0x9035298a35E1278E165d17077c5F3d68D333CDB1"
    // );

    //Change owner function works
    // const result = await didRegContractInstance.changeOwner(
    //   "0x9035298a35E1278E165d17077c5F3d68D333CDB1",
    //   "0x9035298a35E1278E165d17077c5F3d68D333CDB1",
    //   { from: "0x9035298a35E1278E165d17077c5F3d68D333CDB1" }
    // );

    console.log("-----setAttribute", result);
    // console.log("------identityOwner", resultOwner);
  };

  function attributeToHex(key, value) {
    if (Buffer.isBuffer(value)) {
      return `0x${value.toString("hex")}`;
    }
    const match = key.match(/^did\/(pub|auth|svc)\/(\w+)(\/(\w+))?(\/(\w+))?$/);
    if (match) {
      const encoding = match[6];
      // TODO add support for base58
      if (encoding === "base64") {
        return `0x${Buffer.from(value, "base64").toString("hex")}`;
      }
    }
    if (value.match(/^0x[0-9a-fA-F]*$/)) {
      return value;
    }
    return `0x${Buffer.from(value).toString("hex")}`;
  }

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
        <div></div>
      </Container>
    </React.Fragment>
  );
};

export default SetAttributeContainer;
