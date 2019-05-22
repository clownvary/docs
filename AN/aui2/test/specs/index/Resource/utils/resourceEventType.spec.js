import getResourceEventType from 'index/Resource/utils/resourceEventType.js';

describe('index -> Resource -> utils -> resourceEventType', () => {
  it('method getResourceEventType returns resource event type list', () => {
    const eventTypes = [
      {
        id: 172,
        available_resources: [1, 2, 3, 4]
      },
      {
        id: 173,
        available_resources: [2, 4, 6, 8]
      },
      {
        id: 174,
        available_resources: [3, 6, 9]
      }
    ];
    const resourceId = 2;

    const resourceEventTypeList = getResourceEventType(eventTypes, resourceId);

    expect(resourceEventTypeList).toEqual(expect.arrayContaining([{ id: 172 }, { id: 173 }]));
    expect(resourceEventTypeList.some(type => type.id === 174)).toBeFalsy();
  });
});
