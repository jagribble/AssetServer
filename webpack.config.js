module.exports = {
  entry: `${__dirname}/components/index.js`,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0'],
      },
    }],
  },
  output: {
    filename: 'build.js',
    path: `${__dirname}/public/js`,
  },

};
