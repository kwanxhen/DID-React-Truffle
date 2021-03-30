import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";

const configureEthrResolver = () => {
  const providerConfig = {
    rpcUrl: "https://ropsten.infura.io/v3/a10e367404ae4c3ab0eae42eba9b05bb",
  };
  const ethrDidResolver = getResolver(providerConfig);
  let didResolver = new Resolver(ethrDidResolver);

  return didResolver;
};

export default configureEthrResolver;
