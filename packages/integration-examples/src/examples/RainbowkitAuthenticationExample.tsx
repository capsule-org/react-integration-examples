"use client";
import { CapsuleAuthOptions } from "..";
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
import {
  CardContent,
  CardFooter,
  CardHeader,
  Button,
} from "../components/core";

import "@usecapsule/rainbowkit/styles.css";

// This component demonstrates how to integrate Capsule with the RainbowKit Wallet Connector.
// When using Capsule with RainbowKit, there are two options for displaying Capsule:
// 1. Integrated Capsule Connector - Renders the Capsule Modal directly in the RainbowKit Modal.
// 2. Capsule Modal - Opens the Capsule Modal in a separate modal.
// For additional details on the Capsule SDK, refer to: https://docs.usecapsule.com/

type RainbowkitAuthenticationExampleProps = {
  setSelectedAuthOption: (option: CapsuleAuthOptions) => void;
};

// 1. Obtain your API key from https://usecapsule.com/beta
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

// 2. Set the environment to development or production based on your use case
const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

// Capsule Modal Configuration
// 3. Setup the capsule options. For additional details on the customization options, refer to: https://docs.usecapsule.com/integration-guide/customize-capsule
const capsuleWalletOpts: GetCapsuleOpts = {
  capsule: {
    apiKey: CAPSULE_API_KEY,
    environment: CAPSULE_ENVIRONMENT,
  },
  appName: "Capsule RainbowKit Example", // Your app name
  logo: Logo, // Your logo
  oAuthMethods: [
    // The OAuth methods you want to enable
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

// 4. Create the connector for Capsule Modal.
const capsuleWallet = getCapsuleWallet(capsuleWalletOpts);

// 5. Add Capsule to the RainbowKit Wallet Connector.
const connectors = connectorsForWallets(
  [
    //...other connectors
    {
      groupName: "Custom",
      wallets: [capsuleWallet],
    },
  ],
  {
    appName: "Capsule RainbowKit Example",
    appDescription:
      "This is an example of how to integrate Capsule with the RainbowKit Wallet Connector.",
    projectId: "capsule-rainbowkit-example",
  }
);

// 6. Configure Wagmi provider for the RainbowKit Wallet Connector
const wagmiConfig = createConfig({
  connectors,
  chains: [sepolia],
  multiInjectedProviderDiscovery: false,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

// NOTE: SKIP THIS SECTION IF YOU ARE USING THE CAPSULE MODAL AND PROCEED TO STEP 8
// Integrated Capsule Configuration

// 3. Initialize a Capsule instance.
const capsuleClient = new CapsuleWeb(CAPSULE_ENVIRONMENT, CAPSULE_API_KEY);

// 4. Setup the capsule options for the integrated Capsule connector. For additional details on the customization options, refer to: https://docs.usecapsule.com/integration-guide/customize-capsule
const capsuleWalletIntegratedOpts: GetCapsuleIntegratedOpts = {
  capsule: capsuleClient,
  nameOverride: "Sign in with Capsule",
  iconOverride: Logo,
  iconBackgroundOverride: "#000000",
};

// 5. Create the connector for the integrated Capsule.
const capsuleWalletIntegrated = getCapsuleWalletIntegrated(
  capsuleWalletIntegratedOpts
);

// 6. Add the integrated Capsule to the RainbowKit Wallet Connector.
const connectorsIntegrated = connectorsForWallets(
  [
    //...other connectors
    {
      groupName: "Custom",
      wallets: [capsuleWalletIntegrated],
    },
  ],
  {
    appName: "Capsule RainbowKit Example",
    appDescription:
      "This is an example of how to integrate Capsule with the RainbowKit Wallet Connector.",
    projectId: "capsule-rainbowkit-example",
  }
);

// 7. Configure Wagmi provider for the integrated Capsule connector
const wagmiConfigIntegrated = createConfig({
  connectors: connectorsIntegrated,
  chains: [sepolia],
  multiInjectedProviderDiscovery: false,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

// 8. Lastly, initiate a QueryClient
const queryClient = new QueryClient();

export const RainbowkitAuthenticationExample: React.FC<
  RainbowkitAuthenticationExampleProps
> = ({ setSelectedAuthOption }) => {
  const handleBack = () => {
    setSelectedAuthOption("none");
  };

  return (
    <>
      <CardHeader>
        <h2 className="text-xl font-bold">Rainbowkit with Capsule Connector</h2>
        <p>
          Select between the Capsule Modal or the integrated Capsule connector.
          Integrated Capsule will render the Capsule Modal directly in the
          RainbowKit Modal.
        </p>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col items-start space-y-4">
        <RainbowkitWithCapsuleModal />
        <RainbowkitWithCapsuleIntegrated />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant={"outline"} onClick={handleBack}>
          Back
        </Button>
      </CardFooter>
    </>
  );
};

// Component for using Capsule Modal with RainbowKit
const RainbowkitWithCapsuleModal = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConnectButton label="With Capsule Modal" />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

// Component for using Integrated Capsule with RainbowKit
const RainbowkitWithCapsuleIntegrated = () => {
  return (
    <WagmiProvider config={wagmiConfigIntegrated}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          capsule={capsuleClient}
          capsuleIntegratedProps={{
            appName: "Capsule RainbowKit Example", // Your app name
            // logo: Logo, // Your logo
            oAuthMethods: [
              // The OAuth methods you want to enable
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
          <ConnectButton label="With Capsule Integrated" />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
