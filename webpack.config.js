const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');
const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: IS_DEV ? 'inline-source-map' : '',
	entry: {
		'dist/custom-element-qr-code-image': './src/custom-element-qr-code-image.js',
		'dist/polyfills': './src/polyfills/index.js',
		'example/main': './src/example/main.js',
	},
	optimization: IS_DEV ? {} : {
		minimizer: [new UglifyJsPlugin()]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: { sourceMap: IS_DEV }
					},
				]
			},
		],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './')
	},
	devServer: {
		contentBase: path.resolve(__dirname, './'),
		watchContentBase: true,
		watchOptions: {
			poll: true
		}
	}
};
