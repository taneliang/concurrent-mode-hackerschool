"use strict";

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV ?? "development";
const __DEV__ = NODE_ENV === "development";
const shouldUseDevServer = __DEV__;

const imageInlineSizeLimit = 10000;

const babelOptions = {
  plugins: shouldUseDevServer ? ["react-refresh/babel"] : [],
};

const config = {
  mode: __DEV__ ? "development" : "production",
  entry: {
    app: "./src/index.js",
  },
  resolve: {
    alias: {
      react: resolve(__dirname, "custom_node_modules", "react"),
      "react-cache": resolve(__dirname, "custom_node_modules", "react-cache"),
      "react-client": resolve(__dirname, "custom_node_modules", "react-client"),
      "react-debug-tools": resolve(
        __dirname,
        "custom_node_modules",
        "react-debug-tools"
      ),
      "react-dom": resolve(__dirname, "custom_node_modules", "react-dom"),
      "react-fetch": resolve(__dirname, "custom_node_modules", "react-fetch"),
      "react-is": resolve(__dirname, "custom_node_modules", "react-is"),
      "react-reconciler": resolve(
        __dirname,
        "custom_node_modules",
        "react-reconciler"
      ),
      "react-cache": resolve(__dirname, "custom_node_modules", "react-cache"),
      scheduler: resolve(__dirname, "custom_node_modules", "scheduler"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "suspended cats",
    }),
    shouldUseDevServer && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: babelOptions,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                localIdentName: "[local]___[hash:base64:5]",
              },
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "url-loader",
        options: {
          limit: imageInlineSizeLimit,
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
    ],
  },
};

if (shouldUseDevServer) {
  config.devServer = {
    hot: true,
    port: 8080,
    clientLogLevel: "warning",
    stats: "errors-only",
  };
} else {
  config.output = {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
  };
}

module.exports = config;
