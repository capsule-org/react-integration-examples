import Onboard from "@web3-onboard/core";
import capsuleModule, {
  Environment,
  OAuthMethod,
  Theme,
} from "@web3-onboard/capsule";

// Initialize the Capsule module with CapsuleInitOptions
const capsule = capsuleModule({
  environment: Environment.BETA,
  apiKey: "YOUR_API_KEY",
  modalProps: {
    theme: Theme.dark,
    branding: {
      colors: {
        primaryButton: {
          surface: {
            default: "#ff6700",
          },
        },
      },
    },
    oAuthMethods: [
      OAuthMethod.GOOGLE,
      OAuthMethod.TWITTER,
      OAuthMethod.APPLE,
      OAuthMethod.DISCORD,
      OAuthMethod.FACEBOOK,
    ],
    logo: "../assets/images/capsule-logo.png",
  },
});

export const web3Onboard = Onboard({
  wallets: [capsule],
  chains: [
    {
      id: 11155111,
      token: "ETH",
      label: "Sepolia",
      rpcUrl: "https://rpc.sepolia.org/",
    },
  ],
});
