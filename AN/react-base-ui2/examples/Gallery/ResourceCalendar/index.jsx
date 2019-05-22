import React from 'react';
import debounce from 'lodash/debounce';
import upperFirst from 'lodash/upperFirst';
import uniqueId from 'lodash/uniqueId';
import random from 'lodash/random';
import isEmpty from 'lodash/isEmpty';
import clone from 'lodash/clone';
import padStart from 'lodash/padStart';
import moment from 'moment';
import { Globalize } from 'src/services/i18n';
import { hasClass } from 'src/utils/dom';
import { Dock, Theme } from 'src/consts';
import Tooltip from 'src/components/Tooltip';
import Button from 'src/components/Button';
import ResourceCalendar from 'src/components/ResourceCalendar';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

const states = [
  'new',
  'tentative',
  'done'
];

const demoResources = [{
  id: 'r1',
  name: 'Room1',
  type: 'facility'
},
{
  id: 'r2',
  name: 'Room2',
  type: 'equipment'
},
{
  id: 'r3',
  name: 'Room3',
  type: 'instructor'
},
{
  id: 'r4',
  name: 'Room4',
  label: 'James'
},
{
  id: 'r5',
  name: 'Room5'
},
{
  id: 'r6',
  name: 'Room6'
},
{
  id: 'r7',
  name: 'Room7'
},
{
  id: 'r8',
  name: 'Room8'
},
{
  id: 'r9',
  name: 'Room9'
},
{
  id: 'r10',
  name: 'Room10'
}];

const demoEvents = [
  { id: 'e1', resourceId: 'r2', start: '2018-06-01 05:00', end: '2018-06-01 06:00', title: 'Trainning', state: 'new' },
  { id: 'e2', resourceId: 'r2', start: '2018-06-01 08:00', end: '2018-06-06 00:00', title: 'Kids day', state: 'done' },
  { id: 'e3', resourceId: 'r2', start: '2018-06-01 08:00', end: '2018-06-16 00:00', title: 'Kids day', state: 'done' },
  { id: 'e4', resourceId: 'r2', start: '2018-06-03 10:00', end: '2018-06-04 00:00', title: 'One hour', state: 'done' },
  { id: 'e5', resourceId: 'r2', start: '2018-06-03 10:00', end: '2018-06-04 00:00', title: 'One hour', state: 'done' },
  { id: 'e6', resourceId: 'r2', start: '2018-06-03 10:00', end: '2018-06-07 00:00', title: 'One hour', state: 'done', customBlockStyle: { 'background-color': 'red', color: '#fff' }, customIconStyle: { color: 'red' } }
];

export default class Page extends DemoPage {
  static meta = {
    name: 'Resource Calendar',
    icon: 'icon-calendar',
    align: 'center',
    description: 'This example demonstrates the features of ResourceCalendar.'
  };

  constructor(props) {
    super(props);

    Globalize.ANTimeFormat = 'h:mm a';
    this.onSegMouseEnter = this.onSegMouseEnter.bind(this);
    this.onSegMouseLeave = this.onSegMouseLeave.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.debouncedShowEventInfo = debounce(this.debouncedShowEventInfo, 500);
    this.onMarqueeEnd = this.onMarqueeEnd.bind(this);
    this.onResourceRemove = this.onResourceRemove.bind(this);
    this.onMoreClick = this.onMoreClick.bind(this);
    this.onAddEvent = this.onAddEvent.bind(this);

    this.state.resources = demoResources;
    this.state.events = demoEvents;

    this.eventId = 0;
  }

  getInitSettings() {
    return initSettings;
  }

  removeResource(id) {
    const { resources } = this.state;
    const newResources = [];
    resources.forEach((r) => {
      if (r.id !== id) {
        newResources.push(r);
      }
    });
    this.setState({
      resources: newResources
    });
  }

  onResourceRemove(resource) {
    this.removeResource(resource.id);
  }

  onSegMouseEnter(e, seg) {
    e.persist();
    this.debouncedShowEventInfo(e, seg);
  }

  onSegMouseLeave() {
    this.debouncedShowEventInfo.cancel();
    Tooltip.close();
  }

  onSelectionChange(segs) {
    this.debouncedShowEventInfo.cancel();

    if (!isEmpty(segs)) {
      const seg = segs[0];
      const event = seg.event;
      const resource = seg.resource;

      this.log(`Event ID: ${event.id}, Event Title: ${event.title}, Resource ID: ${resource.id}, Resource Name: ${resource.name}`);
    }
  }

  onMarqueeEnd(e) {
    let s = 'Resources: ';
    s += e.resources.map(r => r.id).join(', ');
    s += ` StartDate: ${e.startDate.format('YYYY-MM-DD HH:mm:ss SSS')}`;
    s += ` EndDate: ${e.endDate.format('YYYY-MM-DD HH:mm:ss SSS')}`;

    this.log(s);
  }

  debouncedShowEventInfo(e, seg) {
    const content = (
      <div className="an-event-tooltip">

        {
          seg.isCrossDays ? (
            <div>
              <div><i className="icon icon-calendar-m" />
                <span>{seg.start.format('YYYY-MM-DD')} {seg.start.format('HH:mm')}</span>
              </div>
              <div><i className="icon icon-calendar-m" />
                <span>{seg.end.format('YYYY-MM-DD')} {seg.end.format('HH:mm')}</span>
              </div>
            </div>
          ) : (
            <div><i className="icon icon-calendar-m" />
              <span>{seg.start.format('YYYY-MM-DD')}</span>
            </div>
          )
        }
        {
          seg.isAllDay && <div><i className="icon icon-clock-m" /><span>All day</span></div>
        }
        {
          !seg.isCrossDays && !seg.isAllDay &&
            <div><i className="icon icon-clock-m" /><span>{seg.start.format('HH:mm')} to {seg.end.format('HH:mm')}</span></div>
        }

        <div><i className="icon icon-comment-o" /><span>{seg.event.title}</span></div>
        <div><i className="icon icon-location" /><span>{seg.resource.name}</span></div>
        <div><i className="icon icon-asterisk" /><span>{upperFirst(seg.state)}</span></div>
        <div className="separator" />
        <div><span>Bla bla bla</span></div>
        <div><span>Bla bla bla</span></div>
        <div><span>Bla bla bla</span></div>
        <div><span>Bla bla bla</span></div>
        <div><span>Anything you want to display</span></div>
      </div>
    );

    const dockStyle = Dock.RIGHT_MIDDLE;
    const { settings } = this.state;
    const { darkTooltip } = pickProps(settings, 'darkTooltip');
    const theme = darkTooltip ? Theme.DARK : Theme.LIGHT;
    const tooltipOptions = {
      className: 'an-eventinfo-tooltip',
      dockStyle,
      theme,
      distance: -2,
      content
    };

    let target = e.target;
    if (target && !hasClass(target, 'an-rc-event-seg')) {
      target = target.parantNode;
    }

    Tooltip.open(target, tooltipOptions);
  }

  onMoreClick(e) {
    this.log(`More is clicked.  [Date: ${e.date.value.format('YYYY-MM-DD')}]`);
    return true;
  }

  onDateHeaderClick = (e, date) => {
    this.log(`Date Header is clicked. [Date: ${date.format('YYYY-MM-DD')}]`);
  }

  onResourceHeaderClick = (e, resource) => {
    this.log(`Resource Header is clicked. Resource ID: ${resource.id}, Resource Name: ${resource.name}`);
  }

  onEventOpen = (e, seg) => {
    const { event, resource } = seg;
    this.log(`Event is opened(double click). Resource ID: ${resource.id}, Resource Name: ${resource.name}, Event ID: ${event.id}, Event Title: ${event.title}`);
  }

  getRandomState() {
    return states[random(0, states.length - 1)];
  }

  getRandomRange() {
    const startDate = random(1, 6);
    const endDate = random(startDate, startDate + 3);
    const allDay = random(1, 100) < 20;
    if (allDay) {
      return {
        start: `2018-06-${startDate}`
      };
    }

    let startTime = random(8, 12);
    let endTime = startTime + random(1, 6);

    startTime = `${padStart(startTime, 2, '0')}:00`;
    endTime = `${padStart(endTime, 2, '0')}:00`;

    return {
      start: `2018-06-${startDate} ${startTime}`,
      end: `2018-06-${endDate} ${endTime}`
    };
  }

  onAddEvent() {
    const events = clone(this.state.events);
    const range = this.getRandomRange();
    events.push({
      id: uniqueId('event'),
      resourceId: 'r2',
      start: range.start,
      end: range.end,
      title: `Dynamic event ${this.eventId}`,
      state: this.getRandomState()
    });

    this.eventId += 1;
    this.setState({
      events
    });
  }

  prepareEvent(base, resourceId) {
    const event = {};
    event.resourceId = resourceId;
    event.state = 'disabled';
    event.start = moment(base.start);
    event.end = moment(base.end);
    return event;
  }

  getClosedAndSkippedEvents(resources, displayDate, exclusiveMode) {
    let closedEvents = [];
    resources.forEach((resource) => {
      const { closedTimes, resourceSkipDate } = resource;
      if (closedTimes) {
        closedEvents = closedEvents.concat(closedTimes.map((time, index) => {
          const event = this.prepareEvent(time, resource.id);
          event.id = `closed-${index}`;
          event.title = 'Closed.';
          if (time.closedAllDay) {
            event.start = event.start.clone().startOf('day');
            event.end = event.end.clone().endOf('day');
            if (exclusiveMode) {
              event.end.add(1, 'ms');
            }
            event.title = 'Closed All Day.';
          }
          return event;
        }));
      }
      if (resourceSkipDate) {
        closedEvents = closedEvents.concat(resourceSkipDate.map((skipDate, index) => {
          const event = this.prepareEvent(skipDate, resource.id);
          event.id = `skipped-${index}`;
          event.title = skipDate.description;
          if (skipDate.disregardYear) {
            event.start = event.start.set('year', displayDate.year());
            event.end = event.end.set('year', displayDate.year());
          }
          return event;
        }));
      }
    });
    return closedEvents;
  }

  renderContent() {
    const { resources, events, settings } = this.state;
    const props = pickProps(settings);
    const {
      customMore, darkTooltip, dateHeaderClickable, resourceHeaderClickable, exclusiveMode,// eslint-disable-line
      ...rest
    } = props;
    const displayDate = '2018-06-01';
    const closedAndSkippedEvents =
      this.getClosedAndSkippedEvents(resources, moment(displayDate), exclusiveMode);
    const allEvents = events.concat(closedAndSkippedEvents);
    return (
      <div
        style={{ width: '100%',
          marginLeft: '120px',
          marginRight: '120px' }}
      >
        <div>
          <Button size="sm" onClick={this.onAddEvent}>
            Add Event
          </Button>
        </div>
        <ResourceCalendar
          style={{ width: '100%', height: '100%' }}
          displayDate={displayDate}
          resources={resources}
          exclusiveMode={exclusiveMode}
          events={allEvents}
          showTooltip={false}
          onSegMouseEnter={this.onSegMouseEnter}
          onSegMouseLeave={this.onSegMouseLeave}
          onSelectionChange={this.onSelectionChange}
          onMarqueeEnd={this.onMarqueeEnd}
          onResourceRemove={this.onResourceRemove}
          onMoreClick={customMore && this.onMoreClick}
          onDateHeaderClick={dateHeaderClickable && this.onDateHeaderClick}
          onResourceHeaderClick={resourceHeaderClickable && this.onResourceHeaderClick}
          onEventOpen={this.onEventOpen}
          {...rest}
        />
      </div>
    );
  }

}
