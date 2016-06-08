module.exports = {
  entry: './public/js/main.js',
  output: {
    filename: 'bundle.js',
    path: 'dist'
    // publicPath: './dist/'
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
