const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const ThemeVersionPump = require('./theme-version-pump');
const ThemeWatcher = require('@salla.sa/twilight/watcher');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const asset = file => path.resolve('src/assets', file || '');
const output = file => path.resolve("public", file || '');


module.exports = {
    entry  : {
        app     : [asset('styles/app.scss'), asset('js/wishlist.js'), asset('js/app.js')],
        home    : asset('js/home.js'),
        checkout: [asset('js/cart.js'), asset('js/thankyou.js')],
        pages   : [asset('js/blog.js'), asset('js/brands.js'),],
        product : [asset('js/product.js'), asset('js/products.js')],
        customer: [asset('js/profile.js'), asset('js/order.js')],

        //plugins
        filepond : [asset('styles/05-utilities/filepond.scss'), asset('js/partials/filepond.js')],
        flatpickr: asset('styles/05-utilities/flatpicker.scss')
    },
    output : {path: output(), clean: true},
    stats  : {modules: false, assetsSort: "size", assetsSpace: 50},
    module : {
        rules: [
            {
                test   : /\.js$/,
                exclude: /(node_modules)/,
                use    : {
                    loader : 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ["@babel/plugin-transform-runtime",
                             {
                                 "regenerator": true
                             }
                            ]
                        ],
                    }
                }
            },
            {
                test: /\.(s(a|c)ss)$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: {url: false}},
                    "postcss-loader",
                    "sass-loader",
                ]
            },
        ],
    },
    plugins: [
        new ThemeWatcher(),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({patterns: [{from: asset('images'), to: output('images')}]}),
        new ThemeVersionPump(),
        new WebpackBuildNotifierPlugin({title: "Salla Theme", successSound: false})
    ],
}
;
