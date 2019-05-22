"use strict";

import "fullcalendar/dist/fullcalendar.css";
import "./main.less";

import * as FC from "./FC";
import DayConfig from "./day/Config";
import WeekConfig from "./week/Config";
import MonthConfig from "./month/Config";
import ResourceManager from "./common/ResourceManager";

let {Calendar, views} = FC;
/* Register new views to view configuration */
views.resourceDay = DayConfig;
views.resourceWeek = WeekConfig;
views.resourceMonth = MonthConfig;

export default class ResourceCalendar extends Calendar {

  initialize() {
    this.rsManager = new ResourceManager(this);
    // this.startLocalTime = ;
  }

  rerender() {
    this.view.rerender();
  }

  setOption(name, value) {
    if(name && value !== undefined){
      this.options[name] = value;
      for(let viewType in this.viewSpecCache) {
        let view = this.viewSpecCache[viewType];
        if(view && view.options && view.options[name]){
          view.options[name] = value;
        }
      }
    }
  }

  setResources(resources) {
    return this.rsManager.setResources(resources);
  }

  getResources() {
    return this.rsManager.getResources() || [];
  }

  getResourcesCount() {
    let resources = this.getResources();
    return resources.length;
  }

  addResource(resource) {
    return this.rsManager.addResource(resource);
  }

  removeResourceById(id) {
    let resource = this.rsManager.getResourceById(id);
    return this.deleteResource(resource);
  }

  getResourceById(id) {
    return this.rsManager.getResourceById(id);
  }

  deleteResource(resource) {
    return this.rsManager.deleteResource(resource);
  }

  setAllowedResources(resources) {
    return this.rsManager.setAllowedResources(resources);
  }

  getAllowedResources() {
    return this.rsManager.getAllowedResources();
  }

  addAllowedResource(resource) {
    return this.rsManager.addAllowedResource(resource);
  }

  removeAllowedResource(resource) {
    return this.rsManager.addAllowedResource(resource);
  }

  toggleAllowResourceById(id) {
    return this.rsManager.toggleAllowResourceById(id);
  }

  getAllowedResourceById(id) {
    return this.rsManager.getAllowedResourceById(id);
  }

  isAllowedResource(resource) {
    return this.rsManager.isAllowedResource(resource);
  }

}
