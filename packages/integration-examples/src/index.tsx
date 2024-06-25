import React, { useMemo, useState } from "react";
import {
  EmailAuthenticationExample,
  CapsuleModalAuthenticationExample,
  RainbowkitAuthenticationExample,
  Web3OnboardAuthenticationExample,
  WalletPregenerationExample,
} from "./examples/";
import {
  AuthenticationOptions,
  CapsuleAuthOptions,
  Card,
  CardHeader,
  Toaster,
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
      [CapsuleAuthOptions.Rainbowkit]: RainbowkitAuthenticationExample,
      [CapsuleAuthOptions.Web3Onboard]: Web3OnboardAuthenticationExample,
      [CapsuleAuthOptions.WalletPregeneration]: WalletPregenerationExample,
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
      <nav className="fixed top-0 left-0 right-0 bg-background z-20 bg-gradient-radial from-black/50 to-black">
        <h1 className="text-2xl text-center p-4 font-bold">
          Capsule SDK Demo for {framework}
        </h1>
      </nav>
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${CapsuleSunriseHero})` }}
      />
      <div className="relative flex flex-1 justify-center items-center z-10">
        <Card className="mx-auto shadow-lg overflow-auto flex flex-col min-h-[400px] max-h-[500px] min-w-[320px] max-w-xs sm:min-w-xs sm:max-w-sm md:min-w-sm md:max-w-md lg:min-w-sm lg:max-w-md">
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
