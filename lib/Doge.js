"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDraggable = _interopRequireDefault(require("react-draggable"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var number = _propTypes["default"].number,
    bool = _propTypes["default"].bool,
    array = _propTypes["default"].array,
    func = _propTypes["default"].func;

var Doge =
/*#__PURE__*/
function (_Component) {
  _inherits(Doge, _Component);

  function Doge() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Doge);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Doge)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      x: 0,
      y: 0,
      position: {},
      margin: [0, 0, 0, 0],
      dragging: null
    };

    _this.onDragStart = function (e, _ref) {
      var node = _ref.node,
          deltaX = _ref.deltaX,
          deltaY = _ref.deltaY;
      var offsetParent = node.offsetParent;
      if (!offsetParent) return;
      var position = {
        left: 0,
        top: 0
      };
      var parentRect = offsetParent.getBoundingClientRect();
      var clientRect = node.getBoundingClientRect();
      position.left = clientRect.left - parentRect.left + offsetParent.scrollLeft;
      position.top = clientRect.top - parentRect.top + offsetParent.scrollTop;

      _this.setState({
        dragging: position
      });

      if (_this.props.onDragStart) {
        _this.props.onDragStart(position, _this.props.index);
      }
    };

    _this.onDragMove = function (e, _ref2) {
      var node = _ref2.node,
          deltaX = _ref2.deltaX,
          deltaY = _ref2.deltaY;

      if (!_this.state.dragging) {
        return;
      }

      var position = {
        left: 0,
        top: 0
      };
      position.left = _this.state.dragging.left + deltaX;
      position.top = _this.state.dragging.top + deltaY;

      _this.setState({
        dragging: position
      });

      if (_this.props.onDragMove) {
        _this.props.onDragMove(position, _this.props.index);
      }
    };

    _this.onDragStop = function (e, _ref3) {
      var node = _ref3.node,
          deltaX = _ref3.deltaX,
          deltaY = _ref3.deltaY;

      if (!_this.state.dragging) {
        return;
      }

      var position = {
        left: 0,
        top: 0
      };
      position.left = _this.state.dragging.left;
      position.top = _this.state.dragging.top;

      _this.setState({
        dragging: null
      });

      if (_this.props.onDragStop) {
        _this.props.onDragStop(position, _this.props.index);
      }
    };

    _this.calcPosition = function () {
      var _this$props = _this.props,
          _this$props$margin = _this$props.margin,
          margin = _this$props$margin === void 0 ? [] : _this$props$margin,
          x = _this$props.x,
          y = _this$props.y,
          width = _this$props.width,
          height = _this$props.height;
      var left = Math.round((width + (margin[0] || 0)) * x);
      var top = Math.round((height + (margin[1] || 0)) * y);
      return {
        left: left || 0,
        top: top || 0,
        width: width,
        height: height
      };
    };

    return _this;
  }

  _createClass(Doge, [{
    key: "render",
    value: function render() {
      var draggable = this.props.draggable;
      var position = this.calcPosition();

      var child = _react["default"].Children.only(this.props.children);

      var el = _react["default"].cloneElement(child, {
        className: (0, _utils.getClassNames)('doge', child.props.className, {
          'doge': true
        })
      });

      return this.mixinDraggable(el, position, !draggable);
    }
  }, {
    key: "mixinDraggable",
    value: function mixinDraggable(child, pos, disabled) {
      var position = {
        x: pos.left,
        y: pos.top
      };
      return _react["default"].createElement(_reactDraggable["default"], {
        position: position,
        disabled: disabled,
        onStart: this.onDragStart,
        onDrag: this.onDragMove,
        onStop: this.onDragStop,
        handle: this.props.handle,
        cancel: ".react-resizable-handle" + (this.props.cancel ? "," + this.props.cancel : "")
      }, child);
    }
  }]);

  return Doge;
}(_react.Component);

Doge.propTypes = {
  x: number,
  y: number,
  index: number,
  width: number,
  height: number,
  margin: array,
  draggable: bool,
  onDragStart: func,
  onDragMove: func,
  onDragStop: func
};
var _default = Doge;
exports["default"] = _default;