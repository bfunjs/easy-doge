"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClassNames = getClassNames;
exports.getCurrentIndex = getCurrentIndex;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getClassNames() {
  var names = [];

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.forEach(function (item) {
    if (typeof item === 'string') {
      names.push(item);
      return;
    }

    if (item instanceof Array) {
      item.forEach(function (cls) {
        return typeof cls === 'string' && names.push(cls);
      });
      return;
    }

    if (_typeof(item) === 'object') {
      for (var key in item) {
        if (item.hasOwnProperty(key) && item[key]) {
          names.push(key);
        }
      }
    }
  });
  return names.join(' ');
}

function getCurrentIndex(layout, left, top, _ref) {
  var margin = _ref.margin,
      width = _ref.width,
      height = _ref.height;
  var newIndex = -1;
  var marginX = margin[0] || 0;
  var marginY = margin[1] || 0;
  Object.values(layout).forEach(function (item) {
    var x = item.x,
        y = item.y,
        index = item.index,
        fixed = item.fixed;
    var l = Math.round((width + marginX) * x);
    var t = Math.round((height + marginY) * y);

    if (left >= l && left <= l + width + marginX) {
      if (top >= t && top <= t + height + marginY) {
        if (!fixed) {
          newIndex = index;
        }
      }
    }
  });
  return newIndex;
}