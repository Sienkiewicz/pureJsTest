module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
  },
  devServer: {
    hot: true,
  },
};
