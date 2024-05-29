// AuthenticationCard.tsx
import React, { useState } from "react";
import { Button } from "./Button";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Input } from "./input";

export type AuthOption =
  | "none"
  | "email"
  | "verify-email"
  | "capsule"
  | "rainbowkit"
  | "web3onboard";

type AuthenticationCardProps = {
  selectedOption: AuthOption;
  setSelectedOption: (option: AuthOption) => void;
  email: string;
  setEmail: (email: string) => void;
  verificationCode: string;
  setVerificationCode: (verificationCode: string) => void;
};

export const AuthenticationCard: React.FC<AuthenticationCardProps> = ({
  selectedOption,
  setSelectedOption,
  email,
  setEmail,
  verificationCode,
  setVerificationCode,
}) => {
  const renderContent = () => {
    switch (selectedOption) {
      case "email":
        return (
          <div>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <Button onClick={() => setSelectedOption("verify-email")}>
              Continue
            </Button>
          </div>
        );
      case "verify-email":
        return (
          <div>
            <Input
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="mb-4"
            />
            <Button onClick={() => alert("Email Verified!")}>Submit</Button>
          </div>
        );
      case "capsule":
        return (
          <div>
            <p className="mb-4">
              This will open the Capsule React Modal for authentication.
            </p>
            <Button onClick={() => alert("Capsule Modal Opened")}>
              Open Modal
            </Button>
          </div>
        );
      case "rainbowkit":
        return (
          <div>
            <p className="mb-4">
              This will open the RainbowKit Wallet Connector.
            </p>
            <Button onClick={() => alert("RainbowKit Connector Opened")}>
              Open Wallet Connector
            </Button>
          </div>
        );
      case "web3onboard":
        return (
          <div>
            <p className="mb-4">
              This will open the Web3-onboard Wallet Connector.
            </p>
            <Button onClick={() => alert("Web3-onboard Connector Opened")}>
              Open Wallet Connector
            </Button>
          </div>
        );
      default:
        return (
          <div>
            <Button
              onClick={() => setSelectedOption("email")}
              className="mb-2 w-full"
            >
              Manual Email Authentication
            </Button>
            <Button
              onClick={() => setSelectedOption("capsule")}
              className="mb-2 w-full"
            >
              Capsule React Modal
            </Button>
            <Button
              onClick={() => setSelectedOption("rainbowkit")}
              className="mb-2 w-full"
            >
              RainbowKit Wallet Connector
            </Button>
            <Button
              onClick={() => setSelectedOption("web3onboard")}
              className="mb-2 w-full"
            >
              Web3-onboard Wallet Connector
            </Button>
          </div>
        );
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 bg-white">
      <CardHeader>
        <h2 className="text-xl font-bold">Authentication Options</h2>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
      {selectedOption !== "none" && (
        <CardFooter>
          <Button onClick={() => setSelectedOption("none")} className="w-full">
            Back
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
