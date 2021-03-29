import EthrDID from "ethr-did";

function createDID(publicAddress, provider) {
  const ethrDid = new EthrDID({
    address: publicAddress,
    provider: provider,
  });

  return ethrDid;
}

export { createDID };
