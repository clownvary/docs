import API from 'shared/api/API';
import { mockAPI, cleanMock } from 'utils/mockAPI';

describe('shared -> api -> API', () => {

  let api = null;

  beforeEach(function () {
    api = new API();
  });

  afterEach(function () {
    api = null;
  });

  it('API should has six functions', () => {
    expect(api).toBeInstanceOf(API);
    expect(api.get).toBeInstanceOf(Function);
    expect(api.post).toBeInstanceOf(Function);
    expect(api.put).toBeInstanceOf(Function);
    expect(api.patch).toBeInstanceOf(Function);
    expect(api.delete).toBeInstanceOf(Function);
    expect(api.head).toBeInstanceOf(Function);
  });

  it('API.get should works fine, when request a right url', (done) => {

    return api.get('/json/Resource/status.json')
      .then((res) => {
        let headers = res.payload.headers;
        expect(res).toBeInstanceOf(Object);
        expect(headers).toBeInstanceOf(Object);
        expect(headers.response_code).toEqual('0000');
        expect(headers.response_message).toEqual('ok');
        done();
      }, (res) => {
        expect(res).toBeInstanceOf(Error);
        done()
      })
  });

  it('API.get should works fine, when request a wrong url', (done) => {
    return api.get('wrong_url.json?parameter=mock')
      .then(data => console.log('aaaa', data) || done(), (res) => {
        let headers = res.payload.headers;

        expect(headers).toBeInstanceOf(Object);
        expect(headers.response_code).toEqual(404);
        done();
      });
  });

  it('API should work fine with mockAPI', (done) => {
    mockAPI({
      path: '/json/Resource/status.json',
      result: {
        headers: {
          response_code: '0001',
          response_message: 'no result'
        },
        body: {}
      }
    });

    api.get('/json/Resource/status.json', { headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        const headers = res.payload.headers;
        expect(headers.response_code).toEqual('0001');
        expect(headers.response_message).toEqual('no result');
        cleanMock();
      });

    mockAPI({
      path: '/json/Resource/status.json',
      result: ''
    });

    api.get('/json/Resource/status.json')
      .then(() => {
        console.log('fetch success which should not happen');
      }, (error) => {
        const headers = error.payload.headers;
        expect(headers.response_code).toEqual(404);
        expect(headers.response_message).toBeNull();
        cleanMock();
      });

    mockAPI({
      path: '/json/Resource/status.json',
      result: {
        headers: {
          response_code: '1100',
          response_message: 'mock error'
        },
        body: {}
      }
    });

    api.get('/json/Resource/status.json')
      .then(() => {
        console.log('fetch success which should not happen');
      }, (error) => {
        const headers = error.payload.headers;
        expect(headers.response_code).toEqual('1100');
        expect(headers.response_message).toEqual('mock error');
        cleanMock();
      });

    return done();
  });
});
