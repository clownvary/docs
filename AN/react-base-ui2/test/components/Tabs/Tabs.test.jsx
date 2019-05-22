import React from 'react';
import { shallow, mount } from 'enzyme';

import { Tabs, Tab } from 'src/components/Tabs';
import TabPanel from 'src/components/Tabs/TabPanel';
import { TabsClasses } from 'src/components/Tabs/consts';

it('should render without errors', () => {
  const wrapper = shallow(<Tabs />);
  expect(wrapper).toBeTruthy();
});

it('should render without Tab.', () => {
  const wrapper = shallow(<Tabs />);
  expect(wrapper.find(Tab)).toHaveLength(0);
});

it('should render Tab by dync props passing.', () => {
  const ComponentWrapper = ({ _tabs }) =>
    (
      <Tabs>{_tabs}</Tabs>
    );
  const wrapper = mount(<ComponentWrapper />);
  const wrapper2 = wrapper.setProps({ _tabs: (<Tab>React</Tab>) });
  const tabs = wrapper2.find(Tab);
  const tabPanels = wrapper2.find(TabPanel);
  expect(tabs).toHaveLength(1);
  expect(tabPanels).toHaveLength(1);
});

it('should filter out other stuff.', () => {
  const wrapper = shallow(
    <Tabs>
      <Tab>React</Tab>
      <h1>React Native</h1>
    </Tabs>
  );
  expect(wrapper.find(Tab)).toHaveLength(1);
  expect(wrapper.find('h1')).toHaveLength(0);
});

describe('should show the correct active tab when initial render.', () => {
  describe('if no selectedId specified.', () => {
    it('the first tab should be selected.', () => {
      const wrapper = mount(
        <Tabs>
          <Tab>React</Tab>
          <Tab>Ember</Tab>
          <Tab>Angular</Tab>
        </Tabs>
      );
      const tabs = wrapper.find(Tab);
      const tabPanels = wrapper.find(TabPanel);
      expect(tabs.at(0).prop('selected')).toBeTruthy();
      expect(tabPanels.at(0).prop('selected')).toBeTruthy();
      expect(tabs.at(1).prop('selected')).toBeFalsy();
      expect(tabPanels.at(1).prop('selected')).toBeFalsy();
      expect(tabs.at(2).prop('selected')).toBeFalsy();
      expect(tabPanels.at(2).prop('selected')).toBeFalsy();
    });

    it('the first non-disabled tab should be selected - case 1.', () => {
      const wrapper = mount(
        <Tabs>
          <Tab disabled>React</Tab>
          <Tab>Ember</Tab>
          <Tab>Angular</Tab>
        </Tabs>
      );
      const tabs = wrapper.find(Tab);
      const tabPanels = wrapper.find(TabPanel);
      expect(tabs.at(0).prop('selected')).toBeFalsy();
      expect(tabPanels.at(0).prop('selected')).toBeFalsy();
      expect(tabs.at(1).prop('selected')).toBeTruthy();
      expect(tabPanels.at(1).prop('selected')).toBeTruthy();
      expect(tabs.at(2).prop('selected')).toBeFalsy();
      expect(tabPanels.at(2).prop('selected')).toBeFalsy();
    });

    it('the first non-disabled tab should be selected - case 2.', () => {
      const wrapper = mount(
        <Tabs>
          <Tab disabled>React</Tab>
          <Tab disabled>Ember</Tab>
          <Tab>Angular</Tab>
        </Tabs>
      );
      const tabs = wrapper.find(Tab);
      const tabPanels = wrapper.find(TabPanel);
      expect(tabs.at(0).prop('selected')).toBeFalsy();
      expect(tabPanels.at(0).prop('selected')).toBeFalsy();
      expect(tabs.at(1).prop('selected')).toBeFalsy();
      expect(tabPanels.at(1).prop('selected')).toBeFalsy();
      expect(tabs.at(2).prop('selected')).toBeTruthy();
      expect(tabPanels.at(2).prop('selected')).toBeTruthy();
    });

    it('the first non-disabled tab should be selected - case 3.', () => {
      const wrapper = mount(
        <Tabs>
          <Tab disabled>React</Tab>
          <Tab disabled>test</Tab>
          <Tab>Ember</Tab>
          <Tab disabled>Angular</Tab>
        </Tabs>
      );
      const tabs = wrapper.find(Tab);
      const tabPanels = wrapper.find(TabPanel);
      expect(tabs.at(0).prop('selected')).toBeFalsy();
      expect(tabPanels.at(0).prop('selected')).toBeFalsy();
      expect(tabs.at(1).prop('selected')).toBeFalsy();
      expect(tabPanels.at(1).prop('selected')).toBeFalsy();
      expect(tabs.at(2).prop('selected')).toBeTruthy();
      expect(tabPanels.at(2).prop('selected')).toBeTruthy();
      expect(tabs.at(3).prop('selected')).toBeFalsy();
      expect(tabPanels.at(3).prop('selected')).toBeFalsy();
    });
  });

  describe('if selectedId specified.', () => {
    it('the specified tab should be selected.', () => {
      const wrapper = shallow(
        <Tabs selectedId="mb">
          <Tab id="rt">React</Tab>
          <Tab id="mb">Ember</Tab>
          <Tab id="ng">Angular</Tab>
        </Tabs>
      );
      const tabs = wrapper.find(Tab);
      const tabPanels = wrapper.find(TabPanel);
      expect(tabs.at(0).prop('selected')).toBeFalsy();
      expect(tabPanels.at(0).prop('selected')).toBeFalsy();
      expect(tabs.at(1).prop('selected')).toBeTruthy();
      expect(tabPanels.at(1).prop('selected')).toBeTruthy();
      expect(tabs.at(2).prop('selected')).toBeFalsy();
      expect(tabPanels.at(2).prop('selected')).toBeFalsy();
    });

    it(`the specified tab should not be selected if it is disabled, 
        but the first available tab should be selected.`, () => {
      const wrapper = shallow(
        <Tabs selectedId="mb">
          <Tab disabled id="rt">React</Tab>
          <Tab disabled id="mb">Ember</Tab>
          <Tab id="ng">Angular</Tab>
        </Tabs>
      );
      const tabs = wrapper.find(Tab);
      const tabPanels = wrapper.find(TabPanel);
      expect(tabs.at(0).prop('selected')).toBeFalsy();
      expect(tabPanels.at(0).prop('selected')).toBeFalsy();
      expect(tabs.at(1).prop('selected')).toBeFalsy();
      expect(tabPanels.at(1).prop('selected')).toBeFalsy();
      expect(tabs.at(2).prop('selected')).toBeTruthy();
      expect(tabPanels.at(2).prop('selected')).toBeTruthy();
    });
  });
});

describe('should show id identifier on Tabs container.', () => {
  it('show the specified id.', () => {
    const wrapper = mount(
      <Tabs id="tabsId">
        <Tab id="rt">React</Tab>
        <Tab id="mb">Ember</Tab>
        <Tab id="ng">Angular</Tab>
      </Tabs>
    );
    const tabListContainer = wrapper.find('div#tabsId');
    expect(tabListContainer).toHaveLength(1);
  });

  it('show the autogenerated id and meet the generation rule.', () => {
    const wrapper = shallow(
      <Tabs>
        <Tab id="rt">React</Tab>
        <Tab id="mb">Ember</Tab>
        <Tab id="ng">Angular</Tab>
      </Tabs>
    );
    expect(wrapper.prop('id')).toMatch(new RegExp(`^${TabsClasses.TABS}`));
  });
});

describe('should show the correct size when size changed.', () => {
  it('the default size should be md.', () => {
    const wrapper = shallow(
      <Tabs>
        <Tab id="rt">React</Tab>
        <Tab id="mb">Ember</Tab>
        <Tab id="ng">Angular</Tab>
      </Tabs>
    );
    const tabListContainer = wrapper.find(`.${TabsClasses.TABS}-md`);
    expect(tabListContainer).toHaveLength(1);
  });

  it('the size should be sm.', () => {
    const wrapper = shallow(
      <Tabs size="sm">
        <Tab id="rt">React</Tab>
        <Tab id="mb">Ember</Tab>
        <Tab id="ng">Angular</Tab>
      </Tabs>
    );
    const tabListContainer = wrapper.find(`.${TabsClasses.TABS}-sm`);
    expect(tabListContainer).toHaveLength(1);
  });

  it('the size should be lg.', () => {
    const wrapper = shallow(
      <Tabs size="lg">
        <Tab id="rt">React</Tab>
        <Tab id="mb">Ember</Tab>
        <Tab id="ng">Angular</Tab>
      </Tabs>
    );
    const tabListContainer = wrapper.find(`.${TabsClasses.TABS}-lg`);
    expect(tabListContainer).toHaveLength(1);
  });
});

describe('should show correct tab when selectedId changed.', () => {
  it('show the tab if the changed selectedId is available.', () => {
    const wrapper = shallow(
      <Tabs selectedId="mb">
        <Tab id="rt">React</Tab>
        <Tab id="mb">Ember</Tab>
        <Tab id="ng">Angular</Tab>
      </Tabs>
    );
    const tabs = wrapper.find(Tab);
    const tabPanels = wrapper.find(TabPanel);
    expect(tabs.at(0).prop('selected')).toBeFalsy();
    expect(tabPanels.at(0).prop('selected')).toBeFalsy();
    expect(tabs.at(1).prop('selected')).toBeTruthy();
    expect(tabPanels.at(1).prop('selected')).toBeTruthy();
    expect(tabs.at(2).prop('selected')).toBeFalsy();
    expect(tabPanels.at(2).prop('selected')).toBeFalsy();

    const wrapper2 = wrapper.setProps({ selectedId: 'ng' });
    const tabs2 = wrapper2.find(Tab);
    const tabPanels2 = wrapper2.find(TabPanel);
    expect(tabs2.at(0).prop('selected')).toBeFalsy();
    expect(tabPanels2.at(0).prop('selected')).toBeFalsy();
    expect(tabs2.at(1).prop('selected')).toBeFalsy();
    expect(tabPanels2.at(1).prop('selected')).toBeFalsy();
    expect(tabs2.at(2).prop('selected')).toBeTruthy();
    expect(tabPanels2.at(2).prop('selected')).toBeTruthy();
  });

  it('will no tab change if the changed selectedId is unavailable.', () => {
    const wrapper = shallow(
      <Tabs selectedId="mb">
        <Tab id="rt">React</Tab>
        <Tab id="mb">Ember</Tab>
        <Tab id="ng">Angular</Tab>
      </Tabs>
    );
    const tabs = wrapper.find(Tab);
    const tabPanels = wrapper.find(TabPanel);
    expect(tabs.at(0).prop('selected')).toBeFalsy();
    expect(tabPanels.at(0).prop('selected')).toBeFalsy();
    expect(tabs.at(1).prop('selected')).toBeTruthy();
    expect(tabPanels.at(1).prop('selected')).toBeTruthy();
    expect(tabs.at(2).prop('selected')).toBeFalsy();
    expect(tabPanels.at(2).prop('selected')).toBeFalsy();

    const wrapper2 = wrapper.setProps({ selectedId: 'no_this_tab' });
    const tabs2 = wrapper2.find(Tab);
    const tabPanels2 = wrapper2.find(TabPanel);
    expect(tabs2.at(0).prop('selected')).toBeFalsy();
    expect(tabPanels2.at(0).prop('selected')).toBeFalsy();
    expect(tabs2.at(1).prop('selected')).toBeTruthy();
    expect(tabPanels2.at(1).prop('selected')).toBeTruthy();
    expect(tabs2.at(2).prop('selected')).toBeFalsy();
    expect(tabPanels2.at(2).prop('selected')).toBeFalsy();
  });
});

describe('Test Tab props change.', () => {
  it('disabled prop changed.', () => {
    const ComponentWrapper = ({ disableMb = false }) => 
      (
        <Tabs>
          <Tab id="rt">React</Tab>
          <Tab disabled={disableMb} id="mb">Ember</Tab>
          <Tab id="ng">Angular</Tab>
        </Tabs>
      );
    const wrapper = mount(<ComponentWrapper />);

    const tabs = wrapper.find('Tab');
    const tabPanels = wrapper.find('TabPanel');
    expect(tabs.at(0).prop('selected')).toBeTruthy();
    expect(tabPanels.at(0).prop('selected')).toBeTruthy();
    expect(tabs.at(1).prop('selected')).toBeFalsy();
    expect(tabPanels.at(1).prop('selected')).toBeFalsy();
    expect(tabs.at(1).prop('disabled')).toBeFalsy();
    expect(tabPanels.at(1).prop('disabled')).toBeFalsy();
    expect(tabs.at(2).prop('selected')).toBeFalsy();
    expect(tabPanels.at(2).prop('selected')).toBeFalsy();

    const wrapper2 = wrapper.setProps({ disableMb: true });
    const tabs2 = wrapper2.find(Tab);
    const tabPanels2 = wrapper2.find(TabPanel);
    expect(tabs2.at(0).prop('selected')).toBeTruthy();
    expect(tabPanels2.at(0).prop('selected')).toBeTruthy();
    expect(tabs2.at(1).prop('selected')).toBeFalsy();
    expect(tabPanels2.at(1).prop('selected')).toBeFalsy();
    expect(tabs2.at(1).prop('disabled')).toBeTruthy();
    expect(tabPanels2.at(1).prop('disabled')).toBeTruthy();
    expect(tabs2.at(2).prop('selected')).toBeFalsy();
    expect(tabPanels2.at(2).prop('selected')).toBeFalsy();
  });
});

describe('Test event trigger.', () => {
  it('switch tab by clicking tab.', () => {
    const wrapper = shallow(
      <Tabs>
        <Tab id="rt">React</Tab>
        <Tab id="mb">Ember</Tab>
        <Tab id="ng">Angular</Tab>
      </Tabs>
    );

    const tabs = wrapper.find('Tab');
    const tabPanels = wrapper.find('TabPanel');
    expect(tabs.at(0).prop('selected')).toBeTruthy();
    expect(tabPanels.at(0).prop('selected')).toBeTruthy();
    expect(tabs.at(1).prop('selected')).toBeFalsy();
    expect(tabPanels.at(1).prop('selected')).toBeFalsy();
    expect(tabs.at(2).prop('selected')).toBeFalsy();
    expect(tabPanels.at(2).prop('selected')).toBeFalsy();

    const tabMb = wrapper.find('Tab#mb');
    tabMb.simulate('click', 'mb');
    expect(wrapper.state('selectedId')).toBe('mb');
  });

  it('invock onChange on react node.', () => {
    const onChangeMocker = jest.fn();
    const wrapper = shallow(
      <Tabs onChange={onChangeMocker}>
        <Tab id="rt">React</Tab>
        <Tab id="mb">Ember</Tab>
        <Tab id="ng">Angular</Tab>
      </Tabs>
    );

    const tabs = wrapper.find('Tab');
    const tabPanels = wrapper.find('TabPanel');
    expect(tabs.at(0).prop('selected')).toBeTruthy();
    expect(tabPanels.at(0).prop('selected')).toBeTruthy();
    expect(tabs.at(1).prop('selected')).toBeFalsy();
    expect(tabPanels.at(1).prop('selected')).toBeFalsy();
    expect(tabs.at(2).prop('selected')).toBeFalsy();
    expect(tabPanels.at(2).prop('selected')).toBeFalsy();

    const tabMb = wrapper.find('Tab#mb');
    tabMb.simulate('click', 'mb');
    expect(onChangeMocker).toHaveBeenCalled();
  });

  it('invoke onChange on dom element.', () => {
    const onChangeMocker = jest.fn();
    const wrapper = mount(
      <Tabs onChange={onChangeMocker}>
        <Tab id="rt">React</Tab>
        <Tab id="mb">Ember</Tab>
        <Tab id="ng">Angular</Tab>
      </Tabs>
    );

    const tabMb = wrapper.find('#mb');
    tabMb.simulate('click', 'mb');
    expect(onChangeMocker).toHaveBeenCalled();
  });

  it('no invoke onChange if disabled.', () => {
    const onChangeMocker = jest.fn();
    const wrapper = mount(
      <Tabs onChange={onChangeMocker}>
        <Tab id="rt">React</Tab>
        <Tab disabled="true" id="mb">Ember</Tab>
        <Tab id="ng">Angular</Tab>
      </Tabs>
    );

    const tabMb = wrapper.find('#mb');
    tabMb.simulate('click', 'mb');
    expect(onChangeMocker).not.toHaveBeenCalled();
  });
});
