# dora-plugin-simulator

[![NPM version](https://img.shields.io/npm/v/dora-plugin-simulator.svg?style=flat)](https://npmjs.org/package/dora-plugin-simulator)
[![Build Status](https://img.shields.io/travis/dora-js/dora-plugin-simulator.svg?style=flat)](https://travis-ci.org/dora-js/dora-plugin-simulator)
[![Coverage Status](https://img.shields.io/coveralls/dora-js/dora-plugin-simulator.svg?style=flat)](https://coveralls.io/r/dora-js/dora-plugin-simulator)
[![NPM downloads](http://img.shields.io/npm/dm/dora-plugin-simulator.svg?style=flat)](https://npmjs.org/package/dora-plugin-simulator)

provide a convenient solution for Mac users to open pages which served by the server in iOS simulator ----- 桥接 iOS 模拟器。

## Usage_1

```bash
$ npm i dora dora-plugin-simulator -SD
$ ./node_modules/.bin/dora --plugins 'simulator?scheme=http://m.alipay.com'
```

**Build In**

more about the option, visit [node-isimulator](https://github.com/pigcan/node-isimulator)

```javascript
  application: 'mobilesafari',
  bundleId: '',
  device: 'iPhone 6',
  downloadURL: '',
  prefix: 'antm',
  scheme: 'http://127.0.0.1',
  sdk: ''
```

## Usage_2 (Recomend) with [dora-plugin-config-manager](https://www.npmjs.com/package/dora-plugin-config-manager)

```bash
$ ./node_modules/.bin/dora --plugins 'config-manager?path=./mobile.config.js|simOpts,simulator'
```

Your config file should look like this:

`mobile.config.js`

```javascript
var simOpts = {
  scheme: 'http://m.baidu.com'
};

module.exports.simOpts = simOpts;
```

## Test

```bash
$ npm test
```

## LICENSE

MIT
