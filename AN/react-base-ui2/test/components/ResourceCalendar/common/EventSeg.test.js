import moment from 'moment';
import set from 'lodash/set';
import EventSeg from 'src/components/ResourceCalendar/common/EventSeg';

const props = {
  resource: {
    id: 'r1'
  },
  event: {
    id: 'e1',
    start: moment('2018-09-23'),
    end: moment('2018-10-12'),
    title: 'test event',
    detail: 'test detail',
    state: 'pending',
    editable: true
  },
  start: moment('2018-09-21'),
  end: moment('2018-10-23'),
  exclusiveMode: false,
  index: 1
};
describe('components/ResourceCalendar/common/EventSeg', () => {
  const commonPredication = (seg, data) => {
    expect(seg.display).toBeFalsy();
    expect(seg.end).toEqual(data.end);
    expect(seg.start).toEqual(data.start);
    expect(seg.event).toEqual(data.event);
    expect(seg.resource).toEqual(data.resource);
    expect(seg.eventEnd).toEqual(data.event.end);
    expect(seg.eventStart).toEqual(data.event.start);
    expect(seg.editable).toEqual(data.event.editable);
    expect(seg.exclusiveMode).toEqual(data.exclusiveMode);
    expect(seg.eventKey).toEqual(`${data.resource.id}/${data.event.id}`);
  };
  it('should initial EventSeg well', () => {
    const customBlockStyle = { 'background-color': 'red', color: '#fff' };
    const customIconStyle = { color: 'red' };
    const seg = new EventSeg(props.resource, props.event, props.start, props.end, props.index,
      props.exclusiveMode, '', customBlockStyle, customIconStyle);
    commonPredication(seg, props);
    expect(seg.span).toEqual(32);
    expect(seg.icon).toEqual(null);
    expect(seg.type).toEqual('long');
    expect(seg.isAllDay).toBeFalsy();
    expect(seg.isEndOfDay).toBeFalsy();
    expect(seg.isCrossDays).toBeTruthy();
    expect(seg.isStartOfDay).toBeTruthy();
    expect(seg.eventOrder).toEqual('');
    expect(seg.key).toEqual(`${seg.eventKey}-${props.index}`);
    expect(seg.text).toEqual(`12:00 AM ${props.event.title} ${props.event.detail}`);
    expect(seg.customBlockStyle).toEqual(customBlockStyle);
    expect(seg.customIconStyle).toEqual(customIconStyle);
  });

  it('state should be none when no set event.state', () => {
    const tempProps = props;
    tempProps.event.state = undefined;
    const seg = new EventSeg(tempProps.resource, tempProps.event, tempProps.start, tempProps.end,
       tempProps.index, tempProps.exclusiveMode, 'order');
    commonPredication(seg, tempProps);
    expect(seg.state).toEqual('none');
    expect(seg.customBlockStyle).toEqual({});
    expect(seg.customIconStyle).toEqual({});
  });

  it('eventOrder should be "" when event has no corresponding key', () => {
    const seg = new EventSeg(props.resource, props.event, props.start, props.end, props.index,
      props.exclusiveMode, 'order');
    commonPredication(seg, props);
    expect(seg.eventOrder).toEqual('');
  });
  it('key should have correct value when index is undefined', () => {
    const seg = new EventSeg(props.resource, props.event, props.start, props.end, undefined,
      props.exclusiveMode);
    commonPredication(seg, props);
    expect(seg.key).toEqual(`${seg.eventKey}-0`);
  });
  describe('isAllDay ', () => {
    it('isAllDay should have correct when exclusiveMode is true', () => {
      const tempProps = props;
      tempProps.exclusiveMode = true;
      const seg = new EventSeg(tempProps.resource, tempProps.event, tempProps.start, tempProps.end,
        tempProps.index, tempProps.exclusiveMode);
      commonPredication(seg, tempProps);
      expect(seg.isEndOfDay).toBeTruthy();
      expect(seg.isStartOfDay).toBeTruthy();
      expect(seg.isAllDay).toBeFalsy();
    });
    it('isAllDay should have correct when exclusiveMode is false', () => {
      const tempProps = props;
      tempProps.event.end = null;
      const seg = new EventSeg(tempProps.resource, tempProps.event, tempProps.start, tempProps.end,
        tempProps.index, tempProps.exclusiveMode);
      commonPredication(seg, tempProps);
      expect(seg.isEndOfDay).toBeTruthy();
      expect(seg.isStartOfDay).toBeTruthy();
      expect(seg.isAllDay).toBeTruthy();
    });
  });
  describe('isCrossDay ', () => {
    it('isCrossDay should be falsy', () => {
      const crossProps = props;
      crossProps.event.end = null;
      const seg = new EventSeg(crossProps.resource, crossProps.event, crossProps.start,
        crossProps.end, crossProps.index, crossProps.exclusiveMode);
      commonPredication(seg, crossProps);
      expect(seg.isCrossDays).toBeFalsy();
    });
    it('isCrossDay should be truthy', () => {
      const crossProps1 = props;
      crossProps1.event.start = moment('2018-09-12');
      crossProps1.event.end = moment('2018-09-12');
      crossProps1.exclusiveMode = true;
      const seg = new EventSeg(crossProps1.resource, crossProps1.event, crossProps1.start,
        crossProps1.end, crossProps1.index, crossProps1.exclusiveMode);
      commonPredication(seg, props);
      expect(seg.isCrossDays).toBeTruthy();
    });
  });
  describe('text', () => {
    it('text should have correct value when isAllDay is true', () => {
      const tempProps = props;
      tempProps.event.end = null;
      const seg = new EventSeg(tempProps.resource, tempProps.event, tempProps.start, tempProps.end,
        tempProps.index, tempProps.exclusiveMode);
      commonPredication(seg, tempProps);
      expect(seg.text).toEqual(tempProps.event.title);
    });
    it('text should have correct value when isStartOfDay and isStartOfDay and isCrossDays are true', () => {
      const tempProps = props;
      tempProps.event.start = moment('2018-09-12');
      tempProps.event.end = moment('2018-09-14');
      tempProps.exclusiveMode = true;
      tempProps.event.detail = null;
      const seg = new EventSeg(tempProps.resource, tempProps.event, tempProps.start,
        tempProps.end, tempProps.index, tempProps.exclusiveMode);

      commonPredication(seg, props);
      expect(seg.text).toEqual(`${tempProps.event.title} `);
    });
    it('text should have correct value when isCrossDays is true and isStartOfDay is false', () => {
      const tempProps = props;
      tempProps.event.start = moment('2018-09-12 13:23:22');
      tempProps.event.end = moment('2018-09-14');
      tempProps.exclusiveMode = true;
      tempProps.event.detail = null;
      const seg = new EventSeg(tempProps.resource, tempProps.event, tempProps.start,
        tempProps.end, tempProps.index, tempProps.exclusiveMode);

      commonPredication(seg, props);
      expect(seg.text).toEqual(`1:23 PM ${tempProps.event.title} `);
    });
    it('text should have correct value when isCrossDays is true and isEndOfDay is false', () => {
      const tempProps = props;
      tempProps.event.start = moment('2018-09-12');
      tempProps.event.end = moment('2018-09-14 13:23:22');
      tempProps.exclusiveMode = true;
      tempProps.event.detail = null;
      const seg = new EventSeg(tempProps.resource, tempProps.event, tempProps.start,
        tempProps.end, tempProps.index, tempProps.exclusiveMode);

      commonPredication(seg, props);
      expect(seg.text).toEqual(`12:00 AM ${tempProps.event.title} `);
    });
    it('text should have correct value when isCrossDays is false and isAllDay is false', () => {
      const tempProps = props;
      tempProps.event.start = moment('2018-09-12 13:23:22');
      tempProps.event.end = moment('2018-09-12 15:23:22');
      tempProps.exclusiveMode = true;
      tempProps.event.detail = null;
      const seg = new EventSeg(tempProps.resource, tempProps.event, tempProps.start,
        tempProps.end, tempProps.index, tempProps.exclusiveMode);

      commonPredication(seg, props);
      expect(seg.text).toEqual('1:23 PM');
    });
  });
  it('editable should have correct value', () => {
    const seg = new EventSeg(props.resource, props.event, props.start, props.end, props.index,
      props.exclusiveMode);
    commonPredication(seg, props);
    expect(seg.editable).toEqual(props.event.editable);

    const tempEvent = set(props, 'event.editable', false);
    const seg1 = new EventSeg(props.resource, tempEvent.event, props.start, props.end,
       props.index, props.exclusiveMode);
    commonPredication(seg1, props);
    expect(seg1.editable).toEqual(tempEvent.event.editable);
  });
  it('exclusiveMode should have correct value', () => {
    const seg = new EventSeg(props.resource, props.event, props.start, props.end, props.index,
      props.exclusiveMode);
    commonPredication(seg, props);
    expect(seg.exclusiveMode).toEqual(props.exclusiveMode);

    const tempProps = set(props, 'exclusiveMode', true);
    const seg1 = new EventSeg(tempProps.resource, tempProps.event, tempProps.start, tempProps.end,
      tempProps.index,
      tempProps.exclusiveMode);
    commonPredication(seg1, tempProps);
    expect(seg1.exclusiveMode).toEqual(tempProps.exclusiveMode);
  });
});
