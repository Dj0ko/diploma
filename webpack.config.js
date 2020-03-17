const path = require('path'); 

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: '/dist'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    devServer: {
        overlay: true
    },
};