import capsuleModule, { Environment, OAuthMethod } from "@web3-onboard/capsule";
import Logo from "../assets/images/capsule-logo.svg";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CapsuleAuthOptions,
  Alert,
  Button,
} from "../components";
import { useConnectWallet, init } from "@web3-onboard/react";
import { CapsuleInitOptions } from "@web3-onboard/capsule/dist/types";

// Capsule SDK integration example with BlockNative's Web3-Onboard.
// This tutorial demonstrates how to integrate Capsule as a wallet option in Web3-Onboard.
// For additional details on Web3-Onboard, refer to: https://onboard.blocknative.com/docs/modules/react

type Web3OnboardAuthenticationExampleProps = {
  setSelectedAuthOption: (option: CapsuleAuthOptions) => void;
};

// Step 1: Set up your Capsule API key
// Obtain your API key from https://usecapsule.com/beta
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

// Step 2: Set the Capsule environment
// Choose between Environment.DEVELOPMENT or Environment.PRODUCTION based on your use case
const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

// Step 3: Initialize the Capsule module for Web3-Onboard
// Configure the Capsule module with your API key, environment, and other options

const initOptions:CapsuleInitOptions ={
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
}
const capsule = capsuleModule(initOptions);

// Step 4: Configure the list of wallets for Web3-Onboard
// In this example, we're only including Capsule, but you can add other wallets here
const wallets = [capsule];

// Step 5: Define the blockchain networks you want to support
// This example uses Sepolia testnet, but you can add any EVM-compatible network
const chains = [
  {
    id: 11155111,
    token: "ETH",
    label: "Sepolia",
    rpcUrl: "https://rpc.sepolia.org/",
  },
];

// Step 6: Set the metadata for your app
// This information will be displayed in the Web3-Onboard modal
const appMetadata = {
  name: "Capsule Example App",
  description: "Example app for Capsule Web3-Onboard Authentication",
};

// Step 7: Initialize Web3-Onboard with your wallets, chains, and app metadata
init({
  wallets: wallets,
  chains: chains,
  appMetadata: appMetadata,
});

export const Web3OnboardAuthenticationExample: React.FC<
  Web3OnboardAuthenticationExampleProps
> = ({ setSelectedAuthOption }) => {
  const handleBack = () => {
    setSelectedAuthOption(CapsuleAuthOptions.None);
  };

  // Step 8: Use the useConnectWallet hook to manage wallet connection state
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  // Step 9: Function to connect the wallet
  // This will open the Web3-Onboard modal with Capsule as an option
  const connectWallet = async () => {
    await connect();
  };

  // Step 10: Function to disconnect the wallet
  const disconnectWallet = async () => {
    if (!wallet) return;
    await disconnect(wallet);
  };

  // Note: This example focuses on connecting a Capsule wallet through Web3-Onboard
  // and does not include specific signing examples. For detailed information on
  // how to sign transactions or messages using a connected Capsule wallet via
  // Web3-Onboard, please refer to the BlockNative Web3-Onboard documentation:
  // https://onboard.blocknative.com/docs/modules/react#signing-transactions-and-messages
  // Capsule wallets integrate seamlessly with Web3-Onboard's standard signing methods.

  return (
    <>
      <CardHeader>
        <h2 className="text-xl font-bold">
          Capsule Integration with BlockNative Web3-Onboard
        </h2>
        <p className="text-sm text-muted-foreground">
          This example demonstrates how to integrate Capsule with Web3-Onboard.
          The Web3-Onboard modal will open with Capsule as the wallet option.
          Authentication is handled seamlessly by the Capsule Modal within
          Web3-Onboard.
        </p>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col items-start">
        {wallet ? (
          <>
            <Alert>
              Connected to Capsule wallet: {wallet.accounts[0].address}
            </Alert>
            <CardHeader>
              <h2 className="text-xl font-bold">
                Next Steps: Signing with Capsule
              </h2>
            </CardHeader>
            <CardContent className="max-w-sm min-w-xs">
              <Alert>
                For instructions on how to sign messages or transactions with
                your Capsule wallet through Web3-Onboard, please refer to the{" "}
                <a
                  href="https://onboard.blocknative.com/docs/modules/react"
                  className="underline"
                >
                  BlockNative Web3-Onboard documentation
                </a>
                . Capsule integrates seamlessly with Web3-Onboard's signing
                methods.
              </Alert>
            </CardContent>
          </>
        ) : (
          <Alert>
            No Capsule wallet connected. Click 'Connect Capsule Wallet' to
            proceed.
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 p-4">
        <Button
          variant="outline"
          onClick={handleBack}
          className="w-full sm:w-auto text-sm"
        >
          Back to Options
        </Button>
        {wallet ? (
          <Button
            variant="outline"
            onClick={disconnectWallet}
            className="w-full sm:w-auto text-sm"
          >
            Disconnect Capsule Wallet
          </Button>
        ) : (
          <Button
            onClick={connectWallet}
            disabled={connecting}
            className="w-full sm:w-auto text-sm"
          >
            {connecting ? "Connecting to Capsule..." : "Connect Capsule Wallet"}
          </Button>
        )}
      </CardFooter>
    </>
  );
};
