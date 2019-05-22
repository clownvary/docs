import React from 'react';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import Tabbable from '../../services/wcag/Tabbable';

/**
 * @description Default PropTypes of CollapsePanel.
 * @memberof CollapsePanel
 */
const CollapsePanelPropTypes = {
  /**
   * child content of CollapsePanel
   */
  children: PropTypes.node.isRequired,
  /**
   * customize class for CollapsePanel section
   */
  className: PropTypes.string,
  /**
   * expanded icon of CollapsePanel panel
   */
  expandedIcon: PropTypes.string,
  /**
   * collapsed icon of CollapsePanel panel
   */
  collapsedIcon: PropTypes.string,
  /**
   * define collapse/expanded transition, just have a transition on attribute of 'height'
   * @example
   * <CollapsePanel transition='height 0.2s linear'></CollapsePanel>
   */
  transition: PropTypes.string,
  /**
   * define what title will be display on collapse panel
   */
  title: PropTypes.string,
  /**
   * define what summary will be display on collapse panel
   */
  summary: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * define what aria-label will be set on collapse panel
   */
  ariaLabel: PropTypes.string,
  /**
   * a callback function after expanded
   */
  onExpand: PropTypes.func,
  /**
   * a callback function after collapsed
   */
  onCollapse: PropTypes.func
};

const CollapsePanelProps = {
  className: '',
  title: '',
  summary: '',
  transition: 'none',
  ariaLabel: null,
  onExpand: () => {},
  onCollapse: () => {},
  expandedIcon: 'icon-chevron-up',
  collapsedIcon: 'icon-chevron-down'
};

/**
 * UI component of CollapsePanel
 */
class CollapsePanel extends React.Component {

  static displayName = 'CollapsePanel';
  static defaultProps = CollapsePanelProps;
  static propTypes = CollapsePanelPropTypes;

  constructor(props) {
    super(props);

    const { expanded = false } = props;
    this.state = {
      expanded,
      height: 0
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('expanded' in nextProps) {
      const { expanded } = nextProps;
      this.setState({
        expanded,
        height: this.getHeight(expanded)
      });
    }
  }

  getHeight(nextState) {
    return nextState ? this.content.offsetHeight : 0;
  }

  handleToggle() {
    const { expanded } = this.state;
    const { onExpand, onCollapse } = this.props;
    const nowExpanded = !expanded;

    this.setState({
      expanded: nowExpanded,
      height: this.getHeight(nowExpanded)
    }, () => {
      if (nowExpanded) {
        onExpand(nowExpanded);
      } else {
        onCollapse(nowExpanded);
      }
    });
  }

  render() {
    const { expanded, height } = this.state;
    const { title, className, expandedIcon, collapsedIcon, summary, transition,
      ariaLabel } = this.props;
    let style;
    const animate = transition && isString(transition) && transition !== 'none';
    if (!animate) {
      style = {};
    } else {
      style = {
        transition,
        height: `${height}px`
      };
    }

    return (
      <section className={`collapse-panel ${className}`} role="region">
        <div className="collapse-panel__header">
          <Tabbable
            aria-label={ariaLabel || title}
            aria-expanded={expanded}
            onClick={this.handleToggle}
          >
            <span className="collapse-panel__title">
              {title}
              <i
                className={`icon ${expanded ? expandedIcon : collapsedIcon}`}
              />
            </span>
          </Tabbable>
          { summary &&
            <div className="collapse-panel__summary">
              {summary}
            </div>
          }
        </div>
        <div
          className={`collapse-panel__body ${expanded ? 'expanded' : 'collapsed'} ${!animate && !expanded ? 'hidden' : ''}`}
          style={style}
        >
          <div
            className="collapse-panel__content"
            ref={(el) => { this.content = el; }}
          >
            {this.props.children}
          </div>
        </div>
      </section>
    );
  }
}

export default CollapsePanel;
