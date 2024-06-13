import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  reactStrictMode: true,
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
