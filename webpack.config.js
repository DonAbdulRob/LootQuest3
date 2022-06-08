const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Development mode settings.
    devServer: {
        static: './dist',
        compress: true,
        port: 9000,
    },
    optimization: {
        runtimeChunk: 'single',
    },

    entry: './src/index.tsx',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'], //".css", ".json"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[id].[chunkhash].js',
    },
    module: {
        rules: [
            // First rule
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                // the order of `use` is important!
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                auto: true,
                                exportGlobals: true,
                                localIdentName:
                                    '[path][name]__[local]--[hash:base64:5]',
                                localIdentContext: path.resolve(
                                    __dirname,
                                    'src',
                                ),
                                localIdentHashSalt: 'my-custom-hash',
                                namedExport: true,
                                exportLocalsConvention: 'camelCase',
                                exportOnlyLocals: false,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body',
        }),
    ],
    mode: 'development',
};
