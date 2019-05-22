import React from 'react';
import { connect } from 'react-redux';
import * as da from 'react-base-ui/lib/utils/dataAccess';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import UIComponent from 'shared/components/UIComponent';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import { isArrEqual } from 'shared/utils/func';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import isNil from 'lodash/isNil';
import { fetchResourcesBookingAsyncAction } from '../../actions/booking';
import {
  setCenter,
  changeCenter,
  setEventTypes,
  changeEventTypes,
  setFacilityTypes,
  changeFacilityTypes,
  setResourceTypes,
  changeResourceTypes,
  fetchResource,
  setSelectedResource,
  loadResource,
  setFetchResource,
  ajaxLoadResource,
  clearErrMsg,
  restoreDefault,
  clearFilter,
  saveFilters,
  changeResourceErrMsg,
  isResourceListOpenedAction
} from '../../actions/resourceFilters';
import { getResourcesParams } from '../../utils/resourceParams';
import AMIds from '../../automationIds';

import './index.less';

let errMsg = '';
let isFirstUpdate = 0;

const filtersCache = {};
const setFiltersCache = (filters) => {
  const { centers, eventTypes, resourceTypes, facilityTypes, resources } = filters;
  filtersCache.sites = '';
  filtersCache.centers = centers.get('selected').toJS();
  filtersCache.eventTypes = eventTypes.get('selected').toJS();
  filtersCache.resourceTypes = resourceTypes.get('selected').toJS();
  filtersCache.facilityTypes = facilityTypes.get('selected').toJS();
  filtersCache.resources = resources.get('selected').toJS();
};

export class SearchBar extends UIComponent {

  constructor() {
    super();
    this.previousResourcesState = [];
    this.previousCentersState = [];
  }

  render() {
    const { filters, initialData } = this.props;
    const {
      facilityTypeLabel,
      instructorLabel
    } = initialData;
    const {
      centers,
      facilityTypes,
      eventTypes,
      resourceTypes,
      resources
    } = filters;

    const centerNameVals = centers.get('selected').toJS();
    const eventTypeVals = eventTypes.get('selected').toJS();
    const resourceTypeVals = resourceTypes.get('selected').toJS();
    const facilityTypeVals = facilityTypes.get('selected').toJS();
    const resourcesVals = resources.get('selected').toJS();
    const isChangeTag = this.isChangeTag();
    this.previousCentersState = centerNameVals;
    this.previousResourcesState = resources.get('selected').toJS();

    const resourceTypeMap = {
      resourceType0: decodeHtmlStr(facilityTypeLabel),
      resourceType1: 'equipment',
      resourceType2: decodeHtmlStr(instructorLabel)
    };

    return (
      <div className="searchbar">
        <div className="filter" data-qa-id={AMIds.filters.wrapper}>
          <div className="filter-item filter-item-2">
            <div className="filter-item-inner">
              <span className="filter-label">Center</span>
              <Dropdown
                data={centers.get('data')}
                placeholder="Select center"
                txtSuffix="selected"
                showCheckbox
                showTextTip
                filter
                data-qa-id={AMIds.filters.center}
                filterPlaceholder="Enter keywords to search..."
                value={centerNameVals}
                showDeselectall
                maxHeight={{ maxHeight: '280px' }}
                deselectAll={!da.count(centerNameVals)}
                showError
                errorInfo={centers.get('errMsg')}
                onChange={this.setCenter}
                onMenuHide={() => this.onHide('centers', this.changeCenter)}
                className="wider-dropdown-list"
              />
            </div>
          </div>
          <div className="filter-item filter-item-4">
            <div className="filter-item-inner">
              <span className="filter-label">Resource Type</span>
              <Dropdown
                data={resourceTypes.get('data')}
                placeholder="Select resource type"
                txtSuffix="selected"
                showCheckbox
                showTextTip
                value={resourceTypeVals}
                showDeselectall
                maxHeight={{ maxHeight: '280px' }}
                data-qa-id={AMIds.filters.resourceType}
                deselectAll={!da.count(resourceTypeVals)}
                onChange={({ value }) => this.props.setResourceTypes({ value })}
                onMenuHide={() => this.onHide('resourceTypes', this.changeResourceTypes)}
              />
            </div>
          </div>
          <div className="filter-item filter-item-5">
            <div className="filter-item-inner">
              <span className="filter-label">{decodeHtmlStr(facilityTypeLabel)} Type</span>
              <Dropdown
                data={facilityTypes.get('data')}
                placeholder={`Select ${decodeHtmlStr(facilityTypeLabel)} type`}
                txtSuffix="selected"
                showCheckbox
                showTextTip
                value={facilityTypeVals}
                showDeselectall
                maxHeight={{ maxHeight: '280px' }}
                data-qa-id={AMIds.filters.facilityType}
                deselectAll={!da.count(facilityTypeVals)}
                disabled={resourceTypes.get('disabledFacilityType')}
                onChange={({ value }) => this.props.setFacilityTypes({ value })}
                onMenuHide={() => this.onHide('facilityTypes', this.changeFacilityTypes)}
                className="wider-dropdown-list"
              />
            </div>
          </div>
          <div className="filter-item filter-item-3">
            <div className="filter-item-inner">
              <span className="filter-label">Event Type</span>
              <Dropdown
                data={eventTypes.get('data')}
                placeholder="Select event type"
                txtSuffix="selected"
                showCheckbox
                showTextTip
                value={eventTypeVals}
                showDeselectall
                maxHeight={{ maxHeight: '280px' }}
                data-qa-id={AMIds.filters.eventType}
                deselectAll={!da.count(eventTypeVals)}
                onChange={({ value }) => this.props.setEventTypes({ value })}
                onMenuHide={() => this.onHide('eventTypes', this.changeEventTypes)}
                className="wider-dropdown-list"
              />
            </div>
          </div>
          <div className="filter-item">
            <div style={{ width: '4%' }}>
              <span />
              <div className="separate" />
            </div>
            <div
              ref={(dropdown) => { this._refs.resourceDropdown = dropdown; }}
              className="filter-item-inner filter-item-inner-last"
              style={{ width: '96%' }}
            >
              <div className="resource-label">
                <span className="filter-label">Resource</span>
                <div
                  className={`clear-filters link ${isChangeTag ? '' : 'disabled-clear-filters'}`}
                  onClick={isChangeTag && this.clearFilters}
                >
                  <i className="icon icon-rotate-left" />
                  <span> Clear Calendar </span>
                </div>
              </div>
              <Dropdown
                data={resources.get('data')}
                style={{ zIndex: 3 }}
                placeholder="Select resource"
                onlyDefaultPlaceholder
                txtSuffix={`resource${resourcesVals.length > 1 ? 's' : ''} selected`}
                menuLocateRight
                showTxtOnlyCheckedOneItem={false}
                showTextTip
                allTxt="Select All"
                filter
                serverFilter
                serverFilterHandler={this.ajaxLoading}
                serverFilterTimestamp={resources.get('lastLoadingTimestamp')}
                deselectAll={!da.count(resourcesVals)}
                data-qa-id={AMIds.filters.resource}
                filterPlaceholder="Enter keywords to search..."
                filterKeyDown={this.setFetchData}
                showCheckbox
                showSpiner={resources.get('loading')}
                showResults
                value={resourcesVals}
                showAll
                showError
                isFetchData={resources.get('isFetchData')}
                errorInfo={resources.get('errMsg')}
                maxHeight={{ maxHeight: '345px' }}
                results={length => (
                  <div className="dropdown-results">{`${length}/${resources.get('totalSize')} results`}</div>
                )
                }
                itemTemplate={(data, ccs, isCheck, click, errorInfo) => (
                  <li
                    key={da.get(data, 'value')}
                    className={`${isCheck() ? 'is-selected' : ''} ${ccs} aaui-flexbox`}
                    onClick={() => click(da.get(data, 'value'))}
                    title={decodeHtmlStr(da.get(data, 'text'))}
                  >
                    <Checkbox
                      checked={isCheck()}
                      value={false}
                      disabled={!isCheck && errorInfo.length > 0}
                    />
                    <span className="dropdown-item__label">{decodeHtmlStr(da.get(data, 'text'))}</span>
                    <span className={`facility-type icon-ResourceType${da.get(data, 'type')}`}>
                      {resourceTypeMap[`resourceType${da.get(data, 'type')}`].charAt(0).toUpperCase()}
                    </span>
                  </li>
                )
                }
                ajaxLoading={this.ajaxLoading}
                onChange={this.setResource}
                onMenuHide={isValueChanged => this.onHide('resources', this.changeResource, isValueChanged)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  onHide = (filterName, callback, isValueChanged) => {
    const lastVal = filtersCache[filterName] || [];
    const currentVal = this.props.filters[filterName].get('selected').toJS();

    if (filterName !== 'resources') {
      this.props.setFetchResource(true);
    } else if (isValueChanged) {
      const selected = this.props.filters.resources.get('selected').toJS();
      /**
       * Reset the quickview status to none,
       * if the selected resources is not equal with the current quickview
       */
      this.props.clearErrMsg();
      this.props.restoreDefault(selected);
      /**
       *  Fix ANE-90042 when the selectedItems of bookableResources is set to [40],
       *  but the quickview selected is [43], the filterCache is set to [40] at bookableResources
       *  been fetched success.When the user fold the resource list and uncheck 43, check 40,
       *  then the filterCache will been the same with the updated selected,
       *  the fetchResourcesBookingAsyncAction will not been call,
       *  so remove the optimization judgement.
       *  */
      this.props.fetchResourcesBookingAsyncAction()
        .then(
          () => this.props.isResourceListOpenedAction(false),
          (error) => {
            // fix ANE-51726: FEE - Error Alert Shows for 1 Second After Dismissing It
            const menu = this._refs.resourceDropdown.querySelector('.aaui-dropdown__menu');
            menu.className += ' u-hidden';
            Promise.reject(error);
          }
        );
    }

    if (filterName === 'centers' && this.props.filters.centers.get('errMsg') !== '') {
      this.props.clearErrMsg();
    }

    /* istanbul ignore else */
    if (!isArrEqual(lastVal, currentVal)) {
      setFiltersCache(this.props.filters);
      callback && callback(filterName);
    }
  }

  setFetchData = () => {
    this.props.setFetchResource(false);
  }

  changeCenter = () => {
    const params = this.getParams();
    this.props.saveFilters();
    this.props.changeCenter(params);
  }

  changeEventTypes = () => {
    const params = this.getParams();
    this.props.saveFilters();
    this.props.changeEventTypes(params);
  }

  changeResourceTypes = () => {
    const params = this.getParams();
    this.props.saveFilters();
    this.props.changeResourceTypes(params);
  }

  changeFacilityTypes = () => {
    const params = this.getParams();
    this.props.saveFilters();
    this.props.changeFacilityTypes(params);
  }

  changeResource = () => {
    this.props.saveFilters();
  }

  clearFilters = () => {
    const { permitID, batchID, receiptID, receiptEntryID, eventID } = this.props.initialData;
    const params = {
      site_ids: '',
      center_ids: '',
      event_type_ids: '',
      resource_type_ids: '',
      facility_type_ids: '',
      resource_ids: '',
      permit_id: permitID,
      batch_id: batchID,
      receipt_id: receiptID,
      receipt_entry_id: receiptEntryID,
      new_entry_id: receiptEntryID,  // To fix ANE-80117, BE need the param of new_entry_id
      event_id: eventID > 0 ? eventID : 0
    };

    this.props.clearFilter(params).then(() =>
      setFiltersCache(this.props.filters));
  }

  getParams = () => {
    const { initialData, filters } = this.props;
    return getResourcesParams(initialData, filters);
  }

  isChangeTag = () => {
    const filterNames = ['centers', 'eventTypes', 'resourceTypes', 'facilityTypes', 'resources'];
    let selectedItems = [];
    let result = false;

    for (let i = 0, len = filterNames.length; i < len; i += 1) {
      selectedItems = this.props.filters[filterNames[i]].get('selected').toJS();
      if (selectedItems.length > 0) {
        result = true;
        break;
      }
    }
    return result;
  }

  setResource = (obj) => {
    const { initialData: { maxNumOfResource } } = this.props;
    const selectedResource = obj.value;
    const selectedResourceLen = selectedResource.length;
    if (selectedResourceLen > maxNumOfResource &&
      (selectedResourceLen > this.previousResourcesState.length)) {
      errMsg = `Limit ${maxNumOfResource} resources.`;
      this.props.setSelectedResource(this.previousResourcesState);
      this.props.changeResourceErrMsg(errMsg);
    } else {
      /**
       * Don't change the order of the isResourceListOpenedAction and setSelectedResource,
       * so that the Fullcalendar re-render only when the user
       * hided the resource list and refetched the new resources
       * */
      this.props.isResourceListOpenedAction(true);
      this.props.setSelectedResource(selectedResource);
      this.props.changeResourceErrMsg('');
      this.previousResourcesState = selectedResource;
    }
  }

  setCenter = (obj) => {
    if (obj.value.length > 5 && (obj.value.length > this.previousCentersState.length)) {
      errMsg = 'Limit 5 centers.';
      this.props.setCenter(this.previousCentersState, errMsg);
    } else {
      errMsg = '';
      this.props.setCenter(obj.value, errMsg);
      this.previousCentersState = obj.value;
    }
  }

  ajaxLoading = (facilityName) => {
    const params = this.getParams();
    params.facility_name = facilityName;

    const { resources } = this.props.filters;
    const nextPage = resources.get('pageNumber') + 1;
    const totalPage = resources.get('totalPage');
    const isLoading = resources.get('loading');

    if ((!isLoading && (!isNil(facilityName) || nextPage <= totalPage))) {
      this.props.ajaxLoadResource(params, nextPage);
    }
  }

  componentDidMount() {
    const isResourceFetched = this.props.filters.resources.get('isResourceFetched');
    /* istanbul ignore else */
    if (!isResourceFetched) {
      this.props.fetchResource(this.getParams());
    }
    setFiltersCache(this.props.filters);
  }

  componentDidUpdate() {
    if (isFirstUpdate === 1) setFiltersCache(this.props.filters);
    isFirstUpdate += 1;
  }

}

export default connect(
  null,
  {
    setCenter,
    setEventTypes,
    setFacilityTypes,
    setResourceTypes,
    fetchResource,
    changeCenter,
    changeEventTypes,
    changeFacilityTypes,
    changeResourceTypes,
    setSelectedResource,
    loadResource,
    saveFilters,
    setFetchResource,
    ajaxLoadResource,
    fetchResourcesBookingAsyncAction,
    clearErrMsg,
    restoreDefault,
    clearFilter,
    changeResourceErrMsg,
    isResourceListOpenedAction
  }
)(SearchBar);
