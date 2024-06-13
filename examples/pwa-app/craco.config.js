const path = require("path");
const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Set up the alias for integration-examples
      webpackConfig.resolve.alias["@usecapsule/integration-examples"] =
        path.resolve(__dirname, "../../packages/integration-examples/src");

      // Add babel-loader for handling JS/TS files in integration-examples
      webpackConfig.module.rules.push({
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: [
          path.resolve(__dirname, "../../packages/integration-examples/src"),
        ],
        loader: require.resolve("babel-loader"),
        options: {
          presets: [
            [
              require.resolve("babel-preset-react-app"),
              { runtime: "automatic" },
            ],
          ],
          cacheDirectory: true,
          cacheCompression: false,
          compact: env === "production",
        },
      });
      // Add source-map-loader to suppress warnings
      webpackConfig.module.rules.push({
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: "pre",
        use: ["source-map-loader"],
      });

      // Remove ModuleScopePlugin to allow importing from outside src/
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === "ModuleScopePlugin"
      );
      if (scopePluginIndex !== -1) {
        webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      }

      // Configure file extensions
      webpackConfig.resolve.extensions = [
        ".mjs",
        ".js",
        ".json",
        ".ts",
        ".tsx",
        ".jsx",
      ];

      // Ensure the correct modules resolution
      webpackConfig.resolve.modules = [
        ...(webpackConfig.resolve.modules || []),
        path.resolve(__dirname, "../../packages"),
        path.resolve(__dirname, "src"),
      ];

      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        "./icon": "./icon.js",
      };

      // Add Node polyfills using fallback
      webpackConfig.resolve.fallback = {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify/browser"),
        url: require.resolve("url"),
        buffer: require.resolve("buffer/"),
      };

      // Add ProvidePlugin for Buffer
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        }),
      ];

      return webpackConfig;
    },
  },
  style: {
    postcssOptions: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
