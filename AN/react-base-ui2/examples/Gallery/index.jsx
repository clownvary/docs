
import Button from './Button';
import MessagePage from './Message';
import GlobalizePage from './Globalize';
import Calenar from './Calendar';
import DatePickerPage from './DatePicker';
import CollapsePanel from './CollapsePanel';
import InputNumeric from './InputNumeric';
import InputDate from './InputDate';
import InputTime from './InputTime';
import InputMoment from './InputMoment';
import Breadcrumb from './Breadcrumb';
import AsyncContent from './AsyncContent';
import Responsive from './Responsive';
import ColumnList from './ColumnList';
import List from './List';
import ErrorHandler from './Error';
import Tooltip from './Tooltip';
import ComboBox from './ComboBox';
import Table from './Table';
import InputBankCard from './InputBankCard';
import Confirmation from './Confirmation';
import Survey from './Survey';
import LoadingBar from './LoadingBar';
import Loading from './Loading';
import Radio from './Radio';
import Checkbox from './Checkbox';
import AAUIDropdown from './AAUIDropdown';
import Dropdown from './Dropdown';
import Phone from './Phone';
import Formatter from './Formatter';
import Validation from './Validation';
import Duration from './Duration';
import Input from './Input';
import Progress from './Progress';
import Label from './Label';
import APICache from './APICache';
import PropertyList from './PropertyList';
import FileUpload from './FileUpload';
import TextArea from './TextArea';
import FileGallery from './FileGallery';
import Modal from './Modal';
import DataSource from './DataSource';
import PopupMenu from './PopupMenu';
import DialogBox from './DialogBox';
import InputTimeRange from './InputTimeRange';
import ButtonBar from './ButtonBar';
import Tabs from './Tabs';
import Scroller from './Scroller';
import SVG from './SVG';
import ResourceCalendar from './ResourceCalendar';
import Navigation from './Navigation';
import PCIIframe from './PCIIframe';
import Collapse from './Collapse';
import Steps from './Steps';
import SessionCalendar from './SessionCalendar';
import Select from './Select';
import Tag from './Tag';
import WebsocketPage from './Websocket';
import BackTop from './BackTop';

const indexing = [];
let id = 0;
const append = (pageClass, group = 'UI Components') => {
  const {
    meta: { name = `Demo ${id}`,
    icon = 'icon-star',
    align = '',
    description = '',
    help = '',
    documents = []
    } } = pageClass;

  indexing.push({
    id,
    group,
    pageClass,
    name,
    text: name,
    description,
    help,
    documents,
    icon,
    align
  });
  id += 1;
};

// const appendInput = (pageClass) => { append(pageClass, 'Inputs'); };
const appendService = (pageClass) => { append(pageClass, 'Services'); };

append(Button);
append(ButtonBar);
append(Label);
append(Checkbox);
append(LoadingBar);
append(Progress);
append(Breadcrumb);
append(PropertyList);
append(CollapsePanel);
append(DialogBox);
append(Collapse);
append(Steps);

append(Calenar);
append(DatePickerPage);
append(InputNumeric);
append(InputDate);
append(InputTime);
append(InputTimeRange);
append(InputMoment);
append(AsyncContent);
append(ColumnList);
append(List);
append(ComboBox);
append(Table);
append(InputBankCard);
append(Survey);
append(Radio);
append(AAUIDropdown);
append(Dropdown);
append(Phone);
append(Duration);
append(Input);
append(FileUpload);
append(TextArea);
append(FileGallery);
append(Modal);
append(DataSource);
append(Tabs);
append(Scroller);
append(SVG);
append(ResourceCalendar);
append(PCIIframe);
append(SessionCalendar);
append(Select);
append(Tag);
append(BackTop);
appendService(Loading);
appendService(Formatter);
appendService(MessagePage);
appendService(ErrorHandler);
appendService(GlobalizePage);
appendService(Responsive);
appendService(Tooltip);
appendService(Confirmation);
appendService(Validation);
appendService(APICache);
appendService(PopupMenu);
appendService(Navigation);
appendService(WebsocketPage);

export default indexing;
