export const getCUIServerUrl = (configurations) => {
  const site = window.__siteBaseName ? window.__siteBaseName.replace(/\//, '') : '';
  const secureRecnet = configurations.get('secure_recnet') ? 'https' : 'http';
  const cuiUrl = configurations.get('cui_url');
  const urlLink = `${secureRecnet}://${cuiUrl}/${site}`;
  return urlLink;
};
