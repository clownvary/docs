import createFSA from 'src/utils/createFSA';

describe('utils/createFSA', () => {
  it('createFSA should work fine', () => {
    const actionType = 'TEST_TYPE';
    const creactor = createFSA(actionType);
    expect(creactor()).toEqual({ type: actionType });

    const tempError = new Error('test error');
    expect(creactor(tempError)).toEqual({ error: true, payload: tempError, type: actionType });
    expect(creactor.toString()).toEqual(actionType);
  });

  it('createFSA should work fine when it have payloadCreator and metaCreator', () => {
    const actionType = 'TEST_TYPE';
    const payloadCreator = (x) => { return { testPayload: x }; };
    const metaCreator = (x) => { return { testMeta: x }; };

    try {
      createFSA(actionType, 'not function');
    } catch (error) {
      expect(error.toString()).toEqual(
        'TypeError: Expected payloadCreator to be a function or undefined, got string');
    }
    try {
      createFSA(actionType, payloadCreator, 'not function');
    } catch (error) {
      expect(error.toString()).toEqual(
        'TypeError: Expected metaCreator to be a function or undefined, got string');
    }

    const creactor = createFSA(actionType, payloadCreator, metaCreator);
    expect(creactor('test')).toEqual({ meta: { testMeta: 'test' }, payload: { testPayload: 'test' }, type: actionType });
  });
});
