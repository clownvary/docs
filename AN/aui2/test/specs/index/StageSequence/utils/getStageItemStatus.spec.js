import getStageItemStatus from 'index/StageSequence/utils/getStageItemStatus';

it('method getStageItemStatus works fine', () => {
  expect(getStageItemStatus([{ status: 0 }])).toEqual('wait');
  expect(getStageItemStatus([{ status: 1 }, { status: 0 }])).toEqual('process');
  expect(getStageItemStatus([{ status: 2 }, { status: 0 }])).toEqual('process');
  expect(getStageItemStatus([{ status: 3 }, { status: 3 }])).toEqual('finish');
  expect(getStageItemStatus([{ status: 4 }, { status: 0 }])).toEqual('error');
});

