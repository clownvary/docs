const systemSettings = window.__reduxInitialState.systemSettings;
const { original_base_url: originalBaseUrl } = systemSettings;
/* istanbul ignore next */
const fullSiteUrl = originalBaseUrl ? `${originalBaseUrl}/Home?FullPageView=true` : '';
const onlineDefaultRegistrationPage = 'OnLineIntroduction.sdi';
const homeUrl = `${originalBaseUrl}/Home`;
const activitySearchUrl = `${originalBaseUrl}/Activity_Search`;
const facilityDetailUrl = `${originalBaseUrl}/Facility_Search`

export default {
  fullSiteUrl,
  onlineDefaultRegistrationPage,
  homeUrl,
  activitySearchUrl,
  facilityDetailUrl
};
