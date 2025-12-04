/*!
 * Crafted with ❤ by Salla
 */
import { postcss } from "@stencil-community/postcss";
// @ts-ignore
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { env } from "@alepop/stencil-env";
import { readFileSync } from "fs";
export const isWatchMode = process.argv.includes('-w') || process.argv.includes('--watch');
export const watchInRealTheme = process.env.WATCH_IN_REAL_THEME === 'true';
export function twilightDevModePlugin() {
    console.log(`Twilight  Now One ${isWatchMode ? 'development👨🏻‍🔬' : 'production🚀'} mode bundle`);
    return {
        name: 'twilight-dev-mode-plugin',
        transform(sourceText, id) {
            if (!id.endsWith('global/app.ts') || !isWatchMode) {
                return null;
            }
            return sourceText.replace(/import '@salla\.sa\/twilight'/, `import '@salla.sa/twilight/dist/@salla.sa/twilight.min'`);
        }
    };
}
export function getGlobalPaths() {
    let globalScript = './src/global/app.ts';
    let globalCss = null;
    if (isWatchMode && !watchInRealTheme) {
        globalScript = './src/global/app-dev.ts';
        globalCss = './src/global/app.scss';
    }
    return { globalScript, globalCss };
}
export function getGlobalScript() {
    return getGlobalPaths().globalScript;
}
export function getGlobalCss() {
    return getGlobalPaths().globalCss;
}
export function getPlugins() {
    if (!isWatchMode) {
        return [];
    }
    return [
        env(),
        twilightDevModePlugin(),
        postcss({ plugins: [tailwindcss(), autoprefixer()] }),
    ];
}
/**
 * Get dev server configuration based on SSL mode
 */
export function getDevServer() {
    const devServer = {};
    if (!process.argv.includes('--secure')) {
        return devServer;
    }
    try {
        devServer.https = {
            cert: readFileSync('cert.crt', 'utf8'),
            key: readFileSync('key.pem', 'utf8')
        };
    }
    catch (error) {
        console.error(`Failed to read SSL certificates: ${error}`);
    }
    return devServer;
}
