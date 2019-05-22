'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _propTypes = require('prop-types');
var _Item = require('./Item');var _Item2 = _interopRequireDefault(_Item);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                        * Default PropTypes for Breadcrumb
                                                                                                                                                                        */
var BreadcrumbPropTypes = {
  /**
                             * The path separator
                             */
  separator: _propTypes.string,
  /**
                                 * Array of routes definition.
                                */
  routes: _propTypes.array,
  /**
                             * Hash object that stores the path params
                            */
  params: _propTypes.object };


var BreadcrumbProps = {
  separator: '>',
  routes: [] };


/** UI component that displays path in Breadcrumb. */var
Breadcrumb = function (_React$Component) {(0, _inherits3.default)(Breadcrumb, _React$Component);function Breadcrumb() {(0, _classCallCheck3.default)(this, Breadcrumb);return (0, _possibleConstructorReturn3.default)(this, (Breadcrumb.__proto__ || (0, _getPrototypeOf2.default)(Breadcrumb)).apply(this, arguments));}(0, _createClass3.default)(Breadcrumb, [{ key: 'render', value: function render()




    {
      var paths = [];var _props =







      this.props,routes = _props.routes,params = _props.params,className = _props.className,separator = _props.separator,children = _props.children,rest = (0, _objectWithoutProperties3.default)(_props, ['routes', 'params', 'className', 'separator', 'children']);var _ref =

      routes[routes.length - 1] || {},breadcrumbOptions = _ref.breadcrumbOptions;var _ref2 =
      breadcrumbOptions || {},hideIndex = _ref2.hideIndex;
      var validRoutes = routes.filter(function (route) {return !!route.path;});
      return (
        _react2.default.createElement('ul', (0, _extends3.default)({},
          rest, {
            className: (0, _classnames2.default)('an-breadcrumb', className) }),






          validRoutes.map(function (route, i) {
            if (hideIndex && hideIndex.indexOf(i) !== -1) {
              return undefined;
            }var
            path = route.path;
            path = path.replace(/^\//, '');

            params && (0, _keys2.default)(params).forEach(function (p) {
              path = path.replace(':' + p, params[p]);
            });

            var isLast = validRoutes.length === i + 1;
            if (path) {
              paths.push(path);
            }var _ref3 =
            route.breadcrumbOptions || {},name = _ref3.name,_ref3$href = _ref3.href,href = _ref3$href === undefined ? '' : _ref3$href;
            var link = '';
            if (!href && i + 1 < validRoutes.length) {
              link = '/' + paths.join('/');
            }
            if (isLast) {
              link = '';
            }

            return name ?
            _react2.default.createElement(_Item2.default, {
                separator: separator,
                key: i,
                href: href,
                link: link,
                isLast: isLast },

              name) :

            undefined;
          }),






          _react2.default.Children.map(children, function (child) {return _react2.default.cloneElement(child, {
              separator: separator });})));




    } }]);return Breadcrumb;}(_react2.default.Component);Breadcrumb.displayName = 'Breadcrumb';Breadcrumb.defaultProps = BreadcrumbProps;Breadcrumb.propTypes = BreadcrumbPropTypes;exports.default =



Breadcrumb;module.exports = exports['default'];