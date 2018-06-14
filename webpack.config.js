const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [ {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.svg$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    externals: {
      'jquery-slim': 'jQuery'
    },
    plugins: [
         new CleanWebpackPlugin([
             'dist'
         ]),
         new CopyWebpackPlugin([{
                from: 'resources/index.html',
                to: path.resolve(__dirname, 'dist'),
                flatten: true
             }, {
                from: 'resources/TweenMax.min.js',
                to: path.resolve(__dirname, 'dist/js'),
                flatten: true
             },{
                from: 'node_modules/ludolfs-web-editor/dist/js/jseditor.js',
                to: path.resolve(__dirname, 'dist/js'),
                flatten: true
             }, {
                from: 'node_modules/ludolfs-web-editor/dist/js/jquery/jquery.slim.min.js',
                to: path.resolve(__dirname, 'dist/js/jquery'),
                flatten: true
             }, {
                from: 'node_modules/ludolfs-web-editor/dist/js/ace/*',
                to: path.resolve(__dirname, 'dist/js/ace'),
                flatten: true
             }, {
              from: 'node_modules/ludolfs-web-editor/dist/favicon.ico',
              to: path.resolve(__dirname, 'dist'),
              flatten: true
           }
         ])
    ]
}