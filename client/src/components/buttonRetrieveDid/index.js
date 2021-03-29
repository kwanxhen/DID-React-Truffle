import React, { useState, useEffect } from "react";
import retrieveDid from "../../retrieveDid";

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";

//retrieve DID from mongoDB
const ButtonRetrieveDid = () => {
  const [retrieveAddress, setRetrieveAddress] = useState("");
  const [retrievedAlias, setRetrievedAlias] = useState("");
  const [retrievedDid, setRetrievedDid] = useState("");
  const [retrievedPublicAddress, setRetrievedPublicAddress] = useState("");
  const [retrievedPrivateKey, setRetrievedPrivateKey] = useState("");

  const identityRetrieve = async (e) => {
    e.preventDefault();
    //call retrieve function
    const retrievedIdentity = await retrieveDid(retrieveAddress);
    console.log(retrievedIdentity);
    setRetrievedAlias(retrievedIdentity.alias);
    setRetrievedDid(retrievedIdentity.identity);
    setRetrievedPublicAddress(retrievedIdentity.publicAddress);
    setRetrievedPrivateKey(retrievedIdentity.privateKey);
  };

  return (
    <React.Fragment>
      <Container style={{ marginTop: "80px" }}>
        <form onSubmit={identityRetrieve}>
          <Input
            value={retrieveAddress}
            onChange={(e) => {
              setRetrieveAddress(e.target.value);
            }}
            placeholder="Public Address"
            type="text"
            name="retrieveAddress"
            required
          />
          <Button type="submit" variant="contained" color="secondary">
            Retrieve Did
          </Button>
        </form>
        <div>
          <p>Alias: {retrievedAlias}</p>
        </div>
        <div>
          <p>Decentralized Identifier: {retrievedDid}</p>
        </div>
        <div>
          <p>Public Address: {retrievedPublicAddress}</p>
        </div>
        <div>
          <p>Private key: {retrievedPrivateKey}</p>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ButtonRetrieveDid;
