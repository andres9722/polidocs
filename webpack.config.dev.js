const webpack = require('webpack'),
  path = require('path'),
  srcDir = path.resolve( __dirname, 'src' ),
  publicDir = path.resolve( __dirname, 'public' ),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ReloadPlugin = require('reload-html-webpack-plugin'),
  WebpackPwaManifest = require('webpack-pwa-manifest')

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
      favicon: './assets/img/favicon.png',
      chunks: ['script']
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'template.html'),
      filename: 'matematicas.html',
      favicon: './assets/img/favicon.png',
      chunks: ['matematicas_script']
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'template.html'),
      filename: 'calculo-diferencial.html',
      favicon: './assets/img/favicon.png',
      chunks: ['calculo_diferencial_script']
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'template.html'),
      filename: 'calculo-integral.html',
      favicon: './assets/img/favicon.png',
      chunks: ['calculo_integral_script']
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'template.html'),
      filename: 'calculo-varias.html',
      favicon: './assets/img/favicon.png',
      chunks: ['calculo_varias_script']
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'template.html'),
      filename: 'ecuaciones.html',
      favicon: './assets/img/favicon.png',
      chunks: ['ecuaciones_script']
    }),
    new WebpackPwaManifest({
      name: 'polidocs',
      short_name: 'polidocs',
      description: 'Aplicación Web Progresiva',
      orientation: 'portrait',
      display: 'standalone',
      start_url: 'index.html?utm=homescreen',
      scope: './',
      lang: 'es',
      background_color: '#007BDF',
      theme_color: '#FF3C32',
      icons: [
        {
          src: path.resolve('src/assets/img/rocket.png'),
          sizes: [16,32,64,96,128,192,256,384,512,1024],
          type: 'image/png'
        }
      ],
      fingerprints: false
    })
  ]
}
