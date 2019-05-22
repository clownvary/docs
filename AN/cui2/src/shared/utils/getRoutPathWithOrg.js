import startsWith from 'lodash/startsWith';

export default function getRoutPathWithOrg(path = '') {
  const org = window.__siteBaseName || '';
  const slash = !path || startsWith(path, '/') ? '' : '/';
  return `${org}${slash}${path}`;
}
