import React, { useState } from "react";
import CapsuleSunriseHero from "./assets/images/capsule-sunrise-hero.svg";
import { Toaster } from "./components/core/toast/toaster";
import { Card, CardContent, CardHeader } from "./components/core/card";
import { Button } from "./components/core/button";
import { EmailAuthenticationExample } from "./components/EmailAuthenticationExample";
import { CapsuleModalAuthenticationExample } from "./components/CapsuleModalAuthenticationExample";
import { RainbowkitAuthenticationExample } from "./components/RainbowkitAuthenticationExample";
import { Web3OnboardAuthenticationExample } from "./components/Web3OnboardAuthenticationExample";

type CapsuleDemoProps = {
  framework: string;
};

export type CapsuleAuthOptions =
  | "none"
  | "email"
  | "verify-email"
  | "capsule-modal"
  | "rainbowkit"
  | "web3onboard"
  | "wallet-pregeneration";

export const CapsuleDemo: React.FC<CapsuleDemoProps> = ({ framework }) => {
  const [selectedAuthOption, setSelectedAuthOption] =
    useState<CapsuleAuthOptions>("none");

  const renderAuthOption = () => {
    switch (selectedAuthOption) {
      case "email":
        return (
          <EmailAuthenticationExample
            setSelectedAuthOption={setSelectedAuthOption}
          />
        );
      case "capsule-modal":
        return (
          <CapsuleModalAuthenticationExample
            setSelectedAuthOption={setSelectedAuthOption}
          />
        );
      case "rainbowkit":
        return (
          <RainbowkitAuthenticationExample
            setSelectedAuthOption={setSelectedAuthOption}
          />
        );

      case "web3onboard":
        return (
          <Web3OnboardAuthenticationExample
            setSelectedAuthOption={setSelectedAuthOption}
          />
        );
      case "wallet-pregeneration":
        return <></>;
      default:
        return AuthenticationOptions(setSelectedAuthOption);
    }
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
        <Button
          onClick={() => setSelectedOption("wallet-pregeneration")}
          className="mb-2 w-full"
        >
          Wallet Pregeneration
        </Button>
      </CardContent>
    );
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${CapsuleSunriseHero})` }}
      />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl text-center mb-4 font-bold">
          {`Capsule Demo for ${framework}`}
        </h1>
        <Card className="max-w-md mx-auto mt-10 bg-white min-w-fit">
          {selectedAuthOption == "none" && (
            <CardHeader>
              <h2 className="text-xl font-bold">Capsule SDK Auth Options</h2>
            </CardHeader>
          )}
          {renderAuthOption()}
        </Card>
      </div>
      <Toaster />
    </div>
  );
};
