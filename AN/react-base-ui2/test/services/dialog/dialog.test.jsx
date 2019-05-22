import { dialog } from 'src/services/dialog';
import isPromise from 'src/utils/isPromise';

const setup = (props = {}) => {
  const newProps = {
    title: 'Comfirm',
    message: 'Delete it',
    value: 123,
    ...props
  };

  const { title, message, value, ...rest } = newProps;

  const result = dialog(title, null, { message, value }, { ...rest });

  return { result, newProps };
};

describe('dialog service', () => {
  it('should render well', () => {
    const { result } = setup();
    expect(result).toBeTruthy();
    expect(isPromise(result)).toBeTruthy();
  });

  it('should render well when using default value', () => {
    const result = dialog();
    expect(result).toBeTruthy();
    expect(isPromise(result)).toBeTruthy();
  });
});
