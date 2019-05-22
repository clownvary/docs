import {
  enableClearable,
  disableClearable,
  enableSelectable,
  disableSelectable,
  disableAll
} from 'src/services/decoration';

import Clearable from 'src/services/decoration/clearable';
import Selectable from 'src/services/decoration/selectable';

describe('services/decoration/index.js', () => {
  test('basic usage', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);

    enableClearable(input);
    expect(input[Clearable.tag]).toBeInstanceOf(Clearable);

    enableSelectable(input);
    expect(input[Selectable.tag]).toBeInstanceOf(Selectable);

    disableClearable(input);
    expect(input[Clearable.tag]).toBeUndefined();

    disableSelectable(input);
    expect(input[Selectable.tag]).toBeUndefined();

    enableClearable(input);
    expect(input[Clearable.tag]).toBeInstanceOf(Clearable);
    expect(input[Selectable.tag]).toBeUndefined();

    disableAll(input);
    expect(input[Clearable.tag]).toBeUndefined();
    expect(input[Selectable.tag]).toBeUndefined();
  });
});
