import React from 'react';
import PropTypes from 'prop-types';
import { DefaultCSSPrefix } from '../../consts';
import createAsyncContent from './createAsyncContent';
import * as PlaceHolderType from './consts/PlaceHolderType';

/**
 * Default Props for AsyncContent
 */
const AsyncContentProps = {
  /**
   * Defines the unique id for automation test
   */
  'data-qa-id': 'AsyncContent',
  /**
   * Determines the prefix for CSS class names
   */
  prefix: `${DefaultCSSPrefix}-`,
  loader: () => Promise.resolve(),
  /**
   * The default charactor when loading.
   */
  placeHolder: 'loading',
  /**
   * The type of Placeholder.
   */
  placeHolderType: PlaceHolderType.TEXT
};
const AsyncContentPropTypes = {
  /**
   * Defines the unique id for automation test
   */
  'data-qa-id': PropTypes.string,
  /**
   * Determines the prefix for CSS class names
   */
  prefix: PropTypes.string,
  /**
   * Async component will be rendered
   */
  component: PropTypes.node,
  /**
   * Contains the job need be executed.
   */
  loader: PropTypes.func,
  /**
   * The default charactor when loading.
   */
  placeHolder: PropTypes.string,
  /**
   * The type of Placeholder.
   */
  placeHolderType: PropTypes.oneOf([
    PlaceHolderType.TEXT, PlaceHolderType.ICON
  ])
};
/** AsyncContent is an UI component that can display content in waiting and show manner.*/
class AsyncContent extends React.PureComponent {
  /** The display name*/
  static displayName = 'AsyncContent';
  /** The default Props*/
  static defaultProps = AsyncContentProps;
  static propTypes = AsyncContentPropTypes;
  render() {
    const {
      placeHolder,
      loader,
      prefix,
      component,
      'data-qa-id': dataQAId,
      placeHolderType } = this.props;
    const newComponent = createAsyncContent(() => loader().then(() => component),
      { placeHolder, prefix, 'data-qa-id': dataQAId, placeHolderType });
    return React.createElement(newComponent);
  }
}
export default AsyncContent;
