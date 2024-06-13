import Capsule, {
  CapsuleModal,
  ConstructorOpts,
  Environment,
  OAuthMethod,
} from "@usecapsule/react-sdk";
import { useEffect, useState } from "react";
import "@usecapsule/react-sdk/styles.css";
import Logo from "../assets/images/capsule-logo.svg";

import { CapsuleAuthOptions } from "..";

import { signMessage } from "./CapsuleSigningExamples";
import { useToast } from "../components/core";
import { SignMessages } from "../components/ui/SignMessages";
import { CapsuleModalExampleWrapper } from "../components/ui/CapsuleModalExampleWrapper";

// Capsule Modal integration example for managed authentication using the Capsule React SDK. For additional details on the integrating with Capsule, refer to: https://docs.usecapsule.com/

type CapsuleModalAuthenticationExampleProps = {
  setSelectedAuthOption: (option: CapsuleAuthOptions) => void;
};

// 1. Get your API key from https://usecapsule.com/beta
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

// 2. Set the environment to development or production based on your use case
const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

// NOTE: The parameters below are optional and can be used to customize the Capsule SDK integration.
// For a comprehensive list of all available constructor options and detailed explanations, please visit:
// https://docs.usecapsule.com/integration-guide/customize-capsule#constructor-options

const constructorOpts: ConstructorOpts = {
  emailPrimaryColor: "#ff6700",
  githubUrl: "https://github.com/capsule-org",
  linkedinUrl: "https://www.linkedin.com/company/usecapsule/",
  xUrl: "https://x.com/usecapsule",
  homepageUrl: "https://usecapsule.com/",
  supportUrl: "https://usecapsule.com/talk-to-us",
};

//3. Initialize the Capsule client with optional constructor parameters
export const capsuleClient = new Capsule(
  CAPSULE_ENVIRONMENT,
  CAPSULE_API_KEY,
  constructorOpts
);

// Main component for Capsule Modal based authentication and message signing
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

  //Note: These states are used to customize the Capsule Modal and are passed as props to the CapsuleModal component. You can pass these as props directly to the CapsuleModal component or from your apps theme settings. For more details on the Capsule customization options, refer to: https://docs.usecapsule.com/integration-guide/customize-capsule
  const [backgroundColor, setBackgroundColor] = useState<string>("#0c0a09");
  const [foregroundColor, setForegroundColor] = useState<string>("#ff6700");
  const [disableEmailLogin, setDisableEmailLogin] = useState<boolean>(false);
  const [disablePhoneLogin, setDisablePhoneLogin] = useState<boolean>(false);

  // 4. Check if the user is already logged in. isFullyLoggedIn() will return true if the user is already logged in and has a wallet setup.
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await capsuleClient.isFullyLoggedIn();

      if (isLoggedIn) {
        const wallets = await capsuleClient.getWallets();
        setWalletId(wallets[0].id);
        setWalletAddress(wallets[0].address!);
        toast({
          title: "Logged In",
          description: "You're logged in and ready to sign messages.",
        });
      }
      setIsUserLoggedIn(isLoggedIn);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description:
          "An error occurred while checking login status. Check the console for more details.",
        variant: "destructive",
      });
    }
  };

  // 5. Open the Capsule Modal by simply setting the isCapsuleModalOpen state to true
  const handleModalOpen = () => {
    setIsCapsuleModalOpen(true);
  };

  // 6. Handle any cleanup or trigger any app specific actions after the Capsule Modal is closed. This is triggered if the user closes the Capsule Modal or after the user is logged in successfully. Any app specific after effects can be triggered here.
  const handleModalClose = async () => {
    setIsCapsuleModalOpen(false);
    if (await capsuleClient.isFullyLoggedIn()) {
      setIsUserLoggedIn(true);
    }
  };

  //7. Handle signing a messages or transaction using a Capsule compatible library like ethers.js or viem.js. Please view the signingUtils.ts file for invdividual signing implementations for each library. Additional signing details can be found at: https://docs.usecapsule.com/integration-guide/signing-transactions
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
        title: "Message signed",
        description: "Message has been signed successfully.",
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          "An error occurred while signing the message. Check the console for more details.",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  //8. Handle logging out the user. This will clear the session and the user will have to login again. For additional details on session management, refer to: https://docs.usecapsule.com/integration-guide/session-management
  const handleLogout = async () => {
    await capsuleClient.logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    resetState();
  };

  const resetState = () => {
    setMessage("");
    setBackgroundColor("#0c0a09");
    setForegroundColor("#ff6700");
    setDisableEmailLogin(false);
    setDisablePhoneLogin(false);
    isCapsuleModalOpen && setIsCapsuleModalOpen(false);
    setSelectedAuthOption("none");
  };

  return isUserLoggedIn ? (
    <SignMessages
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
      resetState={resetState}
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
        oAuthMethods={[
          OAuthMethod.GOOGLE,
          OAuthMethod.TWITTER,
          OAuthMethod.FACEBOOK,
          OAuthMethod.DISCORD,
          OAuthMethod.APPLE,
        ]}
        disableEmailLogin={disableEmailLogin}
        disablePhoneLogin={disablePhoneLogin}
      />
    </CapsuleModalExampleWrapper>
  );
};
