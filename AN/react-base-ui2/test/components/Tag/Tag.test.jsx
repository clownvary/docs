import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Tag from 'src/components/Tag';
import { TagType, TagSize } from 'src/components/Tag/consts';

describe('components/Tag', () => {
  it('component renders fine with default props', () => {
    const snapshot = renderer.create(<Tag />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component renders fine if closeable', () => {
    const props = {
      closable: true,
      size: TagSize.SMALL,
      type: TagType.PENDING
    };
    const snapshot = renderer.create(<Tag {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component works fine', () => {
    const onClose = jest.fn();
    const component = shallow(<Tag closable onClose={onClose} />);

    const closeIcon = component.find('i.icon-close');
    expect(closeIcon).toHaveLength(1);
    closeIcon.simulate('mousedown');
    expect(onClose).toHaveBeenCalled();
  });
});
