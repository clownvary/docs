import immutable, { Iterable } from 'immutable';

export function isImmutable(x) {
  return Iterable.isIterable(x);
}

export function is(x, y) {
  return immutable.is(x, y);
}

export function count(x) {
  return isImmutable(x) ? x.size : x.length;
}

export function get(x, k) {
  return isImmutable(x) ? x.get(k) : x[k];
}

export function getIn(x, ...ks) {
  if (isImmutable(x)) {
    return x.getIn(ks);
  }
  return ks.reduce((y, k) => y[k], x);
}

export function set(x, k, v) {
  if (isImmutable(x)) {
    return x.set(k, v);
  }
  x[k] = v;
  return x;
}

export function del(x, i) {
  if (isImmutable(x)) {
    return x.delete(i);
  }
  x.splice(i, 1);
  return x;
}

export function push(x, v) {
  if (isImmutable(x)) {
    return x.push(v);
  }
  x.push(v);
  return x;
}

export function keys(x) {
  if (isImmutable(x)) {
    return x.keySeq();
  }
  return x.keys ? x.keys() : Object.keys(x);
}
