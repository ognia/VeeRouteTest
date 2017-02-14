'use strict';

// Modules
const webpack           = require('webpack');
const autoprefixer      = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path              = require('path');

// /**
//  * Env
//  * Get npm lifecycle event to identify the environment
//  */
// const ENV = process.env.npm_lifecycle_event;
// let isTest = ENV === 'test' || ENV === 'test-watch';
// let isProd = ENV === 'build';


module.exports = function makeWebpackConfig() {
	/**
	 * Config
	 * Reference: http://webpack.github.io/docs/configuration.html
	 * This is the object where all configuration gets set
	 */
	let config = {};

	/**
	 * Entry
	 * Reference: http://webpack.github.io/docs/configuration.html#entry
	 * Should be an empty object if it's generating a test build
	 * Karma will set this when it's a test build
	 */
	config.entry = {
		app: './src/app/app.js'
	};

	/**
	 * Output
	 * Reference: http://webpack.github.io/docs/configuration.html#output
	 * Should be an empty object if it's generating a test build
	 * Karma will handle setting it up for you when it's a test build
	 */
	config.output = {
	// Absolute output directory
		path: __dirname + '/dist',

		// Output path from the view of the page
		// Uses webpack-dev-server in development
		publicPath: 'http://localhost:8080/',

		// Filename for entry points
		// Only adds hash in build mode
		filename: '[name].bundle.js',

		// Filename for non-entry points
		// Only adds hash in build mode
		chunkFilename: '[name].bundle.js'
	};

	/**
	 * Devtool
	 * Reference: http://webpack.github.io/docs/configuration.html#devtool
	 * Type of sourcemap to use per build type
	 */

	config.devtool = 'eval-source-map';

	/**
	 * Loaders
	 * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
	 * List: http://webpack.github.io/docs/list-of-loaders.html
	 * This handles most of the magic responsible for converting modules
	 */

	// Initialize module
	config.module = {
		rules: [
        {
        	test: /\.js?$/,
        	loader: 'babel-loader?cacheDirectory',
        	exclude: /(node_modules|bower_components)/
        },
        {
        	test: /\.jsx?$/,
        	loader: 'babel-loader?cacheDirectory',
        	exclude: /(node_modules|bower_components)/
        },
        {
        	test: /\.scss?$/,
        	loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
		{
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader?mimetype=image/svg+xml'
		},
		{
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader?mimetype=application/font-woff'
		},
		{
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader?mimetype=application/font-woff'
		},
		{
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader?mimetype=application/octet-stream'
		},
		{
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader'
		},
		{
			// HTML LOADER
			// Reference: https://github.com/webpack/raw-loader
			// Allow loading html through js
			test: /\.html$/,
			loader: 'raw-loader'
		}]
	};


	/**
	 * PostCSS
	 * Reference: https://github.com/postcss/autoprefixer-core
	 * Add vendor prefixes to your css
	 */
	 // NOTE: This is now handled in the `postcss.config.js`
	 //       webpack2 has some issues, making the config file necessary

	/**
	 * Plugins
	 * Reference: http://webpack.github.io/docs/configuration.html#plugins
	 * List: http://webpack.github.io/docs/list-of-plugins.html
	 */
	config.plugins = [
		new ExtractTextPlugin('[name].css')
	];

	config.plugins.push(
		new HtmlWebpackPlugin({
			template: './src/public/index.html',
			inject  : 'body'
		}),
		// Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
		// Only emit files when there are no errors
		new webpack.NoEmitOnErrorsPlugin(),

		// Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
		// Minify all javascript, switch loaders to minimizing mode
		new webpack.optimize.UglifyJsPlugin(),

		// Copy assets from the public folder
		// Reference: https://github.com/kevlened/copy-webpack-plugin
		new CopyWebpackPlugin([{
			from: __dirname + '/src/public'
		}])
	);

	config.resolve = {
		extensions: ['*', '.js', '.scss'],
		alias: {
			foundation : path.join(__dirname, 'node_modules/foundation-sites/dist/css/foundation.css'),
			fontAwesome: path.join(__dirname, 'node_modules/font-awesome/')
		}
	};

	/**
	 * Dev server configuration
	 * Reference: http://webpack.github.io/docs/configuration.html#devserver
	 * Reference: http://webpack.github.io/docs/webpack-dev-server.html
	 */
	config.devServer = {
		contentBase: './src/public',
		stats      : 'minimal'
	};

	return config;
}();
