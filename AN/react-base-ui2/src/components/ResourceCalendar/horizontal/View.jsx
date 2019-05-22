import React from 'react';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import cloneDeep from 'lodash/cloneDeep';
import classNames from 'classnames';
import Scroller from '../../../components/Scroller';
import Corner from '../common/Corner';
import Header from './Header';
import Band from './Band';
import Content from './Content';
import buildSegs from './segBuilder';

const ViewProps = {
  exclusiveMode: true
};

const MIN_HEIGHT = 48;
const EVENT_HEIGHT = 23;

class View extends React.PureComponent {
  static propTypes = ViewProps;

  constructor(props) {
    super(props);

    this.onContentResize = this.onContentResize.bind(this);
    this.state = {
      monthDates: [],
      segResources: [],
      rowHeight: 0,
      built: false
    };
  }

  componentDidMount() {
    this.build(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { displayDate, resources, events, exclusiveMode } = nextProps;

    let rebuild = false;
    if (!isEqual(resources, this.props.resources)) {
      rebuild = true;
    }

    if (rebuild || !isEqual(events, this.props.events)) {
      rebuild = true;
    }

    if (rebuild || (moment(displayDate).diff(moment(this.props.displayDate), 'months') !== 0)) {
      rebuild = true;
    }

    if (rebuild || exclusiveMode !== this.props.exclusiveMode) {
      rebuild = true;
    }

    if (rebuild) {
      this.build(nextProps);
    }
  }

  build(props) {
    const { displayDate, resources, events, exclusiveMode, eventOrder } = props;
    const { monthDates, segResources } =
      buildSegs(displayDate, resources, events, exclusiveMode, eventOrder);

    const rowHeight = this.calcRowHeight(resources);
    this.updateVisibility(monthDates, segResources, rowHeight);

    this.setState({
      monthDates,
      segResources,
      rowHeight,
      built: true
    });
  }


  onContentResize() {
    this.updateRowHeight();
  }

  updateRowHeight() {
    const { monthDates, segResources, rowHeight } = this.state;
    const newRowHeight = this.calcRowHeight();

    if (!isEmpty(monthDates) &&
        !isEmpty(segResources) &&
        newRowHeight > 0 &&
        newRowHeight !== rowHeight) {
      this.updateVisibility(monthDates, segResources, newRowHeight);

      this.setState({
        monthDates,
        segResources: cloneDeep(segResources),
        rowHeight: newRowHeight,
        built: true
      });
    }
  }

  calcRowHeight(resources) {
    resources = resources || this.props.resources;
    const count = resources.length;
    if (count > 0 && this.scroller) {
      const size = this.scroller.getContentSize();
      const contentHeight = size.height;
      const rowHeight = Math.max(MIN_HEIGHT, Math.floor(contentHeight / count));

      return rowHeight;
    }

    return 0;
  }

  updateVisibility(monthDates, segResources, rowHeight) {
    monthDates = monthDates || this.state.monthDates;
    segResources = segResources || this.state.segResources;
    rowHeight = rowHeight || this.state.rowHeight;

    if (!isEmpty(monthDates) && !isEmpty(segResources) && rowHeight > 0) {
      const maxEvents = Math.floor(rowHeight / EVENT_HEIGHT);
      const moreLevel = maxEvents - 1;
      forEach(segResources, (resource) => {
        forEach(resource.dates, (dateInfo) => {
          const { segs, levels, count } = dateInfo;
          forEach(segs, (s) => {
            s.display = false;
            const display = s.level < moreLevel || (s.level === moreLevel && count === maxEvents);
            s.display = display;
          });

          let countMore = 0;
          forEach(levels, (seg) => {
            if (!seg.display) {
              countMore += 1;
            }
          });

          dateInfo.more = countMore;
          dateInfo.moreLevel = moreLevel;

          if (count >= maxEvents) {
            const s = levels[moreLevel];
            if (s && s.display && s.owner && s.owner !== dateInfo) {
              s.display = false;
              s.owner.more += 1;
            }
          }
        });
      });
    }
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      cornerLabel,
      displayDate,
      currentDate = moment(),
      dateFormat = 'DD ddd',
      resources,
      events,
      onResourceRemove,
      onDateHeaderClick,
      onResourceHeaderClick,
      onEventOpen,
      onScroll,
      ...rest
    } = this.props;

    const { className, style, theme = '' } = this.props;
    const themeClass = theme ? `theme-${theme}` : '';
    const classes = classNames(
      'an-rc an-rc-horizontal',
      themeClass,
      className
    );

    const {
      monthDates,
      segResources,
      rowHeight
    } = this.state;

    const header = (
      <Header
        dates={monthDates}
        currentDate={currentDate}
        dateFormat={dateFormat}
        onDateHeaderClick={onDateHeaderClick}
      />
    );

    const band = (
      <Band
        resources={segResources}
        onRemove={onResourceRemove}
        onResourceHeaderClick={onResourceHeaderClick}
        rowHeight={rowHeight}
      />
    );

    const content = (
      <Content
        resources={segResources}
        dates={monthDates}
        currentDate={currentDate}
        onEventOpen={onEventOpen}
        rowHeight={rowHeight}
        {...rest}
      />
    );

    return (<Scroller
      ref={(c) => { this.scroller = c; }}
      className={classes}
      style={style}
      corner={(<Corner cornerLabel={cornerLabel} />)}
      header={header}
      band={band}
      content={content}
      onContentResize={this.onContentResize}
      onScroll={onScroll}
    />);
  }
}

export default View;
