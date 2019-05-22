import React from 'react';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import findIndex from 'lodash/findIndex';
import slice from 'lodash/slice';
import { toDate, getEndOfDay } from '../common/utils';
import { findAncestor } from '../../../utils/dom';
import SelectScroll from '../utils/selectScroll';
import DateCell from './DateCell';

class Content extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onMarqueeStart = this.onMarqueeStart.bind(this);
    this.onMarqueeEnd = this.onMarqueeEnd.bind(this);
  }

  componentDidMount() {
    const scrollContainer = document.querySelector('.an-scroller__content .an-scroller-pane');

    this.selectScroller = new SelectScroll(this.container, {
      deSelectableClasses: ['an-rc-event'],
      selectableClass: 'grid-cell',
      scrollContainer,
      onStart: this.onMarqueeStart,
      onEnd: this.onMarqueeEnd
    });
  }

  componentWillUnmount() {
    this.selectScroller.disable();
    this.selectScroller = null;
  }

  getDateCellInfo(target) {
    const info = target && target.getAttribute('data-info');
    if (info) {
      const a = info.split('/');
      if (a && a.length === 2) {
        const resourceId = a[0];
        const date = toDate(a[1]);

        return {
          resourceId,
          date
        };
      }
    }

    return null;
  }

  onMarqueeStart(e, targetCell) {
    this.startCellInfo = this.getDateCellInfo(targetCell);
  }

  onMarqueeEnd(e, targetCell) {
    const endCellInfo = this.getDateCellInfo(targetCell);

    const { onMarqueeEnd, resources, exclusiveMode } = this.props;
    if (isFunction(onMarqueeEnd) && this.startCellInfo && endCellInfo) {
      let startIndex = findIndex(resources, r => r.id === this.startCellInfo.resourceId);
      let endIndex = findIndex(resources, r => r.id === endCellInfo.resourceId);
      if (startIndex > endIndex) {
        [startIndex, endIndex] = [endIndex, startIndex];
      }
      const selectedResources = slice(resources, startIndex, endIndex + 1);

      let startDate = this.startCellInfo.date.clone();
      let endDate = endCellInfo.date.clone();
      if (startDate.isAfter(endDate)) {
        [startDate, endDate] = [endDate, startDate];
      }

      startDate.startOf('day');
      endDate = getEndOfDay(endDate, exclusiveMode);

      onMarqueeEnd({
        resources: selectedResources,
        startDate,
        endDate
      });
    }

    delete this.startCellInfo;
  }

  onDateDoubleClick(e) {
    const targetCell = findAncestor(e.target, 'an-rc-date');
    this.onMarqueeStart(e, targetCell);
    this.onMarqueeEnd(e, targetCell);
  }

  renderRow(resource) {
    // eslint-disable-next-line
    const { currentDate, dates, resources, rowHeight, ...rest } = this.props;
    const style = {};
    if (rowHeight > 0) {
      style.height = `${rowHeight}px`;
    }

    return (
      <tr className="grid-row" style={style} key={`content_${resource.key}`}>
        {
          dates.map((date) => {
            const isToday = currentDate ? currentDate.isSame(date.value, 'day') : false;
            const isWeekend = (date.value.day() === 0 || date.value.day() === 6);
            const isSunday = date.value.day() === 0;
            const classes = classNames(
              'grid-cell an-rc-date',
              {
                today: isToday,
                weekend: isWeekend,
                'is-sunday': isSunday
              });

            return (
              <td
                className={classes}
                data-info={`${resource.key}/${date.key}`}
                key={`${resource.key}/${date.key}`}
                onDoubleClick={e => this.onDateDoubleClick(e)}
              >
                <DateCell
                  date={date}
                  resource={resource}
                  rowHeight={rowHeight}
                  {...rest}
                />
              </td>
            );
          })
        }
      </tr>
    );
  }

  render() {
    const { resources = [] } = this.props;
    return (
      <table
        className="an-rc-grid an-rc-grid-content"
        ref={(c) => { this.container = c; }}
      >
        <tbody>
          {
            resources.map(resource => (
              this.renderRow(resource)
            ))
          }
        </tbody>
      </table>
    );
  }
}


export default Content;
