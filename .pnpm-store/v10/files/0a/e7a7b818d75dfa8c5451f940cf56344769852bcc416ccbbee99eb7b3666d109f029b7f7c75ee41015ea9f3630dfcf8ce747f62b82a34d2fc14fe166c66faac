# babel-loader-exclude-node-modules-except

[![license](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/WezomAgency/babel-loader-exclude-node-modules-except/blob/master/LICENSE)
[![npm](https://img.shields.io/badge/js--tiny-module-yellow.svg)](https://github.com/topics/js-tiny-module)
[![npm](https://img.shields.io/badge/npm-install-orange.svg)](https://www.npmjs.com/package/babel-loader-exclude-node-modules-except)
![Tests](https://github.com/dutchenkoOleg/babel-loader-exclude-node-modules-except/workflows/Tests/badge.svg)


| Statements                  | Branches                | Functions                 | Lines                |
| --------------------------- | ----------------------- | ------------------------- | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)    |

> Creating a regular expression for excluding node_modules  
> from babel transpiling except for individual modules


### Usage

```js
// webpack.config.js

const babelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except');

module.exports = {
  // config properties
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: babelLoaderExcludeNodeModulesExcept([
          // es6 modules from node_modules/
          'custom-jquery-methods',
          'swiper',
          'dom7'
        ]),
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

```

### Also, wildcards for matching are allowed, except names

_Since v1.2.0_


```js
// webpack.config.js

const babelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except');

module.exports = {
  // config properties
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: babelLoaderExcludeNodeModulesExcept([
          'react-*',
          '@awesomecorp/*'
        ]),
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

```



---

#### Contributors 💪

- April Arcus [@AprilArcus](https://github.com/AprilArcus)
- Thordur Thordarson [@earthslasthope](https://github.com/earthslasthope)

---

#### License

[MIT License](https://github.com/WezomAgency/babel-loader-exclude-node-modules-except/blob/master/LICENSE)

---
