import injectL10n from '../shared/injectL10n';

import FormComponent, { createForm } from './Form';
import connectForm from './connectForm';
import FormError from './FormError'; // eslint-disable-line import/no-named-as-default

import Field from './Field';
import HField from './HField';
import VField from './VField';
import FlexField from './FlexField';

import TextInput from './TextInput';
import PasswordTextInput from './PasswordTextInput';
import TextArea from './TextArea';
import EmailInput from './EmailInput';
import UrlInput from './UrlInput';
import PhoneInput from './PhoneInput';
import PhoneInputWithExtension from './PhoneInputWithExtension';
import NumericInput from './NumericInput';
import Combobox from './Combobox';
import Select from './Select';
import NestedForm from './NestedForm';
import FormRadioGroup from './RadioGroup';
import FormCheckboxGroup from './CheckboxGroup';
import AddressEditor from './AddressEditor';
import AddressStatic from './AddressStatic';
import PostalCodeInput from './PostalCodeInput';
import TimeInput from './TimeInput';
import DoB from './DoB';
import DateInput from './DateInput';
import DateRangeInput from './DateRangeInput';

var Form = injectL10n()(FormComponent);

Form.createForm = createForm;

// Form fields
Form.Field = Field;
Form.HField = HField;
Form.VField = VField;
Form.FlexField = FlexField;
Form.Error = FormError;

// Form components
Form.connectForm = connectForm;
Form.TextInput = TextInput;
Form.PasswordTextInput = PasswordTextInput;
Form.TextArea = TextArea;
Form.EmailInput = EmailInput;
Form.UrlInput = UrlInput;
Form.PhoneInput = PhoneInput;
Form.PhoneInputWithExtension = PhoneInputWithExtension;
Form.NumericInput = NumericInput;
Form.Combobox = Combobox;
Form.Select = Select;
Form.NestedForm = NestedForm;
Form.RadioGroup = FormRadioGroup;
Form.CheckboxGroup = FormCheckboxGroup;
Form.AddressEditor = AddressEditor;
Form.AddressStatic = AddressStatic;
Form.PostalCodeInput = PostalCodeInput;
Form.TimeInput = TimeInput;
Form.DoB = DoB;
Form.DateInput = DateInput;
Form.DateRangeInput = DateRangeInput;

export default Form;