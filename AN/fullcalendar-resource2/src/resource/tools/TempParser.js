"use strict";

export default class TempParser {

  /**
   * TempParse organizes parse data form any Object or Class.
   * @constructor
   * @param  {Object?Class} dataSourct
   */
  constructor(dataSource) {
    this.ds = dataSource;
  }
  /**
   * Abstract method.
   * Use Mustaches as template parser.
   * @param  {Function} template
   */
  parse(template) {}
}
