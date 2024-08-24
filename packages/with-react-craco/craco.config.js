const path = require("path");
const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        "@usecapsule/shared-examples": path.resolve(
          __dirname,
          "../shared-examples"
        ),
        "ethers-v5": path.resolve(__dirname, "../../node_modules/ethers"),
        "ethers-v6": path.resolve(
          __dirname,
          "../../node_modules/@usecapsule/ethers-v6-integration/node_modules/ethers"
        ),
        "ethers/lib/utils": path.resolve(
          __dirname,
          "../../node_modules/ethers/lib/utils"
        ),
        "./icon": path.resolve(
          __dirname,
          "../../node_modules/@web3-onboard/capsule/dist/icon.js"
        ),
      };
      webpackConfig.resolve.extensions = [
        ".mjs",
        ".js",
        ".ts",
        ".tsx",
        ".jsx",
        ".json",
        ".cjs",
      ];

      webpackConfig.resolve.modules = [
        ...(webpackConfig.resolve.modules || []),
        path.resolve(__dirname, "../../packages"),
        path.resolve(__dirname, "../../node_modules"),
        path.resolve(__dirname, "node_modules"),
        "node_modules",
      ];

      webpackConfig.resolve.fallback = {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify/browser"),
        url: require.resolve("url"),
        buffer: require.resolve("buffer/"),
        vm: false,
      };

      webpackConfig.module.rules.push(
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: [
            path.resolve(__dirname, "../../packages"),
            path.resolve(__dirname, "node_modules/@usecapsule"),
            path.resolve(__dirname, "node_modules/@web3-onboard"),
          ],
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              [require.resolve("@babel/preset-env"), { targets: "defaults" }],
              [
                require.resolve("@babel/preset-react"),
                { runtime: "automatic" },
              ],
              require.resolve("@babel/preset-typescript"),
            ],
            plugins: [
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              "@babel/plugin-transform-runtime",
            ],
            cacheDirectory: true,
            cacheCompression: false,
            compact: env === "production",
          },
        },
        {
          test: /[\\/]node_modules[\\/]@usecapsule[\\/]ethers-v6-integration[\\/].*\.js$/,
          loader: "string-replace-loader",
          options: {
            search: "from ['\"]ethers['\"]",
            replace: 'from "ethers-v6"',
            flags: "g",
          },
        },
        {
          test: /[\\/]node_modules[\\/]@usecapsule[\\/]ethers-v5-integration[\\/].*\.js$/,
          loader: "string-replace-loader",
          options: {
            search: "from ['\"]ethers['\"]",
            replace: 'from "ethers-v5"',
            flags: "g",
          },
        }
      );

      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        }),
      ];

      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === "ModuleScopePlugin"
      );
      if (scopePluginIndex !== -1) {
        webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      }

      webpackConfig.module.rules.push({
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: /node_modules/,
      });

      webpackConfig.ignoreWarnings = [/Failed to parse source map/];

      return webpackConfig;
    },
  },
  style: {
    postcssOptions: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
