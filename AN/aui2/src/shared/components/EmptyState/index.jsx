import React from 'react';
import classNames from 'classnames';
import './index.less';

export default ({ icon, title, desc, size = 'lg' }) => {
  const prefixCls = 'empty-state';
  const cls = classNames(prefixCls, {
    [`${prefixCls}--xs`]: size === 'xs',
    [`${prefixCls}--sm`]: size === 'sm',
    [`${prefixCls}--m`]: size === 'm',
    [`${prefixCls}--lg`]: size === 'lg'
  });

  return (
    <div
      className={cls}
    >
      <i
        className={classNames('icon', {
          'icon-search-thin': !icon,
          [icon]: icon
        })}
      />
      <div className={`${prefixCls}__title`}>{title}</div>
      {desc && <div className={`${prefixCls}__desc`}>{desc}</div>}
    </div>
  );
};
