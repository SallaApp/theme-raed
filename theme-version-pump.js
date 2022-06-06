const path = require('path');

class ThemeVersionPump {
    apply(compiler) {
        if (compiler.options.mode === 'development' && !compiler.options.watch) {
            return;
        }
        let settingsPath = path.resolve('theme.json');
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
            let themeSettings = require(settingsPath);
            let version = (themeSettings.version || '0.0.0').split('.').reverse();
            version[0] = Number(version[0]) + 1;
            themeSettings.version = version.reverse().join(".");
            require('fs')
                .writeFileSync(settingsPath, JSON.stringify(themeSettings, null, '  '));
        });
    }
}

module.exports = ThemeVersionPump;