import axios from "axios";

const retrieveDid = (retrieveAddress) => {
  //this axios.get will return retrievedDid data json object
  //to access alias           -> response.data.alias
  //to access identity        -> response.data.identity
  //to access publicAddress   -> response.data.publicAddress
  //to access privateKey      -> response.data.privateKey
  
  return axios.get(
    "http://localhost:5000/did/" + retrieveAddress
  ).then(response => response.data)
  
};

export default retrieveDid;
