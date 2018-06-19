const path = require("path");
const { resolve } = path;

const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPath = resolve(__dirname);
const distPath = resolve(__dirname, "dist");
const isDevelopment = process.env.NODE_ENV !== "production";

if (isDevelopment)
  console.log(`Welcome to development (ThePlatform) \n\n\t><>\`\n`);

const config = {
  devtool: isDevelopment ? "cheap-module-eval-source-map" : "source-map",

  entry: {
    vendor: [
      "react"
      // "react-dom",
      // "react-router-dom"
      // 'react-redux',
      // 'redux',
      // 'redux-thunk',
    ],
    app: ["./index.jsx"]
  },
  context: rootPath,
  output: {
    path: distPath,
    filename: "[name].js",
    publicPath: isDevelopment ? "http://localhost:3000/" : "/"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      client: rootPath,
      components: resolve(rootPath, "components")
    },
    extensions: [".js", ".jsx", "/index.jsx", "/index.js"]
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: `${rootPath}/index.html`
    })
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.NamedModulesPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    // name: 'vendor',
    // minChunks: Infinity,
    // }),
  ],
  devServer: {
    contentBase: distPath,
    hot: true,
    compress: true,
    historyApiFallback: true,
    port: 3000
  }
};

if (isDevelopment) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  // config.plugins.push(new UglifyJSPlugin());
}

module.exports = config;
