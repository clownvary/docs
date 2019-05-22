/* eslint react/forbid-prop-types: off */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import last from 'lodash/last';
import PageHeader from 'shared/components/PageHeader';
import Breadcrumb from 'react-base-ui/lib/components/Breadcrumb';
import MessageBoard from 'react-base-ui/lib/components/MessageBoard';

export default class Content extends Component {

  static propTypes = {
    routes: PropTypes.array,
    params: PropTypes.shape({})
  }

  onContainerRef = (node) => {
    this.node = node;
  }

  render() {
    const { routes, params, children } = this.props;
    const is404 = last(routes).status === 404;
    return (
      <div className="an-main" ref={this.onContainerRef}>
        <div className="an-main__wrapper">
          {
            !is404 ?
              <PageHeader routes={routes}>
                <Breadcrumb routes={routes} params={params} />
              </PageHeader> : null
          }
          <MessageBoard />
          {children}
        </div>
      </div>
    );
  }
}
