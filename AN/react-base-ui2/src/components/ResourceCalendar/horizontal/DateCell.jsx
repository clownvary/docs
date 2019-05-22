import React from 'react';
import isFunction from 'lodash/isFunction';
import SelectionManager from '../common/SelectionManager';

class DateCell extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  expand() {
  }

  close() {
  }

  onSegMouseEnter(e, seg) {
    const { onSegMouseEnter } = this.props;
    if (isFunction(onSegMouseEnter)) {
      onSegMouseEnter(e, seg);
    }
  }

  onSegMouseLeave(e, seg) {
    const { onSegMouseLeave } = this.props;
    if (isFunction(onSegMouseLeave)) {
      onSegMouseLeave(e, seg);
    }
  }

  onSegClick(e, seg) {
    SelectionManager.select(seg);
    e.stopPropagation();

    const { onSelectionChange } = this.props;
    if (isFunction(onSelectionChange)) {
      onSelectionChange([seg]);
    }
  }

  onClick() {
    SelectionManager.clear();

    const { onSelectionChange } = this.props;
    if (isFunction(onSelectionChange)) {
      onSelectionChange([]);
    }
  }

  onBlur() {
    this.close();
  }

  onEventOpen(e, seg) {
    const { onEventOpen } = this.props;
    if (isFunction(onEventOpen)) {
      onEventOpen(e, seg);
      e.stopPropagation();
    }
  }

  renderCell(resource, date) {
    const {
      showTooltip = false,
      onMoreClick
    } = this.props;

    const dateInfo = resource.dates[date.key] || {
      segs: [],
      count: 0,
      levels: {},
      more: 0,
      moreLevel: 0
    };

    const { segs, more, moreLevel } = dateInfo;

    const result = segs.map((s) => {
      if (s.display) {
        const {
               customBlockStyle,
               customIconStyle,
               icon,
               key,
               text,
               eventKey,
               type,
               level,
               span,
               state,
               editable
              } = s;

        const className = `an-rc-event an-rc-event-seg seg-type-${type} seg-level-${level} seg-span-${span} seg-state-${state} ${editable ? 'editable' : ''}`;

        customBlockStyle.top = top;

        // customBlockStyle and customIconStyle can't apply the event at the same time.
        // Should use customBlockStyle when event duration >= 24 hours
        // Should use customIconStyle when event duration < 24 hours

        return (
          <div
            style={icon ? { top } : customBlockStyle}
            className={className}
            key={key}
            title={showTooltip ? text : undefined}
            data-event-id={eventKey}
            onMouseEnter={e => this.onSegMouseEnter(e, s)}
            onMouseLeave={e => this.onSegMouseLeave(e, s)}
            onClick={e => this.onSegClick(e, s)}
            onDoubleClick={e => this.onEventOpen(e, s)}
          >
            {icon && <i className={`icon ${icon}`} style={customIconStyle} />} <span>{text}</span>
          </div>
        );
      }
      return null;
    });

    if (more > 0) {
      result.push((
        <span
          className={`an-rc-event seg-more seg-level-${moreLevel}`}
          key={`${resource.key}/${date.key}_more`}
        >
          <a
            onMouseDown={(e) => {
              let handled = false;
              if (isFunction(onMoreClick)) {
                handled = onMoreClick({
                  date,
                  resource
                });
              }

              if (!handled) {
                e.preventDefault();
                e.stopPropagation();
                this.expand();
                this.container.focus();
              }
            }}
            onMouseUp={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >{`+${more} more`}</a>
        </span>));
    }

    return result;
  }

  render() {
    const { date, resource, rowHeight } = this.props;

    const style = {};
    if (rowHeight > 0) {
      style.height = `${rowHeight - 2}px`;
    }
    return (
      <div
        style={style}
        className="cell-content"
        ref={(c) => { this.container = c; }}
        onBlur={this.onBlur}
        onClick={this.onClick}
        tabIndex={-1}
      >
        {this.renderCell(resource, date)}
      </div>
    );
  }
}


export default DateCell;
