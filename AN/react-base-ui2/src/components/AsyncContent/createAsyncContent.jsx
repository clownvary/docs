import React from 'react';
import isFunction from 'lodash/isFunction';

import { CustomAttr } from '../../consts';
import { isPromise } from '../../utils';
import { textPlaceHolder, iconPlaceHolder } from './PlaceHolder';
import * as PlaceHolderType from './consts/PlaceHolderType';

const { DATA_QA_ID } = CustomAttr;

export default (loader, { placeHolder, prefix, [DATA_QA_ID]: dataQAID, placeHolderType }) =>
  class asyncContent extends React.Component {
    constructor() {
      super();
      this.state = {
        component: null
      };

      this.mounting = true;
    }

    componentDidMount() {
      if (!isFunction(loader) && !isPromise(loader)) {
        return console.error('asyncContent: Loader is not function or promise');
      }

      const component = isFunction(loader) ? loader() : loader;

      if (!isPromise(component)) {
        return console.error('asyncContent: Loader doesn\'t return a promise');
      }

      return component
        .then(module => this.mounting && this.setState({ component: module }))
        .catch(err => console.error('asyncContent: Loading failed', err));
    }

    componentWillUnmount() {
      this.mounting = false;
    }

    renderLoader() {
      switch (placeHolderType) {
        case PlaceHolderType.ICON:
          return iconPlaceHolder(placeHolder);
        case PlaceHolderType.TEXT:
        default:
          return textPlaceHolder(placeHolder);
      }
    }

    render() {
      const { component } = this.state;

      return (
        <div
          className={`${prefix}asynccontent`}
          data-qa-id={dataQAID}
        >
          {component || this.renderLoader()}
        </div>);
    }
  };
