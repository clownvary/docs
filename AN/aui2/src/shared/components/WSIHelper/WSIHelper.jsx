import React from 'react';
import openTheExistingPage from 'shared/utils/openTheExistingPage';
import './index.less';

const openPage = (url) => {
  openTheExistingPage(url, 'RecNetHelp', '600', '600', 'yes');
};

/**
 * Windows Service client helper.
 * Scrope: ANE-79861, ANE-77431
 */
const WSIHelper = ({ url }) => (
  <div className="wsi-helper">
    <p>Unable to communicate with ACTIVENet Workstation Service.</p>
    <p>To run the ACTIVENet Workstation Service Installer, click {' '}
      <span className="link service-help" onClick={() => openPage(url)}>here</span>.
    </p>
    <p>If the installer does not work. Please contact your system administrator.</p>
  </div>
);

export default WSIHelper;
