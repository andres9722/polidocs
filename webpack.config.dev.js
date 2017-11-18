const webpack = require('webpack'),
  path = require('path'),
  srcDir = path.resolve( __dirname, 'src' ),
  publicDir = path.resolve( __dirname, 'public' ),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ReloadPlugin = require('reload-html-webpack-plugin')

module.exports = {
  context: srcDir,
  devtool: 'hidden-source-map',
  entry: {
    script: './index.js',
    matematicas_script: './matematicas.js',
    calculo_diferencial_script: './calculo-diferencial.js',
    calculo_integral_script: './calculo-integral.js',
    calculo_varias_script: './calculo-varias.js',
    ecuaciones_script: './ecuaciones.js'
  },
  output: {
    path: publicDir,
    filename: '[name].js',
    publicPath: './',
    sourceMapFilename: 'main.map'
  },
  devServer: {
    contentBase: srcDir,
    publicPath: '/',
    historyApiFallback: true,
    compress: true,
    open: true,
    hot: true,
    stats: 'errors-only',
    port: 3002,
    openPage: ''
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
	        'css-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          'file-loader?name=[path][name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(ttf|eot|woff2?|mp4|txt|xml)$/,
        use: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ReloadPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'template.html'),
      filename: 'index.html',
      chunks: ['script']
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'template.html'),
      filename: 'matematicas.html',
      chunks: ['matematicas_script']
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'template.html'),
      filename: 'calculo-diferencial.html',
      chunks: ['calculo_diferencial_script']
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'template.html'),
      filename: 'calculo-integral.html',
      chunks: ['calculo_integral_script']
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'template.html'),
      filename: 'calculo-varias.html',
      chunks: ['calculo_varias_script']
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'template.html'),
      filename: 'ecuaciones.html',
      chunks: ['ecuaciones_script']
    })
  ]
}
