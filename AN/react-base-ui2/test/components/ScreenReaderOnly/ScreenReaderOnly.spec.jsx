import React from 'react';
import renderer from 'react-test-renderer';
import ScreenReaderOnly from 'src/components/ScreenReaderOnly';

describe('components/ScreenReaderOnly', () => {
  it('render className', () => {
    const snapshot = renderer.create(
      <ScreenReaderOnly className="test-class-01">abc</ScreenReaderOnly>
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('render id and className', () => {
    const snapshot = renderer.create(
      <ScreenReaderOnly id="testId" className="test-class-02" >def</ScreenReaderOnly>
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
