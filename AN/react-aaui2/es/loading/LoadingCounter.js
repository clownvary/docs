import _classCallCheck from "babel-runtime/helpers/classCallCheck";

var LoadingCounter = function () {
  function LoadingCounter() {
    _classCallCheck(this, LoadingCounter);

    this.count = 0;
  }

  LoadingCounter.prototype.add = function add() {
    this.count += 1;
  };

  LoadingCounter.prototype.dec = function dec() {
    this.count -= 1;
  };

  LoadingCounter.prototype.isEmpty = function isEmpty() {
    return this.count <= 0;
  };

  LoadingCounter.prototype.clear = function clear() {
    this.count = 0;
  };

  return LoadingCounter;
}();

export default LoadingCounter;