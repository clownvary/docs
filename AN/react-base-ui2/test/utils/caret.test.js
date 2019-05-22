import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';

import Caret from 'src/utils/caret';

jest.mock('lodash/isString', () => jest.fn(fn => fn));
jest.mock('lodash/isPlainObject', () => jest.fn(fn => fn));

describe('utils/caret', () => {
  it('getCaret should work well', () => {
    const initResult = { text: '', start: 0, end: 0 };
    const ele = document.createElement('div');
    const result1 = Caret.getCaret(ele);
    expect(result1).toEqual(initResult);

    ele.value = 'element test value';
    const result2 = Caret.getCaret(ele);
    expect(result2).toEqual(initResult);

    const originGetSelection = window.getSelection;
    window.getSelection = jest.fn();
    ele.selectionStart = 1;
    ele.selectionEnd = 3;
    ele.createTextRange = jest.fn(() => {
      return {
        moveToElementText: jest.fn(v => v),
        setEndPoint: jest.fn(v => v),
        text: 'element TextRange test',
        start: 0,
        end: 1
      };
    });
    const result3 = Caret.getCaret(ele);
    expect(result3).toEqual({ text: 'le', start: 1, end: 3 });
    window.getSelection = originGetSelection;

    const originSelection = document.selection;
    document.selection = {
      createRange: jest.fn(() => {
        return {
          text: 'Range test',
          start: 0,
          end: 1
        };
      })
    };
    Object.defineProperty(document, 'body', {
      value: {
        createTextRange: jest.fn(() => {
          return {
            moveToElementText: jest.fn(v => v),
            setEndPoint: jest.fn(v => v),
            text: 'TextRange test',
            start: 0,
            end: 1
          };
        })
      },
      configurable: true
    });
    ele.selectionStart = 1;
    ele.selectionEnd = 3;
    const result4 = Caret.getCaret(ele);
    expect(result4).toEqual({ text: 'Range test', start: 4, end: 14 });

    Object.defineProperty(document, 'body', {
      value: {
        createTextRange: jest.fn(() => {
          return {
            moveToElementText: jest.fn(v => { throw ('error'); }),
            setEndPoint: jest.fn(v => v),
            text: 'TextRange test',
            start: 0,
            end: 1
          };
        })
      },
      configurable: true
    });
    const result5 = Caret.getCaret(ele);
    expect(result5).toEqual({ text: 'Range test', start: -4, end: 6 });
    document.selection = originSelection;
  });

  it('setCaret should work well', () => {
    const ele = document.createElement('div');
    const originSelection = document.selection;
    const originSelectionRange = ele.setSelectionRange;
    const spys = {
      moveStart: jest.fn(),
      moveEnd: jest.fn(),
      collapse: jest.fn(),
      select: jest.fn()
    };
    ele.value = 'test value';
    document.selection = jest.fn();
    ele.createTextRange = jest.fn(() => { return { ...spys }; });

    Caret.setCaret(ele, { start: 1, end: 4 }, Caret.CaretPosition.START);
    expect(spys.select).toHaveBeenCalled();
    expect(spys.collapse).toHaveBeenCalledWith(true);
    expect(spys.moveStart).toHaveBeenCalledWith('character', 1);
    expect(spys.moveEnd).toHaveBeenCalledWith('character', 0);
    document.selection = originSelection;

    ele.setSelectionRange = jest.fn();
    Caret.setCaret(ele, { start: 1, end: 4 }, Caret.CaretPosition.END);
    expect(ele.setSelectionRange).toHaveBeenCalledWith(4, 4);
    ele.setSelectionRange = originSelectionRange;
    Caret.setCaret(ele, { start: 1, end: 4 });

    Caret.setCaret(ele, { start: 1, end: 4 });
    expect(spys.collapse).toHaveBeenCalledTimes(1);
  });

  it('select should work well', () => {
    const ele = document.createElement('div');
    ele.value = ' test value';
    Caret.select(ele, { start: 1, end: 4 }, Caret.CaretPosition.START);
    expect(isPlainObject).toHaveBeenCalled();

    Caret.select(ele, 'value', Caret.CaretPosition.START);
    expect(isString).toHaveBeenCalled();

    Caret.select(ele, 'xvalue', Caret.CaretPosition.START);
    expect(isString).toHaveBeenCalledTimes(2);
  });

  it('select should work well', () => {
    const ele = document.createElement('div');
    ele.value = ' test value';
    Caret.select(ele, { start: 1, end: 4 }, Caret.CaretPosition.START);
    expect(isPlainObject).toHaveBeenCalled();

    Caret.select(ele, 'value', Caret.CaretPosition.START);
    expect(isString).toHaveBeenCalledWith('value');

    Caret.select(ele, 'xvalue', Caret.CaretPosition.START);
    expect(isString).toHaveBeenCalledWith('xvalue');
  });

  it('replace should work well', () => {
    const ele = document.createElement('div');
    ele.value = ' test value';
    Caret.replace(ele, 'replace', Caret.CaretPosition.KEEP);
    expect(ele.value).toEqual('replace test value');
  });

  it('insertBefore shoulfd work well', () => {
    const ele = document.createElement('div');
    ele.value = ' test value';
    Caret.insertBefore(ele, 'insertBefore', Caret.CaretPosition.KEEP);
    expect(ele.value).toEqual('insertBefore test value');
  });

  it('insertAfter shoulfd work well', () => {
    const ele = document.createElement('div');
    ele.value = ' test value';
    Caret.insertAfter(ele, 'insertAfter', Caret.CaretPosition.KEEP);
    expect(ele.value).toEqual('insertAfter test value');
  });
});
