import React from 'react';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import ListBox from 'shared/components/ListBox';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import { facilityDetailUrl } from 'shared/consts/legancyUrls';
import selfMessages from './translations';
import { formatAgeRestriction, formatGradeRestriction } from '../../utils';

import './index.less';

class GeneralInfo extends React.PureComponent {

  render() {
    const {
      sessionFacilities, gradeMinRestriction, gradeMaxRestriction,
      ageMinRestriction, ageMaxRestriction, gender, primaryCategory, secondaryCategory,
      firstDate, lastDate, className, intl: { messages }, responsive
    } = this.props;
    const associatedCategories = primaryCategory || secondaryCategory;
    const { isSm } = responsive;
    return (
      <div className={classNames('program__program-info', className)}>
        <ListBox horizontal={!isSm}>
          {
            firstDate && lastDate &&
            <ListBox.Item icon="calendar-o">
              <FormattedDyncMessage value={`${firstDate} - ${lastDate}`} />
            </ListBox.Item>
          }
          {
            sessionFacilities.length > 0 &&
            <ListBox.Item icon="map-marker" className="session-facility">
              {
                sessionFacilities.map((facility, index) => (
                  <span key={`facility-link-${facility.id}`}>
                    {index === 0 ? '' : ', '}
                    <a
                      href={`${facilityDetailUrl}?facility_id=${facility.id}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    ><FormattedDyncMessage value={facility.name} /></a>
                  </span>
                ))
              }
            </ListBox.Item>
          }
        </ListBox>
        <ListBox horizontal={!isSm}>
          {
            gender &&
            <ListBox.Item icon="user">
              <span className="grade-age-restriction">
                {
                  formatGradeRestriction(gradeMinRestriction, gradeMaxRestriction) ||
                  formatAgeRestriction(ageMinRestriction, ageMaxRestriction) ||
                  messages[selfMessages.allAges.id]
                }
              </span>
              <FormattedDyncMessage value={gender} />
            </ListBox.Item>
          }
          {
            associatedCategories &&
            <ListBox.Item icon="tag" className="associated-category">
              <FormattedDyncMessage className="associated-category__primary" value={primaryCategory} />
              <FormattedDyncMessage value={secondaryCategory} />
            </ListBox.Item>
          }
        </ListBox>
      </div>
    );
  }
}

export default injectIntl(GeneralInfo);
