import React from 'react';
import classNames from 'classnames';
import Collapse from 'react-base-ui/lib/components/Collapse';

import './index.less';

export default class Section extends React.PureComponent {
  render() {
    const { name, expanded, className, disabled, title, onChange } = this.props;

    return (
      <Collapse
        className={classNames(className, {
          section: true,
          section__disabled: disabled,
          [`${name}-section`]: true
        })}
        activeKey={expanded ? name : undefined}
        onChange={onChange}
        isPanelHeaderFocusable
      >
        <Collapse.Panel
          key={name}
          Header={title}
          disabled={disabled}
          ariaLableCollapse={`Section ${title} expand detail clickable arrow`}
          ariaLableExpand={`Section ${title} collapse detail clickable arrow`}
        >
          <div className="section__body">
            {this.props.children}
          </div>
        </Collapse.Panel>
      </Collapse>
    );
  }
}

