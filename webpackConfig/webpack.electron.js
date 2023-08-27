const path = require('path');
const current_mode = process.env.NODE_ENV == 'production' ? 'production' : 'development';

module.exports = {
  // Build Mode
  mode: current_mode,

  // Electron Entrypoint
  entry: './src/electron/main.ts',
  target: 'electron-main',
  resolve: {
    alias: {
      ['@']: path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
				test: /\.(tsx|ts)?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			}
    ]
  },
  
  output: {
    path: path.join(__dirname, "../dist"),
    filename: 'main.js'
  }
}