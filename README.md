# Capsule React Integration Examples

Welcome to the Capsule React Integration Examples monorepo! This repository contains various examples demonstrating the integration of the Capsule SDK with different React-based frameworks.

## Repository Structure

The monorepo is organized into two main directories:

- `examples`: Contains individual example applications, each configured for a specific React framework.
  - `react-app`: Example using Create React App.
  - `vite-app`: Example using Vite.
  - `nextjs-app`: Example using Next.js with App Router & SSR.
  - `pwa-app`: Example Progressive Web App with React.
- `packages`: Contains shared packages and components used by the example applications.
  - `integration-examples`: Houses all the shared React component tutorial examples. These are imported by each individual example application.

## Setup Instructions

Follow these steps to set up the monorepo and run the example applications.

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- Yarn (v1.22.22 or later)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/capsule-org/react-integration-examples.git
   cd react-integration-examples
   ```

2. Install dependencies and bootstrap the monorepo:
   ```sh
   yarn install
   yarn bootstrap
   ```

### Running Examples

You can start the individual example applications or all of them in parallel.

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

### Clean Installation

If you encounter any issues, you can perform a clean installation:

```sh
yarn clean-install
```

```

```
