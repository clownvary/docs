import React from 'react';
import renderer from 'react-test-renderer';
import 'src/svgs';

import SVG, { Icon } from 'src/components/SVG';

describe('components/SVG', () => {
  it('SVG renders fine', () => {
    const snapshot = renderer.create(
      <SVG className="image" symbolPrefix="svg" name="image" />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Icon renders fine', () => {
    const snapshot = renderer.create(
      <Icon className="image coral large" symbolPrefix="svg" name="cloud" />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
