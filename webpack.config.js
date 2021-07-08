const path = require('path');
const {ModuleFederationPlugin} = require("webpack").container;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: 'none',
  mode: 'development',
  entry: './src/index.js',
  plugins: [
    new ModuleFederationPlugin({
      name: "main"
    }),
    new HtmlWebpackPlugin({
      title: 'WebComponents Test',
    }),
  ],
  devServer: {
    contentBase: './dist',
    port: 8080
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
