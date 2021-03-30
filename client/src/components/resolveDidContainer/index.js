import React, { useState, useEffect } from "react";
import configureEthrResolver from "../../configureEthrResolver";

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import JSONPretty from "react-json-pretty";

const ResolveDidContainer = () => {
  const [didToBeResolved, setDidToBeResolved] = useState("");
  const [didResolved, setDidResolved] = useState("");
  let didResolver = configureEthrResolver();

  const buttonHandler = (e) => {
    e.preventDefault();
    //ResolveDid
    didResolver.resolve(didToBeResolved).then((dataObject) => {
      //change data from object to string to pass to React dom
      let dataString = JSON.stringify(dataObject, null, "\t");
      setDidResolved(dataString);
    });
  };

  return (
    <React.Fragment>
      <Container style={{ marginTop: "80px" }}>
        <Typography variant="h5" style={{ marginBottom: "15px" }}>
          Resolve Did demo
        </Typography>
        <form onSubmit={buttonHandler}>
          <Input
            value={didToBeResolved}
            onChange={(e) => {
              setDidToBeResolved(e.target.value);
            }}
            placeholder="did"
            type="text"
            name="did"
            required
            style={{ marginRight: "15px" }}
          />
          <Button type="submit" variant="contained" color="secondary">
            Resolve Did
          </Button>
        </form>
        <div>
          <p>DID Document: </p>
          <JSONPretty id="json-pretty" data={didResolved}></JSONPretty>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ResolveDidContainer;
