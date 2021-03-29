import { React, useEffect, useState } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppInit from './AppInit';
import ButtonCreateDid from './components/buttonCreateDid'

const App = () => {

  return (
    <div>
      {/* click this button to create a DID and upload to database and display it*/}
      {/* <AppInit /> */}
      <ButtonCreateDid />
    </div>

  );
};

export default App;
