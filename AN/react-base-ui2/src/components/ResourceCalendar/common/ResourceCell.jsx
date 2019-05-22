import React from 'react';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import { enableClearable, disableClearable } from '../../../services/decoration';
import { Trigger } from '../../../consts';

class ResourceCell extends React.PureComponent {

  componentDidMount() {
    const { onClear, resource } = this.props;

    enableClearable(this.cell, {
      trigger: Trigger.HOVER,
      noEffect: true,
      onClear: () => {
        isFunction(onClear) && onClear(resource);
      }
    });
  }

  componentWillUnmount() {
    disableClearable(this.cell);
  }

  onResourceHeaderClick(e, resource) {
    e.stopPropagation();

    const { onResourceHeaderClick } = this.props;
    if (isFunction(onResourceHeaderClick)) {
      onResourceHeaderClick(e, resource);
    }
  }

  render() {
    const { resource, isHeader = true, onResourceHeaderClick } = this.props;
    const { type = 'facility', label } = resource;
    const t = type.toLowerCase();
    const l = (label || type).toUpperCase().split('')[0];
    return (
      isHeader ?
      (
        <th
          className="grid-cell resource-cell"
          ref={(c) => { this.cell = c; }}
        >
          <div className="cell-content">
            <span className={`resource-tag resource-tag-${t}`}>
              {l}
            </span>
            <span
              className={classNames('resource-name', { 'an-rc-clickable': isFunction(onResourceHeaderClick) })}
              onClick={e => this.onResourceHeaderClick(e, resource)}
            >
              {resource.name}
            </span>
          </div>
        </th>
      ) :
      (
        <td
          className="grid-cell"
          ref={(c) => { this.cell = c; }}
        >
          <span className={`resource-tag resource-tag-${t}`}>
            {l}
          </span>
          <span
            className={classNames('resource-name', { 'an-rc-clickable': isFunction(onResourceHeaderClick) })}
            onClick={e => this.onResourceHeaderClick(e, resource)}
          >
            {resource.name}
          </span>
        </td>
      )
    );
  }
}


export default ResourceCell;
