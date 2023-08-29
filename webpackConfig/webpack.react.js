const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const current_mode = process.env.NODE_ENV == 'production' ? 'production' : 'development';

module.exports = {
	mode: current_mode,  
	target: 'electron-renderer',
	devtool: 'source-map',

	// entry point must be defined here.
	// nameOfThePage : "path to the page ts file"
	entry: {
		pageA : "./src/pageA/pageA.tsx",
		pageB : "./src/pageB/pageB.tsx",
		pageC : "./src/pageC/pageC.tsx",
	},

	// each page must have a plugin to get compile as a html page correctly.
	plugins: [   
		new HtmlWebpackPlugin({
			filename:"pageA.html",
			chunks: ['pageA'],		
			template: path.resolve(__dirname, "./../src/electron/index.html")
		}),

		new HtmlWebpackPlugin({
			filename:"pageB.html",
			chunks: ['pageB'],		
			template: path.resolve(__dirname, "./../src/electron/index.html")
		}),

		new HtmlWebpackPlugin({
			filename:"pageC.html",
			chunks: ['pageC'],		
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
				test: /\.(scss|css)$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}

			
		]
	},

	output: {
		path: path.join(__dirname, "../dist"),
		filename: '[name].js'
	}
};