const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packagejson = require('../package.json');

module.exports = (loader = 'file') => {
    return {
        entry: {
            'polyfill-performance.now': './libs/polyfill-performance.now/index.ts',
            'polyfill-requestAnimationFrame': './libs/polyfill-requestAnimationFrame/index.ts',
            app: './src/index.ts',
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: packagejson.name,
                template: path.resolve(path.join('html', 'index.hbs')),
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.hbs$/,
                    loader: 'handlebars-loader',
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: `${loader}-loader`,
                            options: {
                                name: '[path][name].[ext]',
                            },
                        },
                    ],
                },
                {
                    // Include ts, tsx, js, and jsx files.
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    modules: false,
                                    corejs: { version: 3, proposals: true },
                                    targets: {
                                        browsers: ['ios >= 10', 'and_chr >= 20', 'safari >= 8'],
                                    },
                                    // debug: true,
                                },
                            ],
                            '@babel/preset-typescript',
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: '[name].js',
            path: path.resolve('dist'),
        },
    };
};
