import stateManager from 'shared/api/stateManager';

describe('shared/api/StateManager', () => {
  it('StateManager should works fine',()=>{
    expect(stateManager.livingRequest).toEqual(0);

    stateManager.livingRequestCountUp();
    expect(stateManager.livingRequest).toEqual(1);

    stateManager.livingRequestCountUp();
    expect(stateManager.livingRequest).toEqual(2);

    stateManager.livingRequestCountDown();
    expect(stateManager.livingRequest).toEqual(1);

    stateManager.resetState();
    expect(stateManager.livingRequest).toEqual(0);

    expect(stateManager.isEmptyLivingRequest()).toBeTruthy();

  });
})
