import axios from "axios";
import EthrDID from "ethr-did";

const createDid = (alias) => {

  const keypair = EthrDID.createKeyPair();
  const ethrDid = new EthrDID({
    address: keypair.address,
    privateKey: keypair.privateKey,
  });
  //uncomment to post this DID to MongoDB database
  axios
    .post("http://localhost:5000/did/add", {
      alias: alias,
      identity: ethrDid.did,
      publicAddress: keypair.address,
      privateKey: keypair.privateKey,
      ethrDid: ethrDid,
    })
    .then((response) => {
      console.log("did is created and uploaded onto database");
      // console.log('response data:', response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  return [ethrDid, keypair.privateKey]
};

export default createDid;
