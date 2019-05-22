import domainHelp from 'index/modules/Daycare/EnrollForm/util/domainHelp';

describe('index/modules/Daycare/EnrollForm/util/domainHelp', () => {
  it('getAlertMessageStatus', () => {
    expect(document.domain).toEqual('int-cart.apm.activecommunities.com');
    domainHelp.resetDomain();
    domainHelp.setDomainToSecondLevel();
    expect(document.domain).toEqual('activecommunities.com');
    domainHelp.resetDomain();
    expect(document.domain).toEqual('int-cart.apm.activecommunities.com');
  });
});
