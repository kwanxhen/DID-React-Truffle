import { React, useEffect, useState } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppInit from "./AppInit";
import ButtonCreateDid from "./components/buttonCreateDid";
import ButtonRetrieveDid from "./components/buttonRetrieveDid";
import SignMessageContainer from "./components/signMessageContainer";
import VerifyMessageContainer from "./components/verifyMessageContainer";
import ResolveDidContainer from "./components/resolveDidContainer";
import SetAttributeContainer from "./components/setAttributeContainer";

const App = () => {
  return (
    <div>
      {/* click this button to create a DID and upload to database and display it*/}
      {/* <AppInit /> */}
      <ButtonCreateDid />
      <ButtonRetrieveDid />
      <SignMessageContainer />
      <VerifyMessageContainer />
      <ResolveDidContainer />
      <SetAttributeContainer />
    </div>
  );
};

export default App;
