"use strict";

import "./month.less";

import BaseResourceMonthView from "resource/common/view/BaseResourceMonthView";
import ResourceDayGrid from "./ResourceDayGrid";
import SkeletonParser from "./temps/skeleton/SkeletonParser";
import HeaderParser from "./temps/header/HeaderParser";

export default class ResourceMonthView extends BaseResourceMonthView {

  constructor(...args) {
    super(...args);
  }


  /**
   * @override
   * @return {Class} Instance of ResourceDayGrid.
   */
  instantiateDayGrid() {
    return new ResourceDayGrid(this);
  }

  renderDates() {
    super.renderDates();
    this.el.addClass("fc-resource-month-view");
  }

  renderSkeletonHtml() {
    let skeletonParser = new SkeletonParser(this);
    return skeletonParser.parse();
  }

  /**
   * @override
   */
	renderHead() {
		super.renderHead();
    let rsContainerEl = this.el.find(".fc-head-resources-container");
    let headerParser = new HeaderParser(this);
    rsContainerEl.append(headerParser.parse());

	}

  /**
   * Render resources after fetching data from rsManager.
   * @override
   * @param  {Array} resources [description]
   */
  renderResources(resources) {
    this.insertFirstAllowedResources(resources);
  }

  insertFirstAllowedResources(resources) {
    if(resources){
      let index = this.opt("defaultResourcesIndex");
      let resource = resources[index] ? resources[index] : resources[0];
      this.calendar.setAllowedResources(resource ? [resource] : []);
    }
  }

}
