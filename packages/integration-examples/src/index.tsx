import React, { useMemo, useState } from "react";
import {
  EmailAuthenticationExample,
  CapsuleModalAuthenticationExample,
  RainbowkitAuthenticationExample,
  Web3OnboardAuthenticationExample,
  WalletPregenerationExample,
  OAuthAuthenticationExample,
} from "./examples";
import {
  AuthenticationOptions,
  CapsuleAuthOptions,
  Toaster,
  Navbar,
} from "./components";

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
      [CapsuleAuthOptions.OAuth]: OAuthAuthenticationExample,
    };

    const SelectedComponent = options[selectedAuthOption];
    if (SelectedComponent) {
      return (
        <SelectedComponent setSelectedAuthOption={setSelectedAuthOption} />
      );
    }

    return null;
  }, [selectedAuthOption]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar framework={framework} />
      <main className="flex-grow pt-12">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {selectedAuthOption === CapsuleAuthOptions.None ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  Capsule SDK Authentication Options
                </h2>
                <p className="text-lg text-muted-foreground">
                  Select an option to explore different Capsule SDK integration
                  methods
                </p>
              </div>
              <AuthenticationOptions
                setSelectedOption={setSelectedAuthOption}
              />
            </>
          ) : (
            <div className="bg-card p-6 rounded-lg shadow-lg">
              {renderAuthOption}
            </div>
          )}
        </div>
      </main>
      <Toaster />
    </div>
  );
};
