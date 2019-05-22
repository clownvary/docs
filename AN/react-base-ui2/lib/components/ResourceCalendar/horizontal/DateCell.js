'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _SelectionManager = require('../common/SelectionManager');var _SelectionManager2 = _interopRequireDefault(_SelectionManager);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

DateCell = function (_React$PureComponent) {(0, _inherits3.default)(DateCell, _React$PureComponent);
  function DateCell(props) {(0, _classCallCheck3.default)(this, DateCell);var _this = (0, _possibleConstructorReturn3.default)(this, (DateCell.__proto__ || (0, _getPrototypeOf2.default)(DateCell)).call(this,
    props));

    _this.onClick = _this.onClick.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);return _this;
  }(0, _createClass3.default)(DateCell, [{ key: 'expand', value: function expand()

    {
    } }, { key: 'close', value: function close()

    {
    } }, { key: 'onSegMouseEnter', value: function onSegMouseEnter(

    e, seg) {var
      onSegMouseEnter = this.props.onSegMouseEnter;
      if ((0, _isFunction2.default)(onSegMouseEnter)) {
        onSegMouseEnter(e, seg);
      }
    } }, { key: 'onSegMouseLeave', value: function onSegMouseLeave(

    e, seg) {var
      onSegMouseLeave = this.props.onSegMouseLeave;
      if ((0, _isFunction2.default)(onSegMouseLeave)) {
        onSegMouseLeave(e, seg);
      }
    } }, { key: 'onSegClick', value: function onSegClick(

    e, seg) {
      _SelectionManager2.default.select(seg);
      e.stopPropagation();var

      onSelectionChange = this.props.onSelectionChange;
      if ((0, _isFunction2.default)(onSelectionChange)) {
        onSelectionChange([seg]);
      }
    } }, { key: 'onClick', value: function onClick()

    {
      _SelectionManager2.default.clear();var

      onSelectionChange = this.props.onSelectionChange;
      if ((0, _isFunction2.default)(onSelectionChange)) {
        onSelectionChange([]);
      }
    } }, { key: 'onBlur', value: function onBlur()

    {
      this.close();
    } }, { key: 'onEventOpen', value: function onEventOpen(

    e, seg) {var
      onEventOpen = this.props.onEventOpen;
      if ((0, _isFunction2.default)(onEventOpen)) {
        onEventOpen(e, seg);
        e.stopPropagation();
      }
    } }, { key: 'renderCell', value: function renderCell(

    resource, date) {var _this2 = this;var _props =



      this.props,_props$showTooltip = _props.showTooltip,showTooltip = _props$showTooltip === undefined ? false : _props$showTooltip,onMoreClick = _props.onMoreClick;

      var dateInfo = resource.dates[date.key] || {
        segs: [],
        count: 0,
        levels: {},
        more: 0,
        moreLevel: 0 };var


      segs = dateInfo.segs,more = dateInfo.more,moreLevel = dateInfo.moreLevel;

      var result = segs.map(function (s) {
        if (s.display) {var

          customBlockStyle =










          s.customBlockStyle,customIconStyle = s.customIconStyle,icon = s.icon,key = s.key,text = s.text,eventKey = s.eventKey,type = s.type,level = s.level,span = s.span,state = s.state,editable = s.editable;

          var className = 'an-rc-event an-rc-event-seg seg-type-' + type + ' seg-level-' + level + ' seg-span-' + span + ' seg-state-' + state + ' ' + (editable ? 'editable' : '');

          customBlockStyle.top = top;

          // customBlockStyle and customIconStyle can't apply the event at the same time.
          // Should use customBlockStyle when event duration >= 24 hours
          // Should use customIconStyle when event duration < 24 hours

          return (
            _react2.default.createElement('div', {
                style: icon ? { top: top } : customBlockStyle,
                className: className,
                key: key,
                title: showTooltip ? text : undefined,
                'data-event-id': eventKey,
                onMouseEnter: function onMouseEnter(e) {return _this2.onSegMouseEnter(e, s);},
                onMouseLeave: function onMouseLeave(e) {return _this2.onSegMouseLeave(e, s);},
                onClick: function onClick(e) {return _this2.onSegClick(e, s);},
                onDoubleClick: function onDoubleClick(e) {return _this2.onEventOpen(e, s);} },

              icon && _react2.default.createElement('i', { className: 'icon ' + icon, style: customIconStyle }), ' ', _react2.default.createElement('span', null, text)));


        }
        return null;
      });

      if (more > 0) {
        result.push(
        _react2.default.createElement('span', {
            className: 'an-rc-event seg-more seg-level-' + moreLevel,
            key: resource.key + '/' + date.key + '_more' },

          _react2.default.createElement('a', {
              onMouseDown: function onMouseDown(e) {
                var handled = false;
                if ((0, _isFunction2.default)(onMoreClick)) {
                  handled = onMoreClick({
                    date: date,
                    resource: resource });

                }

                if (!handled) {
                  e.preventDefault();
                  e.stopPropagation();
                  _this2.expand();
                  _this2.container.focus();
                }
              },
              onMouseUp: function onMouseUp(e) {
                e.preventDefault();
                e.stopPropagation();
              } }, '+' +
            more + ' more')));

      }

      return result;
    } }, { key: 'render', value: function render()

    {var _this3 = this;var _props2 =
      this.props,date = _props2.date,resource = _props2.resource,rowHeight = _props2.rowHeight;

      var style = {};
      if (rowHeight > 0) {
        style.height = rowHeight - 2 + 'px';
      }
      return (
        _react2.default.createElement('div', {
            style: style,
            className: 'cell-content',
            ref: function ref(c) {_this3.container = c;},
            onBlur: this.onBlur,
            onClick: this.onClick,
            tabIndex: -1 },

          this.renderCell(resource, date)));


    } }]);return DateCell;}(_react2.default.PureComponent);exports.default =



DateCell;module.exports = exports['default'];