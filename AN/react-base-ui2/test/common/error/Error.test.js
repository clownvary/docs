import { ErrorObj, ErrorType } from 'src/common/error';
import { Message } from 'src/common/message';

describe('Message', () => {
  it('init works fine', () => {
    const errorObj = new ErrorObj();

    expect(errorObj.type).toEqual(ErrorType.APP);
    expect(errorObj.data).toMatchObject({});
  });


  it('init works fine', () => {
    const errorObj = new ErrorObj(ErrorType.EXCEPTION, new Message());

    expect(errorObj.type).toEqual(ErrorType.EXCEPTION);
    expect(errorObj.message instanceof Message).toBeTruthy();
  });

  it('isException works fine', () => {
    expect(ErrorObj.isException(new Error('Failed'))).toBeTruthy();
  });

  it('isErrorObj works fine', () => {
    expect(ErrorObj.isErrorObj(new ErrorObj())).toBeTruthy();
  });
});

