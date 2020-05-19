const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'public');
const publicPath = path.resolve(__dirname);

module.exports = {
  entry: `${srcPath}/main`,
  output: {
    filename: '[name].bundle.js',
    path: distPath,
    publicPath: publicPath
  },
  mode: "development",
  devServer: {
    contentBase: publicPath,
    publicPath: publicPath,
    index: 'index.html',
    writeToDisk: true,
    hot: true,
    watchContentBase: true,
    historyApiFallback: true
  },
  resolve: {
    alias: {
      data: `${srcPath}/data`,
      helper: `${srcPath}/helper`
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
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
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