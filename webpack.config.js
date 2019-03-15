const path = require('path');

module.exports = {
    entry: './src/forum.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'forum.js',
        library: 'forum',
        libraryTarget: 'umd'
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
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
