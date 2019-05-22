import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const { string, func } = PropTypes;

/**
 * Default PropTypes for TextArea
 */
const TextAreaPropTypes = {
  /**
   * A list of class names to pass along to the textarea element of component.
   */
  className: string,
  /**
   * The text value.
   */
  value: string,
  /**
   * The callback function that is triggered when changes the text value.
   */
  onChange: func
};

const TextAreaProps = {
  className: 'input'
};

export default class TextArea extends PureComponent {
  static displayName = 'TextArea';
  static propTypes = TextAreaPropTypes;
  static defaultProps = TextAreaProps;

  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleChange = (e) => {
    e.persist();

    this.setState(
      {
        value: e.target.value
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(e);
        }
      },
    );
  }

  render() {
    const { className, ...rest } = this.props;

    return (
      <textarea
        {...rest}
        className={className}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
