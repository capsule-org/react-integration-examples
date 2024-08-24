# Capsule React Integration Examples

Welcome to the Capsule React Integration Examples monorepo! This repository demonstrates how to integrate the Capsule SDK with various React-based frameworks, providing developers with practical, end-to-end examples for different authentication and wallet integration scenarios.

## What is this Monorepo?

This monorepo serves as a comprehensive resource for developers looking to integrate Capsule into their React-based applications. It showcases:

1. Framework-specific implementations (React, Next.js, Vite, PWA)
2. Shared components and examples that work across all React-based frameworks
3. Various authentication flows and wallet integration techniques

By structuring our examples this way, we provide a clear path for developers to understand both the framework-specific configurations and the shared logic that can be applied across different React environments.

## Repository Structure

The monorepo is organized into two main directories:

### [`examples/`](./examples/)

Contains individual example applications, each configured for a specific React framework:

- [`react-app`](./examples/react-app/): Example using Create React App
- [`vite-app`](./examples/vite-app/): Example using Vite
- [`nextjs-app`](./examples/nextjs-app/): Example using Next.js with App Router & SSR
- [`pwa-app`](./examples/pwa-app/): Example Progressive Web App with React

Each of these applications demonstrates how to set up and use Capsule within its specific framework context.

### [`packages/`](./packages/)

Contains shared packages and components used by the example applications:

- [`integration-examples/`](./packages/shared-examples/): Houses shared React components and example implementations
  - [`src/examples/`](./packages/shared-examples/src/examples/): Contains end-to-end examples for various Capsule integration scenarios

## Integration Examples

The [`packages/shared-examples/src/examples`](./packages/shared-examples/src/examples/) folder contains dedicated files for each Capsule integration flow. Here's a brief overview:

- [**CapsuleModalAuthenticationExample**](./packages/shared-examples/src/examples/CapsuleModalAuthenticationExample.tsx): Shows how to implement authentication using the standard Capsule modal. (**Recommended**)
- [**CapsuleSigningExamples**](./packages/shared-examples/src/examples/CapsuleSigningExamples.ts): Provides example methods for signing transactions or messages with Capsule using Ethers and Viem.
- [**EmailAuthenticationExample**](./packages/shared-examples/src/examples/EmailAuthenticationExample.tsx): Demonstrates email-based authentication using Capsule, allowing for more white-labeling.
- [**OAuthAuthenticationExample**](./packages/shared-examples/src/examples/OAuthAuthenticationExample.tsx): Shows OAuth authentication implementation with Capsule.
- [**RainbowkitAuthenticationExample**](./packages/shared-examples/src/examples/RainbowkitAuthenticationExample.tsx): Demonstrates integrating Capsule with Rainbowkit.
- [**WalletPregenerationExample**](./packages/shared-examples/src/examples/WalletPregenerationExample.tsx): Showcases Capsule's wallet pregeneration feature.
- [**Web3OnboardAuthenticationExample**](./packages/shared-examples/src/examples/Web3OnboardAuthenticationExample.tsx): Illustrates using Capsule with Web3Onboard.
- [**CapsuleLeapModalAuthenticationExample**](./packages/shared-examples/src/examples/CapsuleLeapModalAuthenticationExample.tsx): Demonstrates authentication using Leap Wallets.
- [**CapsuleSolanaAuthenticationExample**](./packages/shared-examples/src/examples/CapsuleSolanaAuthenticationExample.tsx): Shows Solana-specific authentication flows with Capsule.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Yarn (v1.22.22 or later)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/capsule-react-integration-examples.git
   cd capsule-react-integration-examples
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

### Running Examples

You can start individual example applications or all of them in parallel:

- Start Create React App: `yarn start:react-app`
- Start Vite App: `yarn start:vite-app`
- Start Next.js App: `yarn start:nextjs-app`
- Start PWA App: `yarn start:pwa-app`
- Start All Apps: `yarn start:all`

The applications will run on the following ports:

- Next.js: [http://localhost:3000](http://localhost:3000)
- Create React App: [http://localhost:3001](http://localhost:3001)
- Vite: [http://localhost:3002](http://localhost:3002)
- PWA: [http://localhost:3003](http://localhost:3003)

### Building Examples

To build the examples:

- Build a specific app: `yarn build:[framework-name]-app`
- Build all apps: `yarn build:all`

### Clean Installation

If you need to perform a clean installation:

```sh
yarn clean-install
```

## Why This Structure?

1. **Framework Flexibility**: By separating framework-specific configurations, developers can easily understand how to integrate Capsule in their preferred React environment.
2. **Shared Logic**: The [`packages/shared-examples`](./packages/shared-examples/) directory demonstrates how core Capsule integration logic can be shared across different React applications.
3. **Comprehensive Examples**: Each integration example provides a full, end-to-end implementation, allowing developers to see the complete picture of a Capsule integration.
4. **Easy Testing**: The ability to run all examples simultaneously allows for quick comparison and testing across different frameworks.

## Troubleshooting

If you encounter any issues, try performing a clean installation as described above. For further troubleshooting, please refer to the [Capsule documentation](https://docs.usecapsule.com/troubleshooting/troubleshooting).

## Learn More

For more detailed information about Capsule integration, please refer to our [official documentation](https://docs.usecapsule.com).
