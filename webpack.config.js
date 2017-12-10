const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/index.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-[hash].js',
    publicPath: "" //which is the default publicPath, dummy..
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'postcss-loader']
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.html'),
      inject: 'body'
    }),
    new ExtractTextPlugin('styles-[contenthash].css'),
    new CopyWebpackPlugin([
      { from: 'public', to: path.resolve(__dirname, 'build/public') }
    ])
  ],
  devServer: {
    index: 'index.html',
    contentBase: [
      path.join(__dirname, 'public'),
      path.join(__dirname, 'src')
    ],
    port: 8080,
    watchContentBase: true,
    noInfo: true,
    open: 'Google Chrome',
    overlay: true
  }
}