'use strict';Object.defineProperty(exports, "__esModule", { value: true }); /**
                                                                             * Copy from react-aaui
                                                                             * Tag function for class template strings.
                                                                             */exports.default =
function (template) {for (var _len = arguments.length, expressions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {expressions[_key - 1] = arguments[_key];}return (
    template.
    reduce(function (accumulator, part, i) {return accumulator + expressions[i - 1] + part;}).
    replace(/\s+/g, ' ').
    trim());};module.exports = exports['default'];