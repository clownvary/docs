
import React, { Component } from 'react';
import { intlShape } from 'react-intl';
import isFunction from 'lodash/isFunction';
import Globalize from './Globalize';


export default class GlobalizeSink extends Component {
  static displayName = 'ANGlobalizeSink';

  static contextTypes = {
    intl: intlShape
  };

  constructor(props, context) {
    super(props, context);

    const { intl } = context;
    Globalize.intl = intl;
  }

  componentDidMount() {
    this.onIntlChange(Globalize.intl);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { intl = {} } = this.context;
    const { intl: nextIntl = {} } = nextContext;

    /* istanbul ignore next */
    const intlChanged = (nextIntl.locale !== intl.locale);
    // istanbul ignore if
    if (intlChanged) {
      Globalize.intl = nextIntl;
      this.onIntlChange(nextIntl);
    }

    return intlChanged;
  }

  onIntlChange(intl) {
    const { onIntlChange } = this.props;
    if (isFunction(onIntlChange)) {
      onIntlChange({
        intl
      });
    }
  }

  render() {
    return <span className="u-hidden" />;
  }
}
