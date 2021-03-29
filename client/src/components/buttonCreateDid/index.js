import React, { useState, useEffect } from "react";
import createDid from "../../createDid";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";

const ButtonCreateDid = () => {
  const [did, setDid] = useState(null);
  const [publicAddress, setPublicAddress] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);

  const [alias, setAlias] = useState("");
  const [aliasDisplay, setAliasDisplay] = useState("");

  const identityCreate = (e) => {
    e.preventDefault();
    const ethrDid = createDid(alias);

    const tempDid = ethrDid[0];
    const tempPublicAddress = ethrDid[0].address;
    const tempPrivateKey = ethrDid[1];

    setDid(tempDid.did);
    setPublicAddress(tempPublicAddress);
    setPrivateKey(tempPrivateKey);
    setAliasDisplay(alias);
  };

  return (
    <React.Fragment>
      <Container style={{marginTop: "80px" }}>
        <form onSubmit={identityCreate}>
          <Input
            value={alias}
            onChange={(e) => {
              setAlias(e.target.value);
            }}
            placeholder="alias"
            type="text"
            name="alias"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Create Did
          </Button>
        </form>
        <div>
          <p>Alias: {aliasDisplay}</p>
        </div>
        <div>
          <p>Decentralized Identifier: {did}</p>
        </div>
        <div>
          <p>Public Address: {publicAddress}</p>
        </div>
        <div>
          <p>Private key: {privateKey}</p>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ButtonCreateDid;
