import { confirm } from 'src/services/dialog';
import isPromise from 'src/utils/isPromise';

const setup = (props = {}) => {
  const newProps = {
    message: 'Delete it',
    value: 123,
    ...props
  };

  const { message, value } = newProps;

  const result = confirm(message, { value });
  return { result, newProps };
};

describe('confirm service', () => {
  it('should render well', () => {
    const { result } = setup();
    expect(result).toBeTruthy();
    expect(isPromise(result)).toBeTruthy();
  });

  it('should render well when using default value', () => {
    const result = confirm();
    expect(result).toBeTruthy();
    expect(isPromise(result)).toBeTruthy();
  });
});
