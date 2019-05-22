import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import { FormattedMessage, FormattedNumber } from 'shared/translation/formatted';

import './index.less';

const FeeSummaryPropTypes = {
  className: PropTypes.string,
  expanded: PropTypes.bool,
  hideZeroItem: PropTypes.bool,
  feeItems: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      name: PropTypes.object,
      value: PropTypes.number
    })),
  totalItem: PropTypes.shape({
    className: PropTypes.string,
    name: PropTypes.object,
    value: PropTypes.number
  })
};

const FeeSummaryDefaultProps = {
  expanded: true,
  hideZeroItem: true
};

export class FeeSummary extends React.PureComponent {

  static propTypes = FeeSummaryPropTypes;
  static defaultProps = FeeSummaryDefaultProps;

  itemCanBeShow = item => item !== null && !(this.props.hideZeroItem && item.value === 0);

  renderFeeItems = () => {
    const { feeItems } = this.props;
    return feeItems.map((item) => {
      if (!this.itemCanBeShow(item)) {
        return null;
      }
      const { className, name, value } = item;
      return (
        <li key={`fee-summary-item-${name.id}`} className={className}>
          <span className="field-label">
            <FormattedMessage {...name} />
          </span>
          <span className="field-value">
            <FormattedNumber numberStyle="currency" currency="USD" value={value} />
          </span>
        </li>
      );
    });
  };

  render() {
    const { className, expanded, totalItem, responsive: { isSm, isMd } } = this.props;
    const isMobileOrTablet = isSm || isMd;
    const feeItemNodes = this.renderFeeItems();
    return (
      <div
        className={classNames('fee-summary', className, {
          'is-unexpanded': !expanded
        })}>
        <div>
          {
            expanded && isMobileOrTablet ?  <div className="an-split-line" /> : null
          }
          {
            expanded ? <ul className="fee-summary-list">{feeItemNodes}</ul> : null
          }
          {
            expanded && !isMobileOrTablet ? <div className="an-split-line" /> : null
          }
          <div
            className={classNames('fee-summary-total', totalItem.className, {
              'is-unexpanded': !expanded
            })}>
            <strong>
              <FormattedMessage {...totalItem.name} />
            </strong>
            <b className="u-color-moneytext">
              <FormattedNumber numberStyle="currency" currency="USD" value={totalItem.value} />
            </b>
          </div>
        </div>
      </div>
    );
  }
}

export default withResponsiveProvider(FeeSummary)
