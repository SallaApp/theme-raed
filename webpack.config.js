const path = require('path');
const ThemeWatcher = require('@salla.sa/twilight/watcher');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');


module.exports = {
    entry  : {
        app     : ['./assets/styles/app.scss', './assets/js/wishlist.js', './assets/js/app.js'],
        home    : './assets/js/home.js',
        checkout: ['./assets/js/cart.js', './assets/js/thankyou.js'],
        pages   : ['./assets/js/blog.js', './assets/js/brands.js',],
        product : ['./assets/js/product.js', './assets/js/products.js'],
        customer: [
            './assets/js/profile.js',
            './assets/js/order.js',
        ],

        //plugins
        filepond : ['./assets/styles/05-utilities/filepond.scss', './assets/js/partials/filepond.js'],
        flatpickr: './assets/styles/05-utilities/flatpicker.scss',
        //fonts
        // amazon_ember: './assets/fonts/amazon_ember.scss',
        // apple: './assets/fonts/apple.scss',
        // dubai: './assets/fonts/dubai.scss',
        // estedad: './assets/fonts/estedad.scss',
    },
    output : {
        path : path.resolve(__dirname, "assets", "dist"),
        clean: true,
    },
    stats  : {
        modules                : false,
        assetsSort             : "size",
        assetsSpace            : 50,
        cachedAssets           : true,
        groupAssetsByPath      : false,
        groupAssetsByExtension : false,
        groupAssetsByEmitStatus: false,
        groupAssetsByChunk     : false,
        groupAssetsByInfo      : false,
        relatedAssets          : true,
        performance            : true,
    },
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
        new WebpackBuildNotifierPlugin({
            title: "Salla Theme",
            logo : path.resolve("./assets/images/favicon/apple-icon.png"),
            // suppressSuccess: true, // don't spam success notifications
            successSound: false,
        }),
    ],
}
;
