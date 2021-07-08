const path = require('path');
const {ModuleFederationPlugin} = require("webpack").container;

module.exports = {
  // mode: 'none',
  mode: 'development',
  // mode: 'production',
  plugins: [
    new ModuleFederationPlugin({
      name: "react_app",
      filename: 'remoteEntry.js',
      exposes: {
        './Counter.js': './src/index.js',
      }
    })
  ],
  devServer: {
    contentBase: './dist',
    port: 8081
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
};
