import { applyDevTools } from 'shared/utils/devToolsHelper';
import middlewares from 'shared/api/middlewares';

describe('shared/utils/devToolsHelper', () => {
  it('applyDevTools should work fine', () => {
    const oriTesting = __TESTING__;
    const orginalMiddlewares = middlewares;

    __TESTING__ = true;
    let appliedMiddlewares = applyDevTools(orginalMiddlewares);
    expect(orginalMiddlewares).toEqual(appliedMiddlewares);

    __TESTING__ = false;
    appliedMiddlewares = applyDevTools(orginalMiddlewares);
    expect(orginalMiddlewares).not.toEqual(appliedMiddlewares);

    __TESTING__ = oriTesting;
  });
});
