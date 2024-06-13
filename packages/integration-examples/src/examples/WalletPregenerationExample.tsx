import { useEffect, useState } from "react";
import Capsule, { ConstructorOpts, Environment } from "@usecapsule/react-sdk";
import { CapsuleAuthOptions } from "..";
import { useToast } from "../components/core";
import { signMessage } from "./CapsuleSigningExamples";
import { SignMessages } from "../components/ui/SignMessages";
import { EmailVerification } from "../components/ui/EmailVerification";
import { Authenticate } from "../components/ui/Authenticate";
import { CreatePreGeneratedWallet } from "../components/ui/CreatePregenWallet";

//Capsule SDK integration example for Wallet Pre-generation. For additional details on the Capsule SDK, refer to: https://docs.usecapsule.com/integration-guides/wallet-pregeneration

type WalletPregenerationExampleProps = {
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

export const WalletPregenerationExample: React.FC<
  WalletPregenerationExampleProps
> = ({ setSelectedAuthOption }) => {
  const { toast } = useToast();

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

  // 4. Check if the user is already logged in. isFullyLoggedIn() will return true if the user is already logged in and has a wallet setup.
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
          description: "You're logged in and ready to sign messages.",
        });
      }
      setNeedsEmailVerification(false);
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

  // 5. Pregenerate a wallet for the user using the Capsule SDK. Note the user wallet share is stored in the user's browser and can be retrieved using the `getUserShare` method. The user share is required for wallet recovery.
  const pregenerateWallet = async () => {
    setIsLoading(true);
    try {
      const hasPregenWallet = await capsuleClient.hasPregenWallet(email);

      if (hasPregenWallet) {
        setUserHasPregenWallet(true);
        toast({
          title: "Pregenerated Wallet Exists",
          description: "A pregenerated wallet already exists for this email.",
        });
        return;
      }

      await capsuleClient.createWalletPreGen(email);

      const userWalletShare = await capsuleClient.getUserShare();

      if (!!userWalletShare) {
        await capsuleClient.setUserShare(userWalletShare);
        setUserShare(userWalletShare);
      }
      setUserHasPregenWallet(true);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          "An error occurred during wallet pregeneration. Check the console for more details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 6. Handle authentication on the "Continue" button click. For new users, this will create a new user and automatically send a verification code to the user's email. The verifyEmail step will handle pregenerated wallets for new users. For existing users, this will initiate the login process and open a popup window for the user to authenticate. Once authenticated we check if the user has a pregenerated wallet and claim it if they do.
  const handleAuthenticateUser = async () => {
    setIsLoading(true);
    try {
      const isExistingUser = await capsuleClient.checkIfUserExists(email);

      if (isExistingUser) {
        const authUrl = await capsuleClient.initiateUserLogin(email);
        window.open(authUrl, "popup", "popup=true,width=400,height=500");
        await capsuleClient.waitForLoginAndSetup();

        const hasPregenWallet = await capsuleClient.hasPregenWallet(email);

        if (hasPregenWallet) {
          const [pregenWallet, recovery] =
            await capsuleClient.claimPregenWallet(email);
          setUserRecoverySecret(recovery);
        }

        checkLoginStatus();
        return;
      }

      await capsuleClient.createUser(email);
      setNeedsEmailVerification(true);
    } catch (err) {
      console.error(err);
      toast({
        title: "An error occurred",
        description:
          "An error occurred during authentication. Check the console for more details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 7. Handle the verification code automatically sent to the user's email. If the code is valid the user is directed to a URL for completing their credentials. Once logged in and verification is complete `waitForPasskeyAndCreateWallet` will call the `claimPregenWallet` method internally to claim the pregenerated wallet. This differs from the above flow for an existing user where the `claimPregenWallet` method is called directly.
  const handleVerifyEmail = async () => {
    setIsLoading(true);
    try {
      const url = await capsuleClient.verifyEmail(verificationCode);
      window.open(url, "popup", "popup=true,width=400,height=500");

      const recoverySecret =
        await capsuleClient.waitForPasskeyAndCreateWallet();

      toast({
        title: "Email Verified",
        description: "You have been successfully verified.",
      });
      setUserRecoverySecret(recoverySecret);

      checkLoginStatus();
    } catch (err) {
      console.error(err);
      toast({
        title: "An error occurred",
        description:
          "An error occurred during email verification. Check the console for more details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

  const handleLogout = async () => {
    await capsuleClient.logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    resetState();
    setSelectedAuthOption("none");
  };

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
  return (
    <>
      {isUserLoggedIn ? (
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
      ) : !userHasPregenWallet ? (
        <CreatePreGeneratedWallet
          email={email}
          setEmail={(e) => setEmail(e.target.value)}
          isLoading={isLoading}
          pregenerateWallet={pregenerateWallet}
          resetState={() => {
            resetState();
            setSelectedAuthOption("none");
          }}
        />
      ) : needsEmailVerification ? (
        <EmailVerification
          isLoading={isLoading}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          handleVerifyEmail={handleVerifyEmail}
          resetState={resetState}
        />
      ) : (
        <Authenticate
          isLoading={isLoading}
          email={email}
          setEmail={(e) => setEmail(e.target.value)}
          handleAuthenticateUser={handleAuthenticateUser}
          resetState={resetState}
        />
      )}
    </>
  );
};
