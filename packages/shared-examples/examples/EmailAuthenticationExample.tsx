import { useEffect, useState } from "react";
import Capsule, { ConstructorOpts, Environment } from "@usecapsule/react-sdk";
import {
  CapsuleEmailAuthForm,
  CapsuleAuthOptions,
  CapsuleEmailVerification,
  CapsuleSignEvmMessages,
  useToast,
  CapsuleTwoFactorSetup,
} from "../components";
import { signEvmMessage } from "./CapsuleSigningExamples";

// Capsule SDK integration example for email-based authentication and message signing.
// This tutorial provides a step-by-step guide to implement Capsule's authentication flow.
// For additional details on the Capsule SDK, refer to: https://docs.usecapsule.com/

type EmailAuthenticationExampleProps = {
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

// Main component for email authentication and message signing tutorial
export const EmailAuthenticationExample: React.FC<
  EmailAuthenticationExampleProps
> = ({ setSelectedAuthOption }) => {
  const { toast } = useToast();

  // State management for the authentication flow
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [needsEmailVerification, setNeedsEmailVerification] =
    useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [userRecoverySecret, setUserRecoverySecret] = useState<string>("");

  const [walletId, setWalletId] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");

  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [selectedSigner, setSelectedSigner] = useState<string>("");

  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState<boolean>(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState<boolean>(false);
  const [twoFactorSecret, setTwoFactorSecret] = useState<string>("");
  const [twoFactorVerificationCode, setTwoFactorVerificationCode] =
    useState<string>("");
  const [twoFactorSetupPhase, setTwoFactorSetupPhase] = useState<
    "setup" | "verify" | null
  >(null);

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
          description:
            "You're logged in and ready to sign messages with Capsule.",
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

  // Step 6: Handle user authentication
  // This function is called when the user clicks the "Continue" button
  const handleAuthenticateUser = async () => {
    setIsLoading(true);
    try {
      const isExistingUser = await capsuleClient.checkIfUserExists(email);

      if (isExistingUser) {
        const authUrl = await capsuleClient.initiateUserLogin(email);
        const popup = window.open(
          authUrl,
          "popup",
          "popup=true,width=400,height=500"
        );

        if (!popup) {
          console.error("Popup blocked. Please allow popups and try again.");
          toast({
            title: "Popup Blocked",
            description: "Please allow popups and try again.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const { needsWallet } = await capsuleClient.waitForLoginAndSetup(popup);

        if (needsWallet) {
          const [wallet, secret] = await capsuleClient.createWallet();
          setWalletId(wallet.id!);
          setWalletAddress(wallet.address!);
          setUserRecoverySecret(secret || "");
        }
        await checkLoginStatus();
        if (isUserLoggedIn) {
          await checkAndSetupTwoFactor();
        }
      } else {
        await capsuleClient.createUser(email);
        setNeedsEmailVerification(true);
      }
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

  // Step 7: Handle email verification
  // This function is called when the user submits their verification code
  const handleVerifyEmail = async () => {
    setIsLoading(true);
    try {
      const url = await capsuleClient.verifyEmail(verificationCode);
      window.open(url, "popup", "popup=true,width=400,height=500");

      const { recoverySecret } =
        await capsuleClient.waitForPasskeyAndCreateWallet();

      setUserRecoverySecret(recoverySecret || "");
      setIsUserLoggedIn(true);
      setNeedsEmailVerification(false);
      toast({
        title: "Capsule Email Verified",
        description: "Your email has been verified with Capsule.",
      });
      await checkLoginStatus();
      if (isUserLoggedIn) {
        await checkAndSetupTwoFactor();
      }
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

  // Step 8: Handle message signing
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
    setEmail("");
    setVerificationCode("");
    setNeedsEmailVerification(false);
    setMessage("");
    setUserRecoverySecret("");
    setSelectedAuthOption(CapsuleAuthOptions.None);
    setIsTwoFactorEnabled(false);
    setShowTwoFactorSetup(false);
    setTwoFactorSecret("");
    setTwoFactorVerificationCode("");
  };

  // Optional Step: Implement Two-Factor Authentication (2FA)
  // The following functions demonstrate how to add 2FA to your Capsule integration

  // Optional Step A: Check and setup 2FA
  const checkAndSetupTwoFactor = async () => {
    try {
      const { isSetup } = await capsuleClient.check2FAStatus();
      setIsTwoFactorEnabled(isSetup);
      if (isSetup) {
        setTwoFactorSetupPhase("verify");
      } else {
        setTwoFactorSetupPhase("setup");
      }
      setShowTwoFactorSetup(true);
    } catch (error) {
      console.error("Error checking 2FA status:", error);
      toast({
        title: "2FA Status Check Error",
        description: "Failed to check 2FA status. Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Optional Step B: Initiate 2FA setup
  const handleSetup2FA = async () => {
    setIsLoading(true);
    try {
      const { uri } = await capsuleClient.setup2FA();
      setTwoFactorSecret(uri || "");
      toast({
        title: "2FA Setup Initiated",
        description:
          "Please scan the QR code or enter the secret in your authenticator app.",
      });
    } catch (error) {
      console.error("Error setting up 2FA:", error);
      toast({
        title: "2FA Setup Error",
        description: "Failed to initiate 2FA setup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Optional Step C: Enable 2FA
  const handleEnable2FA = async () => {
    setIsLoading(true);
    try {
      await capsuleClient.enable2FA(twoFactorVerificationCode);
      toast({
        title: "2FA Enabled",
        description:
          "Two-factor authentication has been successfully enabled for your account.",
      });
      setIsTwoFactorEnabled(true);
      setShowTwoFactorSetup(false);
    } catch (error) {
      console.error("Error enabling 2FA:", error);
      toast({
        title: "2FA Enable Error",
        description:
          "Failed to enable 2FA. Please check your verification code and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Optional Step D: Verify 2FA
  const handleVerify2FA = async () => {
    setIsLoading(true);
    try {
      // Assume capsuleClient has a method to verify 2FA
      await capsuleClient.verify2FA(email, twoFactorVerificationCode);
      toast({
        title: "2FA Verified",
        description: "Two-factor authentication code verified successfully.",
      });
      setShowTwoFactorSetup(false);
    } catch (error) {
      console.error("Error verifying 2FA:", error);
      toast({
        title: "2FA Verification Error",
        description: "Failed to verify 2FA code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Render the appropriate component based on the authentication state
  return (
    <>
      {isUserLoggedIn ? (
        showTwoFactorSetup ? (
          <CapsuleTwoFactorSetup
            isLoading={isLoading}
            twoFactorSecret={twoFactorSecret}
            verificationCode={twoFactorVerificationCode}
            setVerificationCode={setTwoFactorVerificationCode}
            handleSetup2FA={handleSetup2FA}
            handleEnable2FA={handleEnable2FA}
            handleVerify2FA={handleVerify2FA}
            onSkip={() => {
              setShowTwoFactorSetup(false);
              setTwoFactorSetupPhase(null);
            }}
            is2FAEnabled={isTwoFactorEnabled}
            twoFactorSetupPhase={twoFactorSetupPhase}
          />
        ) : (
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
        )
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
