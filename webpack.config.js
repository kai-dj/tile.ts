const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/src/tile.ts'),
    devtool: "source-map",

    output: {
        filename: 'app.js',
        path: __dirname + '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};