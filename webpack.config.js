const path = require('path');
const themeWatcher = require('@sallaapp/theme-utils/WatcherPlugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");


module.exports = {
    entry  : {
        home   : './assets/home.js',
        inner  : './assets/inner.js',
        main   : './assets/scss/main.scss',
        plugins: './assets/scss/plugins.scss',
    },
    output : {
        path : path.resolve(__dirname, "assets", "dist"),
        clean: true,
        // filename: '[name]',
    },
    module : {
        rules: [
            {
                test: /\.js$/,
                use : ['babel-loader']
            },
            {
                test: /\.(s(a|c)ss)$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: {url: false}},
                    "sass-loader",
                    "postcss-loader",
                ]
            },
        ]
    },
    plugins: [
        new themeWatcher(),
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin(),
    ],
};