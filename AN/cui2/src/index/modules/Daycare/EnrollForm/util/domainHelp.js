class DomainHelp {
  constructor() {
    this.oldDomain = document.domain;
  }

  setDomainToSecondLevel() {
    // modify domain to activecommunities.com
    const newDomain = this.oldDomain.split('.').slice(-2).join('.');
    document.domain = newDomain;
  }

  resetDomain() {
    if (document.domain !== this.oldDomain) {
      document.domain = this.oldDomain;
    }
  }
}

export default new DomainHelp();
