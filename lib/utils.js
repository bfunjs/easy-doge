"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClassNames = getClassNames;
exports.getCurrentIndex = getCurrentIndex;
exports.calcPosition = calcPosition;
exports.move = move;
exports.sort = sort;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

function getCurrentIndex(left, top, _ref) {
  var layout = _ref.layout,
      margin = _ref.margin,
      width = _ref.width,
      height = _ref.height,
      fixed = _ref.fixed,
      col = _ref.col;
  var newIndex = -1;
  var marginX = margin[0] || 0;
  var marginY = margin[1] || 0;
  layout.forEach(function (item, index) {
    var _calcPosition = calcPosition(index, col),
        x = _calcPosition.x,
        y = _calcPosition.y;

    var l = Math.round((width + marginX) * x);
    var t = Math.round((height + marginY) * y);

    if (left >= l && left <= l + width + marginX) {
      if (top >= t && top <= t + height + marginY) {
        if (fixed.indexOf(item) < 0) {
          newIndex = index;
        }
      }
    }
  });
  return newIndex;
}

function calcPosition(index, col) {
  if (index < 0) {
    console.warn('请检查KEY是否正确');
    index = 0;
  }

  return {
    x: index % col,
    y: Math.floor(index / col)
  };
}

function move(list, fixed, direction) {
  var data = new Array(list.length).fill(undefined);
  list = list.filter(function (value, index) {
    if (fixed.indexOf(value) < 0) {
      return value;
    }

    data[index] = value;
  });

  if (direction) {
    data[data.length - 1] = list.shift();
  } else {
    data[0] = list.pop();
  }

  data.forEach(function (value, index) {
    if (value === undefined) {
      data[index] = list.shift();
    }
  });
  return data;
}

function sort(dataArr, fixedArr, from, to) {
  var min = Math.min(from, to);
  var max = Math.max(from, to);
  var a = dataArr.slice(0, min);
  var b = dataArr.slice(max + 1);
  var c = dataArr.slice(min, max + 1);
  var m = move(c, fixedArr, from < to);
  return [].concat(_toConsumableArray(a), _toConsumableArray(m), _toConsumableArray(b));
}