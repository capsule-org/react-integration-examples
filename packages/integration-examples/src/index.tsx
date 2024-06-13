import React, { useState } from "react";
import CapsuleSunriseHero from "./assets/images/capsule-sunrise-hero.svg";
import { Toaster } from "./components/core/toast/toaster";
import { Card, CardContent, CardHeader } from "./components/core/card";
import { Button } from "./components/core/button";
import { EmailAuthenticationExample } from "./examples/EmailAuthenticationExample";
import { CapsuleModalAuthenticationExample } from "./examples/CapsuleModalAuthenticationExample";
import { RainbowkitAuthenticationExample } from "./examples/RainbowkitAuthenticationExample";
import { Web3OnboardAuthenticationExample } from "./examples/Web3OnboardAuthenticationExample";
import { WalletPregenerationExample } from "./examples/WalletPregenerationExample";

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
        return (
          <WalletPregenerationExample
            setSelectedAuthOption={setSelectedAuthOption}
          />
        );
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
          className="mb-2 w-full text-primary-foreground"
        >
          Capsule Web SDK Email
        </Button>
        <Button
          onClick={() => setSelectedOption("capsule-modal")}
          className="mb-2 w-full text-primary-foreground"
        >
          Capsule React Modal
        </Button>
        <Button
          onClick={() => setSelectedOption("rainbowkit")}
          className="mb-2 w-full text-primary-foreground"
        >
          RainbowKit Connector
        </Button>
        <Button
          onClick={() => setSelectedOption("web3onboard")}
          className="mb-2 w-full text-primary-foreground"
        >
          Web3-Onboard Connector
        </Button>
        <Button
          onClick={() => setSelectedOption("wallet-pregeneration")}
          className="mb-2 w-full text-primary-foreground"
        >
          Capsule Wallet Pregeneration
        </Button>
      </CardContent>
    );
  };

  return (
    <div className="relative flex flex-col h-screen">
      <nav className="fixed top-0 left-0 right-0 bg-background z-20">
        <h1 className="text-2xl text-center p-4 font-bold">
          {`Capsule Demo for ${framework}`}
        </h1>
      </nav>
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${CapsuleSunriseHero})` }}
      />
      <div className="relative flex flex-1 justify-center items-center z-10">
        <Card
          className="mx-auto shadow-lg
          overflow-auto	
          flex flex-col
    min-h-[400px] max-h-[500px]
    min-w-[320px] max-w-xs
    sm:min-w-xs sm:max-w-sm
    md:min-w-sm md:max-w-md
    lg:min-w-sm lg:max-w-md
  "
        >
          {selectedAuthOption === "none" && (
            <CardHeader>
              <h2 className="text-xl font-bold">Capsule SDK Auth Options</h2>
              <p className="text-sm text-muted-foreground">
                Select an option to start testing Capsule SDK Options
              </p>
            </CardHeader>
          )}
          {renderAuthOption()}
        </Card>
      </div>
      <Toaster />
    </div>
  );
};
