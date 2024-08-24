import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../core";

export enum CapsuleAuthOptions {
  None = "none",
  Email = "email",
  CapsuleModal = "capsule-modal",
  Rainbowkit = "rainbowkit",
  Web3Onboard = "web3onboard",
  WalletPregeneration = "wallet-pregeneration",
  OAuth = "oauth",
}

const authOptions = [
  {
    option: CapsuleAuthOptions.CapsuleModal,
    label: "Capsule React Modal",
    description: "Integrate authentication using Capsule's React Modal",
  },
  {
    option: CapsuleAuthOptions.Email,
    label: "Capsule Web SDK - Email",
    description: "Use Capsule Web SDK for email-based authentication",
  },
  {
    option: CapsuleAuthOptions.OAuth,
    label: "Capsule Web SDK - OAuth",
    description: "Implement OAuth authentication with Capsule Web SDK",
  },
  {
    option: CapsuleAuthOptions.Rainbowkit,
    label: "Capsule RainbowKit Connector",
    description: "Connect Capsule with RainbowKit for Web3 auth",
  },
  {
    option: CapsuleAuthOptions.Web3Onboard,
    label: "Capsule Web3-Onboard Connector",
    description: "Use Capsule with Web3-Onboard for blockchain integration",
  },
  {
    option: CapsuleAuthOptions.WalletPregeneration,
    label: "Capsule Wallet Pregeneration",
    description: "Pregenerate wallets using Capsule's functionality",
  },
];

const AuthCard: React.FC<{
  option: CapsuleAuthOptions;
  label: string;
  description: string;
  setSelectedOption: (option: CapsuleAuthOptions) => void;
}> = ({ option, label, description, setSelectedOption }) => (
  <Card className="overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
    <CardHeader>
      <CardTitle>{label}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button onClick={() => setSelectedOption(option)} className="w-full">
        Select
      </Button>
    </CardFooter>
  </Card>
);

export const AuthenticationOptions: React.FC<{
  setSelectedOption: (option: CapsuleAuthOptions) => void;
}> = ({ setSelectedOption }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {authOptions.map((auth) => (
      <AuthCard
        key={auth.option}
        option={auth.option}
        label={auth.label}
        description={auth.description}
        setSelectedOption={setSelectedOption}
      />
    ))}
  </div>
);
