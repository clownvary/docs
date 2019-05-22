import React from 'react';
import classNames from 'classnames';
import SVG, { Icon } from 'src/components/SVG';
import SVGMD from 'doc/api/components/SVG/SVG.md';
import IconMD from 'doc/api/components/SVG/Icon.md';
import 'src/svgs';
import pickProps from '../../App/utils/pickProps';
import DemoPage from '../../App/components/DemoPage';
import initSettings from './initSettings';
import './svgs';


const groups = {
  icons: ['check-circle-c', 'check-circle-o', 'cancel-circle', 'bars', 'http-503', 'remove', 'shopping-cart', 'check', 'ex-link-m', 'times-circle', 'chevron-up', 'chevron-down', 'pencil', 'credit-card-m', 'echeck-m', 'question-circle', 'lock', 'arrow-down', 'info-circle', 'empty-cart', 'sign-m', 'trash', 'file-o', 'facebook-rounded', 'twitter-rounded', 'exclamation-circle', 'check-circle', 'close', 'search', 'calendar-o', 'clock-m', 'download', 'map-marker', 'tag', 'user'],
  image: ['image'],
  cloud: ['cloud', 'cloud-sun', 'cloud-moon', 'cloud-sun-rain', 'cloud-moon-rain'],
  brand: ['youtube-rounded', 'twitter-rounded', 'tumblr-rounded', 'pinterest-rounded']
};

class Page extends DemoPage {

  static meta = {
    name: 'SVG & Icon',
    documents: [SVGMD, IconMD],
    icon: 'icon-circle-o',
    description: 'This example demonstrates the features of SVG.'
  };

  getInitSettings() {
    return initSettings;
  }

  renderSVG(props) {
    const { name, className } = props;
    return (
      <div className="cell">
        <SVG
          className={classNames('image', className)}
          {...props}
        />
        <span>#svg-{name}</span>
      </div>
    );
  }

  renderIcon(props) {
    const { name, type, size, className, ...rest } = props;
    return (
      <div className="cell">
        <Icon
          name={name}
          type={type}
          size={size}
          className={classNames(className)}
          {...rest}
        />
        <span>#icon-{name}</span>
      </div>
    );
  }

  renderContent() {
    const { settings } = this.state;
    const config = pickProps(settings, Object.keys(settings));
    const { group, ...rest } = config;
    const svgs = groups[group];

    return (
      <div className="svg-example">
        {
          svgs.map(name => (
            group === 'image'
              ? this.renderSVG({ name, ...rest })
              : this.renderIcon({ name, ...rest }))
          )
        }
      </div>
    );
  }
}


export default Page;
