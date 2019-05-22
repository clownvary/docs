import React, { Component } from 'react';
import classNames from 'classnames';

/** Default PropTypes for {name}
 * @memberof {name}
*/
const {name}PropTypes = {
  /** Sample prop
   * @type {string}
   */
  prop1: string
};

const {name}Props = {
  prop1: ''
};

/** UI component that displays path in {name}. */
class {name} extends Component {
  static displayName = '{name}';
  static defaultProps = {name}PropTypes;
  static defaultProps = {name}Props;

  render() {
    const {
        className,
        children,
        ...rest
      } = this.props;

      return (
        <div {...rest} className={classNames(className)}>
          {children}
        </div>
      );
  }
}


export default {name};