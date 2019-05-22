import React, { Component } from 'react';
import PropTypes from 'prop-types';
import responsiveService from '../../index';

export const withResponsiveProvider = WrappedComponent =>
  class extends Component {
    static displayName = 'ResponsiveProvider';

    constructor(props, context) {
      super(props, context);
      this.state = {
        ...responsiveService._getState()
      };
    }

    componentDidMount() {
      responsiveService.addEventListener('resize', this.onChange, this);
      responsiveService.addEventListener('orientationchange', this.onChange, this);
    }

    componentWillUnmount() {
      responsiveService.removeEventListener('resize', this.onChange, this);
      responsiveService.removeEventListener('orientationchange', this.onChange, this);
    }

    onChange(state) {
      this.setState({
        ...state
      });
    }

    render() {
      return <WrappedComponent {...this.props} responsive={{ ...this.state }} />;
    }
  };

export const responsivePropTypes = PropTypes.shape({
  orientation: PropTypes.string,
  rangeName: PropTypes.string,
  screenWidth: PropTypes.number,
  isLg: PropTypes.bool,
  isMd: PropTypes.bool,
  isSm: PropTypes.bool
});

export default withResponsiveProvider;
