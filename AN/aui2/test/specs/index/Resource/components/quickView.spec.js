import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import { QuickView } from 'index/Resource/components/QuickView';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import { Authority } from 'shared/authorities';
import Radio from 'react-base-ui/lib/components/Radio';

const actions = {
  setQuickViewAsyncAction: jest.fn(() => Promise.resolve()),
  deleteQuickViewAsyncAction: jest.fn(),
  saveQuickViewAsyncAction: jest.fn(),
  showQuickViewModelAction: jest.fn(),
  changeQuickViewTypeAction: jest.fn(),
  saveQuickViewErrorAction: jest.fn()
};

const quickView = fromJS(
  {
    data: fromJS([
      {
        "id": 6,
        "name": "test1",
        "value": 6,
        "text": "test1",
        "selected": true,
        "scope_type": 2,
        "resource_ids": [
            10,
            11
        ]
      },
      {
        "id": 7,
        "name": "test2",
        "value": 7,
        "text": "test2",
        "selected": true,
        "scope_type": 1,
        "resource_ids": [
            10,
            11
          ]
      }
    ]),
    selectedView: 6,
    showModel: false,
    name: 'view',
    errorMessage: ''
  }
);

const filters = {
  resources : fromJS({
    data: [{}],
    selected: [1],
    loading: false,
    totalSize: 0,
    errMsg: '',
    isFetchData: false
  })
}

const setup = (view, filters, hasSelectedResources = false) => {
  Authority.init(window.__authoritiy__);
  const authorities = convertCasingPropObj(window.__resourceCalender__.__initialState__.authorities);
  return mount(<QuickView  filters={filters} quickView={view} hasSelectedResources={hasSelectedResources} {...actions} authorities />);
};

describe('index/resource/components/QuickView', () => {
  it('component and initialization works fine', () => {
    const component = setup(quickView, filters);
    expect(component.find('Dropdown').length).toBe(1);
    expect(component.find('.icon-btn-save').length).toBe(1);
    expect(component.find('Model').length).toBe(0);
  });

  it('Save button should be disabled when selectedView != -1', () => {
    const component = setup(quickView, filters);

    const disabledButton = component.find('.disabled-button');
    expect(disabledButton.node.disabled).toBeTruthy();
  });

  it('Save button should be disabled', () => {
    const filter = {
      resources : fromJS({
        data: [],
        selected: [],
        loading: false,
        totalSize: 0,
        errMsg: '',
        isFetchData: false
      })
    };

    const data = fromJS(
      {
        data: fromJS([ {
          "id": 6,
          "name": "test1",
          "value": 6,
          "text": "test1",
          "selected": true,
          "resource_ids": [
              10,
              11
          ]
        } ]),
        selectedView: -1,
        showModel: true,
        name: 'view',
        errorMessage: ''
      }
    );
    const component = setup(data, filter);

    const disabledButton = component.find('.disabled-button');
    expect(disabledButton.node.disabled).toBeTruthy();

    const filters1 = {
      resources : fromJS({
        data: [{}],
        selected: [],
        loading: false,
        totalSize: 0,
        errMsg: '',
        isFetchData: false
      })
    };

    const component1 = setup(data, filters1);
    const disabledButton1 = component1.find('.disabled-button');
    expect(disabledButton1.node.disabled).toBeTruthy();
    expect(disabledButton1.node.title).toEqual('Save quick view');

    const maxlength = 75;

    let dataviewList = [];

    for( let i = 0; i<= maxlength; i++) {
      dataviewList[i] = i;
    }

    const data1 = fromJS(
      {
        data: fromJS(dataviewList),
        selectedView: -1,
        showModel: true,
        name: 'view',
        errorMessage: ''
      }
    );

    const component2 = setup(data1, filters);
    const disabledButton2 = component2.find('.disabled-button');
    expect(disabledButton2.node.disabled).toBeTruthy();
    expect(disabledButton2.node.title).toEqual(`Maixmum ${maxlength} quick views can be saved`);
  });

  it('show Model well and error messge is not null', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": 6,
          "name": "test1",
          "value": 6,
          "text": "test1",
          "selected": true,
          "resource_ids": [
              10,
              11
          ]
        } ]),
        selectedView: 6,
        showModel: true,
        name: 'view',
        errorMessage: 'Max 50 chars'
      }
    );

    const component = setup(data, filters);
    const model = component.find('.modal-body');
    expect(component.find('.modal-body').length === 1).toBeTruthy();
    const buttons = component.find('button');
    expect(buttons.length === 4).toBeTruthy();
    const input = component.find('.input-error');
    expect(input.length === 1).toBeTruthy();
    const errorMessage = component.find('.error-message');
    expect(errorMessage.length === 1).toBeTruthy();
    expect(errorMessage.text()).toBe('Max 50 chars');
    const desc = component.find('.desc');
    expect(desc.length === 1).toBeTruthy();
  });

  it('show Model well and error messge is epmpty', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": 6,
          "name": "test1",
          "value": 6,
          "text": "test1",
          "selected": true,
          "resource_ids": [
              10,
              11
          ]
        } ]),
        selectedView: 6,
        showModel: true,
        name: '',
        errorMessage: ''
      }
    );

    const component = setup(data, filters);
    const input = component.find('.input-error');
    expect(input.length === 0).toBeTruthy();
    const errorMessage = component.find('.error-message');
    expect(errorMessage.text()).toBe('');
    const desc = component.find('.desc');
    expect(desc.length === 1).toBeTruthy();
  });

  it('show call showQuickViewModel when click the save button ', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": -1,
          "name": "none",
          "value": -1,
          "text": "test1",
          "selected": true,
          "resource_ids": []
        } ]),
        selectedView: -1,
        showModel: false,
        name: '',
        errorMessage: ''
      }
    );


    const component = setup(data, filters, true);
    const saveButton = component.find('.icon-btn-save');
    expect(saveButton.node.disabled).toBeFalsy();

    saveButton.simulate('click');
    expect(actions.showQuickViewModelAction).toHaveBeenCalledTimes(1);

    const component1 = setup(data, filters);
    const saveButton1 = component1.find('.icon-btn-save');
    expect(saveButton1.node.disabled).toBeTruthy();
  });

  it('should call validateQuickView when input quick view name ', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": -1,
          "name": "none",
          "value": -1,
          "text": "test1",
          "selected": true,
          "resource_ids": []
        } ]),
        selectedView: -1,
        showModel: true,
        name: 'ttttt',
        errorMessage: ''
      }
    );

    const component = setup(data, filters);
    component.setState({quickViewName: 'tttt'});
    const dialog = component.find('.modal-box');
    expect(dialog.length).toBe(1);
    const input = component.find('#quickViewName');
    expect(input.length).toBe(1);
    input.prop('onChange')({ target: { value: 'tttt' } });
    input.value = 'tttt';
    input.simulate('input', { target: { value: 'tttt'} });
    const saveButton = component.find('.btn-strong');
    saveButton.simulate('click');
    expect(actions.saveQuickViewAsyncAction).toHaveBeenCalledTimes(1);

    const data1 = fromJS(
      {
        data: fromJS([ {
          "id": -1,
          "name": "none",
          "value": -1,
          "text": "test1",
          "selected": true,
          "resource_ids": []
        } ]),
        selectedView: -1,
        showModal: true,
        name: 'ttttt',
        errorMessage: 'max length'
      }
    );

    const component1 = setup(data1, filters);
    const input1 = component1.find('#quickViewName');
    expect(input1.length).toBe(1);
    input1.prop('onChange')({ target: { value: 'tttt' } });
    component.setState({quickViewName: 'tttt'});
    expect(actions.saveQuickViewErrorAction).toHaveBeenCalledTimes(1);
  });

  it('should call saveQuickView when click confirm button ', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": -1,
          "name": "none",
          "value": -1,
          "text": "test1",
          "selected": true,
          "resource_ids": []
        } ]),
        selectedView: -1,
        showModel: true,
        name: 'ttttt',
        errorMessage: ''
      }
    );

    const component = setup(data, filters);
    component.setState({quickViewName: 'tttt'});
    const dialog = component.find('.modal-box');
    expect(dialog.length).toBe(1);
    const input = component.find('#quickViewName');
    expect(input.length).toBe(1);
    input.value = 'tttt';
    input.simulate('input', { target: { value: 'tttt'} });

    const buttons = dialog.find('button');
    expect(buttons.length).toBe(2);
    buttons.last().simulate('click');
    expect(actions.saveQuickViewAsyncAction).toHaveBeenCalled();
  });

  it('should call showQuickViewModel when click cancel button ', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": -1,
          "name": "none",
          "value": -1,
          "text": "test1",
          "selected": true,
          "resource_ids": []
        } ]),
        selectedView: -1,
        showModal: true,
        name: 'ttttt',
        errorMessage: ''
      }
    );

    const component = setup(data, filters);
    component.setState({quickViewName: 'tttt'});
    const dialog = component.find('.modal-box');
    const buttons = dialog.find('button');
    buttons.first().simulate('click');
    expect(actions.showQuickViewModelAction).toHaveBeenCalled();
  });

  it('show call setQuickViewAsyncAction when dropdown change ', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": -1,
          "name": "none",
          "value": -1,
          "text": "test1",
          "selected": true,
          "resource_ids": []
        } ]),
        selectedView: -1,
        showModel: false,
        name: '',
        errorMessage: ''
      }
    );

    const component = setup(data, filters);
    const dropdown = component.find('Dropdown');
    dropdown.prop('onChange')({value: '1'});
    expect(actions.setQuickViewAsyncAction).toHaveBeenCalled();
  });

  it('show call deleteQuickViewAsyncAction when delete quick view ', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": -1,
          "name": "none",
          "value": -1,
          "text": "test1",
          "selected": true,
          "resource_ids": []
        } ]),
        selectedView: -1,
        showModel: false,
        name: '',
        errorMessage: ''
      }
    );

    const component = setup(data, filters);
    const dropdown = component.find('Dropdown');
    dropdown.simulate('click');

    const items = component.find('li');
    expect(items.length).toBe(1);

    const spans = items.find('span');
    spans.first().simulate('click');
    spans.last().simulate('click');
    expect(actions.deleteQuickViewAsyncAction).toHaveBeenCalled();
  });

  it('should call changeQuickViewTypeAction when click radio button ', () => {
    const data = fromJS(
      {
        data: fromJS([ {
          "id": -1,
          "name": "none",
          "value": -1,
          "text": "test1",
          "selected": true,
          "resource_ids": []
        } ]),
        selectedView: -1,
        showModel: true,
        name: 'ttttt',
        errorMessage: '',
        selectedViewType: 0
      }
    );
    const component = setup(data, filters);
    const radios = component.find('input[type="radio"]');
    expect(radios).toHaveLength(2);

    const localRadio = radios.at(0);
    localRadio.disabled = false;
    localRadio.simulate('change', { target: { value: 200 } });
    expect(actions.changeQuickViewTypeAction).toHaveBeenCalledTimes(1);

    const globalRadio = radios.at(1);
    globalRadio.disabled = false;
    globalRadio.simulate('change', { target: { value: 300 } });
    expect(actions.changeQuickViewTypeAction).toHaveBeenCalledTimes(2);
  });
});
