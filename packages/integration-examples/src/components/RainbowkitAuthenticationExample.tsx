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
import { CardContent, CardFooter, CardHeader } from "./core/card";
import { Button } from "./core/button";

import "@usecapsule/rainbowkit/styles.css";

// This component demonstrates how to integrate Capsule with the RainbowKit Wallet Connector. When using Capsule with rainbowkit there are 2 options for displaying Capsule either the integrated or the Capsule Modal. The integrated Capsule connector will render the Capsule Modal directly in the RainbowKit Modal. The Capsule Modal option will open the Capsule Modal in a seperate modal. For additional details on the Capsule SDK, refer to: https://docs.usecapsule.com/

type RainbowkitAuthenticationExampleProps = {
  setSelectedAuthOption: (option: CapsuleAuthOptions) => void;
};

// 1. Get your API key from https://usecapsule.com/beta
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

// 2. Set the environment to development or production based on your use case
const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

// RainbowKit with Capsule Modal. See  below for the integrated Capsule connector setup.

//3. Setup the capsule options. For additional details on the customization options refer to: https://docs.usecapsule.com/integration-guide/customize-capsule
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

//4. Create the connector for Capsule.
const capsuleWallet = getCapsuleWallet(capsuleWalletOpts);

//5. Add Capsule to the RainbowKit Wallet Connector.
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

//6. Configure Wagmi provider for the RainbowKit Wallet Connector
const wagmiConfig = createConfig({
  connectors,
  chains: [sepolia],
  multiInjectedProviderDiscovery: false,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

// Skip this section if you are using the Capsule Modal option.

//3. Initialize a Capsule instance.
const capsuleClient = new CapsuleWeb(CAPSULE_ENVIRONMENT, CAPSULE_API_KEY);

//3.1 See the Rainbowkit Provider component below for the capsuleIntegratedProps setup.

//4. Setup the capsule options. For additional details on the customization options refer to: https://docs.usecapsule.com/integration-guide/customize-capsule
const capsuleWalletIntegratedOpts: GetCapsuleIntegratedOpts = {
  capsule: capsuleClient,
  nameOverride: "Sign in with Capsule",
  iconOverride: Logo,
  iconBackgroundOverride: "#000000",
};

//5. Create the connector for Capsule.
const capsuleWalletIntegrated = getCapsuleWalletIntegrated(
  capsuleWalletIntegratedOpts
);

//6. Add Capsule to the RainbowKit Wallet Connector.
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

//7. Configure Wagmi provider for the RainbowKit Wallet Connector
const wagmiConfigIntegrated = createConfig({
  connectors: connectorsIntegrated,
  chains: [sepolia],
  multiInjectedProviderDiscovery: false,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

// Lastly, initiate a QueryClient
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
        <h2 className="text-xl font-bold">
          Rainbowkit with Capsule Integration
        </h2>
        <p className="">
          Select between the Capsule Modal or the integrated Capsule connector.
          Integrated Capsule will render the Capsule Modal directly in the
          RainbowKit Modal.
        </p>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button variant={"outline"} onClick={handleBack}>
          Back
        </Button>
        <RainbowkitWithCapsuleModal />
        <RainbowkitWithCapsuleIntegrated />
      </CardFooter>
    </>
  );
};

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

const RainbowkitWithCapsuleIntegrated = () => {
  return (
    <WagmiProvider config={wagmiConfigIntegrated}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          capsule={capsuleClient}
          capsuleIntegratedProps={{
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
          }}
        >
          <ConnectButton label="With Capsule Integrated" />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
