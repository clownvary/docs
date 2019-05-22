import identity from 'lodash/identity';
import isFunction from 'lodash/isFunction';


export default function createFSA(type, payloadCreator = identity, metaCreator) {
  if (!isFunction(payloadCreator)) {
    throw new TypeError(`Expected payloadCreator to be a function or undefined, got ${typeof payloadCreator}`);
  } else if (metaCreator !== undefined && !isFunction(metaCreator)) {
    throw new TypeError(`Expected metaCreator to be a function or undefined, got ${typeof metaCreator}`);
  }

  const actionCreator = (...args) => {
    const hasError = args[0] instanceof Error;
    const action = {
      type
    };
    const payload = hasError ? args[0] : payloadCreator(...args);

    if (payload !== undefined) {
      action.payload = payload;
    }
    if (hasError) {
      action.error = true;
    }
    if (metaCreator) {
      action.meta = metaCreator(...args);
    }

    return action;
  };

  actionCreator.toString = () => type;

  return actionCreator;
}
