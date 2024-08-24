import { Environment } from "@usecapsule/react-sdk";
import {
  getCapsuleWallet,
  getCapsuleWalletIntegrated,
  GetCapsuleOpts,
  GetCapsuleIntegratedOpts,
  OAuthMethod,
  CapsuleWeb,
} from "@usecapsule/rainbowkit-wallet";
import Logo from "../assets/images/capsule-logo.svg";
import {
  ConnectButton,
  RainbowKitProvider,
  connectorsForWallets,
} from "@usecapsule/rainbowkit";
import { WagmiProvider, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { createClient, http } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@usecapsule/rainbowkit/styles.css";
import {
  Button,
  CapsuleAuthOptions,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components";

// Capsule SDK integration example with RainbowKit Wallet Connector.
// This tutorial demonstrates two methods of integrating Capsule with RainbowKit:
// 1. Capsule Modal - Opens the Capsule Modal in a separate window.
// 2. Integrated Capsule Connector - Renders the Capsule Modal directly in the RainbowKit Modal.
// For additional details on the Capsule SDK, refer to: https://docs.usecapsule.com/

type RainbowkitAuthenticationExampleProps = {
  setSelectedAuthOption: (option: CapsuleAuthOptions) => void;
};

// Step 1: Set up your Capsule API key
// Obtain your API key from https://usecapsule.com/beta
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

// Step 2: Set the Capsule environment
// Choose between Environment.DEVELOPMENT or Environment.PRODUCTION based on your use case
const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

// Step 3: Configure Capsule Modal
// Set up options for the Capsule Modal integration
// For more details on customization options, visit:
// https://docs.usecapsule.com/integration-guide/customize-capsule
const capsuleWalletOpts: GetCapsuleOpts = {
  capsule: {
    apiKey: CAPSULE_API_KEY,
    environment: CAPSULE_ENVIRONMENT,
  },
  appName: "Capsule RainbowKit Example",
  logo: Logo,
  oAuthMethods: [
    OAuthMethod.GOOGLE,
    OAuthMethod.TWITTER,
    OAuthMethod.FACEBOOK,
    OAuthMethod.DISCORD,
    OAuthMethod.APPLE,
  ],
  theme: {
    backgroundColor: "#ffffff",
    foregroundColor: "#ff6700",
  },
};

// Step 4: Create the connector for Capsule Modal
const capsuleWallet = getCapsuleWallet(capsuleWalletOpts);

// Step 5: Add Capsule Modal to the RainbowKit Wallet Connector
const connectors = connectorsForWallets(
  [
    {
      groupName: "Capsule",
      wallets: [capsuleWallet],
    },
  ],
  {
    appName: "Capsule RainbowKit Example",
    appDescription:
      "Example of Capsule integration with RainbowKit Wallet Connector",
    projectId: "capsule-rainbowkit-example",
  }
);

// Step 6: Configure Wagmi provider for the Capsule Modal connector
const wagmiConfig = createConfig({
  connectors,
  chains: [sepolia],
  multiInjectedProviderDiscovery: false,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

// Step 7: Configure Integrated Capsule (Alternative Method)
// Initialize a Capsule instance
const capsuleClient = new CapsuleWeb(CAPSULE_ENVIRONMENT, CAPSULE_API_KEY);

// Step 8: Set up options for the integrated Capsule connector
const capsuleWalletIntegratedOpts: GetCapsuleIntegratedOpts = {
  capsule: capsuleClient,
  nameOverride: "Sign in with Capsule",
  iconOverride: Logo,
  iconBackgroundOverride: "#000000",
};

// Step 9: Create the connector for the integrated Capsule
const capsuleWalletIntegrated = getCapsuleWalletIntegrated(
  capsuleWalletIntegratedOpts
);

// Step 10: Add the integrated Capsule to the RainbowKit Wallet Connector
const connectorsIntegrated = connectorsForWallets(
  [
    {
      groupName: "Integrated Capsule",
      wallets: [capsuleWalletIntegrated],
    },
  ],
  {
    appName: "Capsule RainbowKit Integrated Example",
    appDescription:
      "Example of Integrated Capsule with RainbowKit Wallet Connector",
    projectId: "capsule-rainbowkit-integrated-example",
  }
);

// Step 11: Configure Wagmi provider for the integrated Capsule connector
const wagmiConfigIntegrated = createConfig({
  connectors: connectorsIntegrated,
  chains: [sepolia],
  multiInjectedProviderDiscovery: false,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

// Step 12: Initialize QueryClient for both implementations
const queryClient = new QueryClient();

export const RainbowkitAuthenticationExample: React.FC<
  RainbowkitAuthenticationExampleProps
> = ({ setSelectedAuthOption }) => {
  const handleBack = () => {
    setSelectedAuthOption(CapsuleAuthOptions.None);
  };

  return (
    <>
      <CardHeader>
        <h2 className="text-xl font-bold">
          Capsule Integration with RainbowKit
        </h2>
        <p className="text-sm text-muted-foreground">
          This example demonstrates two methods of integrating Capsule with
          RainbowKit: the Capsule Modal and the Integrated Capsule connector.
          The Integrated Capsule renders directly within the RainbowKit Modal
          for a seamless experience.
        </p>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col items-start space-y-4">
        <RainbowkitWithCapsuleModal />
        <RainbowkitWithCapsuleIntegrated />
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 p-4">
        <Button
          variant="outline"
          onClick={handleBack}
          className="w-full sm:w-auto text-sm"
        >
          Back to Options
        </Button>
      </CardFooter>
    </>
  );
};

// Component demonstrating Capsule Modal with RainbowKit
const RainbowkitWithCapsuleModal = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConnectButton label="Connect with Capsule Modal" />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

// Component demonstrating Integrated Capsule with RainbowKit
const RainbowkitWithCapsuleIntegrated = () => {
  return (
    <WagmiProvider config={wagmiConfigIntegrated}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          capsule={capsuleClient as any}
          capsuleIntegratedProps={{
            appName: "Capsule RainbowKit Integrated Example",
            oAuthMethods: [
              OAuthMethod.GOOGLE,
              OAuthMethod.TWITTER,
              OAuthMethod.FACEBOOK,
              OAuthMethod.DISCORD,
              OAuthMethod.APPLE,
            ],
            theme: {
              backgroundColor: "#0c0a09",
              foregroundColor: "#ff6700",
            },
          }}
        >
          <ConnectButton label="Connect with Integrated Capsule" />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
