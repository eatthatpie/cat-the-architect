const path = require('path');

module.exports = {
    entry: './src/Main.ts',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            "@": path.resolve(__dirname, './src')
        }
    },
    output: {
        filename: 'game.js',
        path: path.resolve(__dirname, 'dist')
    }
};