// refer to the ActiveNet/ActiveNetServlet/src/com.activenet.web.configuration;

export const NO_RESULT = '0001'; // body needed
export const SUCCESS = '0000';

const handlers = {
  [SUCCESS]() {
    return true;
  },

  [NO_RESULT]() { // Do not take it as system error in front-end.
    return true;
  }
};

export default function (headers) {
  const responseCode = headers.response_code;

  if (handlers[responseCode]) {
    return handlers[responseCode](headers);
  }

  return false;
}

export function isSystemError(_responseCode) {
  const responseCode = parseInt(_responseCode, 10);
  return responseCode && (responseCode < 1000 || responseCode === 9999);
}
