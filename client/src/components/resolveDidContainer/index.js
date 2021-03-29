import React, { useState, useEffect } from "react";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const ResolveDidContainer = () => {
  const [did, setDid] = useState("");

  const buttonHandler = (e) => {
    e.preventDefault();
    //ResolveDid
  };

  return (
    <React.Fragment>
      <Container style={{ marginTop: "80px" }}>
        <Typography variant="h5" style={{ marginBottom: "15px" }}>
          Resolve Did demo
        </Typography>
        <form onSubmit={buttonHandler}>
          <Input
            value={did}
            onChange={(e) => {
              setDid(e.target.value);
            }}
            placeholder="did"
            type="text"
            name="did"
            required
            style={{ marginRight: "15px" }}
          />
          <Button type='submit' variant='contained' color='secondary'>
            Resolve Did
          </Button>
        </form>
        <div>
          <p>
            Resolving this Did: {}
          </p>
        </div>
        <div>
          <p>Output: resolveDidoutputHere</p>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ResolveDidContainer;
