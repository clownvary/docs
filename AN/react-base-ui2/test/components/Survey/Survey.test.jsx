import React from 'react';
import renderer from 'react-test-renderer';
import Survey from 'src/components/Survey';
import { InputType, QuestionType } from '../../../src/components/Survey/consts';

jest.mock('src/components/Survey/Question', () => 'Question');
jest.mock('src/components/Survey/QuestionGroup', () => 'QuestionGroup');

describe('components/Survey/Survey', () => {
  it('Survey renders fine', () => {
    const props = {
      data: [
        {
          groupId: 'group_1',
          questions: [
            {
              isShown: true,
              id: '1',
              text: 'Free to answer something.',
              path: ['snapshot', '1'],
              type: QuestionType.INPUT,
              placeholder: '...',
              format: InputType.FREE
            }
          ]
        },
        {
          type: 'divider',
          className: 'snapshot-class-name'
        },
        {
          isShown: true,
          id: '3',
          text: 'Do you like drinking coffee?',
          type: QuestionType.RADIO,
          answers: [
            { text: 'Yes!', value: 'true' },
            { text: 'Nooooo!', value: 'false' }
          ]
        }
      ],
      onChange: jest.fn()
    };
    const snapshot = renderer.create(
      <Survey {...props} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
