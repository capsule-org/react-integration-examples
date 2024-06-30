import { Button, CardContent } from "../core";

export enum CapsuleAuthOptions {
  None = "none",
  Email = "email",
  CapsuleModal = "capsule-modal",
  // LeapModal = "leap-modal",
  Rainbowkit = "rainbowkit",
  Web3Onboard = "web3onboard",
  WalletPregeneration = "wallet-pregeneration",
  OAuth = "oauth",
}

const AuthButton: React.FC<{
  option: CapsuleAuthOptions;
  label: string;
  setSelectedOption: (option: CapsuleAuthOptions) => void;
}> = ({ option, label, setSelectedOption }) => (
  <Button
    onClick={() => setSelectedOption(option)}
    className="mb-2 w-full text-primary-foreground"
    aria-label={label}
  >
    {label}
  </Button>
);

export const AuthenticationOptions: React.FC<{
  setSelectedOption: (option: CapsuleAuthOptions) => void;
}> = ({ setSelectedOption }) => (
  <CardContent>
    <AuthButton
      option={CapsuleAuthOptions.CapsuleModal}
      label="Capsule React Modal"
      setSelectedOption={setSelectedOption}
    />
    <AuthButton
      option={CapsuleAuthOptions.Email}
      label="Capsule Web SDK - Email"
      setSelectedOption={setSelectedOption}
    />
    <AuthButton
      option={CapsuleAuthOptions.OAuth}
      label="Capsule Web SDK - OAuth"
      setSelectedOption={setSelectedOption}
    />
    <AuthButton
      option={CapsuleAuthOptions.Rainbowkit}
      label="Capsule RainbowKit Connector"
      setSelectedOption={setSelectedOption}
    />
    <AuthButton
      option={CapsuleAuthOptions.Web3Onboard}
      label="Capsule Web3-Onboard Connector"
      setSelectedOption={setSelectedOption}
    />
    <AuthButton
      option={CapsuleAuthOptions.WalletPregeneration}
      label="Capsule Wallet Pregeneration"
      setSelectedOption={setSelectedOption}
    />
  </CardContent>
);
