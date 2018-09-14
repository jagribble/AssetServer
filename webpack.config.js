const webpack = require('webpack');
// required for development to import all local envs
require('dotenv').config();


console.log(process.env);
module.exports = {
  context: __dirname,
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
  plugins: [new webpack.DefinePlugin({
    'process.env': {
      GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  })],
  output: {
    filename: 'build.js',
    path: `${__dirname}/public/js`,
  },

};
