# Capsule React Integration Examples

Welcome to the Capsule React Integration Examples monorepo! This repository contains various examples demonstrating the integration of the Capsule SDK with different React-based frameworks. For more details, please refer to the [Capsule documentation](https://docs.usecapsule.com).

## Repository Structure

The monorepo is organized into two main directories:

- `examples`: Contains individual example applications, each configured for a specific React framework.
  - `react-app`: Example using Create React App.
  - `vite-app`: Example using Vite.
  - `nextjs-app`: Example using Next.js with App Router & SSR.
  - `pwa-app`: Example Progressive Web App with React.
- `packages`: Contains shared packages and components used by the example applications.
  - `integration-examples/src/examples`: Houses all the shared React component tutorial examples. These are imported by each individual example application.
    - `CapsuleModalAuthenticationExample.tsx`: Start to finish integration example of Capsule modal authentication.
    - `CapsuleSigningExamples.ts`: Examples of setting up message signing with Viem and Ethers packages.
    - `EmailAuthenticationExample.tsx`: Example of email-based authentication flow.
    - `RainbowkitAuthenticationExample.tsx`: Integration example using Rainbowkit for authentication.
    - `WalletPregenerationExample.tsx`: Example of pre-generating wallets.
    - `Web3OnboardAuthenticationExample.tsx`: Example of authentication using BlockNative's Web3-Onboard.

## Setup Instructions

Follow these steps to set up the monorepo and run the example applications.

### Prerequisites

Ensure you have the following installed:

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

You can start the individual example applications or all of them in parallel. The applications will run on the following ports:

- Next.js: [http://localhost:3000](http://localhost:3000)
- Create React App: [http://localhost:3001](http://localhost:3001)
- Vite: [http://localhost:3002](http://localhost:3002)
- PWA: [http://localhost:3003](http://localhost:3003)

#### Start Create React App Example

```sh
yarn start:react-app
```

#### Start Vite Example

```sh
yarn start:vite-app
```

#### Start Next.js Example

```sh
yarn start:nextjs-app
```

#### Start PWA Example

```sh
yarn start:pwa-app
```

#### Start All Examples in Parallel

```sh
yarn start:all
```

## Example Descriptions

Each example fully shows a start-to-finish integration that can be copied. Individual UIs can be modified by state, and Capsule and connector instantiations can be copied as is as working examples. They can reference the signing example for setups with Viem and Ethers packages.

### Next.js App

- Example: [Next.js App](./examples/nextjs-app/)
- Configuration: [next.config.js](./examples/nextjs-app/next.config.mjs)

### Create React App

- Example: [Create React App](./examples/react-app)
- Configuration: [craco.config.js](./examples/react-app/craco.config.js)

### Vite App

- Example: [Vite App](./examples/vite-app)
- Configuration: [vite.config.js](./examples/vite-app/vite.config.ts)

### PWA App

- Example: [PWA App](examples/pwa-app)
- Configuration: [craco.config.js](./examples/react-app/craco.config.js)

## Troubleshooting

If you encounter any issues, you can perform a clean installation:

```sh
yarn clean-install
```

For further troubleshooting, please refer to the [Capsule documentation](https://docs.usecapsule.com/troubleshooting/troubleshooting).
