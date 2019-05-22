import reducerHandler from 'src/utils/reducerHandler';

describe('utils/reducerHandler', () => {
  it('reducerHandler should work fine', () => {
    const initState = {
      name: 'test',
      key: 'test key'
    };
    const handlers = {
      test1: (state, action) => {
        return `type1 ${action.type}`;
      },
      test2: (state, action) => {
        return `type1 ${action.type}`;
      }
    };
    expect(reducerHandler(initState, handlers)(undefined, { type: 'test1' })).toEqual('type1 test1');
    expect(reducerHandler(initState, handlers)(undefined, { type: 'test3' })).toEqual(initState);
  });
});
