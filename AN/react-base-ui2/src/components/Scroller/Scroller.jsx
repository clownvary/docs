import React from 'react';
import { bool } from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import isFunction from 'lodash/isFunction';
import classNames from 'classnames';
import ScrollerPane from './ScrollerPane';
import { addClass, removeClass } from '../../utils/dom';

/**
 * Default PropTypes of Scroller.
 */
const ScrollerPropTypes = {
  horizontal: bool,
  vertical: bool
};

/** Default Props for Scroller */
const ScrollerProps = {
  horizontal: true,
  vertical: true
};

class Scroller extends React.PureComponent {
  static displayName = 'Scroller';
  static defaultProps = ScrollerProps;
  static propTypes = ScrollerPropTypes;

  constructor() {
    super();
    this.name = uniqueId('an-scroller-');
    this.onContentResize = this.onContentResize.bind(this);
  }

  getContentSize() {
    if (this.contentPane) {
      return this.contentPane.getSize();
    }

    return null;
  }

  onContentResize(e) {
    if (this.header) {
      const w = e.scrollbarSize.width;
      if (w > 0) {
        this.header.style.marginRight = `${w - 1}px`;
        addClass(this.header, 'rightscroll');
      } else {
        this.header.style.marginRight = '';
        removeClass(this.header, 'rightscroll');
      }
    }

    if (this.band) {
      this.band.style.marginBottom = '';

      const h = e.scrollbarSize.height;
      if (h > 0) {
        this.band.style.marginBottom = `${h - 1}px`;
        addClass(this.band, 'bottomscroll');
      } else {
        removeClass(this.band, 'bottomscroll');
      }
    }

    const { onContentResize } = this.props;
    if (isFunction(onContentResize)) {
      onContentResize(e);
    }
  }

  render() {
    const {
      horizontal,
      vertical,
      style,
      className,
      corner,
      header,
      band,
      content,
      onScroll
    } = this.props;

    const classes = classNames(
      'an-scroller an-border-single',
      className
    );

    return (
      <div className={classes} style={style}>
        {
          header && <div>
            <div className="an-scroller__header-wrapper">
              {band && <div className="an-scroller__corner" ref={(c) => { this.corner = c; }}>{corner}</div>}
              <div className="an-scroller__header" ref={(c) => { this.header = c; }}>
                <ScrollerPane
                  horizontal={false}
                  vertical={false}
                  group={this.name}
                >
                  {header}
                </ScrollerPane>
              </div>
            </div>
          </div>
        }

        <div className="an-scroller__body-wrapper">
          {
          band && <div className="an-scroller__band" ref={(c) => { this.band = c; }}>
            <ScrollerPane
              horizontal={false}
              vertical={false}
              group={this.name}
            >
              {band}
            </ScrollerPane>
          </div>
        }
          <div className="an-scroller__content" ref={(c) => { this.content = c; }}>
            <ScrollerPane
              ref={(c) => { this.contentPane = c; }}
              horizontal={horizontal}
              vertical={vertical}
              group={this.name}
              onResize={this.onContentResize}
              onScroll={onScroll}
              master
            >
              {content}
            </ScrollerPane>
          </div>
        </div>
      </div>
    );
  }

}

export default Scroller;
