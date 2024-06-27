import React, { useMemo, useState } from "react";
import {
  EmailAuthenticationExample,
  CapsuleModalAuthenticationExample,
  RainbowkitAuthenticationExample,
  Web3OnboardAuthenticationExample,
  WalletPregenerationExample,
  OAuthAuthenticationExample,
  CapsuleLeapModalAuthenticationExample,
} from "./examples";
import {
  AuthenticationOptions,
  CapsuleAuthOptions,
  Card,
  CardHeader,
  Toaster,
  Navbar,
} from "./components";
import CapsuleSunriseHero from "./assets/images/capsule-sunrise-hero.svg";

type CapsuleDemoProps = {
  framework: string;
};

type AuthComponentProps = {
  setSelectedAuthOption: (option: CapsuleAuthOptions) => void;
};

export const CapsuleDemo: React.FC<CapsuleDemoProps> = ({ framework }) => {
  const [selectedAuthOption, setSelectedAuthOption] =
    useState<CapsuleAuthOptions>(CapsuleAuthOptions.None);

  const renderAuthOption = useMemo(() => {
    const options: Record<
      CapsuleAuthOptions,
      React.FC<AuthComponentProps> | null
    > = {
      [CapsuleAuthOptions.None]: null,
      [CapsuleAuthOptions.Email]: EmailAuthenticationExample,
      [CapsuleAuthOptions.CapsuleModal]: CapsuleModalAuthenticationExample,
      [CapsuleAuthOptions.LeapModal]: CapsuleLeapModalAuthenticationExample,
      [CapsuleAuthOptions.Rainbowkit]: RainbowkitAuthenticationExample,
      [CapsuleAuthOptions.Web3Onboard]: Web3OnboardAuthenticationExample,
      [CapsuleAuthOptions.WalletPregeneration]: WalletPregenerationExample,
      [CapsuleAuthOptions.OAuth]: OAuthAuthenticationExample,
    };

    const SelectedComponent = options[selectedAuthOption];

    if (SelectedComponent) {
      return (
        <SelectedComponent setSelectedAuthOption={setSelectedAuthOption} />
      );
    }

    return <AuthenticationOptions setSelectedOption={setSelectedAuthOption} />;
  }, [selectedAuthOption]);

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar framework={framework} />
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${CapsuleSunriseHero})` }}
      />
      <div className="relative flex flex-1 justify-center items-center z-10">
        <Card className="  mx-auto shadow-lg flex flex-col p-4 w-[calc(100%-1rem)] max-w-md min-h-[400px] max-h-[calc(100vh-24rem)] sm:w-[calc(100%-4rem)] sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          {selectedAuthOption === CapsuleAuthOptions.None && (
            <CardHeader>
              <h2 className="text-xl font-bold">
                Capsule SDK Authentication Options
              </h2>
              <p className="text-sm text-muted-foreground">
                Select an option to explore different Capsule SDK integration
                methods
              </p>
            </CardHeader>
          )}
          {renderAuthOption}
        </Card>
      </div>
      <Toaster />
    </div>
  );
};
