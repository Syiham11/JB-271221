const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    devtool: 'inline-source-map',
    entry: [
        './server.js'
    ],
    output: {
        path: Path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new Webpack.optimize.OccurrenceOrderPlugin(),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.IgnorePlugin(/\.DS_Store$/),
    ],
    externals: [nodeExternals()],
};