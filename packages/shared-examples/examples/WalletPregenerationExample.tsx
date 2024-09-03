import { useEffect, useState } from "react";
import Capsule, {
  ConstructorOpts,
  Environment,
  WalletType,
} from "@usecapsule/react-sdk";
import {
  CapsuleEmailAuthForm,
  CapsuleAuthOptions,
  CapsulePregenWallet,
  CapsuleEmailVerification,
  CapsuleSignEvmMessages,
  useToast,
} from "../components";
import { signEvmMessage } from "./CapsuleSigningExamples";

// Capsule SDK integration example for Wallet Pre-generation.
// This tutorial provides a step-by-step guide to implement Capsule's wallet pre-generation flow.
// For additional details on the Capsule SDK, refer to: https://docs.usecapsule.com/integration-guides/wallet-pregeneration

type WalletPregenerationExampleProps = {
  setSelectedAuthOption: (option: CapsuleAuthOptions) => void;
};

// Step 1: Set up your Capsule API key
// Obtain your API key from https://usecapsule.com/beta
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

// Step 2: Set the Capsule environment
// Choose between Environment.DEVELOPMENT or Environment.PRODUCTION based on your use case
const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

// Step 3: (Optional) Customize the Capsule SDK integration
// These options allow you to tailor the look and feel of the Capsule integration
// For a full list of constructor options, visit:
// https://docs.usecapsule.com/integration-guide/customize-capsule#constructor-options
const constructorOpts: ConstructorOpts = {
  emailPrimaryColor: "#ff6700",
  githubUrl: "https://github.com/capsule-org",
  linkedinUrl: "https://www.linkedin.com/company/usecapsule/",
  xUrl: "https://x.com/usecapsule",
  homepageUrl: "https://usecapsule.com/",
  supportUrl: "https://usecapsule.com/talk-to-us",
};

// Step 4: Initialize the Capsule client
// Create a new Capsule instance with your environment, API key, and optional constructor parameters
export const capsuleClient = new Capsule(
  CAPSULE_ENVIRONMENT,
  CAPSULE_API_KEY,
  constructorOpts
);

export const WalletPregenerationExample: React.FC<
  WalletPregenerationExampleProps
> = ({ setSelectedAuthOption }) => {
  const { toast } = useToast();

  // State management for the wallet pre-generation flow
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [userHasPregenWallet, setUserHasPregenWallet] =
    useState<boolean>(false);
  const [needsEmailVerification, setNeedsEmailVerification] =
    useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");

  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [selectedSigner, setSelectedSigner] = useState<string>("");

  const [walletId, setWalletId] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");

  const [userShare, setUserShare] = useState<string>("");
  const [userRecoverySecret, setUserRecoverySecret] = useState<string>("");

  // Step 5: Check user's login status
  // This effect runs on component mount to determine if the user is already logged in
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await capsuleClient.isFullyLoggedIn();

      if (isLoggedIn) {
        const wallets = await capsuleClient.getWallets();
        setWalletId(Object.values(wallets)[0].id!);
        setWalletAddress(Object.values(wallets)[0].address!);
        toast({
          title: "Logged In",
          description: "You're logged in and ready to use your Capsule wallet.",
        });
      }
      setNeedsEmailVerification(false);
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

  // Step 6: Pre-generate a wallet for the user
  // This function demonstrates how to create a pre-generated wallet using Capsule SDK
  const pregenerateWallet = async () => {
    setIsLoading(true);
    try {
      const hasPregenWallet = await capsuleClient.hasPregenWallet(email);

      if (hasPregenWallet) {
        setUserHasPregenWallet(true);
        toast({
          title: "Capsule Pre-generated Wallet Exists",
          description:
            "A Capsule pre-generated wallet already exists for this email.",
        });
        return;
      }

      await capsuleClient.createWalletPreGen(WalletType.EVM, email);

      const userWalletShare = await capsuleClient.getUserShare();

      if (!!userWalletShare) {
        await capsuleClient.setUserShare(userWalletShare);
        setUserShare(userWalletShare);
      }
      setUserHasPregenWallet(true);
      toast({
        title: "Capsule Wallet Pre-generated",
        description: "A Capsule wallet has been pre-generated for your email.",
      });
    } catch (error) {
      console.error("Capsule wallet pre-generation failed:", error);
      toast({
        title: "Capsule Wallet Pre-generation Error",
        description:
          "Failed to pre-generate Capsule wallet. See console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 7: Handle user authentication
  // This function handles both new and existing user authentication flows
  const handleAuthenticateUser = async () => {
    setIsLoading(true);
    try {
      const isExistingUser = await capsuleClient.checkIfUserExists(email);

      if (isExistingUser) {
        // Existing user authentication flow
        const authUrl = await capsuleClient.initiateUserLogin(email);
        const popup = window.open(
          authUrl,
          "popup",
          "popup=true,width=400,height=500"
        );

        if (!popup) {
          console.error("Failed to open Capsule authentication popup");
          toast({
            title: "Capsule Authentication Error",
            description:
              "Failed to open Capsule authentication popup. Please enable popups and try again.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        await capsuleClient.waitForLoginAndSetup(popup);

        const hasPregenWallet = await capsuleClient.hasPregenWallet(email);

        if (hasPregenWallet) {
          const recovery = await capsuleClient.claimPregenWallets(email);
          setUserRecoverySecret(recovery ?? "");
          toast({
            title: "Capsule Pre-generated Wallet Claimed",
            description:
              "Your pre-generated Capsule wallet has been successfully claimed.",
          });
        }

        checkLoginStatus();
        return;
      }

      // New user authentication flow
      await capsuleClient.createUser(email);
      setNeedsEmailVerification(true);
    } catch (err) {
      console.error("Capsule authentication failed:", err);
      toast({
        title: "Capsule Authentication Error",
        description:
          "Failed to authenticate with Capsule. See console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 8: Handle email verification
  // This function verifies the user's email and claims the pre-generated wallet if it exists
  const handleVerifyEmail = async () => {
    setIsLoading(true);
    try {
      const url = await capsuleClient.verifyEmail(verificationCode);
      window.open(url, "popup", "popup=true,width=400,height=500");

      const { recoverySecret } =
        await capsuleClient.waitForPasskeyAndCreateWallet();

      toast({
        title: "Capsule Email Verified",
        description: "Your email has been verified with Capsule.",
      });
      setUserRecoverySecret(recoverySecret || "");

      checkLoginStatus();
    } catch (err) {
      console.error("Capsule email verification failed:", err);
      toast({
        title: "Capsule Verification Error",
        description:
          "Failed to verify email with Capsule. See console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 9: Handle message signing
  // This function demonstrates how to sign a message using the Capsule wallet
  const handleSignMessage = async () => {
    setIsLoading(true);
    try {
      const signature = await signEvmMessage(
        capsuleClient,
        selectedSigner,
        message
      );
      setSignature(signature);
      toast({
        title: "Capsule Message Signed",
        description:
          "Message has been signed successfully using your Capsule wallet.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Capsule message signing failed:", error);
      toast({
        title: "Capsule Signing Error",
        description:
          "Failed to sign message with Capsule. See console for details.",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 10: Handle user logout
  // This function demonstrates how to log out a user from Capsule
  const handleLogout = async () => {
    await capsuleClient.logout();
    toast({
      title: "Capsule Logout",
      description: "You have been successfully logged out from Capsule.",
    });
    resetState();
    setSelectedAuthOption(CapsuleAuthOptions.None);
  };

  // Helper function to reset the component state
  const resetState = () => {
    setEmail("");
    setIsUserLoggedIn(false);
    setUserHasPregenWallet(false);
    setNeedsEmailVerification(false);
    setVerificationCode("");
    setMessage("");
    setSignature("");
    setSelectedSigner("");
    setWalletId("");
    setUserShare("");
    setUserRecoverySecret("");
  };

  // Render the appropriate component based on the authentication state
  return (
    <>
      {isUserLoggedIn ? (
        <CapsuleSignEvmMessages
          isLoading={isLoading}
          signature={signature}
          walletId={walletId}
          walletAddress={walletAddress}
          userRecoverySecret={userRecoverySecret}
          message={message}
          selectedSigner={selectedSigner}
          isUserLoggedIn={isUserLoggedIn}
          setSelectedSigner={setSelectedSigner}
          setMessage={(e) => setMessage(e.target.value)}
          handleLogout={handleLogout}
          handleSignMessage={handleSignMessage}
        />
      ) : !userHasPregenWallet ? (
        <CapsulePregenWallet
          email={email}
          setEmail={(e) => setEmail(e.target.value)}
          isLoading={isLoading}
          pregenerateWallet={pregenerateWallet}
          onCancel={() => {
            resetState();
            setSelectedAuthOption(CapsuleAuthOptions.None);
          }}
        />
      ) : needsEmailVerification ? (
        <CapsuleEmailVerification
          isLoading={isLoading}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          handleVerifyEmail={handleVerifyEmail}
          onCancel={resetState}
        />
      ) : (
        <CapsuleEmailAuthForm
          isLoading={isLoading}
          email={email}
          setEmail={(e) => setEmail(e.target.value)}
          handleAuthentication={handleAuthenticateUser}
          onCancel={resetState}
        />
      )}
    </>
  );
};
