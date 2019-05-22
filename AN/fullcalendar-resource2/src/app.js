"use strict";

import "./app.less";

import Calendar from "./resource/main";

export function App(){

  const calendarIns = new Calendar($("#calendar"), {
    header: {
      left: 'today prev,next title',
      center: '',
      right: 'resourceDay,resourceWeek,resourceMonth,agendaWeek,month,agendaDay'
    },
    defaultView: 'resourceDay',
    allDaySlot: false,
    selectWireframeShow: true,
    // allDayDefault: false,
    now: '2016-04-02T11:50:00',
    defaultDate: '2016-04-02',
    dates: [
      '2016-04-02',
      '2016-04-17',
      '2016-04-19'
    ],
    extraFixedScrollBar: "x",//Just support x now.
    extendedGridProps: {
      showNowTimeLine: true
    },
    extendedHeaderProps: {
      closeAble: true,
      emptyHintText: 'No resources Selected.',
      renderCell: function(resource, isAllowed) {
        return "<div style='padding:15px 0px;'>" +
        "<span style='background:orange;padding:1px 4px;font-size:10px;color:#fff;border-radius:3px;'>E</span> " +
        resource.title +
        "</div>";
      },
      closeIconReturn: function() {
        return "x"
      },
      closeTriggerBefore: function() {
        return true;
      },
      axisReturn: function (view){
        return "<a href='javascript:void(0)'>Delete</a>"
      },
      axisTriggerClick: function (e, view){
        calendarIns.setResources([]);
      }
    },
    buttonIcons: {
      prev: 'left-single-arrow',
      next: 'right-single-arrow',
      prevYear: 'left-double-arrow',
      nextYear: 'right-double-arrow'
    },
    firstDay: 1,
    contentHeight: 550,
    businessHours: false,
    minTime: "01:00:00",
    maxTime: "24:00:00",
    slotDuration: '00:30:00',
    // slotLabelInterval : '0:30:00',
    // slotLabelFormat: 'H(:mm)A',
    snapDuration: '0:15:00',
    editable: true,
    selectable: true,
    scrollTime: '06:00:00',
    slotEventOverlap: false,
    eventLimit: true, // allow "more" link when too many events
    columnFormat: {
      month: 'ddd',
      week: 'ddd d.',
      day: 'dddd d. M'
    },
    resourceIdField: "id",
    // resourceIdBuilder: function(resource) {
    //   return resource.id2 && resource.id3 ? resource.id2 + resource.id3 : null;
    // },
    resources: [
      { id: 'a', title: 'Resource A' },
      { id2: 'b', title: 'Resource B' },
      { id2: 'c', id3: "xx", title: 'Resource C' },
      { id: 'd', title: 'Resource D' },
      { id: 'e', title: 'Resource E' },
      { id: 'f', title: 'Resource F' },
      { id: 'g', title: 'Resource G' },
      { id: 'h', title: 'Resource H' },
      { id: 'i', title: 'Resource I' },
      { id: 'j', title: 'Resource J' },
      { id: 'k', title: 'Resource K' },
      { id: 'l', title: 'Resource L' },
      { id: 'm', title: 'Resource M' },
      { id: 'n', title: 'Resource N' },
      { id: 'o', title: 'Resource O' },
      { id: 'p', title: 'Resource P' },
      { id: 'q', title: 'Resource Q' },
      { id: 's', title: 'Resource S' }
    ],
    events: [
      { id: '1', resourceID: 'a', start: '2016-04-02T07:00:00', end: '2016-04-02T14:00:00', title: 'event 1' },
      { id: '2', resourceId: 'b', start: '2016-04-02T09:00:00', end: '2016-04-02T14:00:00', title: 'event 2', color: '#257e4a' },
      { id: '3', resourceId: 'a', start: '2016-04-02T09:00:00', end: '2016-04-02T16:00:00', title: 'event 3' },
      { id: '4', resourceId: 'c', start: '2016-04-02T07:30:00', end: '2016-04-02T09:30:00', title: 'event 4' },
      { id: '5', resourceId: 's', start: '2016-04-01T08:00:00', end: '2016-04-01T09:30:00', title: 'event 5' },
      { id: '6', resourceId: 'd', start: '2016-04-03T10:00:00', end: '2016-04-03T15:00:00', title: 'event 6' },
      { id: '7', resourceId: 'f', start: '2016-04-02T09:00:00', end: '2016-04-02T11:00:00', title: 'event 7', color: '#257e4a' },
      { id: '8', resourceId: 'a', start: '2016-04-04', end: '2016-04-08T12:00:00', title: 'event 8', color: '#257e4a' },
      { id: '9', resourceId: 'a', start: '2016-04-02', end: '2016-04-03', title: 'event 9', color: '#ff0000' },
      { id: '10', resourceId: 'a', start: '2016-04-02T09:00:00', end: '2016-04-02T14:30:00', title: 'event 10' },
      { id: '11', resourceId: 'f', start: '2016-04-02T09:30:00', end: '2016-04-02T11:20:00', title: 'event 11', color: '#257e4a' },
      { id: '12', resourceId: 'f', start: '2016-04-02T12:30:00', end: '2016-04-02T14:20:00', title: 'event 11', color: '#257e4a' },
      { id: '13', resourceId: 'f', start: '2016-04-02T12:30:00', end: '2016-04-02T15:00:00', title: 'event 11', color: '#257e4a' },
      { id: '14', resourceId: 'f', start: '2016-04-02T12:30:00', end: '2016-04-02T16:00:00', title: 'event 11', color: '#257e4a' },
      { id: '15', resourceId: 'f', start: '2016-04-02T12:30:00', end: '2016-04-02T15:20:00', title: 'event 11', color: '#257e4a' },
      { id: '16', resourceId: 'f', start: '2016-04-02T12:30:00', end: '2016-04-02T15:20:00', title: 'event 11', color: '#257e4a' },
      { id: '17', resourceId: 'f', start: '2016-04-02T12:30:00', end: '2016-04-02T15:20:00', title: 'event 11', color: '#257e4a' },
      { id: '18', resourceId: 'f', start: '2016-04-02T12:30:00', end: '2016-04-02T15:20:00', title: 'event 11', color: '#257e4a' },
      { id: '19', resourceId: 'f', start: '2016-04-02T12:30:00', end: '2016-04-02T15:20:00', title: 'event 11', color: '#257e4a' }
    ],
    // events: function(start, end, timezone, callback){
    //   debugger;
    // },
    // eventDataTransform: function(event){
    //   event.title += " * be transformed!";
    //   return event;
    // },
    dayClick: function(date, jsEvent, view) {
      // alert('Clicked on: ' + date.format());
      // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
      // alert('Current view: ' + view.name);
    },
    eventClick: function(event, element){
      event.title += " * Clicked!";
      $('#calendar').fullCalendar('updateEvent', event);
      // $('#calendar').fullCalendar('changeView', 'agendaDay');
    },
    windowResize: function(view) {
      view.setHeight(resizeCalendar());
    },
    select: function(segs, jsEvent) {
      segs.forEach((seg) => {
        console.log(
          'select',
          seg.start.format(),
          seg.end.format(),
          seg.resource
        );
      });
    }
  });
  calendarIns.render();

  function resizeCalendar() {
    const clientHeight = document.documentElement.clientHeight;
    return clientHeight - 110;
  }
}
App();
