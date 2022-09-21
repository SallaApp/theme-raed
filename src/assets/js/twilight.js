/**\
 * Salla backend will take care about twilight injecting into your theme pages.
 * This file just for IDE purpose, and it shouldn't be in webpack bundle output
 *
 * 🚨 include this file in your bundle could case unexpected issues
 *
 * If you are using webpack make sure to add it exclude rules in webpack.config.js
 *
 * {
 *     test: /\.js$/,
 *     exclude: [
 *         ....
 *         asset('js/twilight.js')
 *         ....
 *     ]
 * };
 *
 */
import {applyPolyfills, defineCustomElements as SallaWebComponents} from '@salla.sa/twilight-components/loader';

applyPolyfills().then(() => {
    SallaWebComponents(window);
});