const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
  filename: 'main.[contenthash].js',
  path: path.resolve(__dirname, 'dist'),
  clean: true,
  publicPath: '/ahj-dnd/',
  },
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};