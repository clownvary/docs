import React from 'react';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import isObject from 'lodash/isObject';
import { AAUIDropdown } from 'react-base-ui/lib/components/Dropdown';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import { formatI18n } from 'shared/translation/formatI18n';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import openTheExistingPage from 'shared/utils/openTheExistingPage';
import selfMessages from './translations';
import Section from '../Section';
import { PARTICIPANT } from '../../consts/sectionName';
import getAddFamilyMemberUrl from '../../util/getAddFamilyMemberUrl';
import domainHelp from '../../util/domainHelp';
import './index.less';

const noop = () => null;
export class ParticipantSection extends React.PureComponent {
  static contextTypes = {
    configurations: React.PropTypes.object,
    systemSettings: React.PropTypes.object
  }

  componentDidMount() {
    window.addEventListener('unload', this.closeNewFamilyMemberWindow);
  }

  componentWillUnmount() {
    this.closeNewFamilyMemberWindow();
    window.removeEventListener('unload', this.closeNewFamilyMemberWindow);
  }

  onSectionExpandChange = () => {
    const { expanded, collapseSection, expandSection } = this.props;
    if (expanded) {
      return collapseSection(PARTICIPANT);
    }
    return expandSection(PARTICIPANT);
  };

  getText = id => formatI18n(this.props.intl.messages[id])

  closeNewFamilyMemberWindow = () => {
    this.newFamilyMemberWinow && this.newFamilyMemberWinow.close();
  }

  formatParticipant = (participant) => {
    const data = {
      text: participant.name,
      value: participant.id,
      error: participant.validation_msg,
      disabled: !!participant.validation_msg,
      selected: false
    };

    return data;
  }

  selectParticipant = ({ value: participantId }) => {
    const { selectParticipant } = this.props;
    selectParticipant(participantId);
  }

  showNewFamilyMemberPage = () => {
    const { loginedCustomerId } = this.props;
    const { systemSettings } = this.context;
    const originalBaseUrl = systemSettings.get('original_base_url');
    domainHelp.setDomainToSecondLevel();

    const url = getAddFamilyMemberUrl({
      originalBaseUrl,
      loginedCustomerId,
      type: PARTICIPANT,
      callback: '__newFamilyMember'
    });

    window.__newFamilyMember = (data) => {
      if (isObject(data) && data.type === PARTICIPANT) {
        const customerId = parseInt(data.customer_id, 10);
        if (customerId) {
          this.selectParticipant({ value: customerId });
          this.closeNewFamilyMemberWindow();
        }
      }
    };

    this.newFamilyMemberWinow = openTheExistingPage(url, 'New family member', '1000', '800', 'yes');
  }

  renderDropdownItem = item => (
    !item.error
      ? <a className="name">{item.text}</a>
      : <div className="with-error">
        <a className="name">{item.text}</a>
        <a className="error">{item.error}</a>
      </div>
  );

  renderParticipantText = () =>
    <FormattedDyncMessage
      className="participant__text"
      value={this.getText(selfMessages.participant.id)}
    />

  renderParticipantDropdown = () => {
    const { error } = this.props;
    const meetError = error.get('required') || error.get('messages').count();
    const participants = this.props.participants.toJS();
    return (
      <div className="participant__content">
        <AAUIDropdown
          highlight
          value={participants.id}
          data={participants.list.map(this.formatParticipant)}
          placeholder={this.getText(selfMessages.placeholder.id)}
          className={classNames('participant__dropdown', {
            participant__dropdown__error: meetError
          })}
          renderFooter={noop}
          renderItem={this.renderDropdownItem}
          onChange={this.selectParticipant}
        />
        {
          meetError ?
            <div className="participant__error">
              <div className="participant__error__icon">
                <i className="icon icon-times-circle" />
              </div>
              {
                error.get('required') ?
                  this.getText(selfMessages.requiredErrorMessage.id) :
                  <FormattedDyncMessage value={error.getIn(['messages', 0])} />
              }
            </div> : null
        }
      </div>
    );
  }

  render() {
    const selectionTitle = this.getText(selfMessages.who.id);
    return (
      <Section
        expanded={this.props.expanded}
        name={PARTICIPANT}
        className="participant"
        title={`${1} ${selectionTitle}`}
        onChange={this.onSectionExpandChange}
      >
        {this.renderParticipantText()}
        {this.renderParticipantDropdown()}
      </Section>
    );
  }
}

export default withResponsiveProvider(injectIntl(ParticipantSection));
