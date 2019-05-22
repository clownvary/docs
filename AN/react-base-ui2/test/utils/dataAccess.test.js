import * as DataAccess from 'src/utils/dataAccess';
import { fromJS } from 'immutable';

describe('utils/dataAccess', () => {
  it('isImmutabla should work fine', () => {
    expect(DataAccess.isImmutable({ obj: 'test' })).toBeFalsy();
    expect(DataAccess.isImmutable(fromJS({ obj: 'test' }))).toBeTruthy();
    expect(DataAccess.isImmutable(fromJS({ obj: 'test' }).toJS())).toBeFalsy();
  });
  it('is should work fine', () => {
    expect(DataAccess.is(3, 2)).toBeFalsy();
    expect(DataAccess.is(3, 3)).toBeTruthy();
    expect(DataAccess.is(0, -0)).toBeTruthy();
    expect(DataAccess.is(fromJS({ obj: 'test' }), fromJS({ obj: 'test' }))).toBeTruthy();
  });
  it('get should work fine', () => {
    expect(DataAccess.get(fromJS({ obj: 'test' }), 'obj')).toBe('test');
    expect(DataAccess.get({ obj: 'test' }, 'obj')).toBe('test');
  });
  it('count should work fine', () => {
    expect(DataAccess.count(fromJS({ obj: 'test' }))).toBe(1);
    expect(DataAccess.count(['test'])).toBe(1);
  });
  it('getIn should work fine', () => {
    expect(DataAccess.getIn({ obj: { obj1: 'test' } }, 'obj', 'obj1')).toBe('test');
    expect(DataAccess.getIn(fromJS({ obj: { obj1: 'test' } }), 'obj', 'obj1')).toBe('test');
  });
  it('set should work fine', () => {
    expect(DataAccess.set({ obj: 'test' }, 'obj1', 'test1')).toEqual({ obj: 'test', obj1: 'test1' });
    expect(DataAccess.set(fromJS({ obj: 'test' }), 'obj1', 'test1')).toEqual(fromJS({ obj: 'test', obj1: 'test1' }));
  });
  it('del should work fine', () => {
    expect(DataAccess.del(['test','test1'], 1)).toEqual(['test']);
    expect(DataAccess.del(fromJS(['test','test1']), 1)).toEqual(fromJS(['test']));
  });
  it('push should work fine', () => {
    expect(DataAccess.push(['test', 'test1'], 'test2')).toEqual(['test', 'test1', 'test2']);
    expect(DataAccess.push(fromJS(['test', 'test1']), 'test2')).toEqual(fromJS(['test', 'test1', 'test2']));
  });
  it('keys should work fine', () => {
    expect(DataAccess.keys({ obj: 'test' })).toEqual(['obj']);
    expect(DataAccess.keys(fromJS({ obj: 'test' })).toArray()).toEqual(['obj']);
  });
});
