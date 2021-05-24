import React, { useState, useEffect } from "react";
import { Credentials } from "uport-credentials";
import configureEthrResolver from "../../configureEthrResolver";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
// import { request } from "express";

//const axios = require('axios');
// 1 - create disclosure request
// 2 - create a credential createVerification
// 3 - create a request for a DID to sign an unsigned claim
// 4 - create a jwt requesting a signature on a piece of structured data
// 5 - create a jwt requesting a personal signature, ie personal sign request
// 6 - createTxRequest, given a transaction object, request and apppend
// 7 - create a selective disclosure response jwt //study this and see if its usable for Huawei
// 8 - processDisclosurePayload
// 9 - authenticateDisclosureResponse
// 10 - verifyDisclosure
// 11 - issueVerifiableCredential
// 12 - verifyPresentation

const CreateCredentialsContainer = () => {
  const [requestDisclosureJwt, setRequestDisclosureJwt] = useState("");
  const [responseDisclosureJwt, setResponseDisclosureJwt] = useState("");
  const [aliceNameAgeCitizenshipJwt, setAliceNameAgeCitizenshipJwt] = useState(
    ""
  );

  const resolver = configureEthrResolver();

  const governmentCredentials = new Credentials({
    did: "did:ethr:0x76E2Fa1e8A7e6455f397593CC1717938F75a0101",
    privateKey:
      "c84e5a7a9301b221b44389cf23b8e26796d9c9492694ccffa398faac5fca048a",
    resolver: resolver,
  });

  const uniCredentials = new Credentials({
    did: "did:ethr:0x6f0A81ad19a7dBE0500751Ae017514b4b9A56C5e",
    privateKey:
      "7ab89224411b2d3015b3ee21cffbca47efbd05b8b6d8d4ff2312d79c8c614e35",
    resolver: resolver,
  });

  const aliceCredentials = new Credentials({
    did: "did:ethr:0xaf2823F732102732DD7634890D98FCE42259Fa8F",
    privateKey:
      "669be497506a96e2af4ca8edf742d646bfb149af196ea5543e36bd36cddd9daa",
    resolver: resolver,
  });

  useEffect(() => {
    governmentCredentials
      .createVerification({
        sub: "did:ethr:0xaf2823F732102732DD7634890D98FCE42259Fa8F",
        claim: {
          name: "Alice",
          age: 21,
          citizenship: "Singaporean",
        },
      })
      .then((jwt) => setAliceNameAgeCitizenshipJwt(jwt));
  }, [aliceNameAgeCitizenshipJwt]);

  const req = {
    requested: ["name", "age", "citizenship"],
    callbackUrl: "https://myserver.com",
  };

  //default//
  const buttonHandler1 = () => {
    uniCredentials.createDisclosureRequest(req).then((jwt) => {
      setRequestDisclosureJwt(jwt);
    });
  };

  //default//
  const buttonHandler2 = async () => {
    aliceCredentials
      .signJWT({verified: [aliceNameAgeCitizenshipJwt]})
      .then((jwt) => {
        console.log(jwt);
        setResponseDisclosureJwt(jwt);
      });
  };

  //test//
  // const buttonHandler2 = async () => {
  //   aliceCredentials
  //     .signJWT({verified: ["eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE2MTk2NjcyMTYsInN1YiI6ImRpZDpldGhyOjB4YWYyODIzRjczMjEwMjczMkRENzYzNDg5MEQ5OEZDRTQyMjU5RmE4RiIsImNsYWltIjp7Im5hbWUiOiJLd2FuWGhlbiIsImFnZSI6MjEsImNpdGl6ZW5zaGlwIjoiU2luZ2Fwb3JlYW4ifSwiaXNzIjoiZGlkOmV0aHI6MHg3NkUyRmExZThBN2U2NDU1ZjM5NzU5M0NDMTcxNzkzOEY3NWEwMTAxIn0.Mk5UEsDYsJooYSqP9G6sZn5V08gsUYvhbDgefAgEi8D5HZq9IroZIRUhOs19HCCeVLocX3LElTLwViBO7_bBMwE"]})
  //     .then((jwt) => {
  //       console.log(jwt);
  //       setResponseDisclosureJwt(jwt);
  //     });
  // };

  //default//
  const buttonHandler3 = async () => {
    uniCredentials.verifyDisclosure(responseDisclosureJwt).then((profile) => {
      console.log(profile);
    });
  };

  //test****
  // const buttonHandler3 = async () => {
  //   uniCredentials.verifyDisclosure("eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE2MTk2NjI3NzEsInZlcmlmaWVkIjpbImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSkZVekkxTmtzdFVpSjkuZXlKcFlYUWlPakUyTVRrMk5qSTNOamdzSW5OMVlpSTZJbVJwWkRwbGRHaHlPakI0WVdZeU9ESXpSamN6TWpFd01qY3pNa1JFTnpZek5EZzVNRVE1T0VaRFJUUXlNalU1Um1FNFJpSXNJbU5zWVdsdElqcDdJbTVoYldVaU9pSkJiR2xqWlNJc0ltRm5aU0k2TWpFc0ltTnBkR2w2Wlc1emFHbHdJam9pVTJsdVoyRndiM0psWVc0aWZTd2lhWE56SWpvaVpHbGtPbVYwYUhJNk1IZzNOa1V5Um1FeFpUaEJOMlUyTkRVMVpqTTVOelU1TTBORE1UY3hOemt6T0VZM05XRXdNVEF4SW4wLjJ4M2lyT05ld19uUllDNlFWbWZncjZxQXdGNUkyN3JiSlZTdWkzSVFPQXNZREV0cXRuNEtYb3VaaTWoZHdVQ0MxakszVDFBcnFhSFpIXzQxSnp3Vy1nRSJdLCJpc3MiOiJkaWQ6ZXRocjoweGFmMjgyM0Y3MzIxMDI3MzJERDc2MzQ4OTBEOThGQ0U0MjI1OUZhOEYifQ.9X3KlGPnHmffxxGguLJVeEkb4hQe9vIdFTkDIXpSy9ER8RRL2-spJj4n43Y0U7SmSz6n5sSe_OLIKcq7L8SdgAE").then((profile) => {
  //     console.log(profile);
  //   });
  // };

  return (
    <React.Fragment>
      <Container style={{ marginTop: "80px", marginBottom: "500px" }}>
        <Typography variant="h5" style={{ marginBottom: "15px" }}>
          DID - Credentials - Demo
        </Typography>
        <div>
          Alice DID: did:ethr:0xaf2823F732102732DD7634890D98FCE42259Fa8F
        </div>
        <br />
        <div>Alice Credentials: {aliceNameAgeCitizenshipJwt}</div>
        <br />
        <div>
          University DID: did:ethr:0x6f0A81ad19a7dBE0500751Ae017514b4b9A56C5e
        </div>
        <br />
        <div>
          Government DID: did:ethr:0x76E2Fa1e8A7e6455f397593CC1717938F75a0101
        </div>
        <br />
        <div>Disclosure Request: {requestDisclosureJwt}</div>
        <br />
        <div style={{ wordWrap: "break-word" }}>
          Response to disclosure: {responseDisclosureJwt.substring(0, 300)}{" "}
        </div>
        <div style={{ wordWrap: "break-word" }}>
          {responseDisclosureJwt.substring(300, 600)}{" "}
        </div>
        <div style={{ wordWrap: "break-word" }}>
          {responseDisclosureJwt.substring(600, responseDisclosureJwt.length)}{" "}
        </div>
        <br />
        <div>
          <Button onClick={buttonHandler1} variant="contained" color="primary">
            Create Disclosure Request
          </Button>
        </div>
        <br />
        <div>
          <Button
            onClick={buttonHandler2}
            variant="contained"
            color="secondary"
          >
            Create Disclosure Response
          </Button>
        </div>
        <br />
        <div>
          <Button onClick={buttonHandler3} variant="contained" color="primary">
            Verify Disclosure
          </Button>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default CreateCredentialsContainer;
