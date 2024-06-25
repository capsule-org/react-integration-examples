import { Button, CardContent } from "../core";

export enum CapsuleAuthOptions {
  None = "none",
  Email = "email",
  CapsuleModal = "capsule-modal",
  Rainbowkit = "rainbowkit",
  Web3Onboard = "web3onboard",
  WalletPregeneration = "wallet-pregeneration",
}

export const AuthenticationOptions: React.FC<{
  setSelectedOption: (option: CapsuleAuthOptions) => void;
}> = ({ setSelectedOption }) => (
  <CardContent>
    <Button
      onClick={() => setSelectedOption(CapsuleAuthOptions.Email)}
      className="mb-2 w-full text-primary-foreground"
      aria-label="Capsule Web SDK Email"
    >
      Capsule Web SDK Email
    </Button>
    <Button
      onClick={() => setSelectedOption(CapsuleAuthOptions.CapsuleModal)}
      className="mb-2 w-full text-primary-foreground"
      aria-label="Capsule React Modal"
    >
      Capsule React Modal
    </Button>
    <Button
      onClick={() => setSelectedOption(CapsuleAuthOptions.Rainbowkit)}
      className="mb-2 w-full text-primary-foreground"
      aria-label="RainbowKit Connector"
    >
      RainbowKit Connector
    </Button>
    <Button
      onClick={() => setSelectedOption(CapsuleAuthOptions.Web3Onboard)}
      className="mb-2 w-full text-primary-foreground"
      aria-label="Web3-Onboard Connector"
    >
      Web3-Onboard Connector
    </Button>
    <Button
      onClick={() => setSelectedOption(CapsuleAuthOptions.WalletPregeneration)}
      className="mb-2 w-full text-primary-foreground"
      aria-label="Capsule Wallet Pregeneration"
    >
      Capsule Wallet Pregeneration
    </Button>
  </CardContent>
);
