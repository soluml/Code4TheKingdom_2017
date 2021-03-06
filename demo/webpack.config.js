 /* eslint no-console: 0, global-require: 0, import/no-extraneous-dependencies: 0 */

const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDebug = !(process.argv.includes('--release') || process.argv.includes('-r'));
const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');

const cssLoaderConfig = 'css-loader?-minimize&-import&-modules!postcss-loader!sass-loader';
/**
 * Webpack configuration
 * http://webpack.github.io/docs/configuration.html
 */
const config = {

  // The base directory
  context: path.join(__dirname, 'src'),

  // The entry point for the bundle
  entry: {
    app: ['./js/app/index.js'],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  // Options affecting the output of the compilation
  output: {
    path: path.join(__dirname, 'build'),
    filename: isDebug ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    publicPath: '/', // MUST HAVE TRAILING SLASH IF NOT /
    sourceMapFileName: isDebug ? 'js/[name].js' : 'js/[name].[chunkhash].js.map',
    chunkFilename: isDebug ? '' : 'js/[name].[chunkhash].js',
  },

  // Switch loaders to debug or release mode
  debug: isDebug,

  devtool: isDebug ? 'source-map' : false,

  // What information should be printed to the console
  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },

  // The list of plugins for Webpack compiler
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity, chunks: ['vendor', 'app'] }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: false,
      minify: { collapseWhitespace: true }
    }),
    new webpack.DefinePlugin({
      API_HOST: isDebug ? '"http://localhost:1337"' : '""',
      __DEV__: isDebug,
    }),
  ],

  // Options affecting the normal modules
  module: {
    loaders: [
      {
        test: /\.json$/, loader: 'json',
      },
      {
        test: /\.jsx?$/,
        loader: `babel-loader?babelrc=false&extends=${path.join(__dirname, '/.babelrc')}`,
        exclude: /(node_modules|\/js\/vendor)/,
      },
      {
        test: /app\.scss$/,
        loader:
          isDebug ?
            `style-loader!${cssLoaderConfig}`
          :
            ExtractTextPlugin.extract('style-loader', `!${cssLoaderConfig}`)
      },
      {
        test: /\/sprite\/.*\.svg$/,
        loader: 'svg-sprite?' + JSON.stringify({
          name: '[name]',
          prefixize: false,
        }) + '!img-loader?minimize',
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        exclude: [/sprite/],
        loader: 'file-loader?name=img/[name]_[hash].[ext]!img-loader?minimize',
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
    ],
  },

  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  postcss() {
    return [
      // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
      // https://github.com/postcss/postcss-media-minmax
      require('postcss-media-minmax')(),
      // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
      // https://github.com/postcss/postcss-custom-selectors
      require('postcss-custom-selectors')(),
      // W3C color() function, e.g. div { background: color(red alpha(90%)); }
      // https://github.com/postcss/postcss-color-function
      require('postcss-color-function')(),
      // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
      // https://github.com/iamvdo/pleeease-filters
      require('pleeease-filters')(),
      // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
      // https://github.com/postcss/postcss-selector-matches
      require('postcss-selector-matches')(),
      // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
      // https://github.com/postcss/postcss-selector-not
      require('postcss-selector-not')(),
      // cssnano takes your nicely formatted CSS and runs it through many focused optimisations
      // http://cssnano.co/
      require('cssnano')({
        autoprefixer: false,
        discardComments: { removeAll: true },
      }),
      // Add vendor prefixes to CSS rules using values from caniuse.com
      // https://github.com/postcss/autoprefixer
      require('autoprefixer')({
        remove: false,
      }),
    ];
  },

  imagemin: {
    gifsicle: {
      interlaced: false,
    },
    jpegtran: {
      progressive: false,
      arithmetic: false,
    },
    optipng: {
      optimizationLevel: 7,
    },
    pngquant: {
      floyd: 0.5,
      speed: 2,
    },
    svgo: {
      plugins: [{ // https://github.com/svg/svgo#what-it-can-do
        removeDoctype: true,
        convertPathData: false,
      }],
    },
  },

};

// Optimize the bundle in release (production) mode
if (!isDebug) {
  config.plugins.push(new ExtractTextPlugin('css/app.[hash].css'));
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: isVerbose } }));
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}

module.exports = config;
