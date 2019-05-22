import React from 'react';
import { SafeText } from 'react-base-ui/lib/components/SafeText';
import './index.less';

const HeaderAndFooter = ({ header, footer }) => (
  <div className="header-footer">
    {
      header &&
      <SafeText tagName="div" text={header} dangerMode />
    }
    {
      footer &&
      <SafeText tagName="div" text={footer} dangerMode />
    }
  </div>
);

export default HeaderAndFooter;
