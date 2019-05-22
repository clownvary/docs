import React from 'react';
import { mount } from 'enzyme';

import ComboBox from 'src/components/ComboBox';

describe('components/ComboBox', () => {
  it('ComboBox renders fine', () => {
    const items = [
      { text: 'option 1', value: 1 },
      { text: 'option 2', value: 2 }
    ];
    const onBeforeOpen = jest.fn().mockReturnValue(true);
    const component = mount(
      <ComboBox
        placehold="comboBox"
        items={items}
        listPopupOptions={{ onBeforeOpen }}
      />
    );

    expect(component.find('input')).toHaveLength(1);

    const expandTrigger = component.find('.button-toggler');
    expect(expandTrigger).toHaveLength(1);

    expandTrigger.simulate('click');
    expect(onBeforeOpen).toHaveBeenCalled();

    const listItems = document.querySelectorAll('.an-list li');
    expect(listItems).toHaveLength(2);
    expect(listItems[0].textContent).toEqual(items[0].text);
    expect(listItems[1].textContent).toEqual(items[1].text);
  });
});
