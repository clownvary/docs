import React from 'react';
import { fromJS } from 'immutable';
import { shallow, mount } from 'enzyme';
import actions from 'index/Resource/actions/resourceFilters';
import { SearchBar } from 'index/Resource/components/SearchBar/index';
import normalizeData from 'shared/utils/normalizeData';
import Dropdown from 'react-base-ui/lib/components/Dropdown';

const setup = () => {
  const props = {};
  const initialState = window.__resourceCalender__.__initialState__;
  const sitesObj = normalizeData(initialState.sites);
  const centersObj = normalizeData(initialState.centers);
  const eventTypesObj = normalizeData(initialState.eventTypes);
  const resourceTypesObj = normalizeData(initialState.resourceTypes);
  const facilityTypesObj = normalizeData(initialState.facilityTypes);

  props.sites = fromJS({
    data: sitesObj.data,
    selected: sitesObj.selected
  });

  props.centers = fromJS({
    data: centersObj.data,
    selected: centersObj.selected
  });

  props.eventTypes = fromJS({
    data: eventTypesObj.data,
    selected: eventTypesObj.selected
  });

  props.resourceTypes = fromJS({
    data: resourceTypesObj.data,
    selected: resourceTypesObj.selected,
    disabledFacilityType: false
  });

  props.facilityTypes = fromJS({
    data: facilityTypesObj.data,
    selected: facilityTypesObj.selected
  });

  props.resources = fromJS({
    data: [],
    selected: [],
    error: false,
    loading: false,
    deselectAll: true,
    totalSize: 0,
    errMsg: ''
  });

  const output = shallow(<SearchBar filters={props} {...actions} />);
  const searchBarDOM = mount(<SearchBar filters={props} {...actions} />);

  return {
    actions,
    props,
    output,
    dropdowns: output.find(Dropdown),
    searchBarDOM
  };
};

describe.skip('index -> Resource -> components -> searchBar', () => {
  it('should include 6 divs with having a class named filter-item after rendered', () => {
    const { searchBarDOM } = setup();

    expect(searchBarDOM.find('.filter-item').length).toBe(6);
  });

  it('Text of site should be 17586 - NNNNNNNN, and Clear link should be enabled', () => {
    const { searchBarDOM } = setup();
    const site = searchBarDOM.find('.filter-item').at(0);
    const text = site.find('.aaui-dropdown__button-text');
    const clear = site.find('.deSelectAll');

    expect(text.text()).toBe('17586 - NNNNNNNN');
    expect(clear.hasClass('enabledDeSelectAll')).toBe(true);
  });

  it('Text of center should be All, and Clear link should be disabled', () => {
    const { searchBarDOM } = setup();
    const center = searchBarDOM.find('.filter-item').at(1);
    const text = center.find('.aaui-dropdown__button-text');
    const clear = center.find('.deSelectAll');

    expect(text.text()).toBe('All');
    expect(clear.hasClass('enabledDeSelectAll')).toBe(false);
  });

  it('Text of event type should be All', () => {
    const { searchBarDOM } = setup();
    const eventType = searchBarDOM.find('.filter-item').at(2);
    const text = eventType.find('.aaui-dropdown__button-text');

    expect(text.text()).toBe('All');
  });

  it('Text of resource type should be 2 selected', () => {
    const { searchBarDOM } = setup();
    const resourceType = searchBarDOM.find('.filter-item').at(3);
    const text = resourceType.find('.aaui-dropdown__button-text');

    expect(text.text()).toBe('2 selected');
  });

  it('Facility type should be disabled', () => {
    const { searchBarDOM } = setup();
    const facilityType = searchBarDOM.find('.filter-item').at(4);
    const button = facilityType.find('button');

    expect(button.hasClass('is-disabled')).toBe(false);
  });

  it('Text of resource should be Select resource', () => {
    const { searchBarDOM } = setup();
    const resource = searchBarDOM.find('.filter-item').at(5);
    const text = resource.find('.aaui-dropdown__button-text');

    expect(text.text()).toBe('Select resource');
  });

  it('should call fetchCenters and fetchResource after changing site', () => {
    const { actns, dropdowns } = setup();
    const p = dropdowns.first().props();

    p.onChange({ value: [1, 2, 3, 4] });

    expect(actns.fetchCenters).to.have.been.called;
    expect(actns.fetchResource).to.have.been.called;
  });
});
