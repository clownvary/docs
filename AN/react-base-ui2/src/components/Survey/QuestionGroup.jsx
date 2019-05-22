import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Question from './Question';

const QuestionGroupPropTypes = {
  /**
   * An array that content type must be same with Question PropTypes,
   * you can check Question component doc
   */
  questions: PropTypes.array.isRequired,
  /**
   * Unique key of question group
   */
  groupId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * Customize group name
   */
  groupName: PropTypes.string.isRequired
};
class QuestionGroup extends React.PureComponent {
  static displayName = 'QuestionGroup';
  static propTypes = QuestionGroupPropTypes;

  render() {
    const {
      questions,
      groupId,
      groupName,
      onChange,
      onIconClick,
      isBoldBorder,
      questionLabelClass,
      questionContainerClass } = this.props;
    return (
      <div
        key={`questiongroup_${groupId}`}
        className={classNames('questiongroup', { 'is-bold-border': isBoldBorder })}
      >
        <div className="questiongroup-header">
          <span className="icon icon-circle" />
          <span>{groupName || 'Custom Question Group'}</span>
        </div>
        <div className="questiongroup-body">
          {
            questions.map(question => (
              <Question
                key={`question_${question.id}`}
                {...question}
                onChange={onChange}
                onIconClick={onIconClick}
                questionLabelClass={questionLabelClass}
                questionContainerClass={questionContainerClass}
              />
            ))
          }
        </div>
      </div>);
  }
}
export default QuestionGroup;
