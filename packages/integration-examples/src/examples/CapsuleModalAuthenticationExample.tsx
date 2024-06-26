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

import { signMessage, sendSolanaTransaction } from "./CapsuleSigningExamples";
import {
  CapsuleAuthOptions,
  CapsuleModalExampleWrapper,
  CapsuleSignMessages,
  useToast,
} from "../components";

// Capsule Modal integration example for managed authentication using the Capsule React SDK.
// This tutorial provides a step-by-step guide to implement Capsule's modal-based authentication flow.
// For additional details on integrating with Capsule, refer to: https://docs.usecapsule.com/

type CapsuleModalAuthenticationExampleProps = {
  setSelectedAuthOption: (option: CapsuleAuthOptions) => void;
  useSolanaOverEVM?: boolean;
};

// Step 1: Set up your Capsule API key
// Obtain your API key from https://usecapsule.com/beta
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

// Step 2: Set the Capsule environment
// Choose between Environment.DEVELOPMENT or Environment.PRODUCTION based on your use case
const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;



// Solana specific variables
const SOLANA_RECIPIENT_PUBLIC_KEY = '4TUYF5Q6sCkBCjamQrTkNYJyxhyaCPiPnq9oVg6qXbTp';

// Main component for Capsule Modal based authentication and message signing tutorial
export const CapsuleModalAuthenticationExample: React.FC<
  CapsuleModalAuthenticationExampleProps
> = ({ setSelectedAuthOption, useSolanaOverEVM }) => {
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
    supportedWalletTypes: useSolanaOverEVM ? [WalletType.SOLANA] : undefined,
  };

  // Step 4: Initialize the Capsule client
  // Create a new Capsule instance with your environment, API key, and optional constructor parameters
  const capsuleClient = new Capsule(
    CAPSULE_ENVIRONMENT,
    CAPSULE_API_KEY,
    constructorOpts
  );

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [isCapsuleModalOpen, setIsCapsuleModalOpen] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");
  const [solToSend, setSolToSend] = useState<string>("");
  const [solanaRecipientAddress, setSolanaRecipientAddress] = useState<string>(SOLANA_RECIPIENT_PUBLIC_KEY);
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
        if (useSolanaOverEVM) {
          const solanaWallets = capsuleClient.getED25519Wallets();
          console.log(solanaWallets)
          setWalletId(Object.values(solanaWallets)[0].id!);
          setWalletAddress(Object.values(solanaWallets)[0].address!);
          toast({
            title: "Logged In",
            description:
              "You're logged in and ready to send transactions with Capsule.",
          });
        } else {
          const wallets = capsuleClient.getWallets();
          setWalletId(Object.values(wallets)[0].id!);
          setWalletAddress(Object.values(wallets)[0].address!);
          toast({
            title: "Logged In",
            description:
              "You're logged in and ready to sign messages with Capsule.",
          });
        }
        
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
    if (await capsuleClient.isFullyLoggedIn()) {
      setIsUserLoggedIn(true);
    }
  };

  // Step 9: Handle message signing
  // This function demonstrates how to sign a message using Capsule
  const handleSignMessage = async () => {
    setIsLoading(true);
    try {
      const signature = await signMessage(
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

  const handleSendSolanaTransaction = async () => {
    setIsLoading(true);
    try {
      const signature = await sendSolanaTransaction(
        capsuleClient,
        solToSend,
        solanaRecipientAddress,
      );
      setSignature(signature);
      toast({
        title: "Capsule Transaction Sent",
        description: "Transaction has been sent successfully using Capsule.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Capsule transaction sending failed:", error);
      toast({
        title: "Capsule Transaction Sending Error",
        description:
          "Failed to send transaction with Capsule. See console for details.",
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
    setSolToSend("");
    setSolanaRecipientAddress(SOLANA_RECIPIENT_PUBLIC_KEY);
    isCapsuleModalOpen && setIsCapsuleModalOpen(false);
    setSelectedAuthOption(CapsuleAuthOptions.None);
  };

  // Render the appropriate component based on the authentication state
  return isUserLoggedIn ? (
    <CapsuleSignMessages
      isLoading={isLoading}
      signature={signature}
      walletId={walletId}
      walletAddress={walletAddress}
      userRecoverySecret={userRecoverySecret}
      message={message}
      solToSend={solToSend}
      solanaRecipientAddress={solanaRecipientAddress}
      selectedSigner={selectedSigner}
      isUserLoggedIn={isUserLoggedIn}
      setSelectedSigner={setSelectedSigner}
      setMessage={(e) => setMessage(e.target.value)}
      setSolToSend={(e) => setSolToSend(e.target.value)}
      setSolanaRecipientAddress={(e) => setSolanaRecipientAddress}
      handleLogout={handleLogout}
      handleSignMessage={handleSignMessage}
      handleSendSolanaTransaction={handleSendSolanaTransaction}
      useSolanaOverEVM={!!useSolanaOverEVM}
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
