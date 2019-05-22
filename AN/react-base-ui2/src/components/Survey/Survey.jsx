import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Question from './Question';
import QuestionGroup from './QuestionGroup';
import { HORIZONTAL, VERTICAL } from './consts/QuestionLayout';

export const SurveyPropTypes = {
  /**
   *
   */
  layout: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
  /**
   * An array that content type must be same with Question/QuestionGroup PropTypes,
   * you can check Question/QuestionGroup component doc.
   */
  data: PropTypes.array,
  /**
   * The callback function that is triggered when changes the answer value.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * The callback function that is triggered when clicks the post question icon.
   */
  onIconClick: PropTypes.func
};

const SurveyDefaultProps = {
  layout: HORIZONTAL
};

export default class Survey extends React.PureComponent {
  static displayName = 'Survey';
  static propTypes = SurveyPropTypes;
  static defaultProps = SurveyDefaultProps;

  render() {
    const { layout, data, onChange, onIconClick, questionLabelClass,
      questionContainerClass } = this.props;
    return (
      <div
        className={classNames('an-survey', {
          'an-survey__vertical': layout === VERTICAL
        })}
      >
        {
          data.map((item, index) => {
            if (item.groupId) {
              return (<QuestionGroup
                key={`group_${item.groupId}`}
                questions={item.questions}
                onChange={onChange}
                onIconClick={onIconClick}
                groupId={item.groupId}
                groupName={item.groupName}
                isBoldBorder={item.isBoldBorder}
                questionLabelClass={questionLabelClass}
                questionContainerClass={questionContainerClass}
              />);
            } else if (item.type === 'divider') {
              return (
                <div
                  key={index}
                  className={classNames('an-survey-divider', item.className)}
                  style={item.style || {}}
                />);
            }
            return (<Question
              key={item.path || item.id}
              {...item}
              onChange={onChange}
              onIconClick={onIconClick}
              questionLabelClass={questionLabelClass}
              questionContainerClass={questionContainerClass}
            />);
          })
        }
      </div>
    );
  }
}
