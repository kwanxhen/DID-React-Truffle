import React, { useState, useEffect } from "react";
import createDid from "../../createDid";

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const SignMessageContainer = () => {
  const [signerAlias, setSignerAlias] = useState("");
  const [message, setMessage] = useState("");
  const [signerDid, setSignerDid] = useState("");
  const [messageJwt, setMessageJwt] = useState("");
  let ethrDid;

  const createSigner = () => {
    const temp = createDid(signerAlias);
    ethrDid = temp[0];
    setSignerDid(ethrDid.did);
  };

  const signMessage = async () => {
    let messageObj;
    messageObj = {
      message: message,
    };

    const jwt = await ethrDid.signJWT(messageObj);
    setMessageJwt(jwt);
  };

  const buttonHandler = (e) => {
    e.preventDefault();
    createSigner();
    signMessage();
  };

  return (
    //display did retrieved
    //display signed message
    //display JWT
    <React.Fragment>
      <Container style={{ marginTop: "80px" }}>
        <Typography variant="h5" style={{ marginBottom: "15px" }}>
          Sign message demo
        </Typography>
        <form onSubmit={buttonHandler}>
          <Input
            value={signerAlias}
            onChange={(e) => {
              setSignerAlias(e.target.value);
            }}
            placeholder="Signer Alias"
            type="text"
            name="signerAlias"
            required
            style={{ marginRight: "15px" }}
          />
          <Input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Message"
            type="text"
            name="message"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Create and Sign
          </Button>
        </form>
        <div>
          <p>Signer DID: {signerDid} </p>
        </div>
        <div>
          <p>signed JWT: {messageJwt}</p>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SignMessageContainer;
