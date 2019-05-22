'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pageData(type, theme, total, current, around, url, roundText, startText, endText) {
  function pageLink(page) {
    if (typeof url === 'function') {
      return url(page);
    }

    var pageLinkVar = typeof url === 'string' ? url : '';
    if (pageLinkVar.indexOf('?') > -1) {
      pageLinkVar += '&page';
    } else {
      pageLinkVar += '?page';
    }
    return pageLinkVar + '=' + page;
  }

  var start = 1;
  var end = total;
  var aroundStart = Math.max(current - around, start + 1);
  var aroundEnd = Math.min(current + around, end - 1);
  var data = [];

  switch (type) {
    case 'pager':
      if (current > start) {
        data.push({
          text: startText,
          href: pageLink(current - 1),
          label: 'Previous Page'
        });
      }
      if (current < end) {
        data.push({
          text: endText,
          href: pageLink(current + 1),
          label: 'Next Page'
        });
      }
      break;
    case 'pagination':
      if (current > start) {
        data.push({
          text: startText,
          href: pageLink(current - 1),
          label: 'Previous Page'
        });
      }
      /* eslint prefer-template: 0 */
      data.push({ text: '' + start, href: pageLink(start) });
      if (aroundStart - start > 1) {
        data.push({ text: roundText });
      }
      for (var i = aroundStart; i < current; i += 1) {
        data.push({ text: '' + i, href: pageLink(i) });
      }
      for (var _i = current !== start ? current : current + 1; _i <= aroundEnd; _i += 1) {
        data.push({ text: '' + _i, href: pageLink(_i) });
      }
      if (end - aroundEnd > 1) {
        data.push({ text: roundText });
      }
      data.push({ text: '' + end, href: pageLink(end) });
      if (current < end) {
        data.push({
          text: endText,
          href: pageLink(current + 1),
          label: 'Next Page'
        });
      }
      break;
    default:
      break;
  }
  return data;
}

var Pagination = function Pagination(_ref) {
  var _classnames;

  var type = _ref.type,
      theme = _ref.theme,
      total = _ref.total,
      current = _ref.current,
      around = _ref.around,
      url = _ref.url,
      roundText = _ref.roundText,
      startText = _ref.startText,
      endText = _ref.endText,
      A = _ref.linkElement,
      className = _ref.className,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['type', 'theme', 'total', 'current', 'around', 'url', 'roundText', 'startText', 'endText', 'linkElement', 'className']);

  var classes = (0, _classnames3.default)((_classnames = {}, _classnames[type] = true, _classnames['pagination--' + theme] = type === 'pagination' && theme, _classnames), className);

  return _react2.default.createElement(
    'ul',
    (0, _extends3.default)({ className: classes }, rest),
    pageData(type, theme, total, current, around, url, roundText, startText, endText).map(function (_ref2, i) {
      var text = _ref2.text,
          href = _ref2.href,
          label = _ref2.label;

      if (href && +text !== current) {
        return _react2.default.createElement(
          'li',
          { key: i },
          _react2.default.createElement(
            A,
            { href: href, 'aria-label': label },
            text
          )
        );
      }

      var liClasses = (0, _classnames3.default)({
        active: +text === current
      });

      return _react2.default.createElement(
        'li',
        { key: i, className: liClasses, 'aria-label': label },
        _react2.default.createElement(
          'span',
          null,
          text
        )
      );
    })
  );
};

Pagination.displayName = 'AUIPagination';
Pagination.propTypes = {
  className: _propTypes.string,
  type: (0, _propTypes.oneOf)(['pagination', 'pager']),
  theme: _propTypes.string,
  total: _propTypes.number,
  current: _propTypes.number,
  around: _propTypes.number,
  startText: _propTypes.node,
  endText: _propTypes.node,
  roundText: _propTypes.node,
  url: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.func]),
  linkElement: (0, _propTypes.oneOfType)([_propTypes.func, _propTypes.node])
};
Pagination.defaultProps = {
  type: 'pagination',
  url: '',
  around: 3,
  linkElement: 'a',
  roundText: '...',
  startText: _react2.default.createElement('span', { className: 'icon-chevron-left' }),
  endText: _react2.default.createElement('span', { className: 'icon-chevron-right' })
};

exports.default = Pagination;
module.exports = exports['default'];