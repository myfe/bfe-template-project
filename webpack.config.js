const glob = require('glob');
const path = require('path');
// minicss 要在 html 前面
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

const development = process.env.NODE_ENV === 'development';

const webpackConfig = {
  mode: development ? 'development' : 'production',
  devtool: development ? 'eval-source-map' : 'cheap-source-map',
  entry: {},
  output: {
    path: path.resolve('./public'),
    filename: development ? 'js/[name].js' : 'js/[name].[chunkhash:6].js',
    chunkFilename: development ? 'js/[name].js' : 'js/[name].[chunkhash:6].js',
    publicPath: '/public/'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ]
    },
    {
      test: /\.less/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader'
      ]
    },
    {
      test: /\.(png|ico|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1024,
        name: development ? 'img/[name].[ext]' : 'img/[name].[hash:8].[ext]',
      }
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1024,
        name: development ? 'font/[name].[ext]' : 'font/[name].[hash:8].[ext]',
      }
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: development ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
      chunkFilename: development ? 'css/[id].css' : 'css/[name].[contenthash:8].css',
    }),
    new CleanWebpackPlugin({
      root: __dirname,
      verbose: true,
      dry: false
    })
  ],
};

// 获取指定路径下的入口文件
function getEntries(globPath) {
  const files = glob.sync(globPath);
  const entries = {};
  files.forEach(filepath => {
    const split = filepath.split('/');
    const name = split[split.length - 2];
    entries[name] = `./${filepath}`;
  });
  return entries;
}

const entries = getEntries('web/index.js');

Object.keys(entries).forEach(name => {
  webpackConfig.entry[name] = entries[name];
  const plugin = new HtmlWebpackPlugin({
    filename: `${name}.html`,
    template: './web/index.html',
    inject: true,
    chunks: [name],
    minify: development ? false : {
      removeComments: true, // 移除HTML中的注释
      collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
      removeAttributeQuotes: true, // 去除属性引用
    },
  });
  webpackConfig.plugins.push(plugin);
});

if (!development) {
  webpackConfig.optimization = {
    minimizer: [
      // 压缩js https://github.com/mishoo/UglifyJS2/tree/harmony#compress-options
      new UglifyJsPlugin({
        parallel: 2,
        cache: true,
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_debugger: false,
            drop_console: true
          },
          output: {
            comments: false
          }
        }
      }),
      // 压缩css
      new OptimizeCssPlugin({
        cssProcessorOptions: {
          // mergeLonghand: false,
          map: { inline: false },
          safe: true
        }
      }),
    ],
  };
}

module.exports = webpackConfig;
