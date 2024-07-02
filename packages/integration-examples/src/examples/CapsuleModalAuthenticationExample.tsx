import Capsule, {
  CapsuleModal,
  ConstructorOpts,
  Environment,
  OAuthMethod,
} from "@usecapsule/react-sdk";
import { useEffect, useState } from "react";
import "@usecapsule/react-sdk/styles.css";
import Logo from "../assets/images/capsule-logo.svg";

import { signEvmMessage } from "./CapsuleSigningExamples";
import {
  CapsuleAuthOptions,
  CapsuleModalExampleWrapper,
  CapsuleSignEvmMessages,
  useToast,
} from "../components";

// Capsule Modal integration example for managed authentication using the Capsule React SDK.
// This tutorial provides a step-by-step guide to implement Capsule's modal-based authentication flow.
// For additional details on integrating with Capsule, refer to: https://docs.usecapsule.com/

type CapsuleModalAuthenticationExampleProps = {
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
const capsuleClient = new Capsule(
  CAPSULE_ENVIRONMENT,
  CAPSULE_API_KEY,
  constructorOpts
);

// Main component for Capsule Modal based authentication and message signing tutorial
export const CapsuleModalAuthenticationExample: React.FC<
  CapsuleModalAuthenticationExampleProps
> = ({ setSelectedAuthOption }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [isCapsuleModalOpen, setIsCapsuleModalOpen] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

  const [signature, setSignature] = useState<string>("");
  const [selectedSigner, setSelectedSigner] = useState<string>("");

  const [walletId, setWalletId] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");

  const [userRecoverySecret, setUserRecoverySecret] = useState<string>("");

  // Step 5: Set up Capsule Modal customization options
  // These states are used to customize the Capsule Modal and are passed as props to the CapsuleModal component.
  // You can pass these as props directly to the CapsuleModal component or from your app's theme settings.
  // For more details on Capsule customization options, refer to:
  // https://docs.usecapsule.com/integration-guide/customize-capsule
  const [backgroundColor, setBackgroundColor] = useState<string>("#0c0a09");
  const [foregroundColor, setForegroundColor] = useState<string>("#ff6700");
  const [disableEmailLogin, setDisableEmailLogin] = useState<boolean>(false);
  const [disablePhoneLogin, setDisablePhoneLogin] = useState<boolean>(false);

  // Step 6: Check user's login status
  // This effect runs on component mount to determine if the user is already logged in
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await capsuleClient.isFullyLoggedIn();

      if (isLoggedIn) {
        const wallets = capsuleClient.getWallets();
        setWalletId(Object.values(wallets)[0].id!);
        setWalletAddress(Object.values(wallets)[0].address!);
        toast({
          title: "Logged In",
          description:
            "You're logged in and ready to sign messages with Capsule.",
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

  // Step 7: Handle opening the Capsule Modal
  // Simply set the isCapsuleModalOpen state to true to display the modal
  const handleModalOpen = () => {
    setIsCapsuleModalOpen(true);
  };

  // Step 8: Handle Capsule Modal closure
  // This function is called when the modal is closed, either by the user or after successful login
  // You can perform any necessary cleanup or trigger app-specific actions here
  const handleModalClose = async () => {
    setIsCapsuleModalOpen(false);
    checkLoginStatus();
  };

  // Step 9: Handle message signing
  // This function demonstrates how to sign a message using Capsule
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
        description: "Message has been signed successfully using Capsule.",
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
  };

  // Helper function to reset the component state
  const resetState = () => {
    setMessage("");
    setBackgroundColor("#0c0a09");
    setForegroundColor("#ff6700");
    setDisableEmailLogin(false);
    setDisablePhoneLogin(false);
    isCapsuleModalOpen && setIsCapsuleModalOpen(false);
    setSelectedAuthOption(CapsuleAuthOptions.None);
  };

  // Render the appropriate component based on the authentication state
  return isUserLoggedIn ? (
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
  ) : (
    <CapsuleModalExampleWrapper
      backgroundColor={backgroundColor}
      setBackgroundColor={setBackgroundColor}
      foregroundColor={foregroundColor}
      setForegroundColor={setForegroundColor}
      disableEmailLogin={disableEmailLogin}
      setDisableEmailLogin={setDisableEmailLogin}
      disablePhoneLogin={disablePhoneLogin}
      setDisablePhoneLogin={setDisablePhoneLogin}
      handleModalClose={handleModalClose}
      handleModalOpen={handleModalOpen}
      onCancel={resetState}
      isCapsuleModalOpen={isCapsuleModalOpen}
    >
      <CapsuleModal
        logo={Logo}
        theme={{
          backgroundColor,
          foregroundColor,
          oAuthLogoVariant: "light",
        }}
        capsule={capsuleClient}
        isOpen={isCapsuleModalOpen}
        onClose={handleModalClose}
        appName="Capsule Modal Demo"
        oAuthMethods={Object.values(OAuthMethod)}
        disableEmailLogin={disableEmailLogin}
        disablePhoneLogin={disablePhoneLogin}
        onRampConfig={{
          asset: "eth",
          providers: [
            { id: "STRIPE" },
            // Uncomment the following to add Ramp as a provider
            // {
            //   id: "RAMP",
            //   hostApiKey: "your-ramp-api-key",
            // },
          ],
          testMode: true,
        }}
      />
    </CapsuleModalExampleWrapper>
  );
};
