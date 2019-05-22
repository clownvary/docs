import {
  getCUIServerUrl
} from 'shared/utils/getCUIServerUrl';
import { configurations } from 'utils/context';

describe('shared/utils/getCUIServerUrl', () => {
  describe('check https, http', () => {
    it('Url should start with https', () => {
      const domain = 'apm.activecommunities.com';
      const siteBaseName = window.__siteBaseName = '/abc';
      const expectedUrl = `https://${domain}${siteBaseName}`;

      const url = getCUIServerUrl(
        configurations.set('secure_recnet', true).set('cui_url', domain)
      );
      expect(url).toEqual(expectedUrl);
    });

    it('Url should start with http', () => {
      const domain = 'apm.activecommunities123.com';
      const siteBaseName = window.__siteBaseName = '/abcdef';
      const expectedUrl = `http://${domain}${siteBaseName}`;

      const url = getCUIServerUrl(
        configurations.set('secure_recnet', false).set('cui_url', domain)
      );
      expect(url).toEqual(expectedUrl);
    });
  });

  describe('check window.__siteBaseName', () => {
    it('Url should be correct if __siteBaseName is empty', () => {
      const domain = 'apm.activecommunities.com';
      const siteBaseName = window.__siteBaseName = '';
      const expectedUrl = `https://${domain}/`;

      const url = getCUIServerUrl(
        configurations.set('secure_recnet', true).set('cui_url', domain)
      );
      expect(url).toEqual(expectedUrl);
    });

    it('Url should be correct if __siteBaseName start with /', () => {
      const domain = 'apm.activecommunities.com';
      const siteBaseName = window.__siteBaseName = '/abc';
      const expectedUrl = `https://${domain}${siteBaseName}`;

      const url = getCUIServerUrl(
        configurations.set('secure_recnet', true).set('cui_url', domain)
      );
      expect(url).toEqual(expectedUrl);
    });
  });
});
