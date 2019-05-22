
const buildErrorMessage = (error, fieldName = '', param = '') => {
  let errMsg = error.replace(/{name}/g, fieldName);
  errMsg = errMsg.replace(/{param}/g, param);

  return errMsg;
};


export {
  buildErrorMessage
};

export default buildErrorMessage;
