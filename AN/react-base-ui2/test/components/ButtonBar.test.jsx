import React from 'react';
import renderer from 'react-test-renderer';

import { ButtonBar } from 'src/components/ButtonBar';

describe('components/ButtonBar', () => {
  const data = [
    {
      id: 'btn1',
      disabled: false,
      text: 'button1'
    },
    {
      id: 'btn2',
      disabled: false,
      icon: 'icon-list-m',
      class: 'button2-with-icon'
    },
    {
      id: 'btn3',
      disabled: true
    }
  ];

  it('ButtonBar renders fine', () => {
    const snapshot = renderer.create(<ButtonBar data={data} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
