import React from 'react';
import renderer from 'react-test-renderer';
import QuestionGroup from 'src/components/Survey/QuestionGroup';
import { InputType, QuestionType } from 'src/components/Survey/consts';

jest.mock('src/components/Survey/Question', () => 'Question');

describe('components/Survey/QuestionGroup', () => {
  it('QuestionGroup renders fine', () => {
    const props = {
      groupId: 'group_1',
      isBoldBorder: true,
      groupName: 'test',
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
    };
    const snapshot = renderer.create(
      <QuestionGroup {...props} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
