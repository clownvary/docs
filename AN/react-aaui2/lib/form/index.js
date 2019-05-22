'use strict';

exports.__esModule = true;

var _injectL10n = require('../shared/injectL10n');

var _injectL10n2 = _interopRequireDefault(_injectL10n);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _connectForm = require('./connectForm');

var _connectForm2 = _interopRequireDefault(_connectForm);

var _FormError = require('./FormError');

var _FormError2 = _interopRequireDefault(_FormError);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _HField = require('./HField');

var _HField2 = _interopRequireDefault(_HField);

var _VField = require('./VField');

var _VField2 = _interopRequireDefault(_VField);

var _FlexField = require('./FlexField');

var _FlexField2 = _interopRequireDefault(_FlexField);

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _PasswordTextInput = require('./PasswordTextInput');

var _PasswordTextInput2 = _interopRequireDefault(_PasswordTextInput);

var _TextArea = require('./TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _EmailInput = require('./EmailInput');

var _EmailInput2 = _interopRequireDefault(_EmailInput);

var _UrlInput = require('./UrlInput');

var _UrlInput2 = _interopRequireDefault(_UrlInput);

var _PhoneInput = require('./PhoneInput');

var _PhoneInput2 = _interopRequireDefault(_PhoneInput);

var _PhoneInputWithExtension = require('./PhoneInputWithExtension');

var _PhoneInputWithExtension2 = _interopRequireDefault(_PhoneInputWithExtension);

var _NumericInput = require('./NumericInput');

var _NumericInput2 = _interopRequireDefault(_NumericInput);

var _Combobox = require('./Combobox');

var _Combobox2 = _interopRequireDefault(_Combobox);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _NestedForm = require('./NestedForm');

var _NestedForm2 = _interopRequireDefault(_NestedForm);

var _RadioGroup = require('./RadioGroup');

var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

var _CheckboxGroup = require('./CheckboxGroup');

var _CheckboxGroup2 = _interopRequireDefault(_CheckboxGroup);

var _AddressEditor = require('./AddressEditor');

var _AddressEditor2 = _interopRequireDefault(_AddressEditor);

var _AddressStatic = require('./AddressStatic');

var _AddressStatic2 = _interopRequireDefault(_AddressStatic);

var _PostalCodeInput = require('./PostalCodeInput');

var _PostalCodeInput2 = _interopRequireDefault(_PostalCodeInput);

var _TimeInput = require('./TimeInput');

var _TimeInput2 = _interopRequireDefault(_TimeInput);

var _DoB = require('./DoB');

var _DoB2 = _interopRequireDefault(_DoB);

var _DateInput = require('./DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _DateRangeInput = require('./DateRangeInput');

var _DateRangeInput2 = _interopRequireDefault(_DateRangeInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line import/no-named-as-default

var Form = (0, _injectL10n2.default)()(_Form2.default);

Form.createForm = _Form.createForm;

// Form fields
Form.Field = _Field2.default;
Form.HField = _HField2.default;
Form.VField = _VField2.default;
Form.FlexField = _FlexField2.default;
Form.Error = _FormError2.default;

// Form components
Form.connectForm = _connectForm2.default;
Form.TextInput = _TextInput2.default;
Form.PasswordTextInput = _PasswordTextInput2.default;
Form.TextArea = _TextArea2.default;
Form.EmailInput = _EmailInput2.default;
Form.UrlInput = _UrlInput2.default;
Form.PhoneInput = _PhoneInput2.default;
Form.PhoneInputWithExtension = _PhoneInputWithExtension2.default;
Form.NumericInput = _NumericInput2.default;
Form.Combobox = _Combobox2.default;
Form.Select = _Select2.default;
Form.NestedForm = _NestedForm2.default;
Form.RadioGroup = _RadioGroup2.default;
Form.CheckboxGroup = _CheckboxGroup2.default;
Form.AddressEditor = _AddressEditor2.default;
Form.AddressStatic = _AddressStatic2.default;
Form.PostalCodeInput = _PostalCodeInput2.default;
Form.TimeInput = _TimeInput2.default;
Form.DoB = _DoB2.default;
Form.DateInput = _DateInput2.default;
Form.DateRangeInput = _DateRangeInput2.default;

exports.default = Form;
module.exports = exports['default'];