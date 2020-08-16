/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => ({
  mode: 'production',
  watch: false,
  entry: './src/main.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: [/\.css$/],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: [/\.styl$/],
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.mjs'],
    modules: ['node_modules', 'src'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
})
