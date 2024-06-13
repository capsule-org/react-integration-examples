"use client";
import capsuleModule, {
  Environment,
  OAuthMethod,
  Theme,
} from "@web3-onboard/capsule";
import Logo from "../assets/images/capsule-logo.svg";
import { CapsuleAuthOptions } from "..";
import { CardContent, CardFooter, CardHeader } from "../components/core/card";
import { Button } from "../components/core/button";
import { useConnectWallet, init } from "@web3-onboard/react";
import { Alert } from "../components/core";

type Web3OnboardAuthenticationExampleProps = {
  setSelectedAuthOption: (option: CapsuleAuthOptions) => void;
};

// 1. Get your API key from https://usecapsule.com/beta
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

// 2. Set the environment to development or production based on your use case
const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

// 3. Initialize the Capsule module with your API key, environment, and other configuration options.
const capsule = capsuleModule({
  environment: CAPSULE_ENVIRONMENT,
  apiKey: CAPSULE_API_KEY,
  modalProps: {
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

// 4. Configure the list of wallets to include Capsule.
const wallets = [capsule];

// 5. Define the blockchain networks you want to support.
const chains = [
  {
    id: 11155111,
    token: "ETH",
    label: "Sepolia",
    rpcUrl: "https://rpc.sepolia.org/",
  },
];

// 6. Set the metadata for your app.
const appMetadata = {
  name: "Capsule Example App",
  description: "Example app for Capsule Web3-Onboard Authentication",
};

// 7. Initialize Web3-Onboard with your wallets, chains, and app metadata.
init({
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

  // 8. Use the useConnectWallet hook to manage wallet connection state.
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  // 9. Function to connect the wallet.
  const connectWallet = async () => {
    await connect();
  };

  // 10. Disconnect the wallet.
  const disconnectWallet = async () => {
    if (!wallet) return;
    await disconnect(wallet);
  };

  // Note: This example doesn't include signing example and is focused on connecting the wallet with Capsule. For signing specifics please refer to the BlockNative Web3-Onboard documentation at https://onboard.blocknative.com/docs/modules/react

  return (
    <>
      <CardHeader>
        <h2 className="text-xl font-bold">
          BlockNative Web3-Onboard Capsule Connector
        </h2>
        <p className="text-sm text-muted-foreground">
          This will open the BlockNative Modal with Capsule as the sole wallet
          option. Authentication is handled by the Capsule Modal.
        </p>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col items-start">
        {wallet ? (
          <>
            <Alert>Connected as {wallet.accounts[0].address}</Alert>
            <CardHeader>
              <h2 className="text-xl font-bold">Signing Instructions</h2>
            </CardHeader>
            <CardContent className="max-w-sm min-w-xs">
              <Alert>
                For signing instructions, please refer to the
                <a href="https://onboard.blocknative.com/docs/modules/react">
                  BlockNative Web3-Onboard documentation
                </a>
                .
              </Alert>
            </CardContent>
          </>
        ) : (
          <Alert>No wallet connected. Click 'Connect Wallet' to proceed.</Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant={"outline"} onClick={handleBack}>
          Back
        </Button>
        {wallet ? (
          <Button variant="outline" onClick={disconnectWallet}>
            Disconnect Wallet
          </Button>
        ) : (
          <Button onClick={connectWallet} disabled={connecting}>
            {connecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        )}
      </CardFooter>
    </>
  );
};
