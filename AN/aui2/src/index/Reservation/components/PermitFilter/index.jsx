import React from 'react';
import { connect } from 'react-redux';

import InputDate from 'react-base-ui/lib/components/InputDate';
import Input from 'react-base-ui/lib/components/Input';
import Button from 'react-base-ui/lib/components/Button';
import { KeyCode } from 'react-base-ui/lib/consts';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import UIComponent from 'shared/components/UIComponent';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { momentHelper } from 'react-base-ui/lib/utils';
import { isArrEqual } from 'shared/utils/func';

import PermitSearchType from '../../consts/permitSearchType';
import { saveFilters } from '../../actions/index';
import { getFilters, getParams } from '../../utils/permitFilterFunc';
import { changePage, changeSort, fetchPermits, selectPermit } from '../../actions/permitGrid';

import {
  changeCenter,
  changeEndDate,
  changeEventTypeAction,
  changeFacilityType,
  changeStartDate,
  changeStatus,
  clearErrMsg,
  clearFilterAction,
  hideFilterAction,
  showFilterAction,
  updateSearchValue
} from '../../actions/permitFilter';
import AMIds from '../../automationIds';

import './index.less';

let filtersCache = {};

export class PermitFilter extends UIComponent {

  constructor(props) {
    super(props);
    this.previousCentersState = [];
    this.prevSelectSearchType = PermitSearchType.PERMIT_NUMBER;

    this.bind('clearFilter', 'changeCenter', 'fetchPermits', 'focusSearchKeywordInput', 'onSearchTypeChange');
    this._refs = {};
    this.searchTypes = [
      { text: `${props.initialData.permitLabel} Number`, value: PermitSearchType.PERMIT_NUMBER },
      { text: 'Customer/Org Name', value: PermitSearchType.CUSTOMER_NAME },
      { text: 'Customer/Org Email', value: PermitSearchType.CUSTOMER_EMAIL },
      { text: 'Event Name', value: PermitSearchType.EVENT_NAME }
    ];

    this.state = {
      searchValue: ''
    };
  }

  componentWillReceiveProps({ filters }) {
    const nextCreatedByMeValue = filters.get('createdByMe');
    if (nextCreatedByMeValue !== this.props.filters.get('createdByMe')) {
      filtersCache.created_by_me = nextCreatedByMeValue;
      this.fetchPermits(filtersCache);
    }
  }

  onSearchChange = (e) => {
    let { value } = e.target;
    /* istanbul ignore else */
    if (this._refs.searchTypeDropdown.value === PermitSearchType.PERMIT_NUMBER) {
      const regNum = /[^\d]/g;
      /* istanbul ignore else */
      if (regNum.test(value)) {
        value = value.replace(regNum, '');
      }
    }

    this.setState({ searchValue: value });
  }

  onSearchKeyDown = ({ keyCode }) => {
    if (keyCode === KeyCode.ENTER) {
      this.searchPermits();
    }
  }

  searchPermits = () => {
    const searchType = this._refs.searchTypeDropdown.value;
    const { searchValue } = this.state;

    this.props.selectPermit(null);

    if (this.searchTypeCache) {
      delete filtersCache[this.searchTypeCache];
    }

    this.searchTypeCache = searchType;

    this.props.updateSearchValue({
      type: searchType,
      value: searchValue
    });

    filtersCache[searchType] = searchValue;
    this.fetchPermits(filtersCache);
  }

  render() {
    const {
      filters,
      initialData
    } = this.props;
    const facilityLabel = `${decodeHtmlStr(initialData.facilityWording)} Type`;
    const dropdownMaxHeight = '280px';

    const centers = filters.get('centers');
    const status = filters.get('status');
    const facilityTypes = filters.get('facilityTypes');
    const eventTypes = filters.get('eventTypes');

    const selectedCenters = centers.get('selected').toJS();
    const selectedStatus = status.get('selected').toJS();
    const selectedFacilityTypes = facilityTypes.get('selected').toJS();
    const selectedEventTypes = eventTypes.get('selected').toJS();
    const startDate = filters.get('startDateObj');
    const endDate = filters.get('endDateObj');

    const tags = filters.get('tags').toJS();

    this.previousCentersState = selectedCenters;

    return (
      <div className="grid-filter">
        <div className="search">
          <Dropdown
            showTextTip
            ref={(dropdown) => { this._refs.searchTypeDropdown = dropdown; }}
            className="search-type-dropdown"
            data={this.searchTypes}
            defaultValue={PermitSearchType.PERMIT_NUMBER}
            onChange={this.onSearchTypeChange}
          />
          <Input
            className="search-input"
            size="lg"
            maxLength={100}
            value={this.state.searchValue}
            data-qa-id={AMIds.search.permitNumber}
            placeholder={decodeHtmlStr(filters.get('searchPlaceholder'))}
            ref={(input) => { this._refs.searchInput = input; }}
            onKeyDown={this.onSearchKeyDown}
            onChange={this.onSearchChange}
          />
          <Button
            type="strong"
            className="search-btn"
            onClick={this.searchPermits}
          >
            Search
          </Button>
        </div>
        <div className="filter" data-qa-id={AMIds.filters.wrapper}>
          <div className="filter-item filter-item-3">
            <div className="filter-item-inner">
              <span className="filter-item__label">Center</span>
              <Dropdown
                placeholder="Select center"
                txtSuffix="selected"
                data={centers.get('data')}
                value={selectedCenters}
                showCheckbox
                showTextTip
                filter
                data-qa-id={AMIds.filters.center}
                filterPlaceholder="Enter keywords to search..."
                showDeselectall
                deselectAll={!selectedCenters.length}
                onChange={this.changeCenter}
                maxHeight={{ maxHeight: dropdownMaxHeight }}
                showError
                errorInfo={centers.get('errMsg')}
                onMenuHide={this.onHide('centers')}
              />
            </div>
          </div>
          <div className="filter-item filter-item-3">
            <div className="filter-item-inner">
              <span className="filter-item__label">{facilityLabel}</span>
              <Dropdown
                placeholder={`Select ${facilityLabel} type`}
                txtSuffix="selected"
                data={facilityTypes.get('data')}
                value={selectedFacilityTypes}
                showCheckbox
                showTextTip
                showDeselectall
                data-qa-id={AMIds.filters.facilityType}
                deselectAll={!selectedFacilityTypes.length}
                onChange={({ value }) => this.props.changeFacilityType({ value })}
                maxHeight={{ maxHeight: dropdownMaxHeight }}
                onMenuHide={this.onHide('facilityTypes')}
              />
            </div>
          </div>
          <div className="filter-item filter-item-2">
            <div className="filter-item-inner">
              <span className="filter-item__label">Event Type</span>
              <Dropdown
                placeholder="Select event type"
                txtSuffix="selected"
                data={eventTypes.get('data')}
                value={selectedEventTypes}
                showCheckbox
                showTextTip
                showDeselectall
                data-qa-id={AMIds.filters.eventType}
                deselectAll={!selectedEventTypes.length}
                onChange={({ value }) => this.props.changeEventTypeAction({ value })}
                maxHeight={{ maxHeight: dropdownMaxHeight }}
                onMenuHide={this.onHide('eventTypes')}
              />
            </div>
          </div>
          <div className="filter-item filter-item-2">
            <div className="filter-item-inner">
              <span className="filter-item__label">Status</span>
              <Dropdown
                placeholder="Select status"
                txtSuffix="selected"
                data={status.get('data')}
                value={selectedStatus}
                showCheckbox
                showTextTip
                showDeselectall
                data-qa-id={AMIds.filters.status}
                deselectAll={!selectedStatus.length}
                onChange={({ value }) => this.props.changeStatus({ value })}
                maxHeight={{ maxHeight: dropdownMaxHeight }}
                onMenuHide={this.onHide('status')}
              />
            </div>
          </div>

          <div className="filter-item filter-item-4">
            <div className="filter-item-inner-last" data-qa-id={AMIds.filters.eventDate}>
              <span className="filter-item__label">Event Date</span>
              <div className="filter-date">
                <div className="datepicker-container">
                  <InputDate
                    data-qa-id={AMIds.filters.eventDateStart}
                    max={momentHelper.createMoment(endDate) || undefined}
                    value={momentHelper.createMoment(startDate)}
                    showTrigger
                    onValueChange={e => this.changeStartDate(e.nativeDate)}
                  />
                </div>
                <span className="datepicker-divider">-</span>
                <div className="datepicker-container">
                  <InputDate
                    data-qa-id={AMIds.filters.eventDateEnd}
                    min={momentHelper.createMoment(startDate) || undefined}
                    value={momentHelper.createMoment(endDate)}
                    showTrigger
                    onValueChange={e => this.changeEndDate(e.nativeDate)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            htmlFor="eslint"
            className={`${tags.isDefaultTags ? 'disable' : ''} filter-clean`}
            onClick={tags.isDefaultTags ? null : () => { this.clearFilter(); }}
          >
            <i className={'icon icon-rotate-left'} /> Clear filters
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchPermits();
    this.focusSearchKeywordInput();
  }

  static formatDate(date, permitDateFormat) {
    return DateTimeFormat.formatDate(date, permitDateFormat);
  }

  onHide(filterName) {
    const self = this;
    return function hide() {
      const dropdownInstance = this;
      const lastValue = filtersCache[filterName];
      const currentValue = dropdownInstance.state.value;

      if (filterName === 'centers' && self.props.filters.get('centers').get('errMsg') !== '') {
        self.props.clearErrMsg();
      }

      if (!isArrEqual(lastValue, currentValue)) {
        filtersCache[filterName] = currentValue;

        self.props.saveFilters();
        self.fetchPermits(filtersCache);
      }
    };
  }

  changeStartDate(date) {
    const { permitDateFormat } = this.props.initialData;
    const value = PermitFilter.formatDate(date, permitDateFormat);
    const prevValue = filtersCache.startDate;
    /* istanbul ignore if */
    if (value !== prevValue) {
      this.props.changeStartDate(value, date);
      filtersCache.startDate = value;
      this.fetchPermits(filtersCache);
    }
  }

  changeEndDate(date) {
    const { permitDateFormat } = this.props.initialData;
    const value = PermitFilter.formatDate(date, permitDateFormat);
    const prevValue = filtersCache.endDate;
    /* istanbul ignore if */
    if (value !== prevValue) {
      this.props.changeEndDate(value, date);
      filtersCache.endDate = value;
      this.fetchPermits(filtersCache);
    }
  }

  fetchPermits(filters) {
    if (!filters) {
      filtersCache = getFilters(this.props.filters);
    }
    this.props.changePage(1);
    this.props.changeSort();
    this.props.selectPermit(null);
    this.props.fetchPermits(getParams(filters || filtersCache));
  }

  clearFilter() {
    this.props.clearFilterAction(() => this.fetchPermits());
  }

  changeCenter(obj) {
    if (obj.value.length > 5 && (obj.value.length > this.previousCentersState.length)) {
      this.props.changeCenter({ value: this.previousCentersState, errMsg: 'Limit 5 centers.' });
    } else {
      this.props.changeCenter({ value: obj.value, errMsg: '' });
      this.previousCentersState = obj.value;
    }
  }

  onSearchTypeChange({ value }) {
    if (value !== this.prevSelectSearchType) {
      this.setState({ searchValue: '' });
      this.prevSelectSearchType = value;
    }
    this.focusSearchKeywordInput();
  }

  focusSearchKeywordInput() {
    this._refs.searchInput.input.focus();
  }
}

export default connect(
  null,
  {
    changeCenter,
    changeStatus,
    changeFacilityType,
    changeEventTypeAction,
    changeStartDate,
    changeEndDate,
    showFilterAction,
    hideFilterAction,
    clearFilterAction,
    updateSearchValue,
    saveFilters,
    fetchPermits,
    changeSort,
    changePage,
    clearErrMsg,
    selectPermit
  }
)(PermitFilter);
