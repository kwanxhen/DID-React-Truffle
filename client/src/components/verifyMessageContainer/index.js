import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { getResolver } from "ethr-did-resolver";
import { Resolver } from "did-resolver";
import { verifyJWT } from "did-jwt";

const VerifyMessageContainer = () => {
  const [messageJwt, setMessageJwt] = useState("");
  const [signer, setSigner] = useState("");
  const [message, setMessage] = useState("");

  const verifyMessage = async (e) => {
    e.preventDefault();
    const providerConfig = {
      rpcUrl: "https://ropsten.infura.io/v3/a10e367404ae4c3ab0eae42eba9b05bb",
    };
    const ethrDidResolver = getResolver(providerConfig);
    let resolver = new Resolver(ethrDidResolver);

    const { payload, issuer } = await verifyJWT(messageJwt, { resolver });
    //message can be retrieved using payload.message
    //issuer is also known as signer of message
    setMessage(payload.message);
    setSigner(issuer);

    return;
  };

  return (
    <React.Fragment>
      <Container style={{ marginTop: "80px" }}>
        <Typography variant="h5" style={{ marginBottom: "15px" }}>
          Verify message demo
        </Typography>
        <form onSubmit={verifyMessage}>
          <Input
            value={messageJwt}
            onChange={(e) => {
              setMessageJwt(e.target.value);
            }}
            placeholder="Message JWT"
            type="text"
            name="messageJwt"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Verify Message
          </Button>
        </form>
        <div>
          <p>Message: {message} </p>
        </div>
        <div>
          <p>Signer: {signer} </p>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default VerifyMessageContainer;
