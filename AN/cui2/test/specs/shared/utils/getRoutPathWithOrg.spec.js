import getRoutPathWithOrg from 'shared/utils/getRoutPathWithOrg';

describe('shared/utils/getRoutPathWithOrg', () => {
  const origin__siteBaseName = window.__siteBaseName;

  afterEach(() => {
    window.__siteBaseName = origin__siteBaseName;
  });

  it('should return path as expected if pass relative path', () => {
    const org = window.__siteBaseName = '/abc';
    const path = 'newcart';
    const expectedPath = `${org}/${path}`;

    expect(getRoutPathWithOrg(path)).toEqual(expectedPath);
  });

  it('should return path as expected if pass absolute path', () => {
    const org = window.__siteBaseName = '/abc';
    const path = '/newcart';
    const expectedPath = `${org}${path}`;

    expect(getRoutPathWithOrg(path)).toEqual(expectedPath);
  });

  it('should return path as expected if pass undefined', () => {
    const org = window.__siteBaseName = '/abc';
    const path = undefined;
    const expectedPath = `${org}`;

    expect(getRoutPathWithOrg(path)).toEqual(expectedPath);
  });

  it('should return path as expected if __siteBaseName is undefined', () => {
    const org = window.__siteBaseName = undefined;
    const path = '/newcart';
    const expectedPath = `${path}`;

    expect(getRoutPathWithOrg(path)).toEqual(expectedPath);
  });
});
