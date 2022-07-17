import path from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import DotEnv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration, DefinePlugin } from 'webpack';
import { CustomizeRule, merge, mergeWithRules } from 'webpack-merge';

const htmlCommonProperties = {
    filename: 'index.html',
    title: 'Thmoon',
};

const copiedAssets = ['robots.txt', 'manifest.json'];

const devCssLoaders = [
    'style-loader',
    {
        loader: 'css-loader',
        options: {
            modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
            },
        },
    },
    'postcss-loader',
];

const prodCssLoaders = [
    {
        loader: MiniCssExtractPlugin.loader,
    },
    {
        loader: 'css-loader',
        options: {
            modules: {
                auto: true,
                localIdentName: '[hash:base64:7]',
            },
        },
    },
    'postcss-loader',
];

const resolveFromRoot = (...pathSegments: string[]) => path.resolve(__dirname, ...pathSegments);

const commonConfig: Configuration = {
    entry: './src/index.tsx',
    target: 'web',
    plugins: [
        new DotEnv({
            path: resolveFromRoot('.env'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolveFromRoot('public'),
                    to: resolveFromRoot('build'),
                    filter: (filename) =>
                        copiedAssets.reduce<boolean>((accum, asset) => accum || filename.includes(asset), false),
                },
            ],
        }),
        // ? because of 4/5 webpack types changes
    ] as unknown as Configuration['plugins'],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...devCssLoaders],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [...devCssLoaders, 'sass-loader'],
            },
            {
                test: /\.ts(x?)?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.build.json',
                    },
                },
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            svgoConfig: {
                                plugins: [
                                    {
                                        removeViewBox: false,
                                    },
                                ],
                            },
                            memo: true,
                            svgProps: {
                                width: '18px',
                                height: '18px',
                            },
                        },
                    },
                    'url-loader',
                ],
            },
            {
                test: /\.js.map$/,
                enforce: 'pre',
                loader: 'source-map-loader',
            },
            // images
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            // fonts
            {
                test: /\.(woff|ttf|eot)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'string-replace-loader',
                        options: {
                            search: '%PUBLIC_URL%',
                            replace: '',
                            flags: 'gm',
                        },
                    },
                ],
                type: 'asset/source',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
};

export const developmentConfig = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
        publicPath: '/',
    },
    devServer: {
        host: '0.0.0.0',
        port: process.env.PORT || 4000,
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolveFromRoot('public', 'dev.html'),
            ...htmlCommonProperties,
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
});

export const productionConfig: Configuration = mergeWithRules({
    module: {
        rules: {
            test: CustomizeRule.Match,
            use: CustomizeRule.Replace,
        },
    },
})(commonConfig, {
    mode: 'production',
    devtool: false,
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].[contenthash].js',
        sourceMapFilename: '[name].[contenthash].js.map',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolveFromRoot('public', 'prod.html'),
            ...htmlCommonProperties,
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...prodCssLoaders],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [...prodCssLoaders, 'sass-loader'],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    output: {
                        comments: false,
                    },
                },
            }),
            new CssMinimizerPlugin(),
        ],
    },
});
