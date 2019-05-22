'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes.string,
  style: _propTypes.object,
  data: _propTypes.array,
  links: _propTypes.bool,
  steps: _propTypes.bool,
  active: _propTypes.number,
  past: _propTypes.number,
  priority: _propTypes.string,
  title: _propTypes.string,
  linkElement: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.element])
};

var defaultProps = {
  priority: '5',
  steps: false,
  linkElement: 'a'
};

var Sidebar = function Sidebar(_ref) {
  var className = _ref.className,
      style = _ref.style,
      _ref$data = _ref.data,
      data = _ref$data === undefined ? [] : _ref$data,
      steps = _ref.steps,
      active = _ref.active,
      past = _ref.past,
      priority = _ref.priority,
      title = _ref.title,
      links = _ref.links,
      A = _ref.linkElement;

  var classes = (0, _classnames2.default)({
    sidebar: true,
    'sidebar--links': links
  }, className);
  var HeaderElement = 'h' + priority;

  return _react2.default.createElement(
    'aside',
    { className: classes, style: style },
    _react2.default.createElement(
      HeaderElement,
      null,
      title
    ),
    _react2.default.createElement(
      'ul',
      null,
      data.map(function (item, i) {
        var stepNum = steps ? i + 1 + '.' : undefined;
        var linkClasses = (0, _classnames2.default)({
          active: i === active,
          past: i === past
        });

        return _react2.default.createElement(
          'li',
          { key: i },
          _react2.default.createElement(
            A,
            { className: linkClasses, href: item.href },
            stepNum,
            ' ',
            item.text
          )
        );
      })
    )
  );
};

Sidebar.displayName = 'AUISidebar';
Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

exports.default = Sidebar;
module.exports = exports['default'];