const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, '../src/WxRouter.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'wx-router.min.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
};
