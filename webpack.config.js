var webpack = require('webpack');
var merge   = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

var common = {
  entry: __dirname + '/app/index.jsx',

  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
        include: __dirname + '/app'
      },

      {
        test: /\.scss$/,
        loader: 'style!css!sass',
        include: __dirname + '/app'
      },

      {
        test: /\.css$/,
        loader: 'style!css',
        include: __dirname + '/app'
      }
    ]
  },

  sassLoader: {
    includePaths: [__dirname + '/node_modules']
  },

  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};

if (TARGET === 'build') {
  module.exports = merge(common, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': { 'NODE_ENV': JSON.stringify('production') }
      })
    ]
  });
}

if (TARGET === 'start') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      /* --hot --inline in package.json */
      contentBase: __dirname + '/build',
      progress: true,
      host: '0.0.0.0',
      historyApiFallback: true
    }
  });
}
