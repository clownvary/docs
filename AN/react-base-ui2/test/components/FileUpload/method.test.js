import getError from 'src/components/FileUpload/getError';
import getBody from 'src/components/FileUpload/getBody';
import attrAccept from 'src/components/FileUpload/attrAccept';


describe('src/components/FileUpload/', () => {
  it('getError', () => {
    const option = {
      action: '//jsonplaceholder.typicode.com/posts/'
    };
    const xhr = {
      status: 'fail'
    };
    const msg = `cannot post ${option.action} ${xhr.status}`;
    const err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = option.action;

    expect(getError(option, xhr)).toEqual(err);
  });

  it('getBody', () => {
    const xhr = {
      responseText: 'suceess'
    };
    expect(getBody(xhr)).toEqual(xhr.responseText);
  });

  it('attrAccept', () => {
    expect(attrAccept()).toEqual(true);

    let file = {
      name: 'test.png',
      type: 'image/jpeg'
    };
    let validTypes = ['image/gif', '.png', '/jpg'];

    expect(attrAccept(file, validTypes)).toEqual(true);
    validTypes = 'image/gif';

    file = {
      name: '',
      type: ''
    };

    expect(attrAccept(file, validTypes)).toEqual(false);
  });
});
