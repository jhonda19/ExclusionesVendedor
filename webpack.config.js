const path = require('path');
const entryPoints = {
  custom: './src/js/index.js',
  upload: './src/js/upload.js',
} 

module.exports = {
    entry: entryPoints,
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist/js'),
      // contentHash
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['sass?sourceMap'],
        },
        { 
          test: /\.(png|jpg|gif|jpeg|svg)$/, 
          loader: "file-loader",
        },
        { 
          test: /\.(svg)$/, 
          loader: "file-loader",
          options: {
            name: 'dist/scss/icons/flag-icon-css/flags/[name].[ext]',
            publicPath: '../'
          }
        },
        { 
          test: /\.(svg|eot|woff|woff2|ttf)$/, 
          loader: "file-loader",
          options: {
            name: 'dist/scss/icons/material-design-iconic-font/fonts/[name].[ext]',
            publicPath: '../'
          }
        },
        { 
          test: /\.(svg|eot|woff|woff2|ttf)$/, 
          loader: "file-loader",
          options: {
            name: 'dist/scss/icons/simple-line-icons/fonts/[name].[ext]',
            publicPath: '../'
          }
        },
        { 
          test: /\.(svg|eot|woff|woff2|ttf)$/, 
          loader: "file-loader",
          options: {
            name: 'dist/scss/icons/themify-icons/fonts/[name].[ext]',
            publicPath: '../'
          }
        },
      ],
    },
      
};