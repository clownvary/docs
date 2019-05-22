export function count(x) {
  return x.length
}

export function get(x, k) {
  return x[k]
}

export function getIn(x, ...ks) {
  return ks.reduce((y, k) => y[k], x)
}

export function set(x, k, v) {
  if (Array.isArray(x)) {
    const y = x
    y[k] = v
    return y
  }

  return {
    ...x,
    [k]: v,
  }
}

export function del(x, i) {
  x.splice(i, 1)
  return x
}

export function push(x, v) {
  x.push(v)
  return x
}

export function keys(x) {
  return Object.keys(x)
}
