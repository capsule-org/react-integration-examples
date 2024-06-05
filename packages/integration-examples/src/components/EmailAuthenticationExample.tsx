import { CardContent, CardFooter, CardHeader } from "./core/card";
import { Input } from "./core/input";
import { Button } from "./core/button";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useToast } from "./core/toast/use-toast";
import Capsule, {
  ConstructorOpts,
  Environment,
} from "@usecapsule/react-sdk-dev";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./core/input-otp";
import { CapsuleAuthOptions } from "..";

// This component demonstrates how to use the Capsule SDK to authenticate users using their email address.
// For additional details on the Capsule SDK, refer to: https://docs.usecapsule.com/

type EmailAuthenticationExampleProps = {
  setSelectedAuthOption: (option: CapsuleAuthOptions) => void;
};

// 1. Get your API key from https://usecapsule.com/beta
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

// 2. Set the environment to development or production based on your use case
const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

// 3. Initialize the Capsule client. Add possible constructor parameters as needed. For more details on the full constructor options, refer to: https://docs.usecapsule.com/integration-guide/customize-capsule#constructor-options
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

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //4. Check if the user is already logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await capsuleClient.isFullyLoggedIn();
        setIsUserLoggedIn(isLoggedIn);
        isLoggedIn &&
          toast({
            title: "Already Logged In",
            description: "You can now proceed with the transaction",
          });
      } catch (err) {
        console.error(err);
      }
    };
    checkLoginStatus();
  }, []);

  //5. Handle the authentication on the click of the continue button
  const handleContinue = async () => {
    setIsLoading(true);
    try {
      //6. Check if the user exists
      const isExistingUser = await capsuleClient.checkIfUserExists(email);

      //7. If the user exists, initiate the login flow
      if (isExistingUser) {
        //7.1 Initiate the login flow
        const authUrl = await capsuleClient.initiateUserLogin(email);
        //7.2 Open the authentication URL in a new window
        window.open(authUrl, "popup", "popup=true,width=400,height=500");
        //7.3 Wait for the user to login and setup the wallet
        const { needsWallet } = await capsuleClient.waitForLoginAndSetup();
        //Handle needs wallet here if required
        needsWallet && (await capsuleClient.createWallet());
        setIsUserLoggedIn(true);
        setUserNeedsWallet(needsWallet);
      } else {
        //8. If the user does not exist, create a new user. Verification code is automatically sent to the user's email
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

  //9. Handle the verification of the email
  const handleVerifyEmail = async () => {
    setIsLoading(true);

    try {
      //10. Verify the email using the verification code
      const url = await capsuleClient.verifyEmail(verificationCode);
      window.open(url, "popup", "popup=true,width=400,height=500");

      //11. Wait for the user to setup the wallet
      const recoverySecret =
        await capsuleClient.waitForPasskeyAndCreateWallet();
      //12. Handle the recovery secret here. You can store it in a secure location or show it to the user for backup. This example just sets it in the state. Make sure to handle it securely in your application.
      setUserRecoverySecret(recoverySecret);

      //13. Move to the next step of signing messages or transactions.

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

  //14. Handle signing a messages or transaction using a Capsule compatible library like ethers.js or viem.js. Additional signing details can be found at: https://docs.usecapsule.com/integration-guide/signing-transactions

  const handleSignMessage = async () => {};

  //15. As a last step, handle the logout. This will clear the session and the user will have to login again. For additional details on session management, refer to: https://docs.usecapsule.com/integration-guide/session-management

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

  const LoggedInComponent = () => (
    <>
      <CardHeader>
        <h2 className="text-xl font-bold">Sign A Message</h2>
      </CardHeader>
      <CardContent>
        <Label>Message:</Label>
        <Input
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-4"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
        <Button
          onClick={() =>
            alert(`
        Signing message: ${message}
        `)
          }
        >
          Sign
        </Button>
      </CardFooter>
    </>
  );

  const EmailVerificationComponent = () => (
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
  );

  const AuthFormComponent = () => (
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

  return isUserLoggedIn ? (
    <LoggedInComponent />
  ) : needsEmailVerification ? (
    <EmailVerificationComponent />
  ) : (
    <AuthFormComponent />
  );
};
