import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import Breadcrumb from 'react-base-ui/lib/components/Breadcrumb';
import BreadcrumbItem from 'react-base-ui/lib/components/Breadcrumb/Item';
import { Sticky, StickyContainer } from 'react-base-ui/lib/components/Sticky';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import 'react-base-ui/lib/svgs';

import { formatI18n } from 'shared/translation/formatI18n';

import { FormattedDyncMessage } from 'shared/translation/formatted';
import { Heading } from 'shared/components/Heading';
import Paragraph from 'shared/components/Paragraph';
import { LINE } from 'shared/components/Paragraph/truncationType';

import { homeUrl, activitySearchUrl } from 'shared/consts/legancyUrls';
import GeneralInfo from './components/GeneralInfo';
import Sessions from './components/Sessions';
import ExtraDetail from './components/ExtraDetail';
import Enrollment from './components/Enrollment';
import selfMessages from './translations';

import {
  fetchProgramInfo,
  fetchSessions,
  fetchExceptionDates,
  fetchEnrollNow,
  fetchEstimatePrice
} from './actions';

import './index.less';

export class Program extends React.PureComponent {
  static contextTypes = {
    getWording: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      stuck: false
    };
  }

  componentDidMount() {
    const { params: { programId } } = this.props;
    this.props.fetchProgramInfo(programId);
    this.props.fetchSessions(programId);
    this.props.fetchExceptionDates(programId);
    this.props.fetchEstimatePrice(programId);
  }

  onEnrollNow = () => {
    const { params: { programId } } = this.props;
    this.props.fetchEnrollNow(programId);
  }

  handleStickyStateChange = ({ isSticky: stuck }) => {
    this.setState({
      stuck
    });
  };

  renderBreadcurmb = () => {
    const { intl: { messages }, responsive: { isSm } } = this.props;
    const { getWording } = this.context;

    const activitySearchLabel = formatI18n(messages[selfMessages.activitySearch.id], {
      activityLabel: getWording('online_activities_label')
    });
    const programLabel = formatI18n(messages[selfMessages.program.id], {
      daycareLabel: getWording('daycare_menu_title')
    });

    return (
      <Breadcrumb className={classNames('program__override-breadcrumb', { mobile: isSm })}>
        <BreadcrumbItem href={homeUrl}>
          <FormattedDyncMessage value={getWording('online_intro_label')} />
        </BreadcrumbItem>
        <BreadcrumbItem href={activitySearchUrl}>
          <FormattedDyncMessage value={activitySearchLabel} />
        </BreadcrumbItem>
        <BreadcrumbItem isLast>
          <FormattedDyncMessage value={programLabel} />
        </BreadcrumbItem>
      </Breadcrumb>
    );
  }

  renderHeading = () => {
    const { programInfo } = this.props;
    const {
      programName, seasonName, programNumber
    } = programInfo.toJS();

    return (
      <div className="heading">
        <Heading level={1} className="program__primary-header">
          <FormattedDyncMessage value={programName} />
        </Heading>
        <Heading level={4} className="program__secondary-header">
          {seasonName && <FormattedDyncMessage value={seasonName} />}
          {seasonName && programNumber && <span>|</span>}
          {
            programNumber &&
            <FormattedDyncMessage
              className="program__program-number"
              value={`#${programNumber}`}
            />
          }
        </Heading>
      </div>
    );
  }

  render() {
    const { programInfo, sessions, feeSummary, intl, responsive } = this.props;
    const {
      sessionFacilities,
      gradeMinRestriction, gradeMaxRestriction, ageMinRestriction, ageMaxRestriction,
      gender, primaryCategory, secondaryCategory, description, firstDate, lastDate,
      extraDetails, enrollStatus
    } = programInfo.toJS();
    const sessionUnavailable = sessions.get('sessionUnavailable');

    const { stuck } = this.state;
    const { messages } = intl;
    const descriptionLabel = formatI18n(messages[selfMessages.description.id]);
    const { isSm, isMd } = responsive;
    const isMobileOrTablet = isSm || isMd;

    return (
      <div className="module-daycare">
        {this.renderBreadcurmb()}
        {isMobileOrTablet && this.renderHeading()}
        <StickyContainer>
          <div className="an-grid an-col-mg-30">
            <div
              className="an-col an-col-8-12 an-md-col-1-1 an-sm-col-1-1 an-md-col-order-1 an-sm-col-order-1"
            >
              <div className="an-panel module-daycare-program">
                {!isMobileOrTablet && this.renderHeading()}
                <GeneralInfo
                  responsive={responsive}
                  sessionFacilities={sessionFacilities}
                  gradeMinRestriction={gradeMinRestriction}
                  gradeMaxRestriction={gradeMaxRestriction}
                  ageMinRestriction={ageMinRestriction}
                  ageMaxRestriction={ageMaxRestriction}
                  gender={gender}
                  primaryCategory={primaryCategory}
                  secondaryCategory={secondaryCategory}
                  firstDate={firstDate}
                  lastDate={lastDate}
                />
                {
                  description &&
                  <Paragraph
                    truncateType={LINE}
                    truncateValue={6}
                  >
                    {`${descriptionLabel}: ${description}`}
                  </Paragraph>
                }
                <Sessions
                  sessions={sessions}
                />
                {
                  extraDetails.length > 0 &&
                  <ExtraDetail extraDetails={extraDetails} />
                }
              </div>
            </div>
            <div className="an-col an-col-4-12 an-md-col-1-1 an-sm-col-1-1 an-lg-col-order-1">
              <Sticky
                topOffset={isMobileOrTablet ? 0 : -10}
                fullScreen={isMobileOrTablet}
                onChange={this.handleStickyStateChange}
              >
                <Enrollment
                  feeSummary={feeSummary}
                  status={enrollStatus}
                  sessionUnavailable={sessionUnavailable}
                  stuck={stuck}
                  onEnrollNow={this.onEnrollNow}
                  isSm={isSm}
                  isMd={isMd}
                />
              </Sticky>
            </div>
          </div>
        </StickyContainer>
      </div>
    );
  }
}

export default injectIntl(withResponsiveProvider(connect(
  // istanbul ignore next
  state => ({
    programInfo: state.modules.Daycare.Program.programInfo,
    sessions: state.modules.Daycare.Program.sessions,
    feeSummary: state.modules.Daycare.Program.feeSummary
  }),
  {
    fetchProgramInfo,
    fetchSessions,
    fetchExceptionDates,
    fetchEnrollNow,
    fetchEstimatePrice
  }
)(Program)));
