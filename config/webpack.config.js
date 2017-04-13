var webpack = require('webpack');
var path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSassPlugin = new ExtractTextPlugin({
  filename: 'style.css', // Output css for production
  disable: process.env.NODE_ENV !== 'production'
})
const copyWebpackPlugin = new CopyWebpackPlugin([
  {
    context: './src/public',
    from: '**/*'
  }
])
module.exports = {
    devtool: 'inline-source-map',
    entry: [

        './src/index.js'
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../build")
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js']
    },
    module: {
        
        rules: [
            {
                test: /\.js$/,
                //loader: 'babel-loader',
                loaders: ['react-hot-loader/webpack', 'babel-loader?presets[]=react,presets[]=es2015'],
                exclude: /node_modules/
            }
        // loaders: [
        //     {
        //         test: /\.jsx?$/,
        //         exclude: /node_modules/,
        //         loaders: ['react-hot-loader', 'babel-loader?presets[]=react,presets[]=es2015'],
        //         include: path.join(__dirname, 'src')
        //     }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}