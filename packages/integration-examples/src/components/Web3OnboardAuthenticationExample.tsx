"use client";
import capsuleModule, {
  Environment,
  OAuthMethod,
  Theme,
} from "@web3-onboard/capsule";
import Logo from "../assets/images/capsule-logo.svg";
import Onboard from "@web3-onboard/core";
import { CapsuleAuthOptions } from "..";
import { CardContent, CardFooter, CardHeader } from "./core/card";
import { Button } from "./core/button";

type Web3OnboardAuthenticationExampleProps = {
  setSelectedAuthOption: (option: CapsuleAuthOptions) => void;
};

// 1. Get your API key from https://usecapsule.com/beta
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

// 2. Set the environment to development or production based on your use case
const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

const capsule = capsuleModule({
  environment: CAPSULE_ENVIRONMENT,
  apiKey: CAPSULE_API_KEY,
  modalProps: {
    theme: Theme.dark,
    oAuthMethods: [
      OAuthMethod.GOOGLE,
      OAuthMethod.TWITTER,
      OAuthMethod.APPLE,
      OAuthMethod.DISCORD,
      OAuthMethod.FACEBOOK,
    ],
    logo: Logo,
  },
  walletLabel: "Sign in with Capsule",
  walletIcon: async () =>
    (await import("../assets/images/capsule-logo.svg")).default,
});

const wallets = [capsule];

const chains = [
  {
    id: 11155111,
    token: "ETH",
    label: "Sepolia",
    rpcUrl: "https://rpc.sepolia.org/",
  },
];

const appMetadata = {
  name: "Capsule Example App",
  description: "Example app for Capsule Web3-Onboard Authentication",
};

const web3Onboard = Onboard({
  wallets: wallets,
  chains: chains,
  appMetadata: appMetadata,
});

export const Web3OnboardAuthenticationExample: React.FC<
  Web3OnboardAuthenticationExampleProps
> = ({ setSelectedAuthOption }) => {
  const handleBack = () => {
    setSelectedAuthOption("none");
  };

  const connectWallet = async () => {
    const wallets = await web3Onboard.connectWallet();
    console.log(wallets);
  };

  return (
    <>
      <CardHeader>
        <h2 className="text-xl font-bold">
          BlockNative Web3-Onboard Capsule Authentication
        </h2>
        <p className="">
          This will open the BlockNative Modal with Capsule as a wallet option.
        </p>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button variant={"outline"} onClick={handleBack}>
          Back
        </Button>
        <Button onClick={connectWallet}>Connect Wallet</Button>
      </CardFooter>
    </>
  );
};
