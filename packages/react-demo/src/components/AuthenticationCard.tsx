// AuthenticationCard.tsx
import React from "react";
import { Button } from "./core/button";
import { Card, CardContent, CardFooter, CardHeader } from "./core/card";
import { EmailAuthenticationExample } from "./examples/EmailAuthenticationExample";
import { VerifyEmailExample } from "./examples/VerifyEmailExample";
import { CapsuleModalAuthenticationExample } from "./examples/CapsuleModalAuthenticationExample";
import { Web3OnboardAuthenticationExample } from "./examples/Web3OnboardAuthenticationExample";

export type CapsuleAuthOptions =
  | "none"
  | "email"
  | "verify-email"
  | "capsule-modal"
  | "rainbowkit"
  | "web3onboard";

type AuthenticationCardProps = {
  selectedOption: CapsuleAuthOptions;
  setSelectedOption: (option: CapsuleAuthOptions) => void;
  email: string;
  setEmail: (email: string) => void;
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
  setUserNeedsWallet: (userNeedsWallet: boolean) => void;
  setUserRecoverySecret: (recoverySecret: string) => void;
};

const AuthenticationOptions = (
  setSelectedOption: (option: CapsuleAuthOptions) => void
) => {
  return (
    <CardContent>
      <Button
        onClick={() => setSelectedOption("email")}
        className="mb-2 w-full"
      >
        Capsule Web SDK Auth
      </Button>
      <Button
        onClick={() => setSelectedOption("capsule-modal")}
        className="mb-2 w-full"
      >
        Capsule React Modal Auth
      </Button>
      <Button
        onClick={() => setSelectedOption("rainbowkit")}
        className="mb-2 w-full"
      >
        RainbowKit Wallet Connector Auth
      </Button>
      <Button
        onClick={() => setSelectedOption("web3onboard")}
        className="mb-2 w-full"
      >
        Web3-onboard Wallet Connector Auth
      </Button>
    </CardContent>
  );
};

export const AuthenticationCard: React.FC<AuthenticationCardProps> = ({
  selectedOption,
  setSelectedOption,
  email,
  setEmail,
  setIsUserLoggedIn,
  setUserNeedsWallet,
  setUserRecoverySecret,
}) => {
  const renderAuthOption = () => {
    switch (selectedOption) {
      case "email":
        return (
          <EmailAuthenticationExample
            email={email}
            setEmail={setEmail}
            setSelectedOption={setSelectedOption}
            setIsUserLoggedIn={setIsUserLoggedIn}
            setUserNeedsWallet={setUserNeedsWallet}
          />
        );
      case "verify-email":
        return (
          <VerifyEmailExample
            setIsUserLoggedIn={setIsUserLoggedIn}
            setUserRecoverySecret={setUserRecoverySecret}
          />
        );
      case "capsule-modal":
        return (
          <CapsuleModalAuthenticationExample
            setSelectedOption={setSelectedOption}
            setIsUserLoggedIn={setIsUserLoggedIn}
          />
        );
      case "rainbowkit":
        return <></>;

      case "web3onboard":
        return (
          <Web3OnboardAuthenticationExample
            setSelectedOption={setSelectedOption}
            setIsUserLoggedIn={setIsUserLoggedIn}
          />
        );
      default:
        return AuthenticationOptions(setSelectedOption);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 bg-white">
      {selectedOption == "none" && (
        <CardHeader>
          <h2 className="text-xl font-bold">Capsule SDK Auth Options</h2>
        </CardHeader>
      )}
      {renderAuthOption()}
    </Card>
  );
};
