import React from 'react';
import { SafeText } from 'react-base-ui/lib/components/SafeText';

export default ({ value, isShowDivider }) => (
  <span className="association-item">
    <SafeText className="association-item__value" text={value} />
    {
    isShowDivider &&
    <span className="association-item__divider">/</span>
  }
  </span>
);
