import React, { useState, useEffect } from "react";
import { CustomCapsuleModalView } from "@leapwallet/cosmos-social-login-capsule-provider-ui";
import {
  CapsuleProvider,
  OAuthMethod,
} from "@leapwallet/cosmos-social-login-capsule-provider";
import { Environment } from "@usecapsule/web-sdk";
// Note: Import the necessary styles for the Leap Capsule Provider UI
import "@leapwallet/cosmos-social-login-capsule-provider-ui/styles.css";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  useToast,
} from "../components";

type CapsuleLeapModalAuthenticationExampleProps = {
  setSelectedAuthOption: (option: any) => void; // Replace 'any' with your actual auth options type
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
const constructorOpts = {
  emailPrimaryColor: "#ff6700",
  githubUrl: "https://github.com/capsule-org",
  linkedinUrl: "https://www.linkedin.com/company/usecapsule/",
  xUrl: "https://x.com/usecapsule",
  homepageUrl: "https://usecapsule.com/",
  supportUrl: "https://usecapsule.com/talk-to-us",
};

const capsuleProvider = new CapsuleProvider({
  apiKey: CAPSULE_API_KEY,
  env: CAPSULE_ENVIRONMENT,
  opts: constructorOpts,
});

export const CapsuleLeapModalAuthenticationExample: React.FC<
  CapsuleLeapModalAuthenticationExampleProps
> = ({ setSelectedAuthOption }) => {
  const { toast } = useToast();

  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Step 4: Check initial authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await capsuleProvider.enable();
        setIsAuthenticated(true);
        toast({
          title: "Authentication Status",
          description: "You are already authenticated.",
        });
      } catch (error) {
        console.error("Not authenticated:", error);
        toast({
          title: "Authentication Status",
          description: "You are not authenticated.",
          variant: "destructive",
        });
      }
    };
    checkAuthStatus();
  }, [toast]);

  // Step 5: Handle opening the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Step 6: Handle successful login
  // Here, you can perform actions such as updating the UI, fetching user data, or redirecting to another page
  const handleAfterLogin = async () => {
    try {
      setIsAuthenticated(true);
      setShowModal(false);
      const account = await capsuleProvider.getAccount("cosmos");
      console.log("Logged in account:", account);
      toast({
        title: "Login Successful",
        description: `Logged in as ${account.username}`,
      });
    } catch (error) {
      console.error("Error fetching account details:", error);
      toast({
        title: "Login Error",
        description: "Failed to fetch account details after login.",
        variant: "destructive",
      });
    }
  };

  // Step 7: Handle login failure
  // You can use this to show error messages or perform error-specific actions
  const handleLoginFailure = () => {
    console.error("Login failed");
    setShowModal(false);
    toast({
      title: "Login Failed",
      description: "Unable to authenticate. Please try again.",
      variant: "destructive",
    });
  };

  // Step 8: Handle logout
  // It disconnects the user from the Capsule provider and updates the authentication state
  const handleLogout = async () => {
    try {
      await capsuleProvider.disconnect();
      setIsAuthenticated(false);
      toast({
        title: "Logout Successful",
        description: "You have been logged out.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    // Note: Add the 'leap-ui' class to the parent component for proper styling
    <div className="leap-ui">
      <CardHeader>
        <h2 className="text-xl font-bold">
          Capsule Leap Modal Authentication Example
        </h2>
        <p className="text-sm text-muted-foreground">
          This example demonstrates how to integrate the Leap Wallet custom
          Capsule Modal for Cosmos ecosystem authentication.
        </p>
      </CardHeader>
      <CardContent className="flex flex-grow overflow-auto flex-col items-start space-y-4">
        {isAuthenticated ? (
          <div>
            <p>You are authenticated!</p>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <Button onClick={handleOpenModal}>Open Capsule Leap Modal</Button>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 p-4">
        <Button
          variant="outline"
          onClick={() => setSelectedAuthOption(null)}
          className="w-full sm:w-auto text-sm"
        >
          Back to Options
        </Button>
      </CardFooter>

      {/* Step 12: Render the CustomCapsuleModalView component */}
      <CustomCapsuleModalView
        oAuthMethods={[
          OAuthMethod.APPLE,
          OAuthMethod.DISCORD,
          OAuthMethod.FACEBOOK,
          OAuthMethod.GOOGLE,
          OAuthMethod.TWITTER,
        ]}
        capsule={capsuleProvider.getClient()}
        showCapsuleModal={showModal}
        setShowCapsuleModal={setShowModal}
        onAfterLoginSuccessful={handleAfterLogin}
        onLoginFailure={handleLoginFailure}
        theme="light" // You can change this to "dark" if preferred
      />
    </div>
  );
};
