import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../core";
import { motion } from "framer-motion";
import CapsuleReact from "../../assets/images/capsule-react.png";

export enum CapsuleAuthOptions {
  None = "none",
  Email = "email",
  CapsuleModal = "capsule-modal",
  Rainbowkit = "rainbowkit",
  Web3Onboard = "web3onboard",
  WalletPregeneration = "wallet-pregeneration",
  OAuth = "oauth",
}

interface AuthOption {
  option: CapsuleAuthOptions;
  label: string;
  description: string;
  imageUrl: string;
}

const authOptions: AuthOption[] = [
  {
    option: CapsuleAuthOptions.CapsuleModal,
    label: "Capsule React Modal",
    description: "Integrate authentication using Capsule's React Modal",
    imageUrl: CapsuleReact,
  },
  {
    option: CapsuleAuthOptions.Email,
    label: "Capsule Web SDK - Email",
    description: "Use Capsule Web SDK for email-based authentication",
    imageUrl: CapsuleReact,
  },
  {
    option: CapsuleAuthOptions.OAuth,
    label: "Capsule Web SDK - OAuth",
    description: "Implement OAuth authentication with Capsule Web SDK",
    imageUrl: CapsuleReact,
  },
  {
    option: CapsuleAuthOptions.Rainbowkit,
    label: "Capsule RainbowKit Connector",
    description: "Connect Capsule with RainbowKit for Web3 auth",
    imageUrl: CapsuleReact,
  },
  {
    option: CapsuleAuthOptions.Web3Onboard,
    label: "Capsule Web3-Onboard Connector",
    description: "Use Capsule with Web3-Onboard for blockchain integration",
    imageUrl: CapsuleReact,
  },
  {
    option: CapsuleAuthOptions.WalletPregeneration,
    label: "Capsule Wallet Pregeneration",
    description: "Pregenerate wallets using Capsule's functionality",
    imageUrl: CapsuleReact,
  },
];

interface AuthCardProps extends AuthOption {
  setSelectedOption: (option: CapsuleAuthOptions) => void;
}

const AuthCard: React.FC<AuthCardProps> = ({
  option,
  label,
  description,
  imageUrl,
  setSelectedOption,
}) => (
  console.log(imageUrl),
  (
    <motion.div
      className="h-full"
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      whileHover={{ scale: 1.03 }}
    >
      <Card className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-200">
        <CardHeader className="p-0">
          <img
            src={imageUrl}
            alt={`${label} illustration`}
            className="w-full h-48 object-cover"
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <CardTitle className="mb-2">{label}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4">
          <motion.div className="w-full" whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setSelectedOption(option)}
              className="w-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              variant="outline"
            >
              Select
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
);

interface AuthenticationOptionsProps {
  setSelectedOption: (option: CapsuleAuthOptions) => void;
}

export const AuthenticationOptions: React.FC<AuthenticationOptionsProps> = ({
  setSelectedOption,
}) => (
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-full"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
        },
      },
    }}
  >
    {authOptions.map((auth) => (
      <AuthCard
        key={auth.option}
        {...auth}
        setSelectedOption={setSelectedOption}
      />
    ))}
  </motion.div>
);
