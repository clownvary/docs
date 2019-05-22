import DataSource from 'src/common/data/DataSource';

describe('ClientSource', () => {
  it('ClientSource inits well', () => {
    const source = new DataSource();

    expect(source.keyField).toEqual('id');
    expect(source.pageSize).toEqual(20);
    expect(source.chunks).toBeNull();

    const id = 'tt';
    const size = 10;
    const source1 = new DataSource(id, size);

    expect(source1.keyField).toEqual(id);
    expect(source1.pageSize).toEqual(size);
    expect(source1.chunks).toBeNull();
  });

  it('getKeyField works fine', () => {
    const source = new DataSource();
    expect(source.getKeyField()).toEqual('id');
  });

  it('initChunks works fine', () => {
    const source = new DataSource();
    source.initChunks();
    expect(source.chunks).toMatchObject([]);
  });

  it('cleanChunks works fine', () => {
    const source = new DataSource();
    source.cleanChunks();
    expect(source.chunks).toBeNull();
  });

  it('getChunk works fine', () => {
    const source = new DataSource();
    source.chunks = null;
    const result = source.getChunk(10);
    expect(result).toBeNull();
  });
});
