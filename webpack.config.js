const path = require('path');
const ThemeWatcher = require('@salla.sa/twilight/watcher');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');


module.exports = {
    entry  : {
        app          : ['./assets/styles/app.scss', './assets/js/app.js'],
        blog         : './assets/js/blog/index.js',
        blog_single  : './assets/js/blog/single.js',
        brand        : './assets/js/brands/single.js',
        brands       : './assets/js/brands/index.js',
        cart         : './assets/js/cart.js',
        index        : './assets/js/index.js',
        notifications: './assets/js/customer/notifications.js',
        order        : './assets/js/customer/orders/single.js',
        orders       : './assets/js/customer/orders/index.js',
        page         : './assets/js/page.js',
        product      : './assets/js/product/single.js',
        products     : './assets/js/product/index.js',
        profile      : './assets/js/customer/profile.js',
        thankyou     : './assets/js/thankyou.js',
        wishlist     : './assets/js/customer/wishlist.js',

        //plugins
        filepond : './assets/styles/filepond.scss',
        flatpickr: './assets/styles/main_inc/plugins/flatpicker.scss',

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
                        presets: ['@babel/preset-env']
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
