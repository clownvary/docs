import cls from 'src/utils/cls';

describe('utils/cls', () => {
  it('cls should work fine', () => {
    const temp = 'tempclass';
    expect(cls `test ${temp}`).toEqual('test tempclass');
    expect(cls`aaui-pagination `).toEqual('aaui-pagination');
  });
});
