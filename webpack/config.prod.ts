import HtmlWebpackPlugin from 'html-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin'
import path from 'path'
import webpack from 'webpack'

const webpackConfiguration: webpack.Configuration = {
	mode: 'production',
	entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, '..', 'build'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: './public/index.html',
		}),
		//@ts-ignore
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
				use: 'babel-loader',
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

export default webpackConfiguration