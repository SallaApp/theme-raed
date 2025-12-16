'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@analytics/core');
var storage = require('@analytics/storage-utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var storage__default = /*#__PURE__*/_interopDefaultLegacy(storage);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function analyticsLib() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultSettings = {
    storage: storage__default["default"]
  };
  return core.Analytics(_objectSpread2(_objectSpread2({}, defaultSettings), opts));
}

Object.defineProperty(exports, 'CONSTANTS', {
  enumerable: true,
  get: function () { return core.CONSTANTS; }
});
Object.defineProperty(exports, 'EVENTS', {
  enumerable: true,
  get: function () { return core.EVENTS; }
});
exports.Analytics = analyticsLib;
exports["default"] = analyticsLib;
exports.init = analyticsLib;
