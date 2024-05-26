import React from "react";
import "./style.css";

type CapsuleDemoProps = {
  framework: string;
};

export const CapsuleDemo: React.FC<CapsuleDemoProps> = ({ framework }) => {
  return (
    <div className="relative flex justify-center items-center h-screen">
      <div className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-[url('./assets/images/capsule-sunrise-hero.svg')] bg" />
      <div className="relative bg-white p-8 rounded-lg shadow-lg z-10">
        <h1 className="text-2xl text-center">
          {`Capsule Demo for ${framework}`}
        </h1>
      </div>
    </div>
  );
};
