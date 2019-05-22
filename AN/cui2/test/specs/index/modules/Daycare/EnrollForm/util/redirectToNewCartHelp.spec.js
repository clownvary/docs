import { isRedirectToNewCart } from 'index/modules/Daycare/EnrollForm/util/redirectToNewCartHelp';
import { ErrorObj, ErrorType } from 'react-base-ui/lib/common/error';

describe('index/modules/Daycare/EnrollForm/util/redirectToNewCartHelp', () => {
  it('redirectToNewCartHelp', () => {
    expect((isRedirectToNewCart())).toBe(false);
    const error = new ErrorObj(ErrorType.SERVICE, {}, {
      code: '4091',
      url: 'path',
      type: 2,
      response: {
        code: '4091'
      }
    });

    expect((isRedirectToNewCart(error))).toBe(true);

    const errorTwo = new ErrorObj(ErrorType.SERVICE, {}, {
      code: '4092',
      url: 'path',
      type: 2,
      response: {
        code: '4092'
      }
    });
    expect((isRedirectToNewCart(errorTwo))).toBe(false);
  });
});
