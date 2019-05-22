import React from 'react';
import Survey from 'react-base-ui/lib/components/Survey';
import * as helper from './utils/helper';

import './index.less';

const { transformQuestions, getShownQuestions } = helper;

class Question extends React.PureComponent {
  static contextTypes = {
    configurations: React.PropTypes.object
  };

  componentDidMount() {
    const { configurations } = this.context;
    const systemAreaCode = configurations.get('local_area_code');
    const systemCountryCode = configurations.get('default_country');
    const ssnNumericOnly = configurations.get('ssn_numeric_only');
    const ssnValidLength = configurations.get('ssn_valid_length');
    helper.registerCustomRules({
      systemCountryCode,
      systemAreaCode,
      ssnNumericOnly,
      ssnValidLength
    });
  }

  onQuestionChange = ({ path, value }) => this.props.changeQuestionAnswer({
    questionPath: path,
    answer: value
  });

  render() {
    const { survey, isMobile, isTablet } = this.props;
    const questions = survey.get('questions').toJS();
    const apiQuestions = getShownQuestions(questions);
    const data = transformQuestions({ apiQuestions, isMobile, isTablet });
    return (
      <div className="enroll-question">
        <Survey
          questionLabelClass="enroll-question-label"
          questionContainerClass="enroll-question-answer"
          data={data}
          onChange={this.onQuestionChange}
          hideRequireText={false}
        />
      </div>
    );
  }
}

export default Question;
