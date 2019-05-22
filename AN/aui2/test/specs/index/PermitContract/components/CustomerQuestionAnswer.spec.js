import React from 'react';
import { mount } from 'enzyme';
import CustomerQuestionAnswer, { answerSorter } from 'index/PermitContract/components/CustomerQuestionAnswer';

const questionAnswers = [
  {
    question: '62118_alpha_only - some medical history',
    answers: [
      'colds'
    ],
    customQuestionID: 281,
    parentQuestionIDs: [],
    subQuestions: [
      {
        question: '62118_multi_checkbox - medical history',
        answers: [
          '05: A Cancer',
          '02: B Hypertension',
          '01: C SARS'
        ],
        customQuestionID: 293,
        parentQuestionIDs: [281],
        subQuestions: []
      }
    ]
  }
];

const setup = props => mount(<CustomerQuestionAnswer {...props} />);

it('CustomerQuestionAnswer should render without errors', () => {
  const component = setup({ questionAnswers });

  expect(component).toBeTruthy();

  const hiddenPanel = component.find('div.collapse-panel__body.hidden');
  expect(hiddenPanel).toHaveLength(1);

  const expandIcon = component.find('span.collapse-panel__title').at(0).find('i');
  expect(expandIcon).toHaveLength(1);

  jest.useFakeTimers();
  expandIcon.simulate('click');
  jest.runAllTicks();

  const expandPanel = component.find('div.collapse-panel__body.expanded');
  expect(expandPanel).toHaveLength(1);

  expect(component.find('table.table.an-table.question-table')).toHaveLength(1);

  const rows = component.find('tr');
  expect(rows).toHaveLength(3);
  // rows.at(0).find('th').at(0).simulate('click');
  expect(rows.at(0).find('th')).toHaveLength(2);
  expect(rows.at(1).find('td')).toHaveLength(2);
});

it('answerSorter should  without errors', () => {
  expect(answerSorter({ value: ['a'] }, { value: ['b'] })).toEqual(-1);
  expect(answerSorter({ value: ['b'] }, { value: ['a'] })).toEqual(1);
  expect(answerSorter({ value: ['a'] }, { value: ['a'] })).toEqual(0);
  expect(answerSorter({ value: 'a' }, { value: 'a' })).toEqual(0);
});
