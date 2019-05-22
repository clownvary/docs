"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = function (initialState, handlers) {return function () {var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;var action = arguments[1];
    var type = action.type;

    if (!handlers[type]) {
      return state;
    }

    return handlers[type](state, action);
  };};module.exports = exports['default'];