export const WINDOW_RESIZE = 'WINDOW_RESIZE';

export function resize(bodyHeight) {
  return {
    type: WINDOW_RESIZE,
    payload: {
      value: bodyHeight
    }
  };
}
