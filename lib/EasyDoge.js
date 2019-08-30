"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Doge = _interopRequireDefault(require("./Doge"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var number = _propTypes["default"].number,
    string = _propTypes["default"].string,
    bool = _propTypes["default"].bool,
    array = _propTypes["default"].array,
    func = _propTypes["default"].func;

var EasyDoge =
/*#__PURE__*/
function (_Component) {
  _inherits(EasyDoge, _Component);

  function EasyDoge() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EasyDoge);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EasyDoge)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      index: -1,
      layout: [],
      // 布局的KEY顺序
      tmpArr: [] // 临时数组

    };

    _this.getDoge = function (child) {
      var _this$props = _this.props,
          width = _this$props.width,
          height = _this$props.height,
          fixed = _this$props.fixed,
          draggable = _this$props.draggable,
          margin = _this$props.margin,
          col = _this$props.col;
      var _this$state = _this.state,
          layout = _this$state.layout,
          tmpArr = _this$state.tmpArr;
      var list = _this.state.index >= 0 ? tmpArr : layout;
      var index = list.indexOf(child.key);

      var _calcPosition = (0, _utils.calcPosition)(index, col),
          x = _calcPosition.x,
          y = _calcPosition.y;

      var isFixed = fixed.indexOf(child.key) >= 0;
      var canDrag = draggable && !isFixed;
      return _react["default"].createElement(_Doge["default"], {
        width: width,
        height: height,
        draggable: canDrag,
        margin: margin,
        x: x,
        y: y,
        index: index,
        onDragStart: _this.onDragStart,
        onDragMove: _this.onDragMove,
        onDragStop: _this.onDragStop
      }, child);
    };

    _this.onDragStart = function (_ref, index) {
      var left = _ref.left,
          top = _ref.top;

      _this.setState({
        index: index,
        tmpArr: _this.state.layout
      });
    };

    _this.onDragMove = function (_ref2) {
      var left = _ref2.left,
          top = _ref2.top;
      var _this$props2 = _this.props,
          fixed = _this$props2.fixed,
          margin = _this$props2.margin,
          width = _this$props2.width,
          height = _this$props2.height,
          col = _this$props2.col;
      var _this$state2 = _this.state,
          index = _this$state2.index,
          layout = _this$state2.layout;
      var posLeft = left + width / 2;
      var posTop = top + height / 2;
      var newIndex = (0, _utils.getCurrentIndex)(posLeft, posTop, {
        layout: layout,
        fixed: fixed,
        margin: margin,
        width: width,
        height: height,
        col: col
      });

      if (newIndex < 0) {
        newIndex = index;
      }

      _this.setState({
        tmpArr: (0, _utils.sort)(layout, fixed, index, newIndex)
      });
    };

    _this.onDragStop = function () {
      var tmpArr = _this.state.tmpArr;

      _this.setState({
        index: -1,
        layout: tmpArr,
        tmpArr: []
      });

      if (_this.props.onLayoutChange) {
        _this.props.onLayoutChange(tmpArr);
      }
    };

    return _this;
  }

  _createClass(EasyDoge, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.initLayoutMap(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps, nextContext) {
      this.initLayoutMap(nextProps);
    }
  }, {
    key: "initLayoutMap",
    value: function initLayoutMap(props) {
      var layout = [];

      _react["default"].Children.map(props.children, function (child) {
        layout.push(child.key);
      });

      this.setState({
        layout: layout
      });
      console.log('重新初始化布局', layout);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          className = _this$props3.className,
          style = _this$props3.style,
          height = _this$props3.height,
          margin = _this$props3.margin,
          col = _this$props3.col;
      var layout = this.state.layout;
      var totalHeight = (height + margin[0]) * (Math.floor((layout.length - 1) / col) + 1);
      var classNames = (0, _utils.getClassNames)('easy-doge', className);

      var styleNames = _objectSpread({
        height: totalHeight
      }, style);

      return _react["default"].createElement("div", {
        className: classNames,
        style: styleNames
      }, _react["default"].Children.map(this.props.children, function (child) {
        return _this2.getDoge(child);
      }));
    }
  }]);

  return EasyDoge;
}(_react.Component);

EasyDoge.propTypes = {
  col: number,
  fixed: array,
  // 不可移动的Key数组
  width: number,
  height: number,
  margin: array,
  draggable: bool,
  useCSSTransforms: bool,
  onLayoutChange: func,
  children: function children(props, propName) {
    var children = props[propName];
    var keys = {};

    _react["default"].Children.forEach(children, function (child) {
      if (keys[child.key]) {
        throw new Error('Duplicate child key "' + child.key + '" found! This will cause problems in ReactGridLayout.');
      }

      keys[child.key] = true;
    });
  },
  className: string
};
EasyDoge.defaultProps = {
  col: 1,
  fixed: [],
  width: 100,
  height: 100,
  margin: [10, 10],
  draggable: true,
  useCSSTransforms: true
};
var _default = EasyDoge;
exports["default"] = _default;