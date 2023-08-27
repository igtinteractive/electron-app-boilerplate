const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const current_mode = process.env.NODE_ENV == 'production' ? 'production' : 'development';

module.exports = {
  mode: current_mode,  
  target: 'electron-renderer',
  devtool: 'source-map',
  
  entry: {
		loadPage : "./src/loadpage/loadPage.tsx",
    test : "./src/testpage/test.tsx"
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename:"loadPage.html",
      chunks: ['loadPage'],		
      template: path.resolve(__dirname, "./../src/electron/index.html")
    }),

    new HtmlWebpackPlugin({
      filename:"test.html",
      chunks: ['test'],		
      template: path.resolve(__dirname, "./../src/electron/index.html")
    })
    
  ],

  devServer: {
    
    host: 'localhost',
		port: 3000,
	
		//historyApiFallback: true,
		// respond to 404s with index.html
	
		//hot: true,
		// enable HMR on the server
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json", ".wasm"]
  },

  module: {
    rules: [
      {
				test: /\.(tsx|ts)?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },

  output: {
    path: path.join(__dirname, "../dist"),
    filename: '[name].js'
  }
};