const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  entry: `${srcPath}/main`,
  output: {
    filename: '[name].bundle.js',
    path: distPath,
    publicPath: distPath
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname),
    index: 'index.html',
    writeToDisk: true,
    hot: true,
    watchContentBase: true
  },
  resolve: {
    alias: {
      data: `${srcPath}/data`
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader'
        ]
      },
      { 
        test: /.js|.jsx$/, 
        exclude: /node_modules/, 
        use: { 
					loader: 'babel-loader', 
					options: { 
						presets: [
							'@babel/preset-react',
							'@babel/preset-env'
						] 
					} 
        } 
			}
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    })
  ]
};