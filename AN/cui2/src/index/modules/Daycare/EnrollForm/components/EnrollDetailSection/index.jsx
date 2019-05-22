import React from 'react';
import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'shared/translation/formatted';
import { formatI18n } from 'shared/translation/formatI18n';
import commonValidationMessage from 'shared/translation/messages/validation';
import Section from '../Section';
import AuthorizedPickup from './AuthorizedPickup';
import Question from './Question';
import selfMessages from './translations';
import { ENROLL_DETAIL } from '../../consts/sectionName';

import './index.less';

export class EnrollDetailSection extends React.PureComponent {

  onSectionExpandChange = () => {
    const { expanded, disabled, collapseSection, expandSection } = this.props;
    if (!disabled) {
      if (expanded) {
        return collapseSection(ENROLL_DETAIL);
      }
      return expandSection(ENROLL_DETAIL);
    }
    return null;
  };

  getRequiredPreMark = (required) => {
    if (!required) {
      return null;
    }
    return (
      <span className="enroll-detail-required__pre">*</span>
    );
  };

  getRequiredPostMark = (required) => {
    if (!required) {
      return null;
    }
    return (
      <i className="enroll-detail-required__post">
        <FormattedMessage {...commonValidationMessage.requiredMark} />
      </i>
    );
  };

  renderAuthorizedPickups = () => {
    const { enrollDetail, participantName, pickupError, selectPickups,
      loginedCustomerId, fetchPickups } = this.props;
    const { authorizedRequired, pickupList, selectedPickupIds } = enrollDetail.toJS();
    const requiredPreMark = this.getRequiredPreMark(authorizedRequired);
    const requiredPostMark = this.getRequiredPostMark(authorizedRequired);
    return (
      <AuthorizedPickup
        participantName={participantName}
        required={authorizedRequired}
        requiredPreMark={requiredPreMark}
        fetchPickups={fetchPickups}
        requiredPostMark={requiredPostMark}
        error={pickupError}
        pickupList={pickupList}
        selectedPickupIds={selectedPickupIds}
        onPickupSelect={selectPickups}
        loginedCustomerId={loginedCustomerId}
      />
    );
  };

  renderCustomQuestions = () => {
    const { survey, changeQuestionAnswer, isMobile, isTablet } = this.props;
    return (
      <Question
        survey={survey}
        isMobile={isMobile}
        isTablet={isTablet}
        changeQuestionAnswer={changeQuestionAnswer}
      />
    );
  };

  render() {
    const { intl: { messages }, expanded, disabled } = this.props;
    const pickupNode = this.renderAuthorizedPickups();
    const questionNode = this.renderCustomQuestions();
    const selectionTitle = formatI18n(messages[selfMessages.detailSection.id]);
    return (
      <Section
        name={ENROLL_DETAIL}
        className="enroll-detail"
        title={`${3} ${selectionTitle}`}
        expanded={expanded}
        disabled={disabled}
        onChange={this.onSectionExpandChange}
        ariaLableCollapse={`Section 3 ${selectionTitle} expand detail clickable arrow`}
        ariaLableExpand={`Section 3 ${selectionTitle} collapse detail clickable arrow`}
      >
        {pickupNode}
        {questionNode}
      </Section>
    );
  }
}

export default injectIntl(EnrollDetailSection);
