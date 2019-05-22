import Alert from 'src/components/Alert';

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

afterEach(() => {
  document.body.innerHTML = '';
});

const setup = ({ type, ...rest }) => {
  const api = Alert[type]({
    message: 'I AM A GLOBAL MESSAGE',
    ...rest
  });

  return {
    ...api
  };
};

it('Alert.success', () => {
  setup({ type: 'success' });

  expect(document.body.innerHTML).toMatchSnapshot();
});

it('Alert.success with concise syntax', () => {
  Alert.success('I AM A GLOBAL MESSAGE');

  expect(document.body.innerHTML).toMatchSnapshot();
});

it('Alert.warning', () => {
  setup({ type: 'warning' });

  expect(document.body.innerHTML).toMatchSnapshot();
});

it('Alert.error', () => {
  setup({ type: 'error' });

  expect(document.body.innerHTML).toMatchSnapshot();
});

it('Alert.info', () => {
  setup({ type: 'info' });

  expect(document.body.innerHTML).toMatchSnapshot();
});

it('Alert.success with timeout: 3s', () => {
  setup({ type: 'success', timeout: 3 });

  jest.runAllTimers();

  expect(document.querySelector('.alert-bar.show')).not.toBeTruthy();
  expect(document.body.innerHTML).toMatchSnapshot();
});

it('Alert.success#close', () => {
  const onCloseMock = jest.fn();
  const { close } = setup({ type: 'success', onClose: onCloseMock });

  close();
  expect(onCloseMock).toBeCalled();
  expect(document.body.innerHTML).toMatchSnapshot();
});

it('Alert.clear', () => {
  // open 4 Alerts at first
  const { close } = setup({ type: 'success', multiple: true });
  setup({ type: 'success', multiple: true });
  setup({ type: 'success', multiple: true });
  setup({ type: 'success', multiple: true });

  jest.runAllTimers();

  expect(document.querySelectorAll('.alert-bar.show').length).toBe(4);
  expect(document.body.innerHTML).toMatchSnapshot();

  // then close one of them
  close();

  expect(document.querySelectorAll('.alert-bar.show').length).toBe(3);

  // close all after all
  Alert.clear();

  expect(document.querySelectorAll('.alert-bar.show').length).toBe(0);
  expect(document.body.innerHTML).toMatchSnapshot();
});
