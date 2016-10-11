module.exports = {

	entry: {
		popup: './popup/index.js',
		background: './background/src/index.js',
		content: './content/src/index.js'
	},
		 	
	
	output: {
		path: 'assets',
		filename: "[name].js",
		publicPath: '/assets'
	},

	watch:true,

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		],	
	}
};