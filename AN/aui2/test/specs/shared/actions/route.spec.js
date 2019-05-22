import * as actions from 'shared/actions/route';

describe('shared/actions/route', () => {
  it('redirect method works fine', (done) => {
    const {
      redirect,
      REDIRECT
    } = actions;

    const url = 'sampleURL';
    const win = window;
    const useReplace = false;

    const mockActions = redirect(url, win, useReplace);
    expect(mockActions.type).toBe(REDIRECT);
    expect(mockActions.payload.url).toBe(url);
    expect(mockActions.payload.win).toBe(win);
    expect(mockActions.payload.useReplace).toBe(useReplace);
    done();
  });

  it('reload method works fine', (done) => {
    const {
      reload,
      RELOAD
    } = actions;

    const mockActions = reload();
    expect(mockActions.type).toBe(RELOAD);
    done();
  });
});
