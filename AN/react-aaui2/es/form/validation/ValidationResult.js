import _classCallCheck from 'babel-runtime/helpers/classCallCheck';

var ValidationResult = function ValidationResult(name) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var errMsg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  _classCallCheck(this, ValidationResult);

  if (!name) {
    throw new Error('Name should not be empty!');
  }

  this.name = name;
  this.value = value;
  this.errMsg = errMsg;
};

export default ValidationResult;