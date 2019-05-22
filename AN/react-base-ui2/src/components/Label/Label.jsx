import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { string, oneOf, node } from 'prop-types';

/** Default PropTypes of Label.
 * @memberof Label
*/
const LabelPropTypes = {
  /**
   * A list of class names to pass along to the container element of component.
   * @property {String}
   */
  className: string,
  /**
   * Type of Label styles, options:`success`, `warning`, `danger`, `info`
   * @property {String}
   */
  type: oneOf(['success', 'warning', 'danger', 'info']).isRequired,
  /** Child Node
   * @type {node}
  */
  children: node
};

/** Default Props for Label */
const LabelProps = {
  type: 'info'
};

/** UI component that displays Label with variant settings.*/
class Label extends PureComponent {
  static displayName = 'Label';
  static propTypes = LabelPropTypes;
  static defaultProps = LabelProps;

  render() {
    const { className, type, children, ...rest } = this.props;
    const classes = classNames(
      {
        label: true,
        [`label-${type}`]: true
      },
      className
    );

    return (
      <span {...rest} className={classes}>
        {children}
      </span>
    );
  }
}

export default Label;
