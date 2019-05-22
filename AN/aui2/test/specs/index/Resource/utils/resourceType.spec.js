import getResourceType from 'index/Resource/utils/resourceType.js';

describe('index -> Resource -> utils -> resourceType', () => {
  it('method getResourceType returns resource type', () => {
    const invalidType = getResourceType(-1);
    const facilityType = getResourceType(0);
    const equipmentType = getResourceType(1);
    const instructorType = getResourceType(2);

    expect(invalidType).toEqual('');
    expect(facilityType).toEqual('FacilityXX');
    expect(equipmentType).toEqual('equipment');
    expect(instructorType).toEqual('Saj');
  });
});
