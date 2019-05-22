import React from 'react';
import renderer from 'react-test-renderer';

import { checkbox, icon, text } from 'src/components/ColumnList/columns';

describe('components/ColumnList/columns', () => {
  it('Column list checkbox renders fine', () => {
    const snapshot = renderer.create(
      checkbox(true, { })
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Column list icon renders fine', () => {
    const snapshot = renderer.create(
      icon('icon', { className: 'icon-add' })
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Column list text renders fine', () => {
    const snapshot = renderer.create(
      text('column-text-123', { className: 'column-text-snapshot' })
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
