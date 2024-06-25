import { useEffect, useState } from "react";
import Capsule, {
  ConstructorOpts,
  Environment,
  OAuthMethod,
} from "@usecapsule/react-sdk";
import {
  CapsuleOAuthAuthForm,
  CapsuleAuthOptions,
  CapsuleSignMessages,
  useToast,
} from "../components";
import { signMessage } from "./CapsuleSigningExamples";

type OAuthAuthenticationExampleProps = {
  setSelectedAuthOption: (option: CapsuleAuthOptions) => void;
};

const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";
const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

const constructorOpts: ConstructorOpts = {
  emailPrimaryColor: "#ff6700",
  githubUrl: "https://github.com/capsule-org",
  linkedinUrl: "https://www.linkedin.com/company/usecapsule/",
  xUrl: "https://x.com/usecapsule",
  homepageUrl: "https://usecapsule.com/",
  supportUrl: "https://usecapsule.com/talk-to-us",
};

export const capsuleClient = new Capsule(
  CAPSULE_ENVIRONMENT,
  CAPSULE_API_KEY,
  constructorOpts
);

export const OAuthAuthenticationExample: React.FC<
  OAuthAuthenticationExampleProps
> = ({ setSelectedAuthOption }) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [walletId, setWalletId] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [userRecoverySecret, setUserRecoverySecret] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [selectedSigner, setSelectedSigner] = useState<string>("");

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
        setIsUserLoggedIn(true);
        toast({
          title: "Logged In",
          description:
            "You're logged in and ready to sign messages with Capsule.",
        });
      }
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

  const handleAuthentication = async (method: OAuthMethod) => {
    setIsLoading(true);
    try {
      if (method === OAuthMethod.FARCASTER) {
        await handleFarcasterAuth();
      } else {
        await handleRegularOAuth(method);
      }
      await checkLoginStatus();
    } catch (err) {
      console.error("Capsule OAuth authentication failed:", err);
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

  const handleFarcasterAuth = async () => {
    const connectUri = await capsuleClient.getFarcasterConnectURL();

    console.log("Farcaster QR Code URL:", connectUri);

    const { userExists, username } =
      await capsuleClient.waitForFarcasterStatus();

    if (userExists) {
      const webAuthUrlForLogin = await capsuleClient.initiateUserLogin(
        username,
        false,
        "farcaster"
      );
      window.open(
        webAuthUrlForLogin,
        "loginPopup",
        "popup=true,width=400,height=500"
      );
      await capsuleClient.waitForLoginAndSetup();
    } else {
      const webAuthURLForCreate = await capsuleClient.getSetUpBiometricsURL(
        false,
        "farcaster"
      );
      window.open(
        webAuthURLForCreate,
        "signUpPopup",
        "popup=true,width=400,height=500"
      );
      const recoverySecret =
        await capsuleClient.waitForPasskeyAndCreateWallet();
      setUserRecoverySecret(recoverySecret);
    }
  };

  const handleRegularOAuth = async (method: OAuthMethod) => {
    const oAuthURL = await capsuleClient.getOAuthURL(method);
    window.open(
      oAuthURL,
      `${method}AuthPopup`,
      "popup=true,width=400,height=500"
    );

    const { email, userExists } = await capsuleClient.waitForOAuth();

    if (!email) {
      throw new Error("Email is required for authentication");
    }

    if (userExists) {
      const webAuthUrlForLogin = await capsuleClient.initiateUserLogin(email);
      window.open(
        webAuthUrlForLogin,
        "loginPopup",
        "popup=true,width=400,height=500"
      );
      await capsuleClient.waitForLoginAndSetup();
    } else {
      const webAuthURLForCreate = await capsuleClient.getSetUpBiometricsURL(
        false
      );
      window.open(
        webAuthURLForCreate,
        "signUpPopup",
        "popup=true,width=400,height=500"
      );
      const recoverySecret =
        await capsuleClient.waitForPasskeyAndCreateWallet();
      setUserRecoverySecret(recoverySecret);
    }
  };

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

  const handleLogout = async () => {
    await capsuleClient.logout();
    toast({
      title: "Capsule Logout",
      description: "You have been successfully logged out from Capsule.",
    });
    resetState();
  };

  const resetState = () => {
    setIsUserLoggedIn(false);
    setMessage("");
    setSignature("");
    setSelectedSigner("");
    setWalletId("");
    setWalletAddress("");
    setUserRecoverySecret("");
    setSelectedAuthOption(CapsuleAuthOptions.None);
  };

  return isUserLoggedIn ? (
    <CapsuleSignMessages
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
    <CapsuleOAuthAuthForm
      isLoading={isLoading}
      handleAuthentication={handleAuthentication}
      onCancel={resetState}
    />
  );
};
