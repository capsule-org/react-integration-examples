import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@usecapsule/rainbowkit",
    "@usecapsule/rainbowkit-wallet",
    "@usecapsule/core-components",
    "@usecapsule/react-components",
    "@usecapsule/react-sdk",
    "@usecapsule/core-sdk",
    "@usecapsule/web-sdk",
    "@usecapsule/wagmi-v2-integration",
    "@usecapsule/viem-v2-integration",
  ],
  webpack: (config, { isServer }) => {
    config.resolve.alias["@usecapsule/integration-examples"] = path.resolve(
      __dirname,
      "../../packages/integration-examples/src"
    );

    config.module.rules.push({
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: "asset/resource",
    });

    return config;
  },
};

export default nextConfig;
