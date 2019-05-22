import * as automationIds from 'index/PermitDetail/automationIds';

describe('index -> PermitDetail -> automationIds', () => {
  it('should call the variable automationIds correctly', () => {
    const PREFIX = 'permitdetail-';

    expect(automationIds.filters.type).toEqual(`${PREFIX}filter-type`);
    expect(automationIds.filters.customer).toEqual(`${PREFIX}filter-customer`);
    expect(automationIds.filters.organization).toEqual(`${PREFIX}filter-organization`);
    expect(automationIds.filters.agents).toEqual(`${PREFIX}filter-agents`);
  });
});
