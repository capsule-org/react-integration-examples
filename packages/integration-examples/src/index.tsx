import React, { useEffect, useState } from "react";
import {
  CapsuleAuthOptions,
  AuthenticationCard,
} from "./components/AuthenticationCard";
import { capsuleClient } from "./clients/capsuleClient";
import { SigningCard } from "./components/SigningCard";
import "./style.css";

type CapsuleDemoProps = {
  framework: string;
};

export const CapsuleDemo: React.FC<CapsuleDemoProps> = ({ framework }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [selectedAuthOption, setSelectedAuthOption] =
    useState<CapsuleAuthOptions>("none");
  const [userEmail, setUserEmail] = useState("");
  const [userWalletAddress, setUserWalletAddress] = useState("");
  const [userNeedsWallet, setUserNeedsWallet] = useState(false);
  const [userRecoverySecret, setUserRecoverySecret] = useState("");

  const checkIfLoggedIn = async () => {
    try {
      const loggedIn = await capsuleClient.isFullyLoggedIn();
      if (loggedIn) {
        setUserWalletAddress(
          Object.values(capsuleClient.getWallets())[0].address || ""
        );
      }
      setIsUserLoggedIn(loggedIn);
    } catch (error) {
      throw new Error("Failed to check if user is logged in");
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      setUserWalletAddress(
        Object.values(capsuleClient.getWallets())[0].address || ""
      );
    } else {
      setUserEmail("");
      selectedAuthOption !== "none" && setSelectedAuthOption("none");
      setUserWalletAddress("");
      setUserNeedsWallet(false);
    }
  }, [isUserLoggedIn]);

  return (
    <div className="relative flex justify-center items-center h-screen">
      <div className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-[url('./assets/images/capsule-sunrise-hero.svg')]" />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl text-center mb-4 font-bold">
          {`Capsule Demo for ${framework}`}
        </h1>
        {isUserLoggedIn ? (
          <SigningCard setIsUserLoggedIn={setIsUserLoggedIn} />
        ) : (
          <AuthenticationCard
            selectedOption={selectedAuthOption}
            setSelectedOption={setSelectedAuthOption}
            email={userEmail}
            setEmail={setUserEmail}
            setIsUserLoggedIn={setIsUserLoggedIn}
            setUserNeedsWallet={setUserNeedsWallet}
            setUserRecoverySecret={setUserRecoverySecret}
          />
        )}
      </div>
    </div>
  );
};
