import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import { cls } from 'shared/utils/func';

import './index.less';

function pageData(total, current, around, baseUrl, queryString, edgeCount) {
  function url(page) {
    return `${baseUrl}${queryString}=${page}`;
  }

  const fixedEdgeCount = (edgeCount && Math.min(edgeCount, total)) || 1;
  const start = 1;
  const end = total;
  const aroundStart = Math.max(current - around, fixedEdgeCount + 1);
  const aroundEnd = Math.min(current + around, end - fixedEdgeCount);
  const data = [];

  if (!total) return data;

  if (current > start) {
    data.push({ text: '<', href: url(current - 1), value: current - 1 });
  }

  for (let i = start; i <= fixedEdgeCount; i += 1) {
    data.push({ text: `${i}`, href: url(i), value: i });
  }

  if (fixedEdgeCount + 1 > total) {
    if (current < end) {
      data.push({ text: '>', href: url(current + 1), value: current + 1 });
    }
    return data;
  }

  if (aroundStart - fixedEdgeCount > 1) {
    data.push({ text: '...' });
  }

  for (let i = aroundStart; i < current; i += 1) {
    data.push({ text: `${i}`, href: url(i), value: i });
  }

  for (let i = (current > aroundStart ? current : aroundStart); i <= aroundEnd; i += 1) {
    data.push({ text: `${i}`, href: url(i), value: i });
  }

  if (end - aroundEnd > fixedEdgeCount) {
    data.push({ text: '...' });
  }

  for (let i = (end - aroundEnd <= fixedEdgeCount) ?
    Math.max(aroundEnd + 1, Math.max(current, aroundStart)) : (end - fixedEdgeCount) + 1;
       i <= end; i += 1) {
    data.push({ text: `${i}`, href: url(i), value: i });
  }

  if (current < end) {
    data.push({ text: '>', href: url(current + 1), value: current + 1 });
  }

  return data;
}

export default class Pagination extends UIComponent {
  render() {
    // please keep 'onChangePage' here, otherwise attrs will have this prop
    // it's a unknown prop for DOM, and will has a warning in browser
    const {
      className, theme, baseUrl, queryString, onChangePage, // eslint-disable-line no-unused-vars
      total, current, around, edgeCount, linkElement: A, ...attrs
    } = this.props;


    return (
      <div
        className={cls`aaui-pagination
                       aaui-pagination-theme-${theme}
                       ${className || ''}`}
        {...attrs}
      >
        {pageData(total, current, around, baseUrl, queryString, edgeCount)
          .map(({ text, href, value }, i) => {
            if (href && +text !== current) {
              return (
                <A
                  key={i}
                  href={href}
                  onClick={e => this.changePage(e, { value, href })}
                  className={cls`aaui-pagination-page
                    ${text === '<' || text === '>' ? 'aaui-pagination-page-np' : ''}
                    ${+text === current ? 'aaui-pagination-active' : ''}`}
                >
                  { Pagination.getPageButton(text, theme) }
                </A>
              );
            }
            return (
              <span
                key={i}
                className={cls`aaui-pagination-page ${+text === current ? 'aaui-pagination-active' : ''}`}
              >
                {text}
              </span>);
          })}
      </div>
    );
  }

  changePage(e, pageInfo) {
    const onChangePage = this.props.onChangePage;
    if (onChangePage && typeof onChangePage === 'function') {
      if (!pageInfo.value) {
        return false;
      }
      const isDefault = onChangePage(pageInfo);

      if (!isDefault) {
        e.preventDefault();
      }
    }
    return false;
  }

  static getPageButton(text, theme) {
    if (text === '<') {
      if (theme === 'b') {
        return 'Previous';
      }
      return (<span className="icon icon-chevron-left" />);
    }
    if (text === '>') {
      if (theme === 'b') {
        return 'Next';
      }
      return (<span className="icon icon-chevron-right" />);
    }
    return text;
  }
}

Pagination.defaultProps = {
  around: 3,
  linkElement: 'a',
  theme: 'a'
};
