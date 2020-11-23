const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

module.exports = {
	mode: 'development',
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		path.resolve(__dirname, '..', 'src', 'index.tsx')
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, '..', 'build'),
	},
	devServer: {
		host: 'localhost',
		port: 3000,
		open: true,
		publicPath: '/',
		contentBase: path.resolve(__dirname, '..', 'build'),
		watchContentBase: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: './public/index.html',
		}),
		new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
			PUBLIC_URL: '.',
		}),
		new Dotenv({
			safe: true,
			allowEmptyValues: true,
			systemvars: true,
			silent: true,
			defaults: false,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'public',
					globOptions: {
						ignore: ['**/index.html'],
					},
				},
			],
		}),
		new ESLintPlugin({
			extensions: ['.tsx', '.ts', '.js'],
			formatter: 'prettier',
		}),
	],
	optimization: {
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'awesome-typescript-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
						},
					},
				],
			},
		],
	},
}
