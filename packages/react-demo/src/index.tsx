import React, { useState } from "react";
import "./style.css";
import {
  AuthOption,
  AuthenticationCard,
} from "./components/AuthenticationCard";

type CapsuleDemoProps = {
  framework: string;
};

export const CapsuleDemo: React.FC<CapsuleDemoProps> = ({ framework }) => {
  const [selectedOption, setSelectedOption] = useState<AuthOption>("none");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <div className="relative flex justify-center items-center h-screen">
      <div className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-[url('./assets/images/capsule-sunrise-hero.svg')]" />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-2xl text-center mb-4">
          {`Capsule Demo for ${framework}`}
        </h1>
        <AuthenticationCard
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          email={email}
          setEmail={setEmail}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
        />
      </div>
    </div>
  );
};
