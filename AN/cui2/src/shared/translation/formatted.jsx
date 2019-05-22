import React from 'react';
import * as ReactIntl from 'react-intl';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import './index.less';

/**
 * Wrap the components of react-intl for extending them in the future.
 * components list:
 *    FormattedDate,
 *    FormattedMessage,
 *    FormattedNumber,
 *    FormattedPlural,
 *    FormattedRelative,
 *    FormattedTime
 */

export class FormattedDate extends React.Component {
  render() {
    const {
      children,
      ...rest
    } = this.props;
    return (
      <span>
        <ReactIntl.FormattedDate {...rest}>
          {children}
        </ReactIntl.FormattedDate>
      </span>
    );
  }
}

export class FormattedMessage extends React.Component {
  render() {
    const {
      children,
      values,
      ...rest
    } = this.props;
    const formattedValues = {};
    if (values) {
      Object.keys(values).forEach((key) => {
        const val = values[key];
        formattedValues[key] = typeof val === 'string' ? decodeHtmlStr(val) : val;
      });
    }
    return (
      <ReactIntl.FormattedMessage values={formattedValues} {...rest}>
        {children}
      </ReactIntl.FormattedMessage>
    );
  }
}

export class FormattedNumber extends React.Component {

  getCurrency() {
    const { value, children, numberStyle } = this.props;
    const formattedNumber = new Intl.NumberFormat('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}).format(value);
    let formatedCurrency;
    if (numberStyle === 'percent') {
      formatedCurrency =`${formattedNumber}%`;
    } else {
      formatedCurrency = formattedNumber.indexOf('-') !== -1 ? `-$${formattedNumber.split('-')[1]}` : `$${formattedNumber}`;
    }
    if (typeof children === 'function') {
      return children(formatedCurrency);
    }
    return formatedCurrency;
  }

  render() {
    return (
      <span className="format-number">
      {this.getCurrency()}
      </span>
    );
  }
}

export class FormattedPlural extends React.Component {
  render() {
    const {
      children,
      ...rest
    } = this.props;
    return (
      <span>
        <ReactIntl.FormattedPlural {...rest}>
          {children}
        </ReactIntl.FormattedPlural>
      </span>
    );
  }
}

export class FormattedRelative extends React.Component {
  render() {
    const {
      children,
      ...rest
    } = this.props;
    return (
      <span>
        <ReactIntl.FormattedRelative {...rest}>
          {children}
        </ReactIntl.FormattedRelative>
      </span>
    );
  }
}

export class FormattedTime extends React.Component {
  render() {
    const {
      children,
      ...rest
    } = this.props;
    return (
      <span>
        <ReactIntl.FormattedTime {...rest}>
          {children}
        </ReactIntl.FormattedTime>
      </span>
    );
  }
}

export class FormattedDyncMessage extends React.Component {
  render() {
    const {
      value,
      children,
      ...rest
    } = this.props;
    /**
     * TODO: prevent XSS.
     */
    return (
      <span {...rest}>
        {decodeHtmlStr(`${value || ''}`)}
        {children}
      </span>
    );
  }
}

export class FormattedHtmlMessage extends React.Component {
  render() {
    const {
      value,
      ...rest
    } = this.props;
    /**
     * TODO: prevent XSS.
     */
    return (
      <span {...rest} dangerouslySetInnerHTML={{ __html: decodeHtmlStr(`${value || ''}`) }} />
    );
  }
}
