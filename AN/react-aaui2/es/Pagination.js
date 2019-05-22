import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import { number, string, func, node, oneOf, oneOfType } from 'prop-types';
import classnames from 'classnames';

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
      rest = _objectWithoutProperties(_ref, ['type', 'theme', 'total', 'current', 'around', 'url', 'roundText', 'startText', 'endText', 'linkElement', 'className']);

  var classes = classnames((_classnames = {}, _classnames[type] = true, _classnames['pagination--' + theme] = type === 'pagination' && theme, _classnames), className);

  return React.createElement(
    'ul',
    _extends({ className: classes }, rest),
    pageData(type, theme, total, current, around, url, roundText, startText, endText).map(function (_ref2, i) {
      var text = _ref2.text,
          href = _ref2.href,
          label = _ref2.label;

      if (href && +text !== current) {
        return React.createElement(
          'li',
          { key: i },
          React.createElement(
            A,
            { href: href, 'aria-label': label },
            text
          )
        );
      }

      var liClasses = classnames({
        active: +text === current
      });

      return React.createElement(
        'li',
        { key: i, className: liClasses, 'aria-label': label },
        React.createElement(
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
  className: string,
  type: oneOf(['pagination', 'pager']),
  theme: string,
  total: number,
  current: number,
  around: number,
  startText: node,
  endText: node,
  roundText: node,
  url: oneOfType([string, func]),
  linkElement: oneOfType([func, node])
};
Pagination.defaultProps = {
  type: 'pagination',
  url: '',
  around: 3,
  linkElement: 'a',
  roundText: '...',
  startText: React.createElement('span', { className: 'icon-chevron-left' }),
  endText: React.createElement('span', { className: 'icon-chevron-right' })
};

export default Pagination;