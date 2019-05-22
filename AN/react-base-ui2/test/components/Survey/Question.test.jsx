import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import moment from 'moment';

import Question from 'src/components/Survey/Question';
import { QuestionType, InputType } from 'src/components/Survey/consts';
import Radio, { RadioGroup } from 'src/components/Radio';
import Checkbox, { CheckboxGroup } from 'src/components/Checkbox';
import Dropdown from 'src/components/Dropdown';
import Phone from 'src/components/Phone';
import InputDate from 'src/components/InputDate';
import InputTime from 'src/components/InputTime';
import Input from 'src/components/Input';
import Duration from 'src/components/Duration';

describe('components/Survey/Question', () => {
  it('Question renders fine', () => {
    const props = {
      isShown: true,
      id: '1',
      text: 'Free to answer something.',
      path: ['snapshot', '1'],
      type: QuestionType.INPUT,
      placeholder: '...',
      format: InputType.FREE,
      hint: 'question hint'
    };

    const snapshot = renderer.create(
      <Question {...props} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Question renders fine with error messages', () => {
    const props = {
      isShown: true,
      id: '2',
      text: 'Say something plz',
      path: ['snapshot', '2'],
      required: true,
      icon: 'icon-check',
      type: QuestionType.INPUT,
      format: InputType.FREE,
      errorMsgs: ['The answer is required.'],
      hint: 'question hint'
    };
    const snapshot = renderer.create(
      <Question {...props} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Question component of Radio type works fine', () => {
    const radioProps = {
      isShown: true,
      id: '3',
      text: 'Do you like drinking coffee?',
      path: ['shallow', '3'],
      type: QuestionType.RADIO,
      hint: 'question hint',
      answers: [
        { text: 'Yes!', value: 'true' },
        { text: 'Nooooo!', value: 'false' }
      ],
      onChange: jest.fn()
    };
    const component = shallow(<Question {...radioProps} />);
    expect(component.find(RadioGroup)).toHaveLength(1);
    const answers = component.find(Radio);
    expect(answers).toHaveLength(2);
    component.find(RadioGroup).simulate('change', { target: { value: 'true' } });
    expect(component.instance().state.value).toBeTruthy();
    expect(radioProps.onChange).toHaveBeenCalled();

    component.setProps({ value: 'false' });
    expect(component.instance().value).toEqual('false');
  });

  it('Question component of Single-Dropdown type works fine', () => {
    const singleDropdownProps = {
      isShown: true,
      id: '3',
      text: 'Do you like drinking coffee?',
      path: ['shallow', '3'],
      type: QuestionType.SINGLEDROPDOWN,
      hint: 'question hint',
      answers: [
        { text: 'Yes!', value: 'true' },
        { text: 'Nooooo!', value: 'false' }
      ],
      onChange: jest.fn()
    };
    const component = shallow(<Question {...singleDropdownProps} />);
    expect(component.find(Dropdown)).toHaveLength(1);

    component.find(Dropdown).simulate('change', { value: 'true' });
    expect(component.instance().state.value).toBeTruthy();
    expect(singleDropdownProps.onChange).toHaveBeenCalled();
  });

  it('Question component of Checkbox type works fine', () => {
    const checkboxProps = {
      isShown: true,
      id: '4',
      text: 'What needs to be added in your coffee?',
      path: ['shallow', '4'],
      type: QuestionType.CHECKBOX,
      hint: 'question hint',
      answers: [
        { text: 'sugar', value: '1' },
        { text: 'milk', value: '2' },
        { text: 'cream', value: '3' }
      ],
      onChange: jest.fn()
    };
    const component = shallow(<Question {...checkboxProps} />);
    expect(component.find(CheckboxGroup)).toHaveLength(1);
    const answers = component.find(Checkbox);
    expect(answers).toHaveLength(3);
    component.find(CheckboxGroup).simulate('change', ['1', '3']);
    expect(component.instance().state.value).toEqual(['1', '3']);
    expect(checkboxProps.onChange).toHaveBeenCalled();
  });

  it('Question component of Multiple-Dropdown type works fine', () => {
    const checkboxProps = {
      isShown: true,
      id: '4',
      text: 'What needs to be added in your coffee?',
      path: ['shallow', '4'],
      type: QuestionType.MULTIPLEDROPDOWN,
      hint: 'question hint',
      answers: [
        { text: 'sugar', value: '1' },
        { text: 'milk', value: '2' },
        { text: 'cream', value: '3' }
      ],
      onChange: jest.fn()
    };
    const component = shallow(<Question {...checkboxProps} />);
    expect(component.find(Dropdown)).toHaveLength(1);
    component.find(Dropdown).simulate('change', { value: ['1', '3'] });
    expect(component.instance().state.value).toEqual(['1', '3']);
    expect(checkboxProps.onChange).toHaveBeenCalled();
  });

  it('Question component of phone type works fine', () => {
    const phoneProps = {
      isShown: true,
      id: '4',
      text: 'What\'s your phone number?',
      path: ['shallow', '4'],
      type: QuestionType.INPUT,
      format: InputType.PHONE,
      answers: [],
      hint: 'question hint',
      onChange: jest.fn()
    };
    const component = shallow(<Question {...phoneProps} />);
    expect(component.find(Phone)).toHaveLength(1);
    expect(component.find(Phone).prop('ariaLabel')).toEqual('What\'s your phone number? question hint');

    component.find(Phone).simulate('change', '12345-234');
    expect(component.instance().state.value).toEqual('12345-234');
    expect(phoneProps.onChange).toHaveBeenCalled();
  });

  it('Question component of phone required is true works fine', () => {
    const phoneProps = {
      isShown: true,
      required: true,
      id: '4',
      text: 'What\'s your phone number?',
      path: ['shallow', '4'],
      type: QuestionType.INPUT,
      format: InputType.PHONE,
      answers: [],
      hint: 'question hint',
      onChange: jest.fn()
    };
    const component = shallow(<Question {...phoneProps} />);
    expect(component.find(Phone).prop('ariaLabel')).toEqual('* What\'s your phone number? (required) question hint');
  });

  it('Question component of date type works fine', () => {
    const dateProps = {
      isShown: true,
      id: '5',
      text: 'When is your birthday?',
      path: ['shallow', '5'],
      type: QuestionType.INPUT,
      format: InputType.DATE,
      answers: [],
      hint: 'question hint',
      onChange: jest.fn()
    };
    const birthdayMoment = moment('1983-09-05');
    const component = shallow(<Question {...dateProps} />);
    expect(component.find(InputDate)).toHaveLength(1);

    component.find(InputDate).simulate('valueChange', { value: birthdayMoment });
    expect(component.instance().state.value).toEqual(birthdayMoment.toDate());
    expect(dateProps.onChange).toHaveBeenCalled();
  });

  it('Question component of time type works fine', () => {
    const timeProps = {
      isShown: true,
      id: '6',
      text: 'What\'s the time is it?',
      path: ['shallow', '6'],
      type: QuestionType.INPUT,
      format: InputType.TIME,
      answers: [],
      hint: 'question hint',
      onChange: jest.fn()
    };
    const now = moment('2018-08-21 15:51');
    const component = shallow(<Question {...timeProps} />);
    expect(component.find(InputTime)).toHaveLength(1);

    component.find(InputTime).simulate('valueChange', { value: now });
    expect(component.instance().state.value).toEqual(now.toDate());
    expect(timeProps.onChange).toHaveBeenCalled();
  });

  it('Question component of SSN type works fine', () => {
    const ssnProps = {
      isShown: true,
      id: '7',
      text: '???',
      path: ['shallow', '7'],
      type: QuestionType.INPUT,
      format: InputType.SSNTB,
      answers: [],
      hint: 'question hint',
      onChange: jest.fn()
    };
    const component = shallow(<Question {...ssnProps} />);
    expect(component.find(Input)).toHaveLength(1);

    component.find(Input).simulate('change', { target: { value: '661822132' } });
    expect(component.instance().state.value).toEqual('661822132');
    component.find(Input).simulate('blur', { target: { value: '661822132' } });
    expect(ssnProps.onChange).toHaveBeenCalled();
  });

  it('Question component of postal type works fine', () => {
    const postalProps = {
      isShown: true,
      id: '8',
      text: 'What\'s your postal code?',
      path: ['shallow', '8'],
      type: QuestionType.INPUT,
      format: InputType.POSTAL,
      answers: [],
      hint: 'question hint',
      onChange: jest.fn()
    };
    const component = shallow(<Question {...postalProps} />);
    expect(component.find(Input)).toHaveLength(1);

    component.find(Input).simulate('change', { target: { value: '66182-2231' } });
    expect(component.instance().state.value).toEqual('66182-2231');
    component.find(Input).simulate('blur', { target: { value: '66182-2231' } });
    expect(postalProps.onChange).toHaveBeenCalled();
  });

  it('Question component of uppercase type works fine', () => {
    const uppercaseProps = {
      isShown: true,
      id: '9',
      text: 'What\'s your brand name?',
      path: ['shallow', '9'],
      type: QuestionType.INPUT,
      format: InputType.UPPERCASE,
      answers: [],
      hint: 'question hint',
      onChange: jest.fn()
    };
    const component = shallow(<Question {...uppercaseProps} />);
    expect(component.find(Input)).toHaveLength(1);

    component.find(Input).simulate('change', { target: { value: 'aBc' } });
    expect(component.instance().state.value).toEqual('ABC');
    component.find(Input).simulate('blur', { target: { value: 'ABC' } });
    expect(uppercaseProps.onChange).toHaveBeenCalled();
  });

  it('Question component of lowercase type works fine', () => {
    const lowercaseProps = {
      isShown: true,
      id: '10',
      text: 'What\'s your nick name?',
      path: ['shallow', '10'],
      type: QuestionType.INPUT,
      format: InputType.LOWERCASE,
      answers: [],
      hint: 'question hint',
      onChange: jest.fn()
    };
    const component = shallow(<Question {...lowercaseProps} />);
    expect(component.find(Input)).toHaveLength(1);

    component.find(Input).simulate('change', { target: { value: 'Bill' } });
    expect(component.instance().state.value).toEqual('bill');
    component.find(Input).simulate('blur', { target: { value: 'bill' } });
    expect(lowercaseProps.onChange).toHaveBeenCalled();
  });

  it('Question component of number type works fine', () => {
    const numberProps = {
      isShown: true,
      id: '11',
      text: 'How old are you?',
      path: ['shallow', '11'],
      type: QuestionType.INPUT,
      format: InputType.NUMBER,
      answers: [],
      hint: 'question hint',
      onChange: jest.fn()
    };
    const component = shallow(<Question {...numberProps} />);
    expect(component.find(Input)).toHaveLength(1);

    component.find(Input).simulate('change', { target: { value: 35 } });
    expect(component.instance().state.value).toEqual(35);
    component.find(Input).simulate('blur', { target: { value: 35 } });
    expect(numberProps.onChange).toHaveBeenCalled();
  });

  it('Question component of alpha type works fine', () => {
    const alphaProps = {
      isShown: true,
      id: '12',
      text: 'Say something?',
      path: ['shallow', '12'],
      type: QuestionType.INPUT,
      format: InputType.ALPHA,
      answers: [],
      hint: 'question hint',
      onChange: jest.fn()
    };
    const component = shallow(<Question {...alphaProps} />);
    expect(component.find(Input)).toHaveLength(1);

    component.find(Input).simulate('change', { target: { value: 'Ooooops' } });
    expect(component.instance().state.value).toEqual('Ooooops');
    component.find(Input).simulate('blur', { target: { value: 'Ooooops' } });
    expect(alphaProps.onChange).toHaveBeenCalled();
  });

  it('Question component of free type works fine', () => {
    const freeProps = {
      isShown: true,
      id: '12',
      maxLength: 100,
      text: 'Say something?',
      path: ['shallow', '12'],
      type: QuestionType.INPUT,
      format: InputType.FREE,
      answers: [],
      hint: 'question hint',
      onChange: jest.fn()
    };
    const component = shallow(<Question {...freeProps} />);
    expect(component.find(Input)).toHaveLength(1);

    component.find(Input).simulate('change', { target: { value: 'Ooooops' } });
    expect(component.instance().state.value).toEqual('Ooooops');
    component.find(Input).simulate('blur', { target: { value: 'Ooooops' } });
    expect(freeProps.onChange).toHaveBeenCalled();
  });

  it('Question component of duration type works fine', () => {
    const durationProps = {
      isShown: true,
      id: '12',
      text: 'How long do the wind last?',
      path: ['shallow', '13'],
      type: QuestionType.INPUT,
      format: InputType.DURATION,
      answers: [],
      hint: 'question hint',
      onChange: jest.fn()
    };
    const component = shallow(<Question {...durationProps} />);
    expect(component.find(Duration)).toHaveLength(1);

    component.find(Duration).simulate('change', '02:30:00');
    expect(component.instance().state.value).toEqual('02:30:00');
    expect(durationProps.onChange).toHaveBeenCalled();
  });

  it('Question component of free type works fine with clickable icon and no onChange callback', () => {
    const freeProps = {
      isShown: true,
      id: '12',
      maxLength: 100,
      text: 'Say something?',
      path: ['shallow', '12'],
      type: QuestionType.INPUT,
      format: InputType.FREE,
      answers: [],
      icon: 'icon-circle',
      hint: 'question hint',
      onIconClick: jest.fn()
    };
    const component = shallow(<Question {...freeProps} />);
    expect(component.find(Input)).toHaveLength(1);
    component.find(Input).simulate('blur', { target: { value: 'Ooooops' } });

    component.find('span.icon.link').simulate('click');
    expect(freeProps.onIconClick).toHaveBeenCalledTimes(1);

    component.setProps({ required: true });
    component.find('span.icon.link').simulate('click');
    expect(freeProps.onIconClick).toHaveBeenCalledTimes(1);
  });
});
