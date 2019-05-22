import React, { PureComponent } from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import Modal from 'src/components/Modal';
import Button from 'src/components/Button';

jest.useRealTimers();

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isDisplayed: false
    };
  }

  open = () => {
    this.setState({
      isDisplayed: true
    });
  }

  close = () => {
    this.setState({
      isDisplayed: false
    });
  }

  render = () => (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Button id="show-modal" type="primary" onClick={this.open}>
        Show Modal
      </Button>
      <Modal
        title="Hello World"
        shown={this.state.isDisplayed}
        onClose={this.close}
      >
        <div className="modal-body">
          <strong>Lorem Ipsum</strong>
          <br />
          Amet aperiam molestiae quo perspiciatis explicabo recusandae, beatae?
          Impedit dolore nihil fugiat dolores laborum deleniti? Harum tempore
          voluptates maiores quisquam quisquam porro aperiam! Architecto et
          dignissimos deserunt quisquam dolores, nobis.
          <a href="#show-modal" style={{ display: 'none' }}>
            123
          </a>
          <a href="#show-modal">123</a>
          <a>123</a>
        </div>
        <div className="modal-footer">
          <Button onClick={this.close}>Cancel</Button>
          <Button id="close-modal" type="strong" onClick={this.close}>
            OK
          </Button>
        </div>
      </Modal>
    </div>
  )
}

it('a modal should be not shown default', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find(Modal).prop('shown')).toBe(false);

  wrapper.unmount();
});

it('a modal should be shown after triggering', () => {
  const wrapper = shallow(<App />);

  wrapper.find('#show-modal').simulate('click');
  expect(wrapper.find(Modal).prop('shown')).toBe(true);

  wrapper.unmount();
});

it('a modal should be hide after closing it', () => {
  const wrapper = shallow(<App />);

  wrapper.find('#close-modal').simulate('click');
  expect(wrapper.find(Modal).prop('shown')).toBe(false);

  wrapper.unmount();
});

it('Modal should render right thing and don\'t change unexpected', () => {
  const tree = renderer.create(<App />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('should could hide DatePicker through setting `shown` prop', () => {
  const wrapper = mount(<Modal shown />);

  wrapper.setProps({ shown: false });
  wrapper.setProps({ title: 'modal title', shown: false });

  wrapper.unmount();
});

it('should trap focus into Modal element when it opened', (done) => {
  const wrapper = mount(<App />);

  wrapper
    .find('#show-modal')
    .last()
    .simulate('click');
  setTimeout(() => {
    wrapper.find('.modal-wrap .is-open').simulate('keyDown', { keyCode: 9 });
    expect(wrapper.find(Modal).prop('shown')).toBe(true);
    wrapper.find('.modal-wrap .is-open').simulate('keyDown', { keyCode: 9 });
    wrapper.find('.modal-wrap .is-open').simulate('keyDown', { keyCode: 9 });
    wrapper.find('.modal-wrap .is-open').simulate('keyDown', { keyCode: 9 });
    expect(wrapper.find(Modal).prop('shown')).toBe(true);
    wrapper.find('.modal-wrap .is-open').simulate('keyDown', { keyCode: 27 });
    expect(wrapper.find(Modal).prop('shown')).toBe(false);

    wrapper.unmount();
    done();
  }, 1000);
});

it('should trap focus into Modal element when it mounted', () => {
  jest.useFakeTimers();

  const container = document.createElement('div');
  document.body.appendChild(container);
  const wrapper = mount(<Modal shown />, { attachTo: container });

  jest.runAllTimers();

  expect(document.activeElement.classList.contains('modal-close')).toBe(true);

  wrapper.unmount();
});

it('test keyboard function for modal', () => {
  const wrapper = mount(<App />);

  wrapper
    .find('#show-modal')
    .last()
    .simulate('click');
  expect(wrapper.find(Modal).prop('shown')).toBe(true);

  wrapper.find('.modal-wrap .is-open').simulate('keyDown', { keyCode: 32 });
  expect(wrapper.find(Modal).prop('shown')).toBe(true);

  wrapper.find('.modal-wrap .modal-close').simulate('keyDown', { keyCode: 9 });
  expect(wrapper.find(Modal).prop('shown')).toBe(true);

  wrapper.find('.modal-wrap .modal-close').simulate('keyDown', { keyCode: 32 });
  expect(wrapper.find(Modal).prop('shown')).toBe(false);

  wrapper.unmount();
});

it('should call `unfixBody` when component will unmount', () => {
  const wrapper = mount(<App />);

  wrapper
    .find('#show-modal')
    .last()
    .simulate('click');

  expect(document.body.style.overflowX === 'hidden').toBe(true);
  expect(document.body.style.overflowY === 'hidden').toBe(true);

  wrapper.unmount();

  expect(document.body.style.overflowX === '').toBe(true);
  expect(document.body.style.overflowY === '').toBe(true);
});
