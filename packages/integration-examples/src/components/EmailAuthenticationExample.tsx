import { useEffect, useState } from "react";
import Capsule, { ConstructorOpts, Environment } from "@usecapsule/react-sdk";
import { CapsuleAuthOptions } from "..";
import {
  Alert,
  CardContent,
  CardHeader,
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Label,
  Input,
  Button,
  CardFooter,
  SelectItem,
  useToast,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./core";

import { signMessage } from "../utils/signingUtils";

//Capsule SDK integration example for email-based authentication and message signing. For additional details on the Capsule SDK, refer to: https://docs.usecapsule.com/

type EmailAuthenticationExampleProps = {
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

// Main component for email authentication and message signing
export const EmailAuthenticationExample: React.FC<
  EmailAuthenticationExampleProps
> = ({ setSelectedAuthOption }) => {
  const [email, setEmail] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [userNeedsWallet, setUserNeedsWallet] = useState<boolean>(false);
  const [needsEmailVerification, setNeedsEmailVerification] =
    useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [userRecoverySecret, setUserRecoverySecret] = useState<string>("");

  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [selectedSigner, setSelectedSigner] = useState<string>("");

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 4. Check if the user is already logged in. isFullyLoggedIn() will return true if the user is already logged in and has a wallet setup.
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await capsuleClient.isFullyLoggedIn();
        setIsUserLoggedIn(isLoggedIn);
        if (isLoggedIn) {
          toast({
            title: "Already Logged In",
            description: "You can now proceed with the transaction",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkLoginStatus();
  }, []);

  // 5. Handle authentication on the "Continue" button click. For new users, this will create a new user and automatically send a verification code to the user's email. The email branding can be customized using the ConstructorOpts passed to the Capsule client from step 3. For existing users, this will initiate the login process and open a popup window for the user to authenticate.
  const handleContinue = async () => {
    setIsLoading(true);
    try {
      const isExistingUser = await capsuleClient.checkIfUserExists(email);

      if (isExistingUser) {
        const authUrl = await capsuleClient.initiateUserLogin(email);
        window.open(authUrl, "popup", "popup=true,width=400,height=500");

        const { needsWallet } = await capsuleClient.waitForLoginAndSetup();
        if (needsWallet) await capsuleClient.createWallet();

        setIsUserLoggedIn(true);
        setUserNeedsWallet(needsWallet);
      } else {
        await capsuleClient.createUser(email);
        setNeedsEmailVerification(true);
      }
    } catch (err) {
      toast({
        title: "An error occurred",
        description:
          "An error occurred during authentication. Check the console for more details.",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  //6. Handle the verification code automatically sent to the user's email. If the code is valid the user is directed to a URL for completing their credentials. Once their credentials are completed, the user is logged in and a wallet is created. A recovery secret is returned which can be used to recover the wallet in case the user loses access to their device.
  const handleVerifyEmail = async () => {
    setIsLoading(true);
    try {
      const url = await capsuleClient.verifyEmail(verificationCode);

      window.open(url, "popup", "popup=true,width=400,height=500");

      const recoverySecret =
        await capsuleClient.waitForPasskeyAndCreateWallet();

      setUserRecoverySecret(recoverySecret);

      setIsUserLoggedIn(true);
      setNeedsEmailVerification(false);
      toast({
        title: "Email Verified",
        description: "You have been successfully verified.",
      });
    } catch (err) {
      toast({
        title: "An error occurred",
        description:
          "An error occurred during email verification. Check the console for more details.",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  //7. Handle signing a messages or transaction using a Capsule compatible library like ethers.js or viem.js. Please view the signingUtils.ts file for invdividual signing implementations for each library. Additional signing details can be found at: https://docs.usecapsule.com/integration-guide/signing-transactions
  const handleSignMessage = async () => {
    setIsLoading(true);
    await signMessage(
      capsuleClient,
      selectedSigner,
      message,
      setSignature,
      toast
    );
    setIsLoading(false);
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
    setEmail("");
    setVerificationCode("");
    setNeedsEmailVerification(false);
    setMessage("");
    setUserRecoverySecret("");
    setUserNeedsWallet(false);
    setSelectedAuthOption("none");
  };

  return isUserLoggedIn ? (
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
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
        <Button
          onClick={handleSignMessage}
          disabled={!message || !selectedSigner || !isUserLoggedIn || isLoading}
        >
          {isLoading ? "Signing..." : "Sign Message"}
        </Button>
      </CardFooter>
    </>
  ) : needsEmailVerification ? (
    <>
      <CardHeader>
        <h2 className="text-xl font-bold">Email Verification</h2>
        <p>
          A verification code has been sent to your email. Please enter the code
          below.
        </p>
      </CardHeader>
      <CardContent>
        <Label htmlFor="verification-code-input" className="block mb-2">
          Verification Code:
        </Label>
        <InputOTP
          id="verification-code-input"
          name="verificationCode"
          maxLength={6}
          value={verificationCode}
          onChange={setVerificationCode}
          textAlign="center"
          className="mb-4"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Back</Button>
        <Button onClick={handleVerifyEmail} disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </CardFooter>
    </>
  ) : (
    <>
      <CardHeader>
        <h2 className="text-xl font-bold">Web SDK Auth</h2>
        <p>
          This will use the Capsule Web SDK for manual authentication. If you
          are a new user, a verification code will be sent to your email.
        </p>
      </CardHeader>
      <CardContent>
        <Label htmlFor="email-input" className="block mb-2">
          Your Email:
        </Label>
        <Input
          id="email-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetState}>
          Back
        </Button>
        <Button onClick={handleContinue} disabled={isLoading}>
          {isLoading ? "Loading..." : "Continue"}
        </Button>
      </CardFooter>
    </>
  );
};
