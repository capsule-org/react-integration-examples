"use client";

import capsuleModule, {
  Environment,
  OAuthMethod,
  Theme,
} from "@web3-onboard/capsule";
import Logo from "../assets/images/capsule-logo.svg";
import { CapsuleAuthOptions } from "..";
import { CardContent, CardFooter, CardHeader } from "./core/card";
import { Button } from "./core/button";
import { ethers } from "ethers";
import { useConnectWallet, init } from "@web3-onboard/react";
import { useState } from "react";
import {
  Alert,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  Label,
  Input,
} from "./core";

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
  const [signing, setSigning] = useState(false);
  const [signedMessage, setSignedMessage] = useState<string | null>(null);
  const [selectedSigner, setSelectedSigner] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  // 9. Function to connect the wallet.
  const connectWallet = async () => {
    const wallets = await connect();
    console.log(wallets);
  };

  // 10. Function to sign a message.
  const handleSignMessage = async () => {
    if (!wallet || !message) return;

    try {
      setIsLoading(true);
      const ethersProvider = new ethers.providers.Web3Provider(
        wallet.provider,
        "any"
      );
      const signer = ethersProvider.getSigner();
      const signature = await signer.signMessage(message);
      setSignature(signature);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
      <CardContent>
        {wallet ? (
          <div>
            <p>Connected as {wallet.accounts[0].address}</p>
            <Button onClick={disconnect.bind(null, wallet)}>
              Disconnect Wallet
            </Button>
            <>
              <CardHeader>
                <h2 className="text-xl font-bold">Sign A Message</h2>
              </CardHeader>
              <CardContent className="max-w-sm min-w-xs">
                {signature && (
                  <Alert className="break-words mb-4">{`Signature: ${signature}`}</Alert>
                )}
                <Select onValueChange={setSelectedSigner}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a signer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Signers</SelectLabel>
                      <SelectItem value="ethers-v5">Ethers v5</SelectItem>
                      <SelectItem value="ethers-v6">Ethers v6</SelectItem>
                      <SelectItem value="viem-v1">Viem v1</SelectItem>
                      <SelectItem value="viem-v2">Viem v2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Label>Message:</Label>
                <Input
                  name="messageToSign"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message to sign"
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={disconnect.bind(null, wallet)}
                >
                  Logout
                </Button>
                <Button
                  onClick={handleSignMessage}
                  disabled={!message || !selectedSigner || isLoading}
                >
                  {isLoading ? "Signing..." : "Sign Message"}
                </Button>
              </CardFooter>
            </>
          </div>
        ) : (
          <p>No wallet connected</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant={"outline"} onClick={handleBack}>
          Back
        </Button>
        <Button onClick={connectWallet} disabled={connecting}>
          {connecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      </CardFooter>
    </>
  );
};
