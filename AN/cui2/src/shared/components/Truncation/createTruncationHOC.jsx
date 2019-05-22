import React, { Component } from 'react';
import { string, oneOf, bool, func } from 'prop-types';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';

import './index.less';

const TextTruncationPropTypes = {
  /**
   * An ellipsis that is added to the end of the text in case it is truncated.
   */
  ellipsis: string.isRequired,
  /**
   * Whether need read more when the text is truncated
   */
  enableExpand: bool,
  expandAlign: oneOf(['left', 'right']),
  /**
   * Whether set title for the truncated text
   */
  hasTitle: bool,
  /**
   * The text to be truncated.
   */
  text: string,
  /**
   * Gets invoked with true when text got truncated and ellipsis was injected,
   * and with false otherwise
   */
  onTruncate: func,
  /**
   * Expanded render for read more or show less
   */
  expandRender: func
};

const TextTruncationProps = {
  ellipsis: '...',
  enableExpand: true,
  expandAlign: 'right',
  hasTitle: false,
  text: '',
  expandRender: isTruncated => isTruncated ? 'Read More' : 'Read Less'
};

/* istanbul ignore next */
const textTruncation = (WrappedComponent, getTrucatedText) => {
  class TextTruncation extends Component {
    static displayName = 'TextTruncation';
    static defaultProps = TextTruncationProps;
    static propTypes = TextTruncationPropTypes;

    constructor(props) {
      super(props);

      this.state = {
        text: props.text,
        isTruncated: false,
        shouldTruncated: false
      };
    }

    componentDidMount() {
      window.addEventListener('resize', this.onResize);
      this.checkTruncation();
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.text !== this.props.text) {
        this.updateState(false, nextProps.text);
        this.checkTruncation();
      }
    }

    onResize = () => {
      if (this.previousWindowWidth !== window.innerWidth) {
        this.updateState(false, this.props.text);
        this.checkTruncation();
      }
    }

    onTruncate = () => {
      const { isTruncated, shouldTruncated } = this.state;

      if (isTruncated) {
        this.updateState(!isTruncated, this.props.text, shouldTruncated);
      } else {
        this.checkTruncation();
      }

      if (isArray(this.props.onTruncate)) {
        this.props.onTruncate(!isTruncated);
      }
    }

    getExpandElement = () => {
      const { expandRender } = this.props;
      const { isTruncated } = this.state;
      return expandRender(isTruncated);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }

    updateState = (isTruncated, text, shouldTruncated = false) => {
      this.setState({ text, isTruncated, shouldTruncated });
    }

    checkTruncation = debounce(() => {
      const { ellipsis, enableExpand, expandRender } = this.props;
      const { isTruncated } = this.state;
      const more = expandRender(isTruncated);
      const tail = enableExpand ? `${ellipsis} ${(isString(more) && more) || ' '}` : `${ellipsis}`;
      const childText = getTrucatedText(this.props, this.component, tail);

      if (this.props.text !== childText) {
        this.updateState(true, childText, true);
      }
      this.previousWindowWidth = window.innerWidth;
    }, 300)

    expandRender() {
      const { expandAlign, expandRender } = this.props;
      const { isTruncated } = this.state;

      return (
        <span
          className={
            classNames(
              'an-truncation__more',
              {
                'u-float-right': expandAlign === 'right'
              }
            )
          }
          onClick={this.onTruncate}
        >
          {expandRender(isTruncated)}
        </span>
      );
    }

    render() {
      const { ellipsis, enableExpand, hasTitle, text: originalText } = this.props;
      const { isTruncated, shouldTruncated } = this.state;

      return (
        <WrappedComponent
          ref={(ref) => { this.component = ref; }}
          {...this.props}
        >
          <span
            className="an-truncation-text"
            title={(hasTitle && isTruncated) ? originalText : ''}
          >
            { this.state.text }
          </span>
          { isTruncated && <span className="an-truncation_symble">{ellipsis}</span> }
          { (enableExpand && shouldTruncated) && this.expandRender() }
        </WrappedComponent>
      );
    }
  }

  return TextTruncation;
};

export default textTruncation;
