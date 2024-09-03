import Capsule, {
  CapsuleModal,
  ConstructorOpts,
  Environment,
  OAuthMethod,
  WalletType,
} from "@usecapsule/react-sdk";
import { useEffect, useState } from "react";
import "@usecapsule/react-sdk/styles.css";
import Logo from "../assets/images/capsule-logo.svg";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  CapsuleSignSolanaMessage,
} from "../components";

import { CapsuleAuthOptions, useToast } from "../components";

// solana/web3.js
import { CapsuleSolanaWeb3Signer } from "@usecapsule/solana-web3.js-v1-integration";
import * as solana from "@solana/web3.js";
import bs58 from "bs58";

// Capsule Modal integration example with Solana for managed authentication using the Capsule React SDK.
// This tutorial provides a step-by-step guide to implement Capsule's modal-based authentication flow with Solana.
// This example mirrors the CapsuleModalAuthenticationExample, but with Solana-specific features for message signing and transaction sending.
// For additional details on integrating with Capsule, refer to: https://docs.usecapsule.com/integration-guides/solana

type CapsuleSolanaAuthenticationExampleProps = {
  setSelectedAuthOption: (option: CapsuleAuthOptions) => void;
};

// Step 0: Set up Solana RPC endpoint. For this example we also use a recipient public key.
const SOLANA_DEVNET_RPC_ENDPOINT = "https://api.devnet.solana.com";
const SOLANA_RECIPIENT_PUBLIC_KEY =
  "4TUYF5Q6sCkBCjamQrTkNYJyxhyaCPiPnq9oVg6qXbTp";

// Step 1: Set up your Capsule API key
// Obtain your API key from https://usecapsule.com/beta
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

// Step 2: Set the Capsule environment
// Choose between Environment.DEVELOPMENT or Environment.PRODUCTION based on your use case
const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

// Step 3: For Solana support in Capsule, set the supportedWalletTypes in the constructor options.
// All other options are optional and can be customized based on your app's requirements.
// For a full list of constructor options, visit:
// https://docs.usecapsule.com/integration-guide/customize-capsule#constructor-options
const constructorOpts: ConstructorOpts = {
  emailPrimaryColor: "#ff6700",
  githubUrl: "https://github.com/capsule-org",
  linkedinUrl: "https://www.linkedin.com/company/usecapsule/",
  xUrl: "https://x.com/usecapsule",
  homepageUrl: "https://usecapsule.com/",
  supportUrl: "https://usecapsule.com/talk-to-us",
  supportedWalletTypes: {
    [WalletType.SOLANA]: true, // Enable Solana wallet support
  },
};

// Step 4: Initialize the Capsule client
// Create a new Capsule instance with your environment, API key, and optional constructor parameters
const capsuleClient = new Capsule(
  CAPSULE_ENVIRONMENT,
  CAPSULE_API_KEY,
  constructorOpts
);

// Main component for Capsule Solana authentication example
export const CapsuleSolanaAuthenticationExample: React.FC<
  CapsuleSolanaAuthenticationExampleProps
> = ({ setSelectedAuthOption }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [isCapsuleModalOpen, setIsCapsuleModalOpen] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");

  const [walletId, setWalletId] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");

  const [userRecoverySecret] = useState<string>("");

  // Step 5: Check user's login status
  // This effect runs on component mount to determine if the user is already logged in
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await capsuleClient.isFullyLoggedIn();

      if (isLoggedIn) {
        const wallets = capsuleClient.getWallets();
        console.log("Capsule wallets:", wallets);
        setWalletId(Object.values(wallets)[0].id!);
        setWalletAddress(Object.values(wallets)[0].address!);
        toast({
          title: "Logged In",
          description:
            "You're logged in and ready to send transactions with Capsule on Solana.",
        });
      }
      setIsUserLoggedIn(isLoggedIn);
    } catch (err) {
      console.error("Capsule login status check failed:", err);
      toast({
        title: "Capsule Login Check Error",
        description:
          "Failed to check Capsule login status. See console for details.",
        variant: "destructive",
      });
    }
  };

  // Step 6: Handle opening the Capsule Modal
  // Simply set the isCapsuleModalOpen state to true to display the modal
  const handleModalOpen = () => {
    setIsCapsuleModalOpen(true);
  };

  // Step 7: Handle Capsule Modal closure
  // This function is called when the modal is closed, either by the user or after successful login
  // You can perform any necessary cleanup or trigger app-specific actions here
  const handleModalClose = async () => {
    setIsCapsuleModalOpen(false);
    checkLoginStatus();
  };

  // Step 8: Handle message signing
  // This function demonstrates how to sign a message using Capsule
  // For a complete example on signing transacations with Solana, refer to https://docs.usecapsule.com/integration-guides/solana#signing-solana-transactions
  const handleSignSolanaMessage = async () => {
    setIsLoading(true);
    try {
      if (!message) {
        throw new Error("Message to sign is empty");
      }

      const connection = new solana.Connection(
        SOLANA_DEVNET_RPC_ENDPOINT,
        "confirmed"
      );
      const solanaSigner = new CapsuleSolanaWeb3Signer(
        capsuleClient as any,
        connection
      );

      // Convert the message string to a Buffer
      const messageBuffer = Buffer.from(message);

      // Sign the message
      const signature = await solanaSigner.signBytes(messageBuffer);

      // Convert the signature to a base64 string for display
      const signatureBase58 = bs58.encode(signature);

      setSignature(signatureBase58);
      toast({
        title: "Message Signed",
        description: "Message has been successfully signed using Capsule.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Capsule message signing failed:", error);
      toast({
        title: "Message Signing Error",
        description:
          "Failed to sign message with Capsule. See console for details.",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 9: Handle user logout
  // This function demonstrates how to log out a user from Capsule
  const handleLogout = async () => {
    await capsuleClient.logout();
    toast({
      title: "Capsule Logout",
      description: "You have been successfully logged out from Capsule.",
    });
    resetState();
  };

  // Helper function to reset the component state
  const resetState = () => {
    setMessage("");
    isCapsuleModalOpen && setIsCapsuleModalOpen(false);
    setSelectedAuthOption(CapsuleAuthOptions.None);
  };

  // Render the appropriate component based on the authentication state
  return isUserLoggedIn ? (
    <CapsuleSignSolanaMessage
      isLoading={isLoading}
      signature={signature}
      walletId={walletId}
      walletAddress={walletAddress}
      userRecoverySecret={userRecoverySecret}
      message={message}
      isUserLoggedIn={isUserLoggedIn}
      setMessage={(e) => setMessage(e.target.value)}
      handleLogout={handleLogout}
      handleSignMessage={handleSignSolanaMessage}
    />
  ) : (
    <>
      <CardHeader>
        <h2 className="text-xl font-bold">
          Capsule SDK: Solana Wallet Integration
        </h2>
        <p className="text-sm text-muted-foreground">
          Learn how to implement Capsule's React Modal for Solana wallet
          authentication and transactions. This example demonstrates Capsule SDK
          integration with Solana. For more details on Capsule, visit{" "}
          <a
            href="https://docs.usecapsule.com/integration-guides/solana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Capsule Solana Integration Guide
          </a>
        </p>
      </CardHeader>
      <CardContent className="flex flex-grow overflow-auto flex-col items-start">
        <CapsuleModal
          logo={Logo}
          theme={{
            backgroundColor: "#000000",
            foregroundColor: "#ff6700",
            oAuthLogoVariant: "light",
          }}
          capsule={capsuleClient}
          isOpen={isCapsuleModalOpen}
          onClose={handleModalClose}
          appName="Solana Capsule Demo"
          oAuthMethods={Object.values(OAuthMethod)}
          disableEmailLogin={false}
          disablePhoneLogin={false}
        />
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 p-4">
        <Button
          variant="outline"
          onClick={resetState}
          className="w-full sm:w-auto text-sm"
        >
          Back to Options
        </Button>
        <Button onClick={handleModalOpen} className="w-full sm:w-auto text-sm">
          Open Capsule Modal
        </Button>
      </CardFooter>
    </>
  );
};
