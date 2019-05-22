'use strict';

exports.__esModule = true;

var _Tabs = require('./Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _TabsHeader = require('./TabsHeader');

var _TabsHeader2 = _interopRequireDefault(_TabsHeader);

var _TabsTitle = require('./TabsTitle');

var _TabsTitle2 = _interopRequireDefault(_TabsTitle);

var _TabsContainer = require('./TabsContainer');

var _TabsContainer2 = _interopRequireDefault(_TabsContainer);

var _getContext = require('../shared/getContext');

var _getContext2 = _interopRequireDefault(_getContext);

var _types = require('../shared/types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var childContextTypes = {
  auiTabsAPI: _types.tabsAPIShape
};

_Tabs2.default.Header = _TabsHeader2.default;
_Tabs2.default.Title = (0, _getContext2.default)(childContextTypes)(_TabsTitle2.default);
_Tabs2.default.Container = (0, _getContext2.default)(childContextTypes)(_TabsContainer2.default);

exports.default = _Tabs2.default;
module.exports = exports['default'];