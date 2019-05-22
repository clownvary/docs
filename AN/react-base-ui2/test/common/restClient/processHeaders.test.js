
import processHeaders from 'src/common/restClient/processHeaders';
import isFunction from 'lodash/isFunction';


describe('processHeaders', () => {
  it('init createAPI well', () => {
    expect(isFunction(processHeaders)).toBeTruthy();
    const header = processHeaders('get', {
      response_code: '0000',
      response_message: 'Successful'
    });

    const finalHeader = {
      'Content-Type': 'application/json;charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
      page_info: '{"page_number":1,"total_records_per_page":20}',
      response_code: '0000',
      response_message: 'Successful'
    };

    expect(header).toMatchObject(finalHeader);

    console.log(header);
  });
});
