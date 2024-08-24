# Vite (React) Example App for Capsule Integration

Welcome to the Vite (React) example app for Capsule integration! This app is part of the Capsule examples monorepo, designed to demonstrate how to integrate Capsule across various web development frameworks and setups.

## Monorepo Structure

Our examples monorepo is organized into two primary folders:

1. `examples/`: Contains framework-specific subfolders (e.g., nextjs-app, react-app, vite-app, pwa-app). Each subfolder includes the necessary configurations for compilation and bundling specific to that framework.

2. `packages/shared-examples/`: This shared folder contains components and examples used across all React-based frameworks. It houses individual example files demonstrating end-to-end flows for different Capsule integration scenarios.

## Shared Components

All our React-based examples share the same UI components built with Shadcn UI and TailwindCSS. These components can be found in the `packages/shared-examples/components` directory.

## Integration Examples

The [`packages/shared-examples/examples`](../shared-examples/examples) folder contains dedicated files for each Capsule integration flow, built as end-to-end examples. Here's a brief overview of each example:

- [**CapsuleLeapModalAuthenticationExample**](../shared-examples/examples/CapsuleLeapModalAuthenticationExample.tsx): Demonstrates authentication using [Leap Wallets](https://www.leapwallet.io/) custom [Leap Capsule Social Login](https://docs.cosmology.zone/cosmos-kit/integrating-wallets/leap-capsule-social-login) package.
- [**CapsuleModalAuthenticationExample**](../shared-examples/examples/CapsuleModalAuthenticationExample.tsx): Shows how to implement authentication using the standard Capsule modal. (**Recommended**)
- [**CapsuleSigningExamples**](../shared-examples/examples/CapsuleSigningExamples.ts): Provides example methods for signing transactions or messages with Capsule using Ethers and Viem.
- [**CapsuleSolanaAuthenticationExample**](../shared-examples/examples/CapsuleSolanaAuthenticationExample.tsx): Illustrates Solana-specific authentication flows with Capsule. Uses the Capsule Modal but with Solana enabled and custom Solana signing with solana-web3.js.
- [**EmailAuthenticationExample**](../shared-examples/examples/EmailAuthenticationExample.tsx): Demonstrates email-based authentication using Capsule. This is a manual approach that doesn't use the Capsule Modal and allows more white labeling.
- [**OAuthAuthenticationExample**](../shared-examples/examples/OAuthAuthenticationExample.tsx): Shows how to implement OAuth authentication with Capsule. Similar to the Email Authentication Example but with OAuth Social Logins. Can be used in conjunction with email to create custom white labeled UIs.
- [**RainbowkitAuthenticationExample**](../shared-examples/examples/RainbowkitAuthenticationExample.tsx): Provides an example of integrating Capsule with Rainbowkit, a popular wallet connector.
- [**WalletPregenerationExample**](../shared-examples/examples/WalletPregenerationExample.tsx): Demonstrates Capsule's wallet pregeneration feature for pregenerating app-specific wallets with any unique identifier.
- [**Web3OnboardAuthenticationExample**](../shared-examples/examples/Web3OnboardAuthenticationExample.tsx): Shows how to use Capsule with Web3Onboard, a popular wallet connector much like Rainbowkit.

More examples coming soon!

## Getting Started

This monorepo uses Lerna to manage multiple packages and applications. You can run each app independently or all apps simultaneously. Each app will run on its own port, allowing you to test multiple examples at once.

To get started:

1. Clone the monorepo
2. Navigate to the root directory
3. Install dependencies:
   ```
   yarn install
   ```

### Running the Apps

You can run the apps using the following commands from the root directory:

- To run this Vite example:

  ```
  yarn start:vite-app
  ```

  Replace `vite` with one of: `react`, `vite`, `nextjs`, or `pwa`.

- To run all apps simultaneously:
  ```
  yarn start:all
  ```

### Clean Install

If you need to perform a clean installation:

```
yarn clean-install
```

This will remove all node_modules, lock files, and build artifacts before reinstalling dependencies.

For more detailed information about Capsule integration, please refer to our [official documentation](https://docs.usecapsule.com).
