## Modules

<dl>
<dt><a href="#module_Tooltip">Tooltip</a></dt>
<dd><p>The module that defines create tooltip component.</p>
<p>To be used user&#39;s selectors.</p>
<p>Use popup service to open/close tooltip.</p>
</dd>
<dt><a href="#module_Globalize">Globalize</a></dt>
<dd><p>Globalize is a singletone service that provide
current culture information and globalization capability.</p>
<p>To use Globalize, import it from react-base-ui</p>
</dd>
<dt><a href="#module_Messages">Messages</a></dt>
<dd><p>The module that defines static methods to show or
hide informations on Message Board.</p>
</dd>
<dt><a href="#module_PopupService">PopupService</a></dt>
<dd><p>The module that defines static methods that can be used to create
popup service.</p>
<p>Popup service is a type of UI service that helps managing the popup behaviors
of other UI assistants that need to popup and hide, for example dropdown list,
tooltip, calendar etc.</p>
<p>Popup service can position the popped up content to proper place according to
the Dock setting and the real available space.</p>
</dd>
<dt><a href="#module_WebSocketService">WebSocketService</a></dt>
<dd><p>WebSocketService is a singletone service that provide
create/manage websocket instance</p>
<p>To use WebSocketService, import it from react-base-ui</p>
</dd>
<dt><a href="#module_CaretUtils">CaretUtils</a></dt>
<dd><p>Utility functions to set or get text selection and caret position of Input element.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#ClientSource">ClientSource</a> ⇐ <code><a href="#DataSource">DataSource</a></code></dt>
<dd><p>ClientSource
A class that represents a list of data.</p>
</dd>
<dt><a href="#DataSource">DataSource</a></dt>
<dd><p>DataSource
A class that represents a list of data.</p>
</dd>
<dt><a href="#Page">Page</a></dt>
<dd><p>Page
A class that represents a list of data by page as the unit.</p>
</dd>
<dt><a href="#ServerSource">ServerSource</a> ⇐ <code><a href="#DataSource">DataSource</a></code></dt>
<dd><p>ServerSource
A class that can send a api to server to get data list.</p>
</dd>
<dt><a href="#ErrorObj">ErrorObj</a></dt>
<dd><p>Class that represents an error, with consistent structure that will be used across the framework.</p>
</dd>
<dt><a href="#Message">Message</a></dt>
<dd><p>A class that represents a group of messages.</p>
</dd>
<dt><a href="#AsyncContent">AsyncContent</a></dt>
<dd><p>AsyncContent is an UI component that can display content in waiting and show manner.</p>
</dd>
<dt><a href="#Breadcrumb">Breadcrumb</a></dt>
<dd><p>UI component that displays path in Breadcrumb.</p>
</dd>
<dt><a href="#Button">Button</a></dt>
<dd><p>UI component that displays Button with variant settings.</p>
</dd>
<dt><a href="#ButtonBar">ButtonBar</a></dt>
<dd><p>UI component that displays ButtonBar with variant settings.</p>
</dd>
<dt><a href="#Calendar">Calendar</a></dt>
<dd><p>Calendar Component with three view mode: Date View, Month View and Year View.</p>
</dd>
<dt><a href="#Checkbox">Checkbox</a></dt>
<dd><p>UI component of Checkbox</p>
</dd>
<dt><a href="#CheckboxGroup">CheckboxGroup</a></dt>
<dd><p>UI component that displays a group of Checkbox.</p>
</dd>
<dt><a href="#CollapsePanel">CollapsePanel</a></dt>
<dd><p>UI component of CollapsePanel</p>
</dd>
<dt><a href="#ColumnList">ColumnList</a></dt>
<dd><p>ColumnList component provide a full sortable, filterable, pagable and cachable list</p>
</dd>
<dt><a href="#ComboBox">ComboBox</a></dt>
<dd><p>ComboBox Component</p>
</dd>
<dt><a href="#DatePicker">DatePicker</a></dt>
<dd><p>UI component that displays DatePicker with variant settings.</p>
</dd>
<dt><a href="#ContentView">ContentView</a></dt>
<dd><p>UI component that displays DialogBox with variant settings</p>
</dd>
<dt><a href="#DialogBox">DialogBox</a></dt>
<dd><p>UI component that displays DialogBox with variant settings.</p>
</dd>
<dt><a href="#Dropdown">Dropdown</a></dt>
<dd><p>UI component that displays Dropdown with variant settings.</p>
</dd>
<dt><a href="#Dropdown">Dropdown</a></dt>
<dd><p>UI component that displays Dropdown with variant settings.</p>
</dd>
<dt><a href="#Item">Item</a></dt>
<dd><p>UI component that displays Dropdown Item with variant settings.</p>
</dd>
<dt><a href="#Duration">Duration</a></dt>
<dd><p>UI component of Duration.</p>
</dd>
<dt><a href="#Input">Input</a></dt>
<dd><p>UI component of Input</p>
</dd>
<dt><a href="#InputBase">InputBase</a></dt>
<dd><p>Base class for all Input components</p>
</dd>
<dt><a href="#InputDate">InputDate</a></dt>
<dd><p>UI component of InputDate.</p>
</dd>
<dt><a href="#InputMask">InputMask</a></dt>
<dd></dd>
<dt><a href="#InputMoment">InputMoment</a></dt>
<dd><p>InputMoment component allows you validate and enter manually date and time.</p>
</dd>
<dt><a href="#InputNumeric">InputNumeric</a></dt>
<dd><p>InputNumeric component allows you to input numeric values only.</p>
<p>InputNumeric has 3 types of style: they are: &#39;number&#39;, &#39;currency&#39; and &#39;percent&#39;.</p>
<p>This can be determined by changing the type prop.</p>
</dd>
<dt><a href="#InputTime">InputTime</a></dt>
<dd><p>InputTime Component</p>
</dd>
<dt><a href="#InputTimeRange">InputTimeRange</a></dt>
<dd><p>UI component that displays InputTimeRange with variant settings.</p>
</dd>
<dt><a href="#TimeRange">TimeRange</a></dt>
<dd><p>UI component that displays TimeRange with variant settings.</p>
</dd>
<dt><a href="#Label">Label</a></dt>
<dd><p>UI component that displays Label with variant settings.</p>
</dd>
<dt><a href="#List">List</a></dt>
<dd><p>List Component provide a full list.</p>
</dd>
<dt><a href="#LoadingBar">LoadingBar</a></dt>
<dd><p>UI Component that displays loading or waiting status.</p>
</dd>
<dt><a href="#Phone">Phone</a></dt>
<dd><p>UI component of Phone Number.</p>
</dd>
<dt><a href="#Progress">Progress</a></dt>
<dd><p>UI component that displays Progress with variant settings.</p>
</dd>
<dt><a href="#Radio">Radio</a></dt>
<dd><p>UI component of Radio</p>
</dd>
<dt><a href="#RadioGroup">RadioGroup</a></dt>
<dd><p>UI component that displays a group of Radio.</p>
</dd>
<dt><a href="#Table">Table</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#PropertyList">PropertyList</a></dt>
<dd><p>PropertyList</p>
</dd>
<dt><a href="#data-qa-id">data-qa-id</a> : <code>String</code></dt>
<dd><p>defined the unique id for usage of automation test</p>
</dd>
<dt><a href="#text">text</a></dt>
<dd><p>The display text of answer option.</p>
</dd>
<dt><a href="#value">value</a></dt>
<dd><p>The value of answer option.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#AsyncContentProps">AsyncContentProps</a></dt>
<dd><p>Default Props for AsyncContent</p>
</dd>
<dt><a href="#BreadcrumbPropTypes">BreadcrumbPropTypes</a></dt>
<dd><p>Default PropTypes for Breadcrumb</p>
</dd>
<dt><a href="#ButtonPropTypes">ButtonPropTypes</a></dt>
<dd><p>Default PropTypes of Button.</p>
</dd>
<dt><a href="#ButtonProps">ButtonProps</a></dt>
<dd><p>Default Props for Buttons</p>
</dd>
<dt><a href="#ButtonBarPropTypes">ButtonBarPropTypes</a></dt>
<dd><p>Default PropTypes of ButtonBar.</p>
</dd>
<dt><a href="#ButtonBarProps">ButtonBarProps</a></dt>
<dd><p>Default Props for ButtonBar</p>
</dd>
<dt><a href="#CalendarProps">CalendarProps</a></dt>
<dd><p>Default Props for Calendar</p>
</dd>
<dt><a href="#CheckboxPropTypes">CheckboxPropTypes</a></dt>
<dd><p>Default PropTypes of Checkbox.</p>
</dd>
<dt><a href="#collapsePropTypes">collapsePropTypes</a></dt>
<dd><p>Default PropTypes for Collapse</p>
</dd>
<dt><a href="#propTypes">propTypes</a></dt>
<dd><p>Default PropTypes for Panel</p>
</dd>
<dt><a href="#ColumnListProps">ColumnListProps</a></dt>
<dd><p>Default Props for List</p>
</dd>
<dt><a href="#ComboBoxProps">ComboBoxProps</a></dt>
<dd><p>Default Props of ComboBox</p>
</dd>
<dt><a href="#DatePickerPropTypes">DatePickerPropTypes</a></dt>
<dd><p>Default PropTypes of DatePicker.</p>
</dd>
<dt><a href="#ContentViewPropTypes">ContentViewPropTypes</a></dt>
<dd><p>Default PropTypes of DialogBox</p>
</dd>
<dt><a href="#ContentViewDefaultProps">ContentViewDefaultProps</a></dt>
<dd><p>Default Props for ContentView</p>
</dd>
<dt><a href="#DialogBoxPropTypes">DialogBoxPropTypes</a></dt>
<dd><p>Default PropTypes of DialogBox.</p>
</dd>
<dt><a href="#DialogBoxDefaultProps">DialogBoxDefaultProps</a></dt>
<dd><p>Default Props for DialogBox.</p>
</dd>
<dt><a href="#DropdownPropTypes">DropdownPropTypes</a></dt>
<dd><p>Default PropTypes of Dropdown.</p>
</dd>
<dt><a href="#DropdownProps">DropdownProps</a></dt>
<dd><p>Default Props for Dropdown</p>
</dd>
<dt><a href="#DropdownPropTypes">DropdownPropTypes</a></dt>
<dd><p>Default PropTypes of Dropdown.</p>
</dd>
<dt><a href="#DropdownProps">DropdownProps</a></dt>
<dd><p>Default Props for Dropdown</p>
</dd>
<dt><a href="#ItemPropTypes">ItemPropTypes</a></dt>
<dd><p>Default PropTypes of Dropdown item.</p>
</dd>
<dt><a href="#ItemProps">ItemProps</a></dt>
<dd><p>Default Props for Dropdown</p>
</dd>
<dt><a href="#DurationPropTypes">DurationPropTypes</a></dt>
<dd><p>Default PropTypes of Duration.</p>
</dd>
<dt><a href="#propTypes">propTypes</a></dt>
<dd><p>Default PropTypes for FileGallery</p>
</dd>
<dt><a href="#FileUploadPropTypes">FileUploadPropTypes</a></dt>
<dd><p>Default PropTypes for FileUpload</p>
</dd>
<dt><a href="#InputProps">InputProps</a></dt>
<dd><p>Default Props for Input</p>
</dd>
<dt><a href="#InputBankCardPropTypes">InputBankCardPropTypes</a></dt>
<dd><p>Default PropTypes for InputBankCard</p>
</dd>
<dt><a href="#InputBaseProps">InputBaseProps</a></dt>
<dd><p>Default Props for InputBase class</p>
</dd>
<dt><a href="#InputDateProps">InputDateProps</a></dt>
<dd><p>Default Props for InputDate</p>
</dd>
<dt><a href="#InputMaskProps">InputMaskProps</a></dt>
<dd><p>Default Props for InputMask</p>
</dd>
<dt><a href="#InputMomentProps">InputMomentProps</a></dt>
<dd><p>Default Props for InputMoment</p>
</dd>
<dt><a href="#InputNumericProps">InputNumericProps</a></dt>
<dd><p>Default Props for InputNumeric class</p>
</dd>
<dt><a href="#InputTimeRangePropTypes">InputTimeRangePropTypes</a></dt>
<dd><p>Default PropTypes of InputTimeRange.</p>
</dd>
<dt><a href="#InputTimeRangeProps">InputTimeRangeProps</a></dt>
<dd><p>Default Props for InputTimeRange</p>
</dd>
<dt><a href="#TimeRangePropTypes">TimeRangePropTypes</a></dt>
<dd><p>Default PropTypes of TimeRange.</p>
</dd>
<dt><a href="#TimeRangeProps">TimeRangeProps</a></dt>
<dd><p>Default Props for TimeRange</p>
</dd>
<dt><a href="#LabelProps">LabelProps</a></dt>
<dd><p>Default Props for Label</p>
</dd>
<dt><a href="#ListProps">ListProps</a></dt>
<dd><p>Default Props for List</p>
</dd>
<dt><a href="#IframeProps">IframeProps</a></dt>
<dd><p>Default Props for Calendar</p>
</dd>
<dt><a href="#ProgressPropTypes">ProgressPropTypes</a></dt>
<dd><p>Default PropTypes of Progress.</p>
</dd>
<dt><a href="#ProgressProps">ProgressProps</a></dt>
<dd><p>Default Props for Progress.</p>
</dd>
<dt><a href="#PropertyList Props">PropertyList Props</a></dt>
<dd><p>Props for PropertyList</p>
</dd>
<dt><a href="#ResourceCalendarPropTypes">ResourceCalendarPropTypes</a></dt>
<dd><p>Default PropTypes of ResourceCalendar.</p>
</dd>
<dt><a href="#ResourceCalendarProps">ResourceCalendarProps</a></dt>
<dd><p>Default Props for ResourceCalendar</p>
</dd>
<dt><a href="#ScrollerPropTypes">ScrollerPropTypes</a></dt>
<dd><p>Default PropTypes of Scroller.</p>
</dd>
<dt><a href="#ScrollerProps">ScrollerProps</a></dt>
<dd><p>Default Props for Scroller</p>
</dd>
<dt><a href="#ScrollerPanePropTypes">ScrollerPanePropTypes</a></dt>
<dd><p>Default PropTypes of ScrollerPane.</p>
</dd>
<dt><a href="#ScrollerPaneProps">ScrollerPaneProps</a></dt>
<dd><p>Default Props for ScrollerPane</p>
</dd>
<dt><a href="#HORIZONTAL">HORIZONTAL</a></dt>
<dd><p>Horizontal layout as default which is used in AUI now.</p>
</dd>
<dt><a href="#VERTICAL">VERTICAL</a></dt>
<dd><p>Vertical layout is used in CUI.</p>
</dd>
<dt><a href="#INPUT">INPUT</a></dt>
<dd><p>free input</p>
</dd>
<dt><a href="#RADIO">RADIO</a></dt>
<dd><p>single selection shown as radio</p>
</dd>
<dt><a href="#SINGLEDROPDOWN">SINGLEDROPDOWN</a></dt>
<dd><p>single selection shown as dropdown</p>
</dd>
<dt><a href="#CHECKBOX">CHECKBOX</a></dt>
<dd><p>multiple selection shown as checkbox</p>
</dd>
<dt><a href="#MULTIPLEDROPDOWN">MULTIPLEDROPDOWN</a></dt>
<dd><p>multiple selection shown as dropdown</p>
</dd>
<dt><a href="#defaultTableProps">defaultTableProps</a></dt>
<dd><p>Default Props for Table</p>
</dd>
<dt><a href="#TextAreaPropTypes">TextAreaPropTypes</a></dt>
<dd><p>Default PropTypes for TextArea</p>
</dd>
<dt><a href="#attachResizeEvent">attachResizeEvent</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#cleanMock">cleanMock()</a></dt>
<dd><p>Explicily clean up the API hooks</p>
</dd>
<dt><a href="#mockAPI">mockAPI()</a></dt>
<dd><p>Mock up a batch of API calls</p>
</dd>
<dt><a href="#popup">popup(calendarOptions, popupOptions)</a> ⇒ <code>Promise</code></dt>
<dd><p>Popup a calendar.</p>
</dd>
<dt><a href="#popup">popup(listOptions, popupOptions)</a> ⇒ <code>Promise</code></dt>
<dd><p>Popup a columnlist.</p>
</dd>
<dt><a href="#popup">popup(popupOptions, dialogBoxOptions)</a> ⇒ <code>Promise</code></dt>
<dd><p>Popup a Dialog.</p>
</dd>
<dt><a href="#popup">popup(listOptions, popupOptions)</a> ⇒ <code>Promise</code></dt>
<dd><p>Popup a list.</p>
</dd>
<dt><a href="#Icon">Icon()</a></dt>
<dd><p>UI component to display an icon based on the SVG sprite technology</p>
<p>Usage:</p>
<ol>
<li>Install the &quot;svg-sprite-loader&quot;, more details can be found at
<a href="https://www.npmjs.com/package/svg-sprite-loader">https://www.npmjs.com/package/svg-sprite-loader</a><pre><code class="lang-bash">npm i -S &quot;svg-sprite-loader&quot;
</code></pre>
</li>
<li>Add a webpack rule to let it resolve the svg icons through the &quot;svg-sprite-loader&quot;.<pre><code class="language-javascript">// build/sections/rules/icon.js
{
test: /\.svg$/,
use: [
 {
   loader: &#39;svg-sprite-loader&#39;,
   options: {
     symbolId: &#39;icon-[name]&#39;
   }
 }
]
include: [/\/icons\//]
}
</code></pre>
You may need to exclude your icon paths in the webpack&#39;s font rules because font rules
may also resolve the files with &quot;.svg&quot; suffix.<pre><code class="lang-js">// build/sections/rules/font.js
{
test: /\.(eot|ttf|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
use: [
 {
   loader: &#39;file-loader&#39;,
   options: {
     symbolId: &#39;fonts/[name].[ext]&#39;
   }
 }
]
exclude: [/\/icons\//]
}
</code></pre>
</li>
<li>Put the icon files in the paths follow your webpack&#39;s configuration.<pre><code class="lang-js">MyComponent
├── index.jsx
├── index.less
└── icons
 ├── icon1.svg
 ├── icon2.svg
 └── index.js
</code></pre>
</li>
<li>Add an index file and import the svg icons.<pre><code class="lang-js">// MyComponent/icons/index.js
import &#39;./icon1.svg&#39;;
import &#39;./icon2.svg&#39;;
</code></pre>
</li>
<li>Import the index file of your icon files.<pre><code class="lang-js">// MyComponent/index.jsx
import &#39;./icons&#39;;
</code></pre>
</li>
<li>Render the Icon component with the desired SVG symbol name.<pre><code class="lang-js">// MyComponent/index.jsx
&lt;Icon name=&quot;icon1&quot; /&gt;
&lt;Icon name=&quot;icon2&quot; /&gt;
</code></pre>
There is a &quot;symbolPrefix&quot; prop and it&#39;s default value is &quot;icon&quot;.
If your &quot;svg-sprite-loader&quot; set the &quot;symbolId&quot; in another value,
You should pass a &quot;symbolPrefix&quot; prop to follow the &quot;symbolId&quot; option.
<code>`</code>js
// build/sections/rules/icon.js
// set symbolId pattern as &#39;an-icon-[name]&#39;
{
test: /.svg$/,
use: [
 {
   loader: &#39;svg-sprite-loader&#39;,
   options: {<pre><code> symbolId: &#39;an-icon-[name]&#39;
</code></pre>   }
 }
]
include: [/\/icons\//]
}</li>
</ol>
<p>// MyComponent/index.jsx
// keep the symbolId in the same pattern by &quot;symbolPrefix&quot; prop</p>
<p><Icon symbolPrefix="an-icon" name="icon1" /></p>
<p><Icon symbolPrefix="an-icon" name="icon2" />
<code>`</code></p>
</dd>
<dt><a href="#SVG">SVG()</a></dt>
<dd><p>UI component to display an SVG image based on the SVG sprite technology</p>
<p>Usage:</p>
<ol>
<li>Install the &quot;svg-sprite-loader&quot;, more details can be found at
<a href="https://www.npmjs.com/package/svg-sprite-loader">https://www.npmjs.com/package/svg-sprite-loader</a><pre><code class="lang-bash">npm i -S &quot;svg-sprite-loader&quot;
</code></pre>
</li>
<li>Add a webpack rule to let it resolve the svg images through the &quot;svg-sprite-loader&quot;.<pre><code class="language-javascript">// build/sections/rules/svg.js
{
test: /\.svg$/,
use: [
 {
   loader: &#39;svg-sprite-loader&#39;,
   options: {
     symbolId: &#39;svg-[name]&#39;
   }
 }
]
include: [/\/svgs\//]
}
</code></pre>
You may need to exclude your svg paths in the webpack&#39;s font rules because font rules
may also resolve the files with &quot;.svg&quot; suffix.<pre><code class="lang-js">// build/sections/rules/font.js
{
test: /\.(eot|ttf|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
use: [
 {
   loader: &#39;file-loader&#39;,
   options: {
     symbolId: &#39;fonts/[name].[ext]&#39;
   }
 }
]
exclude: [/\/svgs\//]
}
</code></pre>
</li>
<li>Put the svg images in the paths follow your webpack&#39;s configuration.<pre><code class="lang-js">MyComponent
├── index.jsx
├── index.less
└── svgs
 ├── a.svg
 ├── b.svg
 └── index.js
</code></pre>
</li>
<li>Add an index file and import the svg images.<pre><code class="lang-js">// MyComponent/svgs/index.js
import &#39;./a.svg&#39;;
import &#39;./b.svg&#39;;
</code></pre>
</li>
<li>Import the index file of your svg images.<pre><code class="lang-js">// MyComponent/index.jsx
import &#39;./svgs&#39;;
</code></pre>
</li>
<li>Render the SVG component with the desired SVG symbol name.<pre><code class="lang-js">// MyComponent/index.jsx
&lt;SVG name=&quot;a&quot; /&gt;
&lt;SVG name=&quot;a&quot; /&gt;
</code></pre>
There is a &quot;symbolPrefix&quot; prop and it&#39;s default value is &quot;svg&quot;.
If your &quot;svg-sprite-loader&quot; set the &quot;symbolId&quot; in another value,
You should pass a &quot;symbolPrefix&quot; prop to follow the &quot;symbolId&quot; option.
<code>`</code>js
// build/sections/rules/svg.js
// set symbolId pattern as &#39;an-svg-[name]&#39;
{
test: /.svg$/,
use: [
 {
   loader: &#39;svg-sprite-loader&#39;,
   options: {<pre><code> symbolId: &#39;an-svg-[name]&#39;
</code></pre>   }
 }
]
include: [/\/svgs\//]
}</li>
</ol>
<p>// MyComponent/index.jsx
// keep the symbolId in the same pattern by &quot;symbolPrefix&quot; prop</p>
<p><SVG name="a" /></p>
<p><SVG name="b" />
<code>`</code></p>
</dd>
<dt><a href="#attachPopupMenu">attachPopupMenu(target, items, id, onSelected)</a></dt>
<dd><p>Add a simple PopupMenu to a dom element</p>
</dd>
<dt><a href="#clearPopupMenu">clearPopupMenu(target)</a></dt>
<dd><p>Remove PopUpMenu from a dom element</p>
</dd>
<dt><a href="#popupMenu">popupMenu()</a></dt>
<dd><p>Popup a menu immediately, you don&#39;t need to use this method in most time,
just using attachPopupMenu method.</p>
<p>All params are same with attachPopupMenu method,@see <a href="#attachPopupMenu">attachPopupMenu</a></p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#RowData">RowData</a> : <code>Object</code></dt>
<dd><p>Collection of structured data to render.</p>
</dd>
<dt><a href="#ColumnDef">ColumnDef</a> : <code><a href="#ColumnDef">Array.&lt;ColumnDef&gt;</a></code></dt>
<dd><p>Data rendering descriptions.</p>
</dd>
</dl>

## Interfaces

<dl>
<dt><a href="#IDataSource">IDataSource</a></dt>
<dd></dd>
<dt><a href="#IPopupHOC">IPopupHOC</a></dt>
<dd></dd>
</dl>

<a name="module_Tooltip"></a>

## Tooltip
The module that defines create tooltip component.

To be used user's selectors.

Use popup service to open/close tooltip.


* [Tooltip](#module_Tooltip)
    * [~TooltipOptions](#module_Tooltip..TooltipOptions)
        * [.className](#module_Tooltip..TooltipOptions.className)
        * [.content](#module_Tooltip..TooltipOptions.content)
        * [.dockStyle](#module_Tooltip..TooltipOptions.dockStyle)
        * [.distance](#module_Tooltip..TooltipOptions.distance)
        * [.showShadow](#module_Tooltip..TooltipOptions.showShadow)
        * [.selector](#module_Tooltip..TooltipOptions.selector)
        * [.trackMouse](#module_Tooltip..TooltipOptions.trackMouse)
        * [.trigger](#module_Tooltip..TooltipOptions.trigger)
        * [.theme](#module_Tooltip..TooltipOptions.theme)
        * [.effect](#module_Tooltip..TooltipOptions.effect)
        * [.onCreate](#module_Tooltip..TooltipOptions.onCreate)
        * [.onOpen](#module_Tooltip..TooltipOptions.onOpen)
        * [.onClose](#module_Tooltip..TooltipOptions.onClose)
    * [~TooltipAttrKey](#module_Tooltip..TooltipAttrKey)
    * [~build(selectors, container)](#module_Tooltip..build)
    * [~clean(container)](#module_Tooltip..clean)
    * [~option(options)](#module_Tooltip..option) ⇒ <code>Object</code>
    * [~open(target, options)](#module_Tooltip..open) ⇒ <code>Object</code>
    * [~close()](#module_Tooltip..close)

<a name="module_Tooltip..TooltipOptions"></a>

### Tooltip~TooltipOptions
Optional settings for the tooltip.

**Kind**: inner property of [<code>Tooltip</code>](#module_Tooltip)  

* [~TooltipOptions](#module_Tooltip..TooltipOptions)
    * [.className](#module_Tooltip..TooltipOptions.className)
    * [.content](#module_Tooltip..TooltipOptions.content)
    * [.dockStyle](#module_Tooltip..TooltipOptions.dockStyle)
    * [.distance](#module_Tooltip..TooltipOptions.distance)
    * [.showShadow](#module_Tooltip..TooltipOptions.showShadow)
    * [.selector](#module_Tooltip..TooltipOptions.selector)
    * [.trackMouse](#module_Tooltip..TooltipOptions.trackMouse)
    * [.trigger](#module_Tooltip..TooltipOptions.trigger)
    * [.theme](#module_Tooltip..TooltipOptions.theme)
    * [.effect](#module_Tooltip..TooltipOptions.effect)
    * [.onCreate](#module_Tooltip..TooltipOptions.onCreate)
    * [.onOpen](#module_Tooltip..TooltipOptions.onOpen)
    * [.onClose](#module_Tooltip..TooltipOptions.onClose)

<a name="module_Tooltip..TooltipOptions.className"></a>

#### TooltipOptions.className
Custom CSS class to be added to the tooltip’s outer DOM.
Default value is "".

**Kind**: static property of [<code>TooltipOptions</code>](#module_Tooltip..TooltipOptions)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [className] | <code>String</code> | <code>&quot;&quot;</code> | 

<a name="module_Tooltip..TooltipOptions.content"></a>

#### TooltipOptions.content
The content of the tooltip.
Default value is "".

**Kind**: static property of [<code>TooltipOptions</code>](#module_Tooltip..TooltipOptions)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Fuction: |  |  | callback which can return the content directly, or a Promise that returns the content. |
| String: |  |  | HTML string for tooltip content. |
| Element: |  |  | A DOM element to use for the tooltip content. |
| Component: |  |  | A React UI component. |
| Object: |  |  | A async content. |
| [content] | <code>function</code> \| <code>Node</code> \| <code>Object</code> | <code>&quot;&quot;</code> |  |

<a name="module_Tooltip..TooltipOptions.dockStyle"></a>

#### TooltipOptions.dockStyle
Determines the position of the tooltip relative to the associated target element.
The value is one of the const defined in Dock
Default value is Dock.BOTTOM_LEFT.

**Kind**: static property of [<code>TooltipOptions</code>](#module_Tooltip..TooltipOptions)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [dockStyle] | [<code>Dock</code>](#Dock) | * @see Dock |

<a name="module_Tooltip..TooltipOptions.distance"></a>

#### TooltipOptions.distance
Offset in pixel between the tooltip and the target element.
Default value is 0.

**Kind**: static property of [<code>TooltipOptions</code>](#module_Tooltip..TooltipOptions)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [distance] | <code>Number</code> \| <code>string</code> | <code>0</code> | 

<a name="module_Tooltip..TooltipOptions.showShadow"></a>

#### TooltipOptions.showShadow
Determines whether show shadow.
Default value is false.

**Kind**: static property of [<code>TooltipOptions</code>](#module_Tooltip..TooltipOptions)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [showShadoe] | <code>Boolean</code> | <code>false</code> | 

<a name="module_Tooltip..TooltipOptions.selector"></a>

#### TooltipOptions.selector
A CSS selector that determines which items should have tooltips
Default is "[data-tooltip]",
which means these doms which have *data-tooltip* attribute will be used.

**Kind**: static property of [<code>TooltipOptions</code>](#module_Tooltip..TooltipOptions)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [selector] | <code>String</code> | <code>&quot;[data-tooltip]&quot;</code> | 

<a name="module_Tooltip..TooltipOptions.trackMouse"></a>

#### TooltipOptions.trackMouse
Determines whether the tooltip will track the mouse’ position.
Default is false, don't need to track mouse.

**Kind**: static property of [<code>TooltipOptions</code>](#module_Tooltip..TooltipOptions)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [trackMouse] | <code>Boolean</code> | <code>false</code> | Not implemented(July 28, 2017) |

<a name="module_Tooltip..TooltipOptions.trigger"></a>

#### TooltipOptions.trigger
Determines the trigger method when popping up the tooltip.
Values can be "HOVER", "CLICK" or "FOCUS".
Default is "HOVER".

**Kind**: static property of [<code>TooltipOptions</code>](#module_Tooltip..TooltipOptions)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [trigger] | <code>String</code> | <code>&quot;HOVER&quot;</code> | 

<a name="module_Tooltip..TooltipOptions.theme"></a>

#### TooltipOptions.theme
Determines the color them of the tooltip.
Values can be "DARK", "LIGHT", "SUCCESS", "WARNING", "ERROR", "INFO"

**Kind**: static property of [<code>TooltipOptions</code>](#module_Tooltip..TooltipOptions)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [theme] | <code>String</code> | <code>&quot;LIGHT&quot;</code> | Only implemented "DARK" and "LIGHT" (July 28, 2017) |

<a name="module_Tooltip..TooltipOptions.effect"></a>

#### TooltipOptions.effect
Determines the animation effect.
Values can be "NONE", "FADE", "SLIDE", "ZOOM"

**Kind**: static property of [<code>TooltipOptions</code>](#module_Tooltip..TooltipOptions)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [theme] | <code>String</code> | <code>&quot;NONE&quot;</code> | 

<a name="module_Tooltip..TooltipOptions.onCreate"></a>

#### TooltipOptions.onCreate
Fired when the tooltip is created. Used for customizing the tooltip instance.

**Kind**: static property of [<code>TooltipOptions</code>](#module_Tooltip..TooltipOptions)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [onCreate] | <code>function</code> | Not implemented(July 28, 2017) |

<a name="module_Tooltip..TooltipOptions.onOpen"></a>

#### TooltipOptions.onOpen
Fired after the tooltip is open.

**Kind**: static property of [<code>TooltipOptions</code>](#module_Tooltip..TooltipOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [onOpen] | <code>function</code> | 

<a name="module_Tooltip..TooltipOptions.onClose"></a>

#### TooltipOptions.onClose
Fired after the tooltip is close.

**Kind**: static property of [<code>TooltipOptions</code>](#module_Tooltip..TooltipOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [onClose] | <code>function</code> | 

<a name="module_Tooltip..TooltipAttrKey"></a>

### Tooltip~TooltipAttrKey
Set an Attribute name of selector to be used for tooltip

**Kind**: inner constant of [<code>Tooltip</code>](#module_Tooltip)  
<a name="module_Tooltip..build"></a>

### Tooltip~build(selectors, container)
Build Tooltip.

**Kind**: inner method of [<code>Tooltip</code>](#module_Tooltip)  

| Param | Type | Description |
| --- | --- | --- |
| selectors | <code>DOMString</code> | DOMString selectors Default is Tooltip attribute, which means the tooltip attribute's elements will be added their own trigger eventListener. If the value is empty string, which means the title attribute's elements will be used their own trigger eventListener. The selectors value can be recognized by document.querySelectorAll(). |
| container | <code>DOM</code> | DOM element Default is document. The value is a DOM element. which means every element in container will to add the tooltip eventListener. when calling the build. |

<a name="module_Tooltip..clean"></a>

### Tooltip~clean(container)
clean Tooltip

**Kind**: inner method of [<code>Tooltip</code>](#module_Tooltip)  

| Param | Type | Description |
| --- | --- | --- |
| container | <code>DOM</code> | DOM element Default is document. The value is a DOM element. which means every element in container will to remove the tooltip eventListener. when calling the clean. |

<a name="module_Tooltip..option"></a>

### Tooltip~option(options) ⇒ <code>Object</code>
Get or set the default options.

**Kind**: inner method of [<code>Tooltip</code>](#module_Tooltip)  
**Returns**: <code>Object</code> - Returns the settings options of Tooltip if no param.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Get or set the settings options of Tooltip when calling the option. |

<a name="module_Tooltip..open"></a>

### Tooltip~open(target, options) ⇒ <code>Object</code>
Open a Tooltip.

**Kind**: inner method of [<code>Tooltip</code>](#module_Tooltip)  
**Returns**: <code>Object</code> - Returns a popup instance.  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>node</code> \| <code>DOMString</code> | Target DOM element or query selector when calling the open. |
| options | <code>object</code> | Configured options of Tooltip when calling the open. |

<a name="module_Tooltip..close"></a>

### Tooltip~close()
close the current tooltip.

**Kind**: inner method of [<code>Tooltip</code>](#module_Tooltip)  
<a name="module_Globalize"></a>

## Globalize
Globalize is a singletone service that provide
current culture information and globalization capability.

To use Globalize, import it from react-base-ui

**Example**  
```js
import { Globalize } from 'react-base-ui/lib/i18'

console.log(Globalize.intl)

Globalize depends on CLDR data to get culture information. So, corresponding CLDR data
need to be added to application.

We will use hookLocaleData to intercept the CLDR data for later use. Something like this:

import { hookLocaleData } from 'react-base-ui/lib/i18'

const runApp = () => {
ReactDOM.render(<App />, document.getElementById('root'));
};


require.ensure([
'intl',
'intl/locale-data/jsonp/en.js',
'intl/locale-data/jsonp/fr.js',
'intl/locale-data/jsonp/zh.js'
], (require) => {
if (!global.Intl) {
  require('intl');
 }

hookLocaleData();
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/fr.js');
require('intl/locale-data/jsonp/zh.js');
runApp();
});
```
<a name="module_Messages"></a>

## Messages
The module that defines static methods to show or
hide informations on Message Board.

<a name="module_PopupService"></a>

## PopupService
The module that defines static methods that can be used to create
popup service.

Popup service is a type of UI service that helps managing the popup behaviors
of other UI assistants that need to popup and hide, for example dropdown list,
tooltip, calendar etc.

Popup service can position the popped up content to proper place according to
the Dock setting and the real available space.


* [PopupService](#module_PopupService)
    * [~IPopupService](#module_PopupService..IPopupService)
    * [~PopupOptions](#module_PopupService..PopupOptions)
        * [.cache](#module_PopupService..PopupOptions.cache)
        * [.showMask](#module_PopupService..PopupOptions.showMask)
        * [.showShadow](#module_PopupService..PopupOptions.showShadow)
        * [.className](#module_PopupService..PopupOptions.className)
        * [.effect](#module_PopupService..PopupOptions.effect)
        * [.noCollision](#module_PopupService..PopupOptions.noCollision)
        * [.stick](#module_PopupService..PopupOptions.stick)
        * [.focus](#module_PopupService..PopupOptions.focus)
        * [.autoClose](#module_PopupService..PopupOptions.autoClose)
        * [.closeByClick](#module_PopupService..PopupOptions.closeByClick)
        * [.closeByEscape](#module_PopupService..PopupOptions.closeByEscape)
        * [.dockStyle](#module_PopupService..PopupOptions.dockStyle)
        * [.crossLine](#module_PopupService..PopupOptions.crossLine)
        * [.disableScroll](#module_PopupService..PopupOptions.disableScroll)
        * [.onBeforeOpen](#module_PopupService..PopupOptions.onBeforeOpen)
        * [.onAfterOpen](#module_PopupService..PopupOptions.onAfterOpen)
        * [.onBeforeClose](#module_PopupService..PopupOptions.onBeforeClose)
        * [.onAfterClose](#module_PopupService..PopupOptions.onAfterClose)
        * [.onBeforeCancel](#module_PopupService..PopupOptions.onBeforeCancel)
        * [.onAfterCancel](#module_PopupService..PopupOptions.onAfterCancel)
        * [.onBeforeChange](#module_PopupService..PopupOptions.onBeforeChange)
        * [.onAfterChange](#module_PopupService..PopupOptions.onAfterChange)

<a name="module_PopupService..IPopupService"></a>

### PopupService~IPopupService
**Kind**: inner interface of [<code>PopupService</code>](#module_PopupService)  
<a name="module_PopupService..PopupOptions"></a>

### PopupService~PopupOptions
Optional settings for the popup behaviors.

**Kind**: inner property of [<code>PopupService</code>](#module_PopupService)  

* [~PopupOptions](#module_PopupService..PopupOptions)
    * [.cache](#module_PopupService..PopupOptions.cache)
    * [.showMask](#module_PopupService..PopupOptions.showMask)
    * [.showShadow](#module_PopupService..PopupOptions.showShadow)
    * [.className](#module_PopupService..PopupOptions.className)
    * [.effect](#module_PopupService..PopupOptions.effect)
    * [.noCollision](#module_PopupService..PopupOptions.noCollision)
    * [.stick](#module_PopupService..PopupOptions.stick)
    * [.focus](#module_PopupService..PopupOptions.focus)
    * [.autoClose](#module_PopupService..PopupOptions.autoClose)
    * [.closeByClick](#module_PopupService..PopupOptions.closeByClick)
    * [.closeByEscape](#module_PopupService..PopupOptions.closeByEscape)
    * [.dockStyle](#module_PopupService..PopupOptions.dockStyle)
    * [.crossLine](#module_PopupService..PopupOptions.crossLine)
    * [.disableScroll](#module_PopupService..PopupOptions.disableScroll)
    * [.onBeforeOpen](#module_PopupService..PopupOptions.onBeforeOpen)
    * [.onAfterOpen](#module_PopupService..PopupOptions.onAfterOpen)
    * [.onBeforeClose](#module_PopupService..PopupOptions.onBeforeClose)
    * [.onAfterClose](#module_PopupService..PopupOptions.onAfterClose)
    * [.onBeforeCancel](#module_PopupService..PopupOptions.onBeforeCancel)
    * [.onAfterCancel](#module_PopupService..PopupOptions.onAfterCancel)
    * [.onBeforeChange](#module_PopupService..PopupOptions.onBeforeChange)
    * [.onAfterChange](#module_PopupService..PopupOptions.onAfterChange)

<a name="module_PopupService..PopupOptions.cache"></a>

#### PopupOptions.cache
Whether allow reusing previous created instance.
Default value is false.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [cache] | <code>Boolean</code> | 

<a name="module_PopupService..PopupOptions.showMask"></a>

#### PopupOptions.showMask
Whether or not to display the mask layer when in popup state.
Default value is false.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [showMask] | <code>Boolean</code> | 

<a name="module_PopupService..PopupOptions.showShadow"></a>

#### PopupOptions.showShadow
Whether or not to display the shadow.
Default value is false.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [showShadow] | <code>Boolean</code> | 

<a name="module_PopupService..PopupOptions.className"></a>

#### PopupOptions.className
Custom CSS class name for popup wrapper.
Default value is "".

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [className] | <code>String</code> | <code>&quot;&quot;</code> | 

<a name="module_PopupService..PopupOptions.effect"></a>

#### PopupOptions.effect
Determines the transition effects when popping up and closing.
Default value is Effect.NONE

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [effect] | <code>effect</code> | <code>Effect.NONE</code> | 

<a name="module_PopupService..PopupOptions.noCollision"></a>

#### PopupOptions.noCollision
Whether or not to adjust the postion if the popped UI overlaps with window.
Default value is true.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [noCollision] | <code>Boolean</code> | 

<a name="module_PopupService..PopupOptions.stick"></a>

#### PopupOptions.stick
Whether or not to stick the popped up UI to the container's
boundary if there is no suitable space.
Default value is true.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [stick] | <code>Boolean</code> | 

<a name="module_PopupService..PopupOptions.focus"></a>

#### PopupOptions.focus
Whether or not to move focus to the popped UI.
Default value is false.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [focus] | <code>Boolean</code> | 

<a name="module_PopupService..PopupOptions.autoClose"></a>

#### PopupOptions.autoClose
Time in millisecond to close the popup UI automatically. 0 means no autoclose.
Default value is 0.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [autoClose] | <code>Number</code> | 

<a name="module_PopupService..PopupOptions.closeByClick"></a>

#### PopupOptions.closeByClick
Whether or not to close the popped up UI when clicking the out side of the popped UI.
Default value is true.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [closeByClick] | <code>Boolean</code> | 

<a name="module_PopupService..PopupOptions.closeByEscape"></a>

#### PopupOptions.closeByEscape
Whether or not to close the popped up UI when pressing the escape key.
Default value is false.
* @property {Boolean} [closeByEscape]

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
<a name="module_PopupService..PopupOptions.dockStyle"></a>

#### PopupOptions.dockStyle
Determines how the popped UI align to the target element.
Default value is Dock.BOTTOM_LEFT.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [dockStyle] | [<code>Dock</code>](#Dock) | * @see Dock |

<a name="module_PopupService..PopupOptions.crossLine"></a>

#### PopupOptions.crossLine
Determines whether position options will be treated as cross line.
Default value is true.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [crossLine] | <code>Boolean</code> | 

<a name="module_PopupService..PopupOptions.disableScroll"></a>

#### PopupOptions.disableScroll
Whether or not to disable desktop scroll.
Default value is true.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [disableScroll] | <code>Boolean</code> | 

<a name="module_PopupService..PopupOptions.onBeforeOpen"></a>

#### PopupOptions.onBeforeOpen
Function that will be called before popping up.
Return false to disable the pop up behavior.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [onBeforeOpen] | <code>function</code> | 

<a name="module_PopupService..PopupOptions.onAfterOpen"></a>

#### PopupOptions.onAfterOpen
Function that will be called after popping up.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [onAfterOpen] | <code>function</code> | 

<a name="module_PopupService..PopupOptions.onBeforeClose"></a>

#### PopupOptions.onBeforeClose
Function that will be called before the closing behavior.
Return false to disable the closing behavior.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [onBeforeClose] | <code>function</code> | 

<a name="module_PopupService..PopupOptions.onAfterClose"></a>

#### PopupOptions.onAfterClose
Function that will be called after the closing behavior.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [onAfterClose] | <code>function</code> | 

<a name="module_PopupService..PopupOptions.onBeforeCancel"></a>

#### PopupOptions.onBeforeCancel
Function that will be called before the cancling behavior of the popup HOC is taken.
Return false to disable the canceling behavior.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [onBeforeCancel] | <code>function</code> | 

<a name="module_PopupService..PopupOptions.onAfterCancel"></a>

#### PopupOptions.onAfterCancel
Function that will be called after the cancling behavior of the popup HOC.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [onAfterCancel] | <code>function</code> | 

<a name="module_PopupService..PopupOptions.onBeforeChange"></a>

#### PopupOptions.onBeforeChange
Function that will be called before the change behavior of the popup HOC is taken.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [onBeforeChange] | <code>function</code> | 

<a name="module_PopupService..PopupOptions.onAfterChange"></a>

#### PopupOptions.onAfterChange
Function that will be called before the change behavior of the popup HOC.

**Kind**: static property of [<code>PopupOptions</code>](#module_PopupService..PopupOptions)  
**Properties**

| Name | Type |
| --- | --- |
| [onAfterChange] | <code>function</code> | 

<a name="module_WebSocketService"></a>

## WebSocketService
WebSocketService is a singletone service that provide
create/manage websocket instance

To use WebSocketService, import it from react-base-ui

**Example**  
```js
import WSService from 'react-base-ui/lib/services/websocket';
// setup global config
WSService.setup({ reconnectable,
           heartbeatInterval,
           heartbeatMessage,
           url,
           port,
           isDebug,
           maxSize });

// getInstance
const ws = WSService.getInstance(); // get the default web socket instance
const wsCustom = WSService.getInstance({ name: 'Custom' }); // get a named web socket instance.
const wsOverrideGlobalConfig = WSService.getInstance({ reconnectable: true, url: 'wss://localhost', port: '5555' }); // override global setting

// send message
ws.send({ initMessage })
  .then(() => {
    return ws.send({ openCashDrawerMessage }).then((data) => {
      if (data.code) {
        var r = JSON.parse(data);
        if (r.status  == 'success' {
          // successed
        })

        return Promise.reject(`${r.code}:${r.reason}`);
      }
    })
  })
  .catch((err) => {
    return Promise.reject('fail to send message');
  })

// close ws
ws.close();
```
<a name="module_CaretUtils"></a>

## CaretUtils
Utility functions to set or get text selection and caret position of Input element.

<a name="IDataSource"></a>

## IDataSource
**Kind**: global interface  
<a name="IPopupHOC"></a>

## IPopupHOC
**Kind**: global interface  
<a name="ClientSource"></a>

## ClientSource ⇐ [<code>DataSource</code>](#DataSource)
ClientSource
A class that represents a list of data.

**Kind**: global class  
**Extends**: [<code>DataSource</code>](#DataSource)  

* [ClientSource](#ClientSource) ⇐ [<code>DataSource</code>](#DataSource)
    * [new ClientSource(data, keyField, pageSize)](#new_ClientSource_new)
    * [.getData()](#ClientSource+getData)
    * [.getPage()](#ClientSource+getPage)
    * [.getTotalRecords()](#ClientSource+getTotalRecords)
    * [.getPageCount()](#ClientSource+getPageCount)
    * [.sort()](#ClientSource+sort)
    * [.clearSort()](#ClientSource+clearSort)
    * [.filter()](#ClientSource+filter)
    * [.clearFilter()](#ClientSource+clearFilter)
    * [.doSort()](#ClientSource+doSort)
    * [.getKeyField()](#DataSource+getKeyField)

<a name="new_ClientSource_new"></a>

### new ClientSource(data, keyField, pageSize)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>map</code> |  | data source list |
| keyField | <code>String</code> |  | the key text of map. |
| pageSize | <code>Number</code> | <code>20</code> | the page size of data list, and the defaulr value is 20. |

<a name="ClientSource+getData"></a>

### clientSource.getData()
**Kind**: instance method of [<code>ClientSource</code>](#ClientSource)  
<a name="ClientSource+getPage"></a>

### clientSource.getPage()
**Kind**: instance method of [<code>ClientSource</code>](#ClientSource)  
<a name="ClientSource+getTotalRecords"></a>

### clientSource.getTotalRecords()
**Kind**: instance method of [<code>ClientSource</code>](#ClientSource)  
<a name="ClientSource+getPageCount"></a>

### clientSource.getPageCount()
**Kind**: instance method of [<code>ClientSource</code>](#ClientSource)  
<a name="ClientSource+sort"></a>

### clientSource.sort()
**Kind**: instance method of [<code>ClientSource</code>](#ClientSource)  
<a name="ClientSource+clearSort"></a>

### clientSource.clearSort()
**Kind**: instance method of [<code>ClientSource</code>](#ClientSource)  
<a name="ClientSource+filter"></a>

### clientSource.filter()
**Kind**: instance method of [<code>ClientSource</code>](#ClientSource)  
<a name="ClientSource+clearFilter"></a>

### clientSource.clearFilter()
**Kind**: instance method of [<code>ClientSource</code>](#ClientSource)  
<a name="ClientSource+doSort"></a>

### clientSource.doSort()
**Kind**: instance method of [<code>ClientSource</code>](#ClientSource)  
<a name="DataSource+getKeyField"></a>

### clientSource.getKeyField()
**Kind**: instance method of [<code>ClientSource</code>](#ClientSource)  
<a name="DataSource"></a>

## DataSource
DataSource
A class that represents a list of data.

**Kind**: global class  
**Implements**: [<code>IDataSource</code>](#IDataSource)  

* [DataSource](#DataSource)
    * [new DataSource(keyField, pageSize)](#new_DataSource_new)
    * [.getKeyField()](#DataSource+getKeyField)

<a name="new_DataSource_new"></a>

### new DataSource(keyField, pageSize)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| keyField | <code>String</code> | <code>id</code> | the key text of map, and the defaul value is id. |
| pageSize | <code>Number</code> | <code>20</code> | the page size of data list, and the defaulr value is 20. |

<a name="DataSource+getKeyField"></a>

### dataSource.getKeyField()
**Kind**: instance method of [<code>DataSource</code>](#DataSource)  
<a name="Page"></a>

## Page
Page
A class that represents a list of data by page as the unit.

**Kind**: global class  
<a name="new_Page_new"></a>

### new Page(data, keyField, pageSize, totalRecords, pageNumber)

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Arrow</code> | data source list |
| keyField | <code>String</code> | the key text of map, and the defaul value is id. |
| pageSize | <code>Number</code> | the page size of data list, and the defaulr value is 20. |
| totalRecords | <code>Number</code> | The whole pages by page size, and the defaulr value is 0. |
| pageNumber | <code>Number</code> | the current page number, and the defaulr value is 0. |

<a name="ServerSource"></a>

## ServerSource ⇐ [<code>DataSource</code>](#DataSource)
ServerSource
A class that can send a api to server to get data list.

**Kind**: global class  
**Extends**: [<code>DataSource</code>](#DataSource)  

* [ServerSource](#ServerSource) ⇐ [<code>DataSource</code>](#DataSource)
    * [new ServerSource(api, pageParser, data, keyField, pageSize)](#new_ServerSource_new)
    * [.getData()](#ServerSource+getData)
    * [.getPage()](#ServerSource+getPage)
    * [.getTotalRecords()](#ServerSource+getTotalRecords)
    * [.getPageCount()](#ServerSource+getPageCount)
    * [.getKeyField()](#DataSource+getKeyField)

<a name="new_ServerSource_new"></a>

### new ServerSource(api, pageParser, data, keyField, pageSize)

| Param | Type | Description |
| --- | --- | --- |
| api | <code>Fuction</code> | the url that send to server to get data list. |
| pageParser | <code>Fuction</code> | parse page detail, and the default value is defaultPageParser. |
| data | <code>Arrow</code> | data source list. |
| keyField | <code>String</code> | the key text of map. |
| pageSize | <code>Number</code> | the page size of data list, and the defaulr value is 20. |

<a name="ServerSource+getData"></a>

### serverSource.getData()
**Kind**: instance method of [<code>ServerSource</code>](#ServerSource)  
<a name="ServerSource+getPage"></a>

### serverSource.getPage()
**Kind**: instance method of [<code>ServerSource</code>](#ServerSource)  
<a name="ServerSource+getTotalRecords"></a>

### serverSource.getTotalRecords()
**Kind**: instance method of [<code>ServerSource</code>](#ServerSource)  
<a name="ServerSource+getPageCount"></a>

### serverSource.getPageCount()
**Kind**: instance method of [<code>ServerSource</code>](#ServerSource)  
<a name="DataSource+getKeyField"></a>

### serverSource.getKeyField()
**Kind**: instance method of [<code>ServerSource</code>](#ServerSource)  
<a name="ErrorObj"></a>

## ErrorObj
Class that represents an error, with consistent structure that will be used across the framework.

**Kind**: global class  

* [ErrorObj](#ErrorObj)
    * [new ErrorObj(type, message, data)](#new_ErrorObj_new)
    * [.isException()](#ErrorObj.isException)
    * [.isErrorObj()](#ErrorObj.isErrorObj)

<a name="new_ErrorObj_new"></a>

### new ErrorObj(type, message, data)

| Param | Type | Description |
| --- | --- | --- |
| type | [<code>ErrorType</code>](#ErrorType) | The type of the error. |
| message | <code>String</code> \| <code>Array</code> \| [<code>Message</code>](#Message) | The message of this error. The value can be a string, a array of strings, or a instance of Message. |
| data | <code>Object</code> | Any additional data. |

<a name="ErrorObj.isException"></a>

### ErrorObj.isException()
Detect whether the error object is an exception.

**Kind**: static method of [<code>ErrorObj</code>](#ErrorObj)  
<a name="ErrorObj.isErrorObj"></a>

### ErrorObj.isErrorObj()
Detect whether the error object is an instance of ErrorObj.

**Kind**: static method of [<code>ErrorObj</code>](#ErrorObj)  
<a name="Message"></a>

## Message
A class that represents a group of messages.

**Kind**: global class  

* [Message](#Message)
    * [new Message(type, details, title, id)](#new_Message_new)
    * [.type](#Message+type)
    * [.title](#Message+title)
    * [.id](#Message+id)
    * [.details](#Message+details)

<a name="new_Message_new"></a>

### new Message(type, details, title, id)

| Param | Type | Description |
| --- | --- | --- |
| type | [<code>MessageType</code>](#MessageType) | The message type. |
| details | <code>string</code> \| <code>Array</code> | A string or array of string that represents each line of the message. |
| title | <code>String</code> | The title for this message group. |
| id | <code>String</code> | Unique id of this message group. If this id is not specified, a unique id will be generated automatically. |

<a name="Message+type"></a>

### message.type
**Kind**: instance property of [<code>Message</code>](#Message)  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | [<code>MessageType</code>](#MessageType) | The message type. |

<a name="Message+title"></a>

### message.title
**Kind**: instance property of [<code>Message</code>](#Message)  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> \| <code>Array</code> | The title for this message group. |

<a name="Message+id"></a>

### message.id
**Kind**: instance property of [<code>Message</code>](#Message)  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Unique id of this message group. |

<a name="Message+details"></a>

### message.details
**Kind**: instance property of [<code>Message</code>](#Message)  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| details | <code>Array</code> | A array of string that represents each line of the message. |

<a name="AsyncContent"></a>

## AsyncContent
AsyncContent is an UI component that can display content in waiting and show manner.

**Kind**: global class  

* [AsyncContent](#AsyncContent)
    * [.displayName](#AsyncContent+displayName)
    * [.defaultProps](#AsyncContent+defaultProps)

<a name="AsyncContent+displayName"></a>

### asyncContent.displayName
The display name

**Kind**: instance property of [<code>AsyncContent</code>](#AsyncContent)  
<a name="AsyncContent+defaultProps"></a>

### asyncContent.defaultProps
The default Props

**Kind**: instance property of [<code>AsyncContent</code>](#AsyncContent)  
<a name="Breadcrumb"></a>

## Breadcrumb
UI component that displays path in Breadcrumb.

**Kind**: global class  
<a name="Button"></a>

## Button
UI component that displays Button with variant settings.

**Kind**: global class  
<a name="Button.ButtonType"></a>

### Button.ButtonType : <code>enum</code>
Button Type

**Kind**: static enum of [<code>Button</code>](#Button)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| PRIMARY | <code>string</code> | <code>&quot;primary&quot;</code> | 
| SECONDARY | <code>string</code> | <code>&quot;secondary&quot;</code> | 
| STRONG | <code>string</code> | <code>&quot;strong&quot;</code> | 

<a name="ButtonBar"></a>

## ButtonBar
UI component that displays ButtonBar with variant settings.

**Kind**: global class  
<a name="Calendar"></a>

## Calendar
Calendar Component with three view mode: Date View, Month View and Year View.

**Kind**: global class  

* [Calendar](#Calendar)
    * [.DateFormat](#Calendar.DateFormat) : <code>enum</code>
    * [.FirstDayOfWeek](#Calendar.FirstDayOfWeek) : <code>enum</code>
    * [.TodayBehavior](#Calendar.TodayBehavior) : <code>enum</code>
    * [.ViewMode](#Calendar.ViewMode) : <code>enum</code>
    * [.CalendarPropTypes](#Calendar.CalendarPropTypes)
        * [.data-qa-id](#Calendar.CalendarPropTypes.data-qa-id)
        * [.prefix](#Calendar.CalendarPropTypes.prefix)
        * [.today](#Calendar.CalendarPropTypes.today)
        * [.firstDayOfWeek](#Calendar.CalendarPropTypes.firstDayOfWeek)
        * [.min](#Calendar.CalendarPropTypes.min)
        * [.max](#Calendar.CalendarPropTypes.max)
        * [.disabledDates](#Calendar.CalendarPropTypes.disabledDates)
        * [.value](#Calendar.CalendarPropTypes.value)
        * [.selectMode](#Calendar.CalendarPropTypes.selectMode)
        * [.viewMode](#Calendar.CalendarPropTypes.viewMode)
        * [.monthMode](#Calendar.CalendarPropTypes.monthMode)
        * [.displayToday](#Calendar.CalendarPropTypes.displayToday)
        * [.displayHeader](#Calendar.CalendarPropTypes.displayHeader)
        * [.valueChanged](#Calendar.CalendarPropTypes.valueChanged)

<a name="Calendar.DateFormat"></a>

### Calendar.DateFormat : <code>enum</code>
Date Format

**Kind**: static enum of [<code>Calendar</code>](#Calendar)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| MMDDYYYY | <code>string</code> | <code>&quot;MM/DD/YYYY&quot;</code> | 
| MMMYYYY | <code>string</code> | <code>&quot;MMM YYYY&quot;</code> | 
| YYYY | <code>string</code> | <code>&quot;YYYY&quot;</code> | 

<a name="Calendar.FirstDayOfWeek"></a>

### Calendar.FirstDayOfWeek : <code>enum</code>
First Day Of Week

**Kind**: static enum of [<code>Calendar</code>](#Calendar)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| SUNDAY | <code>number</code> | <code>0</code> | 
| MONDAY | <code>number</code> | <code>1</code> | 
| TUESDAY | <code>number</code> | <code>2</code> | 
| WEDNESDAY | <code>number</code> | <code>3</code> | 
| THURSDAY | <code>number</code> | <code>4</code> | 
| FRIDAY | <code>number</code> | <code>5</code> | 
| SATURDAY | <code>number</code> | <code>6</code> | 

<a name="Calendar.TodayBehavior"></a>

### Calendar.TodayBehavior : <code>enum</code>
Behavior of Click Today

**Kind**: static enum of [<code>Calendar</code>](#Calendar)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| DISPLAY | <code>number</code> | <code>1</code> | 
| SELECT | <code>number</code> | <code>2</code> | 

<a name="Calendar.ViewMode"></a>

### Calendar.ViewMode : <code>enum</code>
View Mode

**Kind**: static enum of [<code>Calendar</code>](#Calendar)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| DATEVIEW | <code>number</code> | <code>1</code> | 
| MONTHVIEW | <code>number</code> | <code>2</code> | 
| YEARVIEW | <code>number</code> | <code>3</code> | 

<a name="Calendar.CalendarPropTypes"></a>

### Calendar.CalendarPropTypes
Default PropTypes of Calendar.

**Kind**: static constant of [<code>Calendar</code>](#Calendar)  

* [.CalendarPropTypes](#Calendar.CalendarPropTypes)
    * [.data-qa-id](#Calendar.CalendarPropTypes.data-qa-id)
    * [.prefix](#Calendar.CalendarPropTypes.prefix)
    * [.today](#Calendar.CalendarPropTypes.today)
    * [.firstDayOfWeek](#Calendar.CalendarPropTypes.firstDayOfWeek)
    * [.min](#Calendar.CalendarPropTypes.min)
    * [.max](#Calendar.CalendarPropTypes.max)
    * [.disabledDates](#Calendar.CalendarPropTypes.disabledDates)
    * [.value](#Calendar.CalendarPropTypes.value)
    * [.selectMode](#Calendar.CalendarPropTypes.selectMode)
    * [.viewMode](#Calendar.CalendarPropTypes.viewMode)
    * [.monthMode](#Calendar.CalendarPropTypes.monthMode)
    * [.displayToday](#Calendar.CalendarPropTypes.displayToday)
    * [.displayHeader](#Calendar.CalendarPropTypes.displayHeader)
    * [.valueChanged](#Calendar.CalendarPropTypes.valueChanged)

<a name="Calendar.CalendarPropTypes.data-qa-id"></a>

#### CalendarPropTypes.data-qa-id
Define the unique id for usage of automation test

**Kind**: static property of [<code>CalendarPropTypes</code>](#Calendar.CalendarPropTypes)  
<a name="Calendar.CalendarPropTypes.prefix"></a>

#### CalendarPropTypes.prefix
Determines the skin prefix of calendar.

**Kind**: static property of [<code>CalendarPropTypes</code>](#Calendar.CalendarPropTypes)  
<a name="Calendar.CalendarPropTypes.today"></a>

#### CalendarPropTypes.today
Determines the today of calendar.

**Kind**: static property of [<code>CalendarPropTypes</code>](#Calendar.CalendarPropTypes)  
<a name="Calendar.CalendarPropTypes.firstDayOfWeek"></a>

#### CalendarPropTypes.firstDayOfWeek
Determines the first day of week.

**Kind**: static property of [<code>CalendarPropTypes</code>](#Calendar.CalendarPropTypes)  
<a name="Calendar.CalendarPropTypes.min"></a>

#### CalendarPropTypes.min
Gets or sets the earliest date that the user can select in the calendar.

**Kind**: static property of [<code>CalendarPropTypes</code>](#Calendar.CalendarPropTypes)  
<a name="Calendar.CalendarPropTypes.max"></a>

#### CalendarPropTypes.max
Gets or sets the latest date that the user can select in the calendar.

**Kind**: static property of [<code>CalendarPropTypes</code>](#Calendar.CalendarPropTypes)  
<a name="Calendar.CalendarPropTypes.disabledDates"></a>

#### CalendarPropTypes.disabledDates
Gets or sets the array of dates that the user can not select in the calendar.

**Kind**: static property of [<code>CalendarPropTypes</code>](#Calendar.CalendarPropTypes)  
<a name="Calendar.CalendarPropTypes.value"></a>

#### CalendarPropTypes.value
Gets or sets the currently selected date.

**Kind**: static property of [<code>CalendarPropTypes</code>](#Calendar.CalendarPropTypes)  
<a name="Calendar.CalendarPropTypes.selectMode"></a>

#### CalendarPropTypes.selectMode
Determines the selection mode of calendar.

**Kind**: static property of [<code>CalendarPropTypes</code>](#Calendar.CalendarPropTypes)  
<a name="Calendar.CalendarPropTypes.viewMode"></a>

#### CalendarPropTypes.viewMode
Determines the view mode of calendar.

**Kind**: static property of [<code>CalendarPropTypes</code>](#Calendar.CalendarPropTypes)  
<a name="Calendar.CalendarPropTypes.monthMode"></a>

#### CalendarPropTypes.monthMode
Determines the minimum selectable unit of the calendar is month.

**Kind**: static property of [<code>CalendarPropTypes</code>](#Calendar.CalendarPropTypes)  
<a name="Calendar.CalendarPropTypes.displayToday"></a>

#### CalendarPropTypes.displayToday
Determines the display state of today button

**Kind**: static property of [<code>CalendarPropTypes</code>](#Calendar.CalendarPropTypes)  
<a name="Calendar.CalendarPropTypes.displayHeader"></a>

#### CalendarPropTypes.displayHeader
Determines the display state of day-view header

**Kind**: static property of [<code>CalendarPropTypes</code>](#Calendar.CalendarPropTypes)  
<a name="Calendar.CalendarPropTypes.valueChanged"></a>

#### CalendarPropTypes.valueChanged
Occurs when the value property changes,
  either as a result of user actions or by assignment in code.

**Kind**: static property of [<code>CalendarPropTypes</code>](#Calendar.CalendarPropTypes)  
<a name="Checkbox"></a>

## Checkbox
UI component of Checkbox

**Kind**: global class  
<a name="CheckboxGroup"></a>

## CheckboxGroup
UI component that displays a group of Checkbox.

**Kind**: global class  

* [CheckboxGroup](#CheckboxGroup)
    * [.CheckboxGroupPropTypes](#CheckboxGroup.CheckboxGroupPropTypes)
        * [.disabled](#CheckboxGroup.CheckboxGroupPropTypes.disabled)
        * [.size](#CheckboxGroup.CheckboxGroupPropTypes.size)
        * [.name](#CheckboxGroup.CheckboxGroupPropTypes.name)
        * [.className](#CheckboxGroup.CheckboxGroupPropTypes.className)
        * [.onChange](#CheckboxGroup.CheckboxGroupPropTypes.onChange)
        * [.data](#CheckboxGroup.CheckboxGroupPropTypes.data)
        * [.children](#CheckboxGroup.CheckboxGroupPropTypes.children) : <code>node</code>
        * [.value](#CheckboxGroup.CheckboxGroupPropTypes.value)
        * [.defaultValue](#CheckboxGroup.CheckboxGroupPropTypes.defaultValue)

<a name="CheckboxGroup.CheckboxGroupPropTypes"></a>

### CheckboxGroup.CheckboxGroupPropTypes
Default PropTypes of  CheckboxGroup.

**Kind**: static constant of [<code>CheckboxGroup</code>](#CheckboxGroup)  

* [.CheckboxGroupPropTypes](#CheckboxGroup.CheckboxGroupPropTypes)
    * [.disabled](#CheckboxGroup.CheckboxGroupPropTypes.disabled)
    * [.size](#CheckboxGroup.CheckboxGroupPropTypes.size)
    * [.name](#CheckboxGroup.CheckboxGroupPropTypes.name)
    * [.className](#CheckboxGroup.CheckboxGroupPropTypes.className)
    * [.onChange](#CheckboxGroup.CheckboxGroupPropTypes.onChange)
    * [.data](#CheckboxGroup.CheckboxGroupPropTypes.data)
    * [.children](#CheckboxGroup.CheckboxGroupPropTypes.children) : <code>node</code>
    * [.value](#CheckboxGroup.CheckboxGroupPropTypes.value)
    * [.defaultValue](#CheckboxGroup.CheckboxGroupPropTypes.defaultValue)

<a name="CheckboxGroup.CheckboxGroupPropTypes.disabled"></a>

#### CheckboxGroupPropTypes.disabled
Determines the enable/disable state.

**Kind**: static property of [<code>CheckboxGroupPropTypes</code>](#CheckboxGroup.CheckboxGroupPropTypes)  
<a name="CheckboxGroup.CheckboxGroupPropTypes.size"></a>

#### CheckboxGroupPropTypes.size
Determines the Checkbox size.

**Kind**: static property of [<code>CheckboxGroupPropTypes</code>](#CheckboxGroup.CheckboxGroupPropTypes)  
<a name="CheckboxGroup.CheckboxGroupPropTypes.name"></a>

#### CheckboxGroupPropTypes.name
Field name.

**Kind**: static property of [<code>CheckboxGroupPropTypes</code>](#CheckboxGroup.CheckboxGroupPropTypes)  
<a name="CheckboxGroup.CheckboxGroupPropTypes.className"></a>

#### CheckboxGroupPropTypes.className
Customize CSS class name.

**Kind**: static property of [<code>CheckboxGroupPropTypes</code>](#CheckboxGroup.CheckboxGroupPropTypes)  
<a name="CheckboxGroup.CheckboxGroupPropTypes.onChange"></a>

#### CheckboxGroupPropTypes.onChange
Fires when value change.

**Kind**: static property of [<code>CheckboxGroupPropTypes</code>](#CheckboxGroup.CheckboxGroupPropTypes)  
<a name="CheckboxGroup.CheckboxGroupPropTypes.data"></a>

#### CheckboxGroupPropTypes.data
Array of child items. Each item is a text/value pair.

**Kind**: static property of [<code>CheckboxGroupPropTypes</code>](#CheckboxGroup.CheckboxGroupPropTypes)  
<a name="CheckboxGroup.CheckboxGroupPropTypes.children"></a>

#### CheckboxGroupPropTypes.children : <code>node</code>
Child node

**Kind**: static property of [<code>CheckboxGroupPropTypes</code>](#CheckboxGroup.CheckboxGroupPropTypes)  
<a name="CheckboxGroup.CheckboxGroupPropTypes.value"></a>

#### CheckboxGroupPropTypes.value
Array of checked value.

**Kind**: static property of [<code>CheckboxGroupPropTypes</code>](#CheckboxGroup.CheckboxGroupPropTypes)  
<a name="CheckboxGroup.CheckboxGroupPropTypes.defaultValue"></a>

#### CheckboxGroupPropTypes.defaultValue
Array of checked value in default state.

**Kind**: static property of [<code>CheckboxGroupPropTypes</code>](#CheckboxGroup.CheckboxGroupPropTypes)  
<a name="CollapsePanel"></a>

## CollapsePanel
UI component of CollapsePanel

**Kind**: global class  

* [CollapsePanel](#CollapsePanel)
    * [.CollapsePanelPropTypes](#CollapsePanel.CollapsePanelPropTypes)
        * [.children](#CollapsePanel.CollapsePanelPropTypes.children)
        * [.className](#CollapsePanel.CollapsePanelPropTypes.className)
        * [.expandedIcon](#CollapsePanel.CollapsePanelPropTypes.expandedIcon)
        * [.collapsedIcon](#CollapsePanel.CollapsePanelPropTypes.collapsedIcon)
        * [.transition](#CollapsePanel.CollapsePanelPropTypes.transition)
        * [.title](#CollapsePanel.CollapsePanelPropTypes.title)
        * [.summary](#CollapsePanel.CollapsePanelPropTypes.summary)
        * [.ariaLabel](#CollapsePanel.CollapsePanelPropTypes.ariaLabel)
        * [.onExpand](#CollapsePanel.CollapsePanelPropTypes.onExpand)
        * [.onCollapse](#CollapsePanel.CollapsePanelPropTypes.onCollapse)

<a name="CollapsePanel.CollapsePanelPropTypes"></a>

### CollapsePanel.CollapsePanelPropTypes
Default PropTypes of CollapsePanel.

**Kind**: static constant of [<code>CollapsePanel</code>](#CollapsePanel)  

* [.CollapsePanelPropTypes](#CollapsePanel.CollapsePanelPropTypes)
    * [.children](#CollapsePanel.CollapsePanelPropTypes.children)
    * [.className](#CollapsePanel.CollapsePanelPropTypes.className)
    * [.expandedIcon](#CollapsePanel.CollapsePanelPropTypes.expandedIcon)
    * [.collapsedIcon](#CollapsePanel.CollapsePanelPropTypes.collapsedIcon)
    * [.transition](#CollapsePanel.CollapsePanelPropTypes.transition)
    * [.title](#CollapsePanel.CollapsePanelPropTypes.title)
    * [.summary](#CollapsePanel.CollapsePanelPropTypes.summary)
    * [.ariaLabel](#CollapsePanel.CollapsePanelPropTypes.ariaLabel)
    * [.onExpand](#CollapsePanel.CollapsePanelPropTypes.onExpand)
    * [.onCollapse](#CollapsePanel.CollapsePanelPropTypes.onCollapse)

<a name="CollapsePanel.CollapsePanelPropTypes.children"></a>

#### CollapsePanelPropTypes.children
child content of CollapsePanel

**Kind**: static property of [<code>CollapsePanelPropTypes</code>](#CollapsePanel.CollapsePanelPropTypes)  
<a name="CollapsePanel.CollapsePanelPropTypes.className"></a>

#### CollapsePanelPropTypes.className
customize class for CollapsePanel section

**Kind**: static property of [<code>CollapsePanelPropTypes</code>](#CollapsePanel.CollapsePanelPropTypes)  
<a name="CollapsePanel.CollapsePanelPropTypes.expandedIcon"></a>

#### CollapsePanelPropTypes.expandedIcon
expanded icon of CollapsePanel panel

**Kind**: static property of [<code>CollapsePanelPropTypes</code>](#CollapsePanel.CollapsePanelPropTypes)  
<a name="CollapsePanel.CollapsePanelPropTypes.collapsedIcon"></a>

#### CollapsePanelPropTypes.collapsedIcon
collapsed icon of CollapsePanel panel

**Kind**: static property of [<code>CollapsePanelPropTypes</code>](#CollapsePanel.CollapsePanelPropTypes)  
<a name="CollapsePanel.CollapsePanelPropTypes.transition"></a>

#### CollapsePanelPropTypes.transition
define collapse/expanded transition, just have a transition on attribute of 'height'

**Kind**: static property of [<code>CollapsePanelPropTypes</code>](#CollapsePanel.CollapsePanelPropTypes)  
**Example**  
```js
<CollapsePanel transition='height 0.2s linear'></CollapsePanel>
```
<a name="CollapsePanel.CollapsePanelPropTypes.title"></a>

#### CollapsePanelPropTypes.title
define what title will be display on collapse panel

**Kind**: static property of [<code>CollapsePanelPropTypes</code>](#CollapsePanel.CollapsePanelPropTypes)  
<a name="CollapsePanel.CollapsePanelPropTypes.summary"></a>

#### CollapsePanelPropTypes.summary
define what summary will be display on collapse panel

**Kind**: static property of [<code>CollapsePanelPropTypes</code>](#CollapsePanel.CollapsePanelPropTypes)  
<a name="CollapsePanel.CollapsePanelPropTypes.ariaLabel"></a>

#### CollapsePanelPropTypes.ariaLabel
define what aria-label will be set on collapse panel

**Kind**: static property of [<code>CollapsePanelPropTypes</code>](#CollapsePanel.CollapsePanelPropTypes)  
<a name="CollapsePanel.CollapsePanelPropTypes.onExpand"></a>

#### CollapsePanelPropTypes.onExpand
a callback function after expanded

**Kind**: static property of [<code>CollapsePanelPropTypes</code>](#CollapsePanel.CollapsePanelPropTypes)  
<a name="CollapsePanel.CollapsePanelPropTypes.onCollapse"></a>

#### CollapsePanelPropTypes.onCollapse
a callback function after collapsed

**Kind**: static property of [<code>CollapsePanelPropTypes</code>](#CollapsePanel.CollapsePanelPropTypes)  
<a name="ColumnList"></a>

## ColumnList
ColumnList component provide a full sortable, filterable, pagable and cachable list

**Kind**: global class  

* [ColumnList](#ColumnList)
    * [.ColumnType](#ColumnList.ColumnType) : <code>enum</code>
    * [.ColumnListPropTypes](#ColumnList.ColumnListPropTypes)
        * [.data-qa-id](#ColumnList.ColumnListPropTypes.data-qa-id) : <code>string</code>
        * [.dataSource](#ColumnList.ColumnListPropTypes.dataSource) : [<code>IDataSource</code>](#IDataSource)
        * [.disabled](#ColumnList.ColumnListPropTypes.disabled) : <code>boolean</code>
        * [.pageMode](#ColumnList.ColumnListPropTypes.pageMode) : <code>boolean</code>
        * [.pageSize](#ColumnList.ColumnListPropTypes.pageSize) : <code>number</code>
        * [.width](#ColumnList.ColumnListPropTypes.width) : <code>string</code>
        * [.minWidth](#ColumnList.ColumnListPropTypes.minWidth) : <code>string</code>
        * [.maxHeight](#ColumnList.ColumnListPropTypes.maxHeight) : <code>string</code>
        * [.showTips](#ColumnList.ColumnListPropTypes.showTips) : <code>boolean</code>
        * [.showSorter](#ColumnList.ColumnListPropTypes.showSorter) : <code>boolean</code>
        * [.showFilter](#ColumnList.ColumnListPropTypes.showFilter) : <code>boolean</code>
        * [.showCount](#ColumnList.ColumnListPropTypes.showCount) : <code>boolean</code>
        * [.showCheckAll](#ColumnList.ColumnListPropTypes.showCheckAll) : <code>boolean</code>
        * [.sortField](#ColumnList.ColumnListPropTypes.sortField) : <code>string</code>
        * [.filterField](#ColumnList.ColumnListPropTypes.filterField) : <code>string</code>
        * [.filterPlaceholder](#ColumnList.ColumnListPropTypes.filterPlaceholder) : <code>string</code>
        * [.WCAG](#ColumnList.ColumnListPropTypes.WCAG) : <code>array</code>
        * [.filter](#ColumnList.ColumnListPropTypes.filter) : <code>func</code>
        * [.onItemRender](#ColumnList.ColumnListPropTypes.onItemRender) : <code>func</code>
        * [.columns](#ColumnList.ColumnListPropTypes.columns) : <code>array</code>
        * ["onChange"](#ColumnList.ColumnListPropTypes.event_onChange)

<a name="ColumnList.ColumnType"></a>

### ColumnList.ColumnType : <code>enum</code>
List Type

**Kind**: static enum of [<code>ColumnList</code>](#ColumnList)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| ICON | <code>string</code> | <code>&quot;icon&quot;</code> | 
| TEXT | <code>string</code> | <code>&quot;text&quot;</code> | 
| CHECKBOX | <code>string</code> | <code>&quot;checkbox&quot;</code> | 

<a name="ColumnList.ColumnListPropTypes"></a>

### ColumnList.ColumnListPropTypes
Default PropTypes of ColumnList.

**Kind**: static constant of [<code>ColumnList</code>](#ColumnList)  

* [.ColumnListPropTypes](#ColumnList.ColumnListPropTypes)
    * [.data-qa-id](#ColumnList.ColumnListPropTypes.data-qa-id) : <code>string</code>
    * [.dataSource](#ColumnList.ColumnListPropTypes.dataSource) : [<code>IDataSource</code>](#IDataSource)
    * [.disabled](#ColumnList.ColumnListPropTypes.disabled) : <code>boolean</code>
    * [.pageMode](#ColumnList.ColumnListPropTypes.pageMode) : <code>boolean</code>
    * [.pageSize](#ColumnList.ColumnListPropTypes.pageSize) : <code>number</code>
    * [.width](#ColumnList.ColumnListPropTypes.width) : <code>string</code>
    * [.minWidth](#ColumnList.ColumnListPropTypes.minWidth) : <code>string</code>
    * [.maxHeight](#ColumnList.ColumnListPropTypes.maxHeight) : <code>string</code>
    * [.showTips](#ColumnList.ColumnListPropTypes.showTips) : <code>boolean</code>
    * [.showSorter](#ColumnList.ColumnListPropTypes.showSorter) : <code>boolean</code>
    * [.showFilter](#ColumnList.ColumnListPropTypes.showFilter) : <code>boolean</code>
    * [.showCount](#ColumnList.ColumnListPropTypes.showCount) : <code>boolean</code>
    * [.showCheckAll](#ColumnList.ColumnListPropTypes.showCheckAll) : <code>boolean</code>
    * [.sortField](#ColumnList.ColumnListPropTypes.sortField) : <code>string</code>
    * [.filterField](#ColumnList.ColumnListPropTypes.filterField) : <code>string</code>
    * [.filterPlaceholder](#ColumnList.ColumnListPropTypes.filterPlaceholder) : <code>string</code>
    * [.WCAG](#ColumnList.ColumnListPropTypes.WCAG) : <code>array</code>
    * [.filter](#ColumnList.ColumnListPropTypes.filter) : <code>func</code>
    * [.onItemRender](#ColumnList.ColumnListPropTypes.onItemRender) : <code>func</code>
    * [.columns](#ColumnList.ColumnListPropTypes.columns) : <code>array</code>
    * ["onChange"](#ColumnList.ColumnListPropTypes.event_onChange)

<a name="ColumnList.ColumnListPropTypes.data-qa-id"></a>

#### ColumnListPropTypes.data-qa-id : <code>string</code>
defined the unique id for usage of automation test

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
<a name="ColumnList.ColumnListPropTypes.dataSource"></a>

#### ColumnListPropTypes.dataSource : [<code>IDataSource</code>](#IDataSource)
Either an array or an instance of IDataSource

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
**Example**  
```js
const dataSource1 = [
 { text: 'resource 1', checked: true, icon: 'icon-adjust'}
 { text: 'resource 2', checked: true, icon: 'icon-adjust'}
 { text: 'resource 3', checked: true, icon: 'icon-adjust'}
 { text: 'resource 4', checked: true, icon: 'icon-adjust'},
]

const dataSource2 = new ClientSource([
 { id: 1, text: 'resource 1', checked: true, icon: 'icon-adjust'}
 { id: 2, text: 'resource 2', checked: true, icon: 'icon-adjust'}
 { id: 3, text: 'resource 3', checked: true, icon: 'icon-adjust'}
 { id: 4, text: 'resource 4', checked: true, icon: 'icon-adjust'},
]);
```
<a name="ColumnList.ColumnListPropTypes.disabled"></a>

#### ColumnListPropTypes.disabled : <code>boolean</code>
Disable or enable the entire list

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
<a name="ColumnList.ColumnListPropTypes.pageMode"></a>

#### ColumnListPropTypes.pageMode : <code>boolean</code>
Enable or disable the page mode of the list

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
<a name="ColumnList.ColumnListPropTypes.pageSize"></a>

#### ColumnListPropTypes.pageSize : <code>number</code>
Number of items per page if list is in page mode and dataSource is an array

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
<a name="ColumnList.ColumnListPropTypes.width"></a>

#### ColumnListPropTypes.width : <code>string</code>
Specify the width of list

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
**Example**  
```js
const width = '100px'; // or "auto", "inherit" and so forth;
```
<a name="ColumnList.ColumnListPropTypes.minWidth"></a>

#### ColumnListPropTypes.minWidth : <code>string</code>
Specify the minWidth of list

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
**Example**  
```js
const minWidth = '100px'; // or "auto", "inherit" and so forth;
```
<a name="ColumnList.ColumnListPropTypes.maxHeight"></a>

#### ColumnListPropTypes.maxHeight : <code>string</code>
Specify the maxHeight of the list body
(excluding the list header and footer)

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
**Example**  
```js
const maxHeight = '150px';

const list = <ColumnList
 {...otherProps}
 maxHeight={maxHeight}
/>
```
<a name="ColumnList.ColumnListPropTypes.showTips"></a>

#### ColumnListPropTypes.showTips : <code>boolean</code>
Whether or not to show the tip while mouse over items

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
<a name="ColumnList.ColumnListPropTypes.showSorter"></a>

#### ColumnListPropTypes.showSorter : <code>boolean</code>
Whether or not to show a sorter icon and change the sort
of the list by clicks

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
<a name="ColumnList.ColumnListPropTypes.showFilter"></a>

#### ColumnListPropTypes.showFilter : <code>boolean</code>
Whether or not to show a filter on the header of the list

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
<a name="ColumnList.ColumnListPropTypes.showCount"></a>

#### ColumnListPropTypes.showCount : <code>boolean</code>
Whether or not to show a current/total counts on the footer of the list

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
<a name="ColumnList.ColumnListPropTypes.showCheckAll"></a>

#### ColumnListPropTypes.showCheckAll : <code>boolean</code>
Whether or not to show a "Check All" item to control the total seleciton state

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
<a name="ColumnList.ColumnListPropTypes.sortField"></a>

#### ColumnListPropTypes.sortField : <code>string</code>
Specify the field name which it's value will be used
to sort the list

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
<a name="ColumnList.ColumnListPropTypes.filterField"></a>

#### ColumnListPropTypes.filterField : <code>string</code>
Specify the field name which it's value will be used
to filter the list

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
<a name="ColumnList.ColumnListPropTypes.filterPlaceholder"></a>

#### ColumnListPropTypes.filterPlaceholder : <code>string</code>
A placeholder text for the filter

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
<a name="ColumnList.ColumnListPropTypes.WCAG"></a>

#### ColumnListPropTypes.WCAG : <code>array</code>
Whether to enable the advanced WCAG support

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
<a name="ColumnList.ColumnListPropTypes.filter"></a>

#### ColumnListPropTypes.filter : <code>func</code>
Customize filter func.

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  

| Param | Type |
| --- | --- |
| keyword | <code>string</code> | 
| item | <code>object</code> | 

**Example**  
```js
const customFilter = (keyword, item) =>
   new RegExp(keyword, 'ig').test(item['filterField'])
```
<a name="ColumnList.ColumnListPropTypes.onItemRender"></a>

#### ColumnListPropTypes.onItemRender : <code>func</code>
Customize func which render the columnlist item by self.

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
**Example**  
```js
onItemRender({ item, index }) {
   const { index, disabled, selected, text } = item;
   return
    <Checkbox disabled={disabled} checked={selected}>
     <SafeText key={`formatter_${index}`} text={`custom ${text}`} />
     <span className="row-icon icon-columnlist" />
   </Checkbox>;
 }
```
<a name="ColumnList.ColumnListPropTypes.columns"></a>

#### ColumnListPropTypes.columns : <code>array</code>
Column configurations

**Kind**: static property of [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
**Example**  
```js
columns: [
  { field: 'checked', type: ColumnType.CHECKBOX },
  { field: 'text', type: ColumnType.TEXT },
  { field: 'icon', type: ColumnType.ICON }
]
```
<a name="ColumnList.ColumnListPropTypes.event_onChange"></a>

#### "onChange"
Fires when check or uncheck the columnlist item.

**Kind**: event emitted by [<code>ColumnListPropTypes</code>](#ColumnList.ColumnListPropTypes)  
**Example**  
```js
onChange({ data, selectedItems }) {
   this.setState({ selectedItems })
 }
```
<a name="ComboBox"></a>

## ComboBox
ComboBox Component

**Kind**: global class  
**React-component**:   
<a name="DatePicker"></a>

## DatePicker
UI component that displays DatePicker with variant settings.

**Kind**: global class  
<a name="ContentView"></a>

## ContentView
UI component that displays DialogBox with variant settings

**Kind**: global class  
<a name="DialogBox"></a>

## DialogBox
UI component that displays DialogBox with variant settings.

**Kind**: global class  
<a name="DialogBox.confirm"></a>

### DialogBox.confirm(message, [options]) ⇒ <code>Promise</code>
Pops up confirmation dialogbox, and waits user's response in async mode.

**Kind**: static method of [<code>DialogBox</code>](#DialogBox)  
**Returns**: <code>Promise</code> - Returns a promise where the success function
is called if the user choose the OK action,
or the failed function is called if the user choose the Cancel action.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>string</code> |  | A message string to indicate or query user's choice. |
| [options] | <code>object</code> |  | Options that determine the behaviors of the confirmation. |
| [options.title] | <code>string</code> | <code>&quot;Confirm&quot;</code> | Title text of the confirmation dialogbox. |
| [options.showCancel] | <code>boolean</code> | <code>false</code> | Whether to display the cancel button. By default, only the OK button is displayed. |
| [options.cancelText] | <code>string</code> | <code>&quot;Cancel&quot;</code> | The text of the Cancel button. |
| [options.confirmText] | <code>string</code> | <code>&quot;OK&quot;</code> | The text of the OK button. |
| [options.className] | <code>string</code> |  | Custom class name |

**Example**  
```js
import { confirm } from 'react-base-ui/lib/services/dialog'

confirm('Session time out');

//or

confirm('Are you sure you want to delete the transaction?',
{showCancel: true, cancelText: 'DELETE'})
.then(()=>{//...do delete...})
.catch(()=>{//...canceled...});
```
<a name="Dropdown"></a>

## Dropdown
UI component that displays Dropdown with variant settings.

**Kind**: global class  
<a name="Dropdown"></a>

## Dropdown
UI component that displays Dropdown with variant settings.

**Kind**: global class  
<a name="Item"></a>

## Item
UI component that displays Dropdown Item with variant settings.

**Kind**: global class  
<a name="Duration"></a>

## Duration
UI component of Duration.

**Kind**: global class  
<a name="Input"></a>

## Input
UI component of Input

**Kind**: global class  

* [Input](#Input)
    * [.InputPropTypes](#Input.InputPropTypes)
        * [.value](#Input.InputPropTypes.value) : <code>string</code> \| <code>number</code>
        * [.defaultValue](#Input.InputPropTypes.defaultValue) : <code>string</code> \| <code>number</code>
        * [.type](#Input.InputPropTypes.type) : <code>string</code>
        * [.size](#Input.InputPropTypes.size) : [<code>Size</code>](#Size)
        * [.preIcon](#Input.InputPropTypes.preIcon) : <code>string</code>
        * [.preText](#Input.InputPropTypes.preText) : <code>string</code>
        * [.postIcon](#Input.InputPropTypes.postIcon) : <code>string</code>
        * [.postText](#Input.InputPropTypes.postText) : <code>string</code>
        * [.errored](#Input.InputPropTypes.errored) : <code>boolean</code>
        * [.icon](#Input.InputPropTypes.icon) : <code>boolean</code>
        * [.disabled](#Input.InputPropTypes.disabled) : <code>boolean</code>
        * [.className](#Input.InputPropTypes.className) : <code>string</code>
        * [.style](#Input.InputPropTypes.style) : <code>object</code>
        * [.onChange](#Input.InputPropTypes.onChange) : <code>func</code>
        * [.PreComponent](#Input.InputPropTypes.PreComponent) : <code>func</code> \| <code>element</code>
        * [.PostComponent](#Input.InputPropTypes.PostComponent) : <code>func</code> \| <code>element</code>
        * [.inputRef](#Input.InputPropTypes.inputRef) : <code>func</code>
        * [.children](#Input.InputPropTypes.children) : <code>node</code>
        * [.ariaLabel](#Input.InputPropTypes.ariaLabel) : <code>string</code>

<a name="Input.InputPropTypes"></a>

### Input.InputPropTypes
Default PropTypes of Input.

**Kind**: static constant of [<code>Input</code>](#Input)  

* [.InputPropTypes](#Input.InputPropTypes)
    * [.value](#Input.InputPropTypes.value) : <code>string</code> \| <code>number</code>
    * [.defaultValue](#Input.InputPropTypes.defaultValue) : <code>string</code> \| <code>number</code>
    * [.type](#Input.InputPropTypes.type) : <code>string</code>
    * [.size](#Input.InputPropTypes.size) : [<code>Size</code>](#Size)
    * [.preIcon](#Input.InputPropTypes.preIcon) : <code>string</code>
    * [.preText](#Input.InputPropTypes.preText) : <code>string</code>
    * [.postIcon](#Input.InputPropTypes.postIcon) : <code>string</code>
    * [.postText](#Input.InputPropTypes.postText) : <code>string</code>
    * [.errored](#Input.InputPropTypes.errored) : <code>boolean</code>
    * [.icon](#Input.InputPropTypes.icon) : <code>boolean</code>
    * [.disabled](#Input.InputPropTypes.disabled) : <code>boolean</code>
    * [.className](#Input.InputPropTypes.className) : <code>string</code>
    * [.style](#Input.InputPropTypes.style) : <code>object</code>
    * [.onChange](#Input.InputPropTypes.onChange) : <code>func</code>
    * [.PreComponent](#Input.InputPropTypes.PreComponent) : <code>func</code> \| <code>element</code>
    * [.PostComponent](#Input.InputPropTypes.PostComponent) : <code>func</code> \| <code>element</code>
    * [.inputRef](#Input.InputPropTypes.inputRef) : <code>func</code>
    * [.children](#Input.InputPropTypes.children) : <code>node</code>
    * [.ariaLabel](#Input.InputPropTypes.ariaLabel) : <code>string</code>

<a name="Input.InputPropTypes.value"></a>

#### InputPropTypes.value : <code>string</code> \| <code>number</code>
Sets the value of the Input.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.defaultValue"></a>

#### InputPropTypes.defaultValue : <code>string</code> \| <code>number</code>
Sets the default value of the Input.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.type"></a>

#### InputPropTypes.type : <code>string</code>
Sets the type of the Input and can be 'text', 'password', 'button' etc.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.size"></a>

#### InputPropTypes.size : [<code>Size</code>](#Size)
Determines the Input size.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.preIcon"></a>

#### InputPropTypes.preIcon : <code>string</code>
The label icon displayed before (on the left side of) the input field.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.preText"></a>

#### InputPropTypes.preText : <code>string</code>
The label text displayed before (on the left side of) the input field.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.postIcon"></a>

#### InputPropTypes.postIcon : <code>string</code>
The label icon displayed after (on the right side of) the input field.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.postText"></a>

#### InputPropTypes.postText : <code>string</code>
The label text displayed after (on the right side of) the input field.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.errored"></a>

#### InputPropTypes.errored : <code>boolean</code>
Determines if the input has errors.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.icon"></a>

#### InputPropTypes.icon : <code>boolean</code>
Whether add 'input-group--icon' class for the input wrapper.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.disabled"></a>

#### InputPropTypes.disabled : <code>boolean</code>
Whether the input is disabled.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.className"></a>

#### InputPropTypes.className : <code>string</code>
Customize class name for the input wrapper.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.style"></a>

#### InputPropTypes.style : <code>object</code>
Determines the style of the input wrapper.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.onChange"></a>

#### InputPropTypes.onChange : <code>func</code>
The callback function that is triggered when input value changes.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.PreComponent"></a>

#### InputPropTypes.PreComponent : <code>func</code> \| <code>element</code>
The component displayed after (on the right side of) the input field.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.PostComponent"></a>

#### InputPropTypes.PostComponent : <code>func</code> \| <code>element</code>
The component displayed before (on the left side of) the input field.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.inputRef"></a>

#### InputPropTypes.inputRef : <code>func</code>
Gets the instance of the Input Component.

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  

| Param | Type |
| --- | --- |
| input | <code>domNode</code> | 

<a name="Input.InputPropTypes.children"></a>

#### InputPropTypes.children : <code>node</code>
Child Node

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="Input.InputPropTypes.ariaLabel"></a>

#### InputPropTypes.ariaLabel : <code>string</code>
The content for aria-label

**Kind**: static property of [<code>InputPropTypes</code>](#Input.InputPropTypes)  
<a name="InputBase"></a>

## InputBase
Base class for all Input components

**Kind**: global class  

* [InputBase](#InputBase)
    * [.Hint](#InputBase.Hint) : <code>enum</code>
    * [.SpinSpeed](#InputBase.SpinSpeed) : <code>enum</code>
    * [.InputBasePropTypes](#InputBase.InputBasePropTypes)
        * [.data-qa-id](#InputBase.InputBasePropTypes.data-qa-id) : <code>string</code>
        * [.prefix](#InputBase.InputBasePropTypes.prefix) : <code>string</code>
        * [.value](#InputBase.InputBasePropTypes.value) : <code>string</code> \| <code>number</code> \| <code>object</code>
        * [.id](#InputBase.InputBasePropTypes.id) : <code>string</code>
        * [.name](#InputBase.InputBasePropTypes.name) : <code>string</code>
        * [.className](#InputBase.InputBasePropTypes.className) : <code>string</code>
        * [.listClassName](#InputBase.InputBasePropTypes.listClassName) : <code>string</code>
        * [.listWidth](#InputBase.InputBasePropTypes.listWidth) : <code>string</code>
        * [.listMinWidth](#InputBase.InputBasePropTypes.listMinWidth) : <code>string</code>
        * [.listMaxHeight](#InputBase.InputBasePropTypes.listMaxHeight) : <code>string</code>
        * [.listConfig](#InputBase.InputBasePropTypes.listConfig) : <code>object</code>
        * [.listPopupOptions](#InputBase.InputBasePropTypes.listPopupOptions) : <code>object</code>
        * [.onListRender](#InputBase.InputBasePropTypes.onListRender) : <code>func</code>
        * [.items](#InputBase.InputBasePropTypes.items) : <code>array</code>
        * [.onListOpen](#InputBase.InputBasePropTypes.onListOpen) : <code>func</code>
        * [.onListClose](#InputBase.InputBasePropTypes.onListClose) : <code>func</code>
        * [.style](#InputBase.InputBasePropTypes.style) : <code>object</code>
        * [.size](#InputBase.InputBasePropTypes.size) : [<code>Size</code>](#Size)
        * [.maxLength](#InputBase.InputBasePropTypes.maxLength) : <code>number</code>
        * [.disabled](#InputBase.InputBasePropTypes.disabled) : <code>boolean</code>
        * [.readonly](#InputBase.InputBasePropTypes.readonly) : <code>boolean</code>
        * [.placeHolder](#InputBase.InputBasePropTypes.placeHolder) : <code>boolean</code>
        * [.showClear](#InputBase.InputBasePropTypes.showClear) : <code>boolean</code>
        * [.showTrigger](#InputBase.InputBasePropTypes.showTrigger) : <code>boolean</code>
        * [.showTrigger2](#InputBase.InputBasePropTypes.showTrigger2) : <code>boolean</code>
        * [.showSpinner](#InputBase.InputBasePropTypes.showSpinner) : <code>boolean</code>
        * [.allowKeySpin](#InputBase.InputBasePropTypes.allowKeySpin) : <code>boolean</code>
        * [.allowMouseSpin](#InputBase.InputBasePropTypes.allowMouseSpin) : <code>boolean</code>
        * [.currency](#InputBase.InputBasePropTypes.currency) : <code>string</code>
        * [.textAlign](#InputBase.InputBasePropTypes.textAlign) : <code>string</code>
        * [.triggerIcon](#InputBase.InputBasePropTypes.triggerIcon) : <code>string</code>
        * [.triggerIconToggle](#InputBase.InputBasePropTypes.triggerIconToggle) : <code>string</code>
        * [.triggerIconHint](#InputBase.InputBasePropTypes.triggerIconHint) : <code>string</code>
        * [.triggerIcon2](#InputBase.InputBasePropTypes.triggerIcon2) : <code>string</code>
        * [.triggerIconToggle2](#InputBase.InputBasePropTypes.triggerIconToggle2) : <code>string</code>
        * [.triggerIconHint2](#InputBase.InputBasePropTypes.triggerIconHint2) : <code>string</code>
        * [.icon](#InputBase.InputBasePropTypes.icon) : <code>string</code>
        * [.iconHint](#InputBase.InputBasePropTypes.iconHint) : <code>string</code>
        * [.ariaLabel](#InputBase.InputBasePropTypes.ariaLabel) : <code>string</code>

<a name="InputBase.Hint"></a>

### InputBase.Hint : <code>enum</code>
Hint

**Kind**: static enum of [<code>InputBase</code>](#InputBase)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| UNKNOWN | <code>number</code> | <code>0</code> | 
| ESCAPED | <code>number</code> | <code>1</code> | 
| NO_EFFECT | <code>number</code> | <code>2</code> | 
| SIDE_EFFECT | <code>number</code> | <code>3</code> | 
| SUCCESS | <code>number</code> | <code>4</code> | 
| ASCII_EXPECTED | <code>number</code> | <code>-1</code> | 
| LETTER_EXPECTED | <code>number</code> | <code>-2</code> | 
| ALPHA_NUMERIC_EXPECTED | <code>number</code> | <code>-3</code> | 
| DIGIT_EXPECTED | <code>number</code> | <code>-4</code> | 
| SIGNED_DIGIT_EXPECTED | <code>number</code> | <code>-5</code> | 
| INVALID_INPUT | <code>number</code> | <code>-6</code> | 
| NONE_EDITABLE | <code>number</code> | <code>-7</code> | 
| POSITION_OUT_OF_RANGE | <code>number</code> | <code>-8</code> | 
| PROMPT_NOT_ALLOWED | <code>number</code> | <code>-9</code> | 
| POSITON_EXCEEDED | <code>number</code> | <code>-10</code> | 

<a name="InputBase.SpinSpeed"></a>

### InputBase.SpinSpeed : <code>enum</code>
Button Type

**Kind**: static enum of [<code>InputBase</code>](#InputBase)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| SLOW | <code>string</code> | <code>&quot;slow&quot;</code> | 
| MEDIUM | <code>string</code> | <code>&quot;medium&quot;</code> | 
| FAST | <code>string</code> | <code>&quot;fast&quot;</code> | 

<a name="InputBase.InputBasePropTypes"></a>

### InputBase.InputBasePropTypes
Default PropTypes of InputBase.

**Kind**: static constant of [<code>InputBase</code>](#InputBase)  

* [.InputBasePropTypes](#InputBase.InputBasePropTypes)
    * [.data-qa-id](#InputBase.InputBasePropTypes.data-qa-id) : <code>string</code>
    * [.prefix](#InputBase.InputBasePropTypes.prefix) : <code>string</code>
    * [.value](#InputBase.InputBasePropTypes.value) : <code>string</code> \| <code>number</code> \| <code>object</code>
    * [.id](#InputBase.InputBasePropTypes.id) : <code>string</code>
    * [.name](#InputBase.InputBasePropTypes.name) : <code>string</code>
    * [.className](#InputBase.InputBasePropTypes.className) : <code>string</code>
    * [.listClassName](#InputBase.InputBasePropTypes.listClassName) : <code>string</code>
    * [.listWidth](#InputBase.InputBasePropTypes.listWidth) : <code>string</code>
    * [.listMinWidth](#InputBase.InputBasePropTypes.listMinWidth) : <code>string</code>
    * [.listMaxHeight](#InputBase.InputBasePropTypes.listMaxHeight) : <code>string</code>
    * [.listConfig](#InputBase.InputBasePropTypes.listConfig) : <code>object</code>
    * [.listPopupOptions](#InputBase.InputBasePropTypes.listPopupOptions) : <code>object</code>
    * [.onListRender](#InputBase.InputBasePropTypes.onListRender) : <code>func</code>
    * [.items](#InputBase.InputBasePropTypes.items) : <code>array</code>
    * [.onListOpen](#InputBase.InputBasePropTypes.onListOpen) : <code>func</code>
    * [.onListClose](#InputBase.InputBasePropTypes.onListClose) : <code>func</code>
    * [.style](#InputBase.InputBasePropTypes.style) : <code>object</code>
    * [.size](#InputBase.InputBasePropTypes.size) : [<code>Size</code>](#Size)
    * [.maxLength](#InputBase.InputBasePropTypes.maxLength) : <code>number</code>
    * [.disabled](#InputBase.InputBasePropTypes.disabled) : <code>boolean</code>
    * [.readonly](#InputBase.InputBasePropTypes.readonly) : <code>boolean</code>
    * [.placeHolder](#InputBase.InputBasePropTypes.placeHolder) : <code>boolean</code>
    * [.showClear](#InputBase.InputBasePropTypes.showClear) : <code>boolean</code>
    * [.showTrigger](#InputBase.InputBasePropTypes.showTrigger) : <code>boolean</code>
    * [.showTrigger2](#InputBase.InputBasePropTypes.showTrigger2) : <code>boolean</code>
    * [.showSpinner](#InputBase.InputBasePropTypes.showSpinner) : <code>boolean</code>
    * [.allowKeySpin](#InputBase.InputBasePropTypes.allowKeySpin) : <code>boolean</code>
    * [.allowMouseSpin](#InputBase.InputBasePropTypes.allowMouseSpin) : <code>boolean</code>
    * [.currency](#InputBase.InputBasePropTypes.currency) : <code>string</code>
    * [.textAlign](#InputBase.InputBasePropTypes.textAlign) : <code>string</code>
    * [.triggerIcon](#InputBase.InputBasePropTypes.triggerIcon) : <code>string</code>
    * [.triggerIconToggle](#InputBase.InputBasePropTypes.triggerIconToggle) : <code>string</code>
    * [.triggerIconHint](#InputBase.InputBasePropTypes.triggerIconHint) : <code>string</code>
    * [.triggerIcon2](#InputBase.InputBasePropTypes.triggerIcon2) : <code>string</code>
    * [.triggerIconToggle2](#InputBase.InputBasePropTypes.triggerIconToggle2) : <code>string</code>
    * [.triggerIconHint2](#InputBase.InputBasePropTypes.triggerIconHint2) : <code>string</code>
    * [.icon](#InputBase.InputBasePropTypes.icon) : <code>string</code>
    * [.iconHint](#InputBase.InputBasePropTypes.iconHint) : <code>string</code>
    * [.ariaLabel](#InputBase.InputBasePropTypes.ariaLabel) : <code>string</code>

<a name="InputBase.InputBasePropTypes.data-qa-id"></a>

#### InputBasePropTypes.data-qa-id : <code>string</code>
The unique id for automation test.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.prefix"></a>

#### InputBasePropTypes.prefix : <code>string</code>
The CSS class prefix.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.value"></a>

#### InputBasePropTypes.value : <code>string</code> \| <code>number</code> \| <code>object</code>
The text value.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.id"></a>

#### InputBasePropTypes.id : <code>string</code>
The DOM id.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.name"></a>

#### InputBasePropTypes.name : <code>string</code>
The name of the input

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.className"></a>

#### InputBasePropTypes.className : <code>string</code>
Customize class name for the input wrapper.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.listClassName"></a>

#### InputBasePropTypes.listClassName : <code>string</code>
Customize class name for the popup list.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.listWidth"></a>

#### InputBasePropTypes.listWidth : <code>string</code>
Determines the width of the popup list.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.listMinWidth"></a>

#### InputBasePropTypes.listMinWidth : <code>string</code>
Determines the minimum width of the popup list.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.listMaxHeight"></a>

#### InputBasePropTypes.listMaxHeight : <code>string</code>
Determines the maximum height of the popup list.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.listConfig"></a>

#### InputBasePropTypes.listConfig : <code>object</code>
Config the list.
[config](#List.ListPropTypes.config)

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.listPopupOptions"></a>

#### InputBasePropTypes.listPopupOptions : <code>object</code>
Config the popup service.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.onListRender"></a>

#### InputBasePropTypes.onListRender : <code>func</code>
Customize func which render the list item by self.
[renderer](#List.ListPropTypes.renderer)

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.items"></a>

#### InputBasePropTypes.items : <code>array</code>
Array of list. Each item is an object.
[data](#List.ListPropTypes.data)

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.onListOpen"></a>

#### InputBasePropTypes.onListOpen : <code>func</code>
The callback function that is triggered when the list popups.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.onListClose"></a>

#### InputBasePropTypes.onListClose : <code>func</code>
The callback function that is triggered when the popup list closes.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.style"></a>

#### InputBasePropTypes.style : <code>object</code>
Determines the style of the input wrapper.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.size"></a>

#### InputBasePropTypes.size : [<code>Size</code>](#Size)
Determines the Input size.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.maxLength"></a>

#### InputBasePropTypes.maxLength : <code>number</code>
Determines the maximum length of the input value.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.disabled"></a>

#### InputBasePropTypes.disabled : <code>boolean</code>
The enable/disable state

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.readonly"></a>

#### InputBasePropTypes.readonly : <code>boolean</code>
Determines whether the input is readonly.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.placeHolder"></a>

#### InputBasePropTypes.placeHolder : <code>boolean</code>
Specifies the short hint that describes the expected value of the input field.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.showClear"></a>

#### InputBasePropTypes.showClear : <code>boolean</code>
Whether to show clear class and enable clear the input value.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.showTrigger"></a>

#### InputBasePropTypes.showTrigger : <code>boolean</code>
Whether to show the trigger icon for the Input.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.showTrigger2"></a>

#### InputBasePropTypes.showTrigger2 : <code>boolean</code>
Whether to show the second trigger icon for the Input.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.showSpinner"></a>

#### InputBasePropTypes.showSpinner : <code>boolean</code>
whether to show the spinner bar for the input.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.allowKeySpin"></a>

#### InputBasePropTypes.allowKeySpin : <code>boolean</code>
Whether update value by up and down key.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.allowMouseSpin"></a>

#### InputBasePropTypes.allowMouseSpin : <code>boolean</code>
Whether update value by mouse scroll.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.currency"></a>

#### InputBasePropTypes.currency : <code>string</code>
Determines the currency symbol to be used.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.textAlign"></a>

#### InputBasePropTypes.textAlign : <code>string</code>
Determines how the input value is aligned and the popup position and can be 'left' or 'right'.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.triggerIcon"></a>

#### InputBasePropTypes.triggerIcon : <code>string</code>
The class of the trigger icon.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.triggerIconToggle"></a>

#### InputBasePropTypes.triggerIconToggle : <code>string</code>
The class of the toggle trigger icon.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.triggerIconHint"></a>

#### InputBasePropTypes.triggerIconHint : <code>string</code>
The description for the trigger icon.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.triggerIcon2"></a>

#### InputBasePropTypes.triggerIcon2 : <code>string</code>
The class of the spinner icon.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.triggerIconToggle2"></a>

#### InputBasePropTypes.triggerIconToggle2 : <code>string</code>
The class of the toggle spinner icon.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.triggerIconHint2"></a>

#### InputBasePropTypes.triggerIconHint2 : <code>string</code>
The description for the spinner icon.

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.icon"></a>

#### InputBasePropTypes.icon : <code>string</code>
The icon displayed inside the input

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.iconHint"></a>

#### InputBasePropTypes.iconHint : <code>string</code>
The description for the icon

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputBase.InputBasePropTypes.ariaLabel"></a>

#### InputBasePropTypes.ariaLabel : <code>string</code>
The content for aria-label

**Kind**: static property of [<code>InputBasePropTypes</code>](#InputBase.InputBasePropTypes)  
<a name="InputDate"></a>

## InputDate
UI component of InputDate.

**Kind**: global class  

* [InputDate](#InputDate)
    * [.InputDatePropTypes](#InputDate.InputDatePropTypes) ⇐ [<code>InputMoment</code>](#InputMoment)
        * [.showTrigger](#InputDate.InputDatePropTypes.showTrigger) : <code>boolean</code>
        * [.showClear](#InputDate.InputDatePropTypes.showClear) : <code>boolean</code>

<a name="InputDate.InputDatePropTypes"></a>

### InputDate.InputDatePropTypes ⇐ [<code>InputMoment</code>](#InputMoment)
Default PropTypes of InputDate.

**Kind**: static constant of [<code>InputDate</code>](#InputDate)  
**Extends**: [<code>InputMoment</code>](#InputMoment)  

* [.InputDatePropTypes](#InputDate.InputDatePropTypes) ⇐ [<code>InputMoment</code>](#InputMoment)
    * [.showTrigger](#InputDate.InputDatePropTypes.showTrigger) : <code>boolean</code>
    * [.showClear](#InputDate.InputDatePropTypes.showClear) : <code>boolean</code>

<a name="InputDate.InputDatePropTypes.showTrigger"></a>

#### InputDatePropTypes.showTrigger : <code>boolean</code>
Whether to show trigger icon.

**Kind**: static property of [<code>InputDatePropTypes</code>](#InputDate.InputDatePropTypes)  
<a name="InputDate.InputDatePropTypes.showClear"></a>

#### InputDatePropTypes.showClear : <code>boolean</code>
Whether to show clear icon.

**Kind**: static property of [<code>InputDatePropTypes</code>](#InputDate.InputDatePropTypes)  
<a name="InputMask"></a>

## InputMask
**Kind**: global class  

* [InputMask](#InputMask)
    * [new exports.InputMask()](#new_InputMask_new)
    * [.defaultProps](#InputMask+defaultProps)

<a name="new_InputMask_new"></a>

### new exports.InputMask()
InputMask component allows you to validate and format user input
while typing, this will prevent invalid data been input.

To use the InputMask component, set the mask property to a string that specifies
the valid character classes for each field.

<a name="InputMask+defaultProps"></a>

### inputMask.defaultProps
Default Props of InputMask.

Please see InputMaskProps for details.

**Kind**: instance property of [<code>InputMask</code>](#InputMask)  
**See**: InputMaskProps  
<a name="InputMoment"></a>

## InputMoment
InputMoment component allows you validate and enter manually date and time.

**Kind**: global class  

* [InputMoment](#InputMoment)
    * [.TokenType](#InputMoment.TokenType) : <code>enum</code>
    * [.InputMomentPropTypes](#InputMoment.InputMomentPropTypes)
        * [.value](#InputMoment.InputMomentPropTypes.value)
        * [.min](#InputMoment.InputMomentPropTypes.min)
        * [.max](#InputMoment.InputMomentPropTypes.max)
        * [.format](#InputMoment.InputMomentPropTypes.format) : <code>string</code>
        * [.allowKeySpin](#InputMoment.InputMomentPropTypes.allowKeySpin)
        * [.flexibleCalendar](#InputMoment.InputMomentPropTypes.flexibleCalendar)
        * [.triggerIcon](#InputMoment.InputMomentPropTypes.triggerIcon)
        * [.triggerIconToggle](#InputMoment.InputMomentPropTypes.triggerIconToggle)
        * [.triggerIcon2](#InputMoment.InputMomentPropTypes.triggerIcon2)
        * [.triggerIconToggle2](#InputMoment.InputMomentPropTypes.triggerIconToggle2)
        * [.timeStep](#InputMoment.InputMomentPropTypes.timeStep)
        * [.onCalendarOpen](#InputMoment.InputMomentPropTypes.onCalendarOpen)
        * [.onCalendarClose](#InputMoment.InputMomentPropTypes.onCalendarClose)
        * [.onValueChange](#InputMoment.InputMomentPropTypes.onValueChange)

<a name="InputMoment.TokenType"></a>

### InputMoment.TokenType : <code>enum</code>
Token Type

**Kind**: static enum of [<code>InputMoment</code>](#InputMoment)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| LITERAL | <code>string</code> | <code>&quot;literal&quot;</code> | 
| MONTH | <code>string</code> | <code>&quot;M&quot;</code> | 
| MONTH_TWO_DIGITS | <code>string</code> | <code>&quot;MM&quot;</code> | 
| MONTH_SHORT_NAME | <code>string</code> | <code>&quot;MMM&quot;</code> | 
| MONTH_LONG_NAME | <code>string</code> | <code>&quot;MMMM&quot;</code> | 
| DATE | <code>string</code> | <code>&quot;D&quot;</code> | 
| DATE_TWO_DIGITS | <code>string</code> | <code>&quot;DD&quot;</code> | 
| DAY_SHORT_NAME | <code>string</code> | <code>&quot;ddd&quot;</code> | 
| DAY_LONG_NAME | <code>string</code> | <code>&quot;dddd&quot;</code> | 
| YEAR | <code>string</code> | <code>&quot;Y&quot;</code> | 
| YEAR_TWO_DIGITS | <code>string</code> | <code>&quot;YY&quot;</code> | 
| YEAR_FOUR_DIGITS | <code>string</code> | <code>&quot;YYYY&quot;</code> | 
| HOUTR_12 | <code>string</code> | <code>&quot;h&quot;</code> | 
| HOUTR_12_TWO_DIGITS | <code>string</code> | <code>&quot;hh&quot;</code> | 
| HOUTR_24 | <code>string</code> | <code>&quot;H&quot;</code> | 
| HOUTR_24_TWO_DIGITS | <code>string</code> | <code>&quot;HH&quot;</code> | 
| AMPM | <code>string</code> | <code>&quot;a&quot;</code> | 
| AMPM_UPPER | <code>string</code> | <code>&quot;A&quot;</code> | 
| MINUTE | <code>string</code> | <code>&quot;m&quot;</code> | 
| MINUTE_TWO_DIGITS | <code>string</code> | <code>&quot;mm&quot;</code> | 
| SECOND | <code>string</code> | <code>&quot;s&quot;</code> | 
| SECOND_TWO_DIGITS | <code>string</code> | <code>&quot;ss&quot;</code> | 

<a name="InputMoment.InputMomentPropTypes"></a>

### InputMoment.InputMomentPropTypes
Default PropTypes of InputMoment.

**Kind**: static constant of [<code>InputMoment</code>](#InputMoment)  

* [.InputMomentPropTypes](#InputMoment.InputMomentPropTypes)
    * [.value](#InputMoment.InputMomentPropTypes.value)
    * [.min](#InputMoment.InputMomentPropTypes.min)
    * [.max](#InputMoment.InputMomentPropTypes.max)
    * [.format](#InputMoment.InputMomentPropTypes.format) : <code>string</code>
    * [.allowKeySpin](#InputMoment.InputMomentPropTypes.allowKeySpin)
    * [.flexibleCalendar](#InputMoment.InputMomentPropTypes.flexibleCalendar)
    * [.triggerIcon](#InputMoment.InputMomentPropTypes.triggerIcon)
    * [.triggerIconToggle](#InputMoment.InputMomentPropTypes.triggerIconToggle)
    * [.triggerIcon2](#InputMoment.InputMomentPropTypes.triggerIcon2)
    * [.triggerIconToggle2](#InputMoment.InputMomentPropTypes.triggerIconToggle2)
    * [.timeStep](#InputMoment.InputMomentPropTypes.timeStep)
    * [.onCalendarOpen](#InputMoment.InputMomentPropTypes.onCalendarOpen)
    * [.onCalendarClose](#InputMoment.InputMomentPropTypes.onCalendarClose)
    * [.onValueChange](#InputMoment.InputMomentPropTypes.onValueChange)

<a name="InputMoment.InputMomentPropTypes.value"></a>

#### InputMomentPropTypes.value
Gets or sets the date value for a date input.

**Kind**: static property of [<code>InputMomentPropTypes</code>](#InputMoment.InputMomentPropTypes)  
<a name="InputMoment.InputMomentPropTypes.min"></a>

#### InputMomentPropTypes.min
Determines the minimal date that can be entered.

**Kind**: static property of [<code>InputMomentPropTypes</code>](#InputMoment.InputMomentPropTypes)  
<a name="InputMoment.InputMomentPropTypes.max"></a>

#### InputMomentPropTypes.max
Determines the maximum date that can be entered.

**Kind**: static property of [<code>InputMomentPropTypes</code>](#InputMoment.InputMomentPropTypes)  
<a name="InputMoment.InputMomentPropTypes.format"></a>

#### InputMomentPropTypes.format : <code>string</code>
The format pattern to display the date value.

InputMoment supports two types of formats: Standard Format and Custom Format.

A standard date and time format string uses a single format specifier to
 define the text representation of a date and time value.

 Possible values for Standard Format are:

 - "d": ShortDatePattern  M/D/YYYY
 - "D": LongDatePattern  dddd, MMMM DD, YYYY
 - "f": Full date and time (long date and short time)  dddd, MMMM DD, YYYY h:mm A
 - "F": Full date and time (long date and long time) dddd, MMMM DD, YYYY h:mm:ss A
 - "g": General (short date and short time) M/d/YYYY h:mm A
 - "G": General (short date and long time) M/d/YYYY h:mm:ss A
 - "m": month/day pattern MMMM DD
 - "M": month/day pattern MMMM DD
 - "s": sortable format that does not vary by culture
 -      YYYY\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss
 - "t": short time pattern h:mm A
 - "T": long time pattern h:mm:ss A
 - "u": Universal Sortable DateTime Pattern, same to s
 - "U": Full date and time (long date and long time) using universal time
 -    same to F
 - "y": month/year pattern YYYY MMMM
 - "Y": month/year pattern YYYY MMMM

 Any date and time format string that contains more than one character, including white space,
 is interpreted as a custom date and time format string. For example:
 "mmm-DD-YYYY", "mmmm d, YYYY", "mm/DD/YYYY", "d-mmm-YYYY", "ddd, mmmm DD, YYYY" etc.

 Below are the custom date and time format specifiers:

 - "D": The day of the month, from 1 through 31.
 - "DD": The day of the month, from 01 through 31.
 - "ddd": The abbreviated name of the day of the week.
 - "dddd": The full name of the day of the week.
 - "m": The minute, from 0 through 59.
 - "mm": The minute, from 00 through 59.
 - "M": The month, from 1 through 12.
 - "MM": The month, from 01 through 12.
 - "MMM": The abbreviated name of the month.
 - "MMMM": The full name of the month.
 - "Y": The year, from 0 to 99.
 - "YY": The year, from 00 to 99
 - "YYYY": The year as a four-digit number
 - "h": The hour, using a 12-hour clock from 1 to 12.
 - "hh": The hour, using a 12-hour clock from 01 to 12.
 - "H": The hour, using a 24-hour clock from 0 to 23.
 - "HH": The hour, using a 24-hour clock from 00 to 23.
 - "s": The second, from 0 through 59.
 - "ss": The second, from 00 through 59.
 - "a": The am/pm designator.
 - "A": The AM/PM designator.

**Kind**: static property of [<code>InputMomentPropTypes</code>](#InputMoment.InputMomentPropTypes)  
<a name="InputMoment.InputMomentPropTypes.allowKeySpin"></a>

#### InputMomentPropTypes.allowKeySpin
Allow spinning value by up/down key.

**Kind**: static property of [<code>InputMomentPropTypes</code>](#InputMoment.InputMomentPropTypes)  
<a name="InputMoment.InputMomentPropTypes.flexibleCalendar"></a>

#### InputMomentPropTypes.flexibleCalendar
Make the popup calender auto resize to input width

**Kind**: static property of [<code>InputMomentPropTypes</code>](#InputMoment.InputMomentPropTypes)  
<a name="InputMoment.InputMomentPropTypes.triggerIcon"></a>

#### InputMomentPropTypes.triggerIcon
Icon class name for the 1st trigger button.

**Kind**: static property of [<code>InputMomentPropTypes</code>](#InputMoment.InputMomentPropTypes)  
<a name="InputMoment.InputMomentPropTypes.triggerIconToggle"></a>

#### InputMomentPropTypes.triggerIconToggle
Icon class name for the 1st trigger button in toggle state.

**Kind**: static property of [<code>InputMomentPropTypes</code>](#InputMoment.InputMomentPropTypes)  
<a name="InputMoment.InputMomentPropTypes.triggerIcon2"></a>

#### InputMomentPropTypes.triggerIcon2
Icon class name for the 2nd trigger button.

**Kind**: static property of [<code>InputMomentPropTypes</code>](#InputMoment.InputMomentPropTypes)  
<a name="InputMoment.InputMomentPropTypes.triggerIconToggle2"></a>

#### InputMomentPropTypes.triggerIconToggle2
Icon class name for the 2nd trigger button in toggle state.

**Kind**: static property of [<code>InputMomentPropTypes</code>](#InputMoment.InputMomentPropTypes)  
<a name="InputMoment.InputMomentPropTypes.timeStep"></a>

#### InputMomentPropTypes.timeStep
Step in minutes when generating the time picker list.

**Kind**: static property of [<code>InputMomentPropTypes</code>](#InputMoment.InputMomentPropTypes)  
<a name="InputMoment.InputMomentPropTypes.onCalendarOpen"></a>

#### InputMomentPropTypes.onCalendarOpen
Callback function that will be called when the calendar is dropdown.

**Kind**: static property of [<code>InputMomentPropTypes</code>](#InputMoment.InputMomentPropTypes)  
<a name="InputMoment.InputMomentPropTypes.onCalendarClose"></a>

#### InputMomentPropTypes.onCalendarClose
Callback function that will be called when the calendar is closed.

**Kind**: static property of [<code>InputMomentPropTypes</code>](#InputMoment.InputMomentPropTypes)  
<a name="InputMoment.InputMomentPropTypes.onValueChange"></a>

#### InputMomentPropTypes.onValueChange
The onValueChange event handler.A function called when the value of the input is changed.

**Kind**: static property of [<code>InputMomentPropTypes</code>](#InputMoment.InputMomentPropTypes)  
<a name="InputNumeric"></a>

## InputNumeric
InputNumeric component allows you to input numeric values only.

InputNumeric has 3 types of style: they are: 'number', 'currency' and 'percent'.

This can be determined by changing the type prop.

**Kind**: global class  

* [InputNumeric](#InputNumeric)
    * [.InputNumericPropTypes](#InputNumeric.InputNumericPropTypes) ⇐ [<code>InputBase</code>](#InputBase)
        * [.type](#InputNumeric.InputNumericPropTypes.type) : [<code>NumericType</code>](#NumericType)
        * [.value](#InputNumeric.InputNumericPropTypes.value) : <code>string</code> \| <code>number</code> \| <code>boolean</code>
        * [.min](#InputNumeric.InputNumericPropTypes.min) : <code>number</code>
        * [.max](#InputNumeric.InputNumericPropTypes.max) : <code>number</code>
        * [.showGroup](#InputNumeric.InputNumericPropTypes.showGroup) : <code>boolean</code>
        * [.decimals](#InputNumeric.InputNumericPropTypes.decimals) : <code>number</code>
        * [.increment](#InputNumeric.InputNumericPropTypes.increment) : <code>number</code>
        * [.allowKeySpin](#InputNumeric.InputNumericPropTypes.allowKeySpin) : <code>boolean</code>
        * [.textAlign](#InputNumeric.InputNumericPropTypes.textAlign) : <code>string</code>
        * [.onValueChange](#InputNumeric.InputNumericPropTypes.onValueChange) : <code>func</code>
        * [.allowBlank](#InputNumeric.InputNumericPropTypes.allowBlank) : <code>boolean</code>

<a name="InputNumeric.InputNumericPropTypes"></a>

### InputNumeric.InputNumericPropTypes ⇐ [<code>InputBase</code>](#InputBase)
Default PropTypes of InputNumeric.

**Kind**: static constant of [<code>InputNumeric</code>](#InputNumeric)  
**Extends**: [<code>InputBase</code>](#InputBase)  

* [.InputNumericPropTypes](#InputNumeric.InputNumericPropTypes) ⇐ [<code>InputBase</code>](#InputBase)
    * [.type](#InputNumeric.InputNumericPropTypes.type) : [<code>NumericType</code>](#NumericType)
    * [.value](#InputNumeric.InputNumericPropTypes.value) : <code>string</code> \| <code>number</code> \| <code>boolean</code>
    * [.min](#InputNumeric.InputNumericPropTypes.min) : <code>number</code>
    * [.max](#InputNumeric.InputNumericPropTypes.max) : <code>number</code>
    * [.showGroup](#InputNumeric.InputNumericPropTypes.showGroup) : <code>boolean</code>
    * [.decimals](#InputNumeric.InputNumericPropTypes.decimals) : <code>number</code>
    * [.increment](#InputNumeric.InputNumericPropTypes.increment) : <code>number</code>
    * [.allowKeySpin](#InputNumeric.InputNumericPropTypes.allowKeySpin) : <code>boolean</code>
    * [.textAlign](#InputNumeric.InputNumericPropTypes.textAlign) : <code>string</code>
    * [.onValueChange](#InputNumeric.InputNumericPropTypes.onValueChange) : <code>func</code>
    * [.allowBlank](#InputNumeric.InputNumericPropTypes.allowBlank) : <code>boolean</code>

<a name="InputNumeric.InputNumericPropTypes.type"></a>

#### InputNumericPropTypes.type : [<code>NumericType</code>](#NumericType)
The type of the InputNumeric.

**Kind**: static property of [<code>InputNumericPropTypes</code>](#InputNumeric.InputNumericPropTypes)  
<a name="InputNumeric.InputNumericPropTypes.value"></a>

#### InputNumericPropTypes.value : <code>string</code> \| <code>number</code> \| <code>boolean</code>
The current value.

**Kind**: static property of [<code>InputNumericPropTypes</code>](#InputNumeric.InputNumericPropTypes)  
<a name="InputNumeric.InputNumericPropTypes.min"></a>

#### InputNumericPropTypes.min : <code>number</code>
Determines the minimal value that can be entered.

**Kind**: static property of [<code>InputNumericPropTypes</code>](#InputNumeric.InputNumericPropTypes)  
<a name="InputNumeric.InputNumericPropTypes.max"></a>

#### InputNumericPropTypes.max : <code>number</code>
Determines the maximum value that can be entered.

**Kind**: static property of [<code>InputNumericPropTypes</code>](#InputNumeric.InputNumericPropTypes)  
<a name="InputNumeric.InputNumericPropTypes.showGroup"></a>

#### InputNumericPropTypes.showGroup : <code>boolean</code>
Indicates whether the thousands group separator will be inserted between  each digital group.
(number of digits in thousands group depends on the selected Culture)

**Kind**: static property of [<code>InputNumericPropTypes</code>](#InputNumeric.InputNumericPropTypes)  
<a name="InputNumeric.InputNumericPropTypes.decimals"></a>

#### InputNumericPropTypes.decimals : <code>number</code>
Indicates the custom setting for decimal places to display.

**Kind**: static property of [<code>InputNumericPropTypes</code>](#InputNumeric.InputNumericPropTypes)  
<a name="InputNumeric.InputNumericPropTypes.increment"></a>

#### InputNumericPropTypes.increment : <code>number</code>
Determines how much to increase/decrease the input field.

**Kind**: static property of [<code>InputNumericPropTypes</code>](#InputNumeric.InputNumericPropTypes)  
<a name="InputNumeric.InputNumericPropTypes.allowKeySpin"></a>

#### InputNumericPropTypes.allowKeySpin : <code>boolean</code>
Allow increment or decrement by typing the up or down keys.

**Kind**: static property of [<code>InputNumericPropTypes</code>](#InputNumeric.InputNumericPropTypes)  
<a name="InputNumeric.InputNumericPropTypes.textAlign"></a>

#### InputNumericPropTypes.textAlign : <code>string</code>
Determines the left or right alignment of text.

**Kind**: static property of [<code>InputNumericPropTypes</code>](#InputNumeric.InputNumericPropTypes)  
<a name="InputNumeric.InputNumericPropTypes.onValueChange"></a>

#### InputNumericPropTypes.onValueChange : <code>func</code>
A function called when the value of the input is changed.

**Kind**: static property of [<code>InputNumericPropTypes</code>](#InputNumeric.InputNumericPropTypes)  
<a name="InputNumeric.InputNumericPropTypes.allowBlank"></a>

#### InputNumericPropTypes.allowBlank : <code>boolean</code>
Determines whether blank text is displayed after selecting all and pressing delete.

**Kind**: static property of [<code>InputNumericPropTypes</code>](#InputNumeric.InputNumericPropTypes)  
<a name="InputTime"></a>

## InputTime
InputTime Component

**Kind**: global class  

* [InputTime](#InputTime)
    * [.InputTimePropTypes](#InputTime.InputTimePropTypes) ⇐ [<code>InputMoment</code>](#InputMoment)
        * [.showTrigger2](#InputTime.InputTimePropTypes.showTrigger2) : <code>boolean</code>
        * [.format](#InputTime.InputTimePropTypes.format) : <code>string</code>

<a name="InputTime.InputTimePropTypes"></a>

### InputTime.InputTimePropTypes ⇐ [<code>InputMoment</code>](#InputMoment)
Default PropTypes of InputTime.

**Kind**: static constant of [<code>InputTime</code>](#InputTime)  
**Extends**: [<code>InputMoment</code>](#InputMoment)  

* [.InputTimePropTypes](#InputTime.InputTimePropTypes) ⇐ [<code>InputMoment</code>](#InputMoment)
    * [.showTrigger2](#InputTime.InputTimePropTypes.showTrigger2) : <code>boolean</code>
    * [.format](#InputTime.InputTimePropTypes.format) : <code>string</code>

<a name="InputTime.InputTimePropTypes.showTrigger2"></a>

#### InputTimePropTypes.showTrigger2 : <code>boolean</code>
Icon class name for the 2nd trigger button.

**Kind**: static property of [<code>InputTimePropTypes</code>](#InputTime.InputTimePropTypes)  
<a name="InputTime.InputTimePropTypes.format"></a>

#### InputTimePropTypes.format : <code>string</code>
The format pattern to display the date value.
[format](#InputMoment.InputMomentPropTypes.format)

**Kind**: static property of [<code>InputTimePropTypes</code>](#InputTime.InputTimePropTypes)  
<a name="InputTimeRange"></a>

## InputTimeRange
UI component that displays InputTimeRange with variant settings.

**Kind**: global class  
<a name="TimeRange"></a>

## TimeRange
UI component that displays TimeRange with variant settings.

**Kind**: global class  
<a name="Label"></a>

## Label
UI component that displays Label with variant settings.

**Kind**: global class  

* [Label](#Label)
    * [.LabelPropTypes](#Label.LabelPropTypes)
        * [.className](#Label.LabelPropTypes.className)
        * [.type](#Label.LabelPropTypes.type)
        * [.children](#Label.LabelPropTypes.children) : <code>node</code>

<a name="Label.LabelPropTypes"></a>

### Label.LabelPropTypes
Default PropTypes of Label.

**Kind**: static constant of [<code>Label</code>](#Label)  

* [.LabelPropTypes](#Label.LabelPropTypes)
    * [.className](#Label.LabelPropTypes.className)
    * [.type](#Label.LabelPropTypes.type)
    * [.children](#Label.LabelPropTypes.children) : <code>node</code>

<a name="Label.LabelPropTypes.className"></a>

#### LabelPropTypes.className
A list of class names to pass along to the container element of component.

**Kind**: static property of [<code>LabelPropTypes</code>](#Label.LabelPropTypes)  
**Properties**

| Type |
| --- |
| <code>String</code> | 

<a name="Label.LabelPropTypes.type"></a>

#### LabelPropTypes.type
Type of Label styles, options:`success`, `warning`, `danger`, `info`

**Kind**: static property of [<code>LabelPropTypes</code>](#Label.LabelPropTypes)  
**Properties**

| Type |
| --- |
| <code>String</code> | 

<a name="Label.LabelPropTypes.children"></a>

#### LabelPropTypes.children : <code>node</code>
Child Node

**Kind**: static property of [<code>LabelPropTypes</code>](#Label.LabelPropTypes)  
<a name="List"></a>

## List
List Component provide a full list.

**Kind**: global class  

* [List](#List)
    * [.ListType](#List.ListType) : <code>enum</code>
    * [.ListPropTypes](#List.ListPropTypes)
        * [.data-qa-id](#List.ListPropTypes.data-qa-id) : <code>string</code>
        * [.prefix](#List.ListPropTypes.prefix) : <code>string</code>
        * [.data](#List.ListPropTypes.data) : <code>array</code>
        * [.selectedIndex](#List.ListPropTypes.selectedIndex) : <code>array</code>
        * [.selectedValue](#List.ListPropTypes.selectedValue) : <code>array</code>
        * [.filterer](#List.ListPropTypes.filterer) : <code>func</code>
        * [.sorter](#List.ListPropTypes.sorter) : <code>func</code>
        * [.renderer](#List.ListPropTypes.renderer) : <code>func</code>
        * [.config](#List.ListPropTypes.config) : <code>object</code>
        * ["onChange"](#List.ListPropTypes.event_onChange)
        * ["onScrollToBottom"](#List.ListPropTypes.event_onScrollToBottom)

<a name="List.ListType"></a>

### List.ListType : <code>enum</code>
List Type

**Kind**: static enum of [<code>List</code>](#List)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| SINGLE | <code>string</code> | <code>&quot;single_column&quot;</code> | 
| MULTIPLE | <code>string</code> | <code>&quot;multiple_column&quot;</code> | 

<a name="List.ListPropTypes"></a>

### List.ListPropTypes
Default PropTypes of List.

**Kind**: static constant of [<code>List</code>](#List)  

* [.ListPropTypes](#List.ListPropTypes)
    * [.data-qa-id](#List.ListPropTypes.data-qa-id) : <code>string</code>
    * [.prefix](#List.ListPropTypes.prefix) : <code>string</code>
    * [.data](#List.ListPropTypes.data) : <code>array</code>
    * [.selectedIndex](#List.ListPropTypes.selectedIndex) : <code>array</code>
    * [.selectedValue](#List.ListPropTypes.selectedValue) : <code>array</code>
    * [.filterer](#List.ListPropTypes.filterer) : <code>func</code>
    * [.sorter](#List.ListPropTypes.sorter) : <code>func</code>
    * [.renderer](#List.ListPropTypes.renderer) : <code>func</code>
    * [.config](#List.ListPropTypes.config) : <code>object</code>
    * ["onChange"](#List.ListPropTypes.event_onChange)
    * ["onScrollToBottom"](#List.ListPropTypes.event_onScrollToBottom)

<a name="List.ListPropTypes.data-qa-id"></a>

#### ListPropTypes.data-qa-id : <code>string</code>
defined the unique id for usage of automation test

**Kind**: static property of [<code>ListPropTypes</code>](#List.ListPropTypes)  
<a name="List.ListPropTypes.prefix"></a>

#### ListPropTypes.prefix : <code>string</code>
Determines the skin prefix of list.

**Kind**: static property of [<code>ListPropTypes</code>](#List.ListPropTypes)  
<a name="List.ListPropTypes.data"></a>

#### ListPropTypes.data : <code>array</code>
Array of list. Each item is an object.

**Kind**: static property of [<code>ListPropTypes</code>](#List.ListPropTypes)  
**Example**  
```js
[
 {
   index: 1,
   text: 'resource 1',
   value: 23,
   disabled: false,
   selected: true,
   showTips: false,
   icon: 'icon-list',
   renderer: ({ item }) => {
     const { index, disabled, selected } = item;
     return (
       <Checkbox disabled={disabled} checked={selected}>
         {index}
         <span className="row-icon icon-list" />
       </Checkbox>
     );
   }
 }
]
```
<a name="List.ListPropTypes.selectedIndex"></a>

#### ListPropTypes.selectedIndex : <code>array</code>
Gets or sets the selected Item's index.

**Kind**: static property of [<code>ListPropTypes</code>](#List.ListPropTypes)  
<a name="List.ListPropTypes.selectedValue"></a>

#### ListPropTypes.selectedValue : <code>array</code>
Gets or sets the selected Item's value.

**Kind**: static property of [<code>ListPropTypes</code>](#List.ListPropTypes)  
<a name="List.ListPropTypes.filterer"></a>

#### ListPropTypes.filterer : <code>func</code>
Customize filter func.

**Kind**: static property of [<code>ListPropTypes</code>](#List.ListPropTypes)  

| Param | Type |
| --- | --- |
| filterInformation | <code>object</code> | 
| filterInformation.filter | <code>boolean</code> | 
| filterInformation.data | <code>array</code> | 
| filterInformation.filterField | <code>string</code> | 
| filterInformation.isFuzzy | <code>boolean</code> | 

**Example**  
```js
const defaultFilter = ({ filter, data, filterField = 'text', isFuzzy }) => {
      if (filter && isArray(data) && filterField) {
        return data.filter((row) => {
          const text = row[filterField];
          const reg = isFuzzy ? new RegExp(filter, 'ig') : new RegExp(`^${filter}`, 'g');
          return reg.test(text);
        });
      }

      return data;
   };
```
<a name="List.ListPropTypes.sorter"></a>

#### ListPropTypes.sorter : <code>func</code>
Customize sort func in ascending order.

**Kind**: static property of [<code>ListPropTypes</code>](#List.ListPropTypes)  
**Example**  
```js
function({ orderBy = 'text' }) => (a, b) => {
  const aValue = a && a[orderBy];
  const bValue = b && b[orderBy];

  return aValue - bValue;
 };
```
<a name="List.ListPropTypes.renderer"></a>

#### ListPropTypes.renderer : <code>func</code>
Customize func which render the list item by self.

**Kind**: static property of [<code>ListPropTypes</code>](#List.ListPropTypes)  
**Example**  
```js
renderer({ config, item }) {
   const { index, disabled, selected, text } = item;
   return
    <Checkbox disabled={disabled} checked={selected}>
     <SafeText key={`formatter_${index}`} text={`custom ${text}`} />
     <span className="row-icon icon-list" />
   </Checkbox>;
 }
```
<a name="List.ListPropTypes.config"></a>

#### ListPropTypes.config : <code>object</code>
Config the list.

**Kind**: static namespace of [<code>ListPropTypes</code>](#List.ListPropTypes)  
**Properties**

| Name | Type |
| --- | --- |
| config.selectionMode | [<code>SelectionMode</code>](#SelectionMode) | 
| config.listType | [<code>ListType</code>](#List.ListType) | 
| config.disabled | <code>boolean</code> | 
| config.maxHeight | <code>string</code> | 
| config.showTips | <code>boolean</code> | 
| config.showIcon | <code>boolean</code> | 
| config.checkable | <code>boolean</code> | 
| config.sortable | <code>boolean</code> | 
| config.filterable | <code>boolean</code> | 
| config.asyncable | <code>boolean</code> | 
| config.isFuzzy | <code>boolean</code> | 
| config.sortField | <code>string</code> | 
| config.filterField | <code>string</code> | 
| config.WCAG | <code>boolean</code> | 
| config.allowDeselect | <code>boolean</code> | 

**Example**  
```js
{
   selectionMode: SelectionMode.SINGLE,
   listType: ListType.SINGLE,
   disabled: false,
   maxHeight: '120px',
   showTips: false, // determine whether show the tips when mouse hover the list item.
   showIcon: true, // determine whether show the icon after the list item
   checkable: false, // determine whether show the checkbox before list item
   sortable: false, // can be sorted
   filterable: true, // can be filter by inputted value
   asyncable: false, // determine whether the data can be loaded asyncable.
   isFuzzy: false,
   sortField: 'text',
   filterField: 'text',
   WCAG: false,
   allowDeselect: true
 }
```
<a name="List.ListPropTypes.event_onChange"></a>

#### "onChange"
Fires when check or uncheck the list item.

**Kind**: event emitted by [<code>ListPropTypes</code>](#List.ListPropTypes)  
**Example**  
```js
onChange({ item }) {
  console.log('clicked item', item);
  this.val.value = JSON.stringify(this.list.value);
 }
```
<a name="List.ListPropTypes.event_onScrollToBottom"></a>

#### "onScrollToBottom"
Fires when scroll to the list bottom.

**Kind**: event emitted by [<code>ListPropTypes</code>](#List.ListPropTypes)  
<a name="LoadingBar"></a>

## LoadingBar
UI Component that displays loading or waiting status.

**Kind**: global class  

* [LoadingBar](#LoadingBar)
    * [.LoadingBarPropTypes](#LoadingBar.LoadingBarPropTypes)
        * [.fullScreen](#LoadingBar.LoadingBarPropTypes.fullScreen) : <code>boolean</code>
        * [.text](#LoadingBar.LoadingBarPropTypes.text) : <code>string</code>
        * [.showMask](#LoadingBar.LoadingBarPropTypes.showMask) : <code>boolean</code>
        * [.spinSize](#LoadingBar.LoadingBarPropTypes.spinSize) : [<code>Size</code>](#Size)

<a name="LoadingBar.LoadingBarPropTypes"></a>

### LoadingBar.LoadingBarPropTypes
Default PropTypes for LoadingBar

**Kind**: static constant of [<code>LoadingBar</code>](#LoadingBar)  

* [.LoadingBarPropTypes](#LoadingBar.LoadingBarPropTypes)
    * [.fullScreen](#LoadingBar.LoadingBarPropTypes.fullScreen) : <code>boolean</code>
    * [.text](#LoadingBar.LoadingBarPropTypes.text) : <code>string</code>
    * [.showMask](#LoadingBar.LoadingBarPropTypes.showMask) : <code>boolean</code>
    * [.spinSize](#LoadingBar.LoadingBarPropTypes.spinSize) : [<code>Size</code>](#Size)

<a name="LoadingBar.LoadingBarPropTypes.fullScreen"></a>

#### LoadingBarPropTypes.fullScreen : <code>boolean</code>
Determines whether the loading status is displayed for global scope.

**Kind**: static property of [<code>LoadingBarPropTypes</code>](#LoadingBar.LoadingBarPropTypes)  
<a name="LoadingBar.LoadingBarPropTypes.text"></a>

#### LoadingBarPropTypes.text : <code>string</code>
The indicating text.

**Kind**: static property of [<code>LoadingBarPropTypes</code>](#LoadingBar.LoadingBarPropTypes)  
<a name="LoadingBar.LoadingBarPropTypes.showMask"></a>

#### LoadingBarPropTypes.showMask : <code>boolean</code>
Determines whether showing the mask background.

**Kind**: static property of [<code>LoadingBarPropTypes</code>](#LoadingBar.LoadingBarPropTypes)  
<a name="LoadingBar.LoadingBarPropTypes.spinSize"></a>

#### LoadingBarPropTypes.spinSize : [<code>Size</code>](#Size)
The spin size.
Only sm/md/lg are supported.

**Kind**: static property of [<code>LoadingBarPropTypes</code>](#LoadingBar.LoadingBarPropTypes)  
<a name="Phone"></a>

## Phone
UI component of Phone Number.

**Kind**: global class  

* [Phone](#Phone)
    * [.PCIIframePropTypes](#Phone.PCIIframePropTypes)
        * [.debug](#Phone.PCIIframePropTypes.debug) : <code>bool</code>
        * [.source](#Phone.PCIIframePropTypes.source) : <code>string</code>
        * [.getPCICheckoutIframeUrl](#Phone.PCIIframePropTypes.getPCICheckoutIframeUrl) : <code>func</code>
    * [.PhonePropTypes](#Phone.PhonePropTypes)
        * [.value](#Phone.PhonePropTypes.value) : <code>string</code>
        * [.disabled](#Phone.PhonePropTypes.disabled) : <code>boolean</code>
        * [.onChange](#Phone.PhonePropTypes.onChange) : <code>func</code>

<a name="Phone.PCIIframePropTypes"></a>

### Phone.PCIIframePropTypes
Default PropTypes of Phone.

**Kind**: static constant of [<code>Phone</code>](#Phone)  

* [.PCIIframePropTypes](#Phone.PCIIframePropTypes)
    * [.debug](#Phone.PCIIframePropTypes.debug) : <code>bool</code>
    * [.source](#Phone.PCIIframePropTypes.source) : <code>string</code>
    * [.getPCICheckoutIframeUrl](#Phone.PCIIframePropTypes.getPCICheckoutIframeUrl) : <code>func</code>

<a name="Phone.PCIIframePropTypes.debug"></a>

#### PCIIframePropTypes.debug : <code>bool</code>
if debug === true, will render more debug information in console.

**Kind**: static property of [<code>PCIIframePropTypes</code>](#Phone.PCIIframePropTypes)  
<a name="Phone.PCIIframePropTypes.source"></a>

#### PCIIframePropTypes.source : <code>string</code>
the caller source. ex.  an-servlet, an-aui, an-cui ....

**Kind**: static property of [<code>PCIIframePropTypes</code>](#Phone.PCIIframePropTypes)  
<a name="Phone.PCIIframePropTypes.getPCICheckoutIframeUrl"></a>

#### PCIIframePropTypes.getPCICheckoutIframeUrl : <code>func</code>
need return payment iframe url.

**Kind**: static property of [<code>PCIIframePropTypes</code>](#Phone.PCIIframePropTypes)  
<a name="Phone.PhonePropTypes"></a>

### Phone.PhonePropTypes
Default PropTypes of Phone.

**Kind**: static constant of [<code>Phone</code>](#Phone)  

* [.PhonePropTypes](#Phone.PhonePropTypes)
    * [.value](#Phone.PhonePropTypes.value) : <code>string</code>
    * [.disabled](#Phone.PhonePropTypes.disabled) : <code>boolean</code>
    * [.onChange](#Phone.PhonePropTypes.onChange) : <code>func</code>

<a name="Phone.PhonePropTypes.value"></a>

#### PhonePropTypes.value : <code>string</code>
The phone number and the format is 'areaCode-mainCode-extendCode'.

**Kind**: static property of [<code>PhonePropTypes</code>](#Phone.PhonePropTypes)  
<a name="Phone.PhonePropTypes.disabled"></a>

#### PhonePropTypes.disabled : <code>boolean</code>
Whether the phone field is disabled.

**Kind**: static property of [<code>PhonePropTypes</code>](#Phone.PhonePropTypes)  
<a name="Phone.PhonePropTypes.onChange"></a>

#### PhonePropTypes.onChange : <code>func</code>
The callback function that is triggered when phone field changes.

**Kind**: static property of [<code>PhonePropTypes</code>](#Phone.PhonePropTypes)  
<a name="Progress"></a>

## Progress
UI component that displays Progress with variant settings.

**Kind**: global class  
<a name="Radio"></a>

## Radio
UI component of Radio

**Kind**: global class  

* [Radio](#Radio)
    * [.RadioPropTypes](#Radio.RadioPropTypes)
        * [.value](#Radio.RadioPropTypes.value) : <code>string</code> \| <code>number</code>
        * [.disabled](#Radio.RadioPropTypes.disabled) : <code>boolean</code>
        * [.size](#Radio.RadioPropTypes.size) : [<code>Size</code>](#Size)
        * [.name](#Radio.RadioPropTypes.name) : <code>string</code>
        * [.children](#Radio.RadioPropTypes.children) : <code>node</code>
        * ["onChange"](#Radio.RadioPropTypes.event_onChange)

<a name="Radio.RadioPropTypes"></a>

### Radio.RadioPropTypes
Default PropTypes of Radio.

**Kind**: static constant of [<code>Radio</code>](#Radio)  

* [.RadioPropTypes](#Radio.RadioPropTypes)
    * [.value](#Radio.RadioPropTypes.value) : <code>string</code> \| <code>number</code>
    * [.disabled](#Radio.RadioPropTypes.disabled) : <code>boolean</code>
    * [.size](#Radio.RadioPropTypes.size) : [<code>Size</code>](#Size)
    * [.name](#Radio.RadioPropTypes.name) : <code>string</code>
    * [.children](#Radio.RadioPropTypes.children) : <code>node</code>
    * ["onChange"](#Radio.RadioPropTypes.event_onChange)

<a name="Radio.RadioPropTypes.value"></a>

#### RadioPropTypes.value : <code>string</code> \| <code>number</code>
Radio value.

**Kind**: static property of [<code>RadioPropTypes</code>](#Radio.RadioPropTypes)  
<a name="Radio.RadioPropTypes.disabled"></a>

#### RadioPropTypes.disabled : <code>boolean</code>
Determines enable/disable state.

**Kind**: static property of [<code>RadioPropTypes</code>](#Radio.RadioPropTypes)  
<a name="Radio.RadioPropTypes.size"></a>

#### RadioPropTypes.size : [<code>Size</code>](#Size)
Determines the Radio size.

**Kind**: static property of [<code>RadioPropTypes</code>](#Radio.RadioPropTypes)  
<a name="Radio.RadioPropTypes.name"></a>

#### RadioPropTypes.name : <code>string</code>
Field name.

**Kind**: static property of [<code>RadioPropTypes</code>](#Radio.RadioPropTypes)  
<a name="Radio.RadioPropTypes.children"></a>

#### RadioPropTypes.children : <code>node</code>
Child nodes.

**Kind**: static property of [<code>RadioPropTypes</code>](#Radio.RadioPropTypes)  
<a name="Radio.RadioPropTypes.event_onChange"></a>

#### "onChange"
Fires when value change.

**Kind**: event emitted by [<code>RadioPropTypes</code>](#Radio.RadioPropTypes)  
<a name="RadioGroup"></a>

## RadioGroup
UI component that displays a group of Radio.

**Kind**: global class  

* [RadioGroup](#RadioGroup)
    * [.RadioGroupPropTypes](#RadioGroup.RadioGroupPropTypes)
        * [.disabled](#RadioGroup.RadioGroupPropTypes.disabled) : <code>boolean</code>
        * [.size](#RadioGroup.RadioGroupPropTypes.size) : [<code>Size</code>](#Size)
        * [.name](#RadioGroup.RadioGroupPropTypes.name) : <code>string</code>
        * [.className](#RadioGroup.RadioGroupPropTypes.className) : <code>string</code>
        * [.data](#RadioGroup.RadioGroupPropTypes.data) : <code>object</code>
        * [.children](#RadioGroup.RadioGroupPropTypes.children) : <code>node</code>
        * [.value](#RadioGroup.RadioGroupPropTypes.value) : <code>any</code>
        * [.defaultValue](#RadioGroup.RadioGroupPropTypes.defaultValue) : <code>any</code>
        * ["onChange"](#RadioGroup.RadioGroupPropTypes.event_onChange)

<a name="RadioGroup.RadioGroupPropTypes"></a>

### RadioGroup.RadioGroupPropTypes
Default PropTypes of  RadioGroup.

**Kind**: static constant of [<code>RadioGroup</code>](#RadioGroup)  

* [.RadioGroupPropTypes](#RadioGroup.RadioGroupPropTypes)
    * [.disabled](#RadioGroup.RadioGroupPropTypes.disabled) : <code>boolean</code>
    * [.size](#RadioGroup.RadioGroupPropTypes.size) : [<code>Size</code>](#Size)
    * [.name](#RadioGroup.RadioGroupPropTypes.name) : <code>string</code>
    * [.className](#RadioGroup.RadioGroupPropTypes.className) : <code>string</code>
    * [.data](#RadioGroup.RadioGroupPropTypes.data) : <code>object</code>
    * [.children](#RadioGroup.RadioGroupPropTypes.children) : <code>node</code>
    * [.value](#RadioGroup.RadioGroupPropTypes.value) : <code>any</code>
    * [.defaultValue](#RadioGroup.RadioGroupPropTypes.defaultValue) : <code>any</code>
    * ["onChange"](#RadioGroup.RadioGroupPropTypes.event_onChange)

<a name="RadioGroup.RadioGroupPropTypes.disabled"></a>

#### RadioGroupPropTypes.disabled : <code>boolean</code>
Determines the enable/disable state.

**Kind**: static property of [<code>RadioGroupPropTypes</code>](#RadioGroup.RadioGroupPropTypes)  
<a name="RadioGroup.RadioGroupPropTypes.size"></a>

#### RadioGroupPropTypes.size : [<code>Size</code>](#Size)
Determines the Radio size.

**Kind**: static property of [<code>RadioGroupPropTypes</code>](#RadioGroup.RadioGroupPropTypes)  
<a name="RadioGroup.RadioGroupPropTypes.name"></a>

#### RadioGroupPropTypes.name : <code>string</code>
Field name.

**Kind**: static property of [<code>RadioGroupPropTypes</code>](#RadioGroup.RadioGroupPropTypes)  
<a name="RadioGroup.RadioGroupPropTypes.className"></a>

#### RadioGroupPropTypes.className : <code>string</code>
Customize CSS class name.

**Kind**: static property of [<code>RadioGroupPropTypes</code>](#RadioGroup.RadioGroupPropTypes)  
<a name="RadioGroup.RadioGroupPropTypes.data"></a>

#### RadioGroupPropTypes.data : <code>object</code>
Array of child items. Each item is a text/value pair.

**Kind**: static property of [<code>RadioGroupPropTypes</code>](#RadioGroup.RadioGroupPropTypes)  
<a name="RadioGroup.RadioGroupPropTypes.children"></a>

#### RadioGroupPropTypes.children : <code>node</code>
Child node

**Kind**: static property of [<code>RadioGroupPropTypes</code>](#RadioGroup.RadioGroupPropTypes)  
<a name="RadioGroup.RadioGroupPropTypes.value"></a>

#### RadioGroupPropTypes.value : <code>any</code>
Value of radio group.

**Kind**: static property of [<code>RadioGroupPropTypes</code>](#RadioGroup.RadioGroupPropTypes)  
<a name="RadioGroup.RadioGroupPropTypes.defaultValue"></a>

#### RadioGroupPropTypes.defaultValue : <code>any</code>
Radio group value in default state.

**Kind**: static property of [<code>RadioGroupPropTypes</code>](#RadioGroup.RadioGroupPropTypes)  
<a name="RadioGroup.RadioGroupPropTypes.event_onChange"></a>

#### "onChange"
Fires when value change.

**Kind**: event emitted by [<code>RadioGroupPropTypes</code>](#RadioGroup.RadioGroupPropTypes)  
<a name="Table"></a>

## Table
**Kind**: global class  
<a name="new_Table_new"></a>

### new Table()
Table to render a collection of structured data
with nested rows and sorting support

**Example**  
```js
const rows = [
 { data: { a: 'hello', b: 'world', c: 'row 1' } },
 { data: { a: 'hello', b: 'world', c: 'row 2' } },
 { data: { a: 'hello', b: 'world', c: 'row 3' } }
]

const columns = [
 { title: 'Column A', keyName: 'a' },
 { title: 'Column B', keyName: 'b' },
 { title: 'Column C', keyName: 'c' },
]

<Table rows={rows} columns={columns} />
```
<a name="PropertyList"></a>

## PropertyList
PropertyList

**Kind**: global variable  
**Example**  
```js
const items = [
 {
   name: 'Company Name',
   value: 'companyName',
   className: 'item-class-test'
 },
 {
   name: 'Customer Type',
   value: 'customerType',
   onRenderValue: item => (<span>{item.value || '-'}</span>)
 },
{
    name: 'Company Address',
    value: 'companyAddress'
  },
  { name: 'Profession', value: 'profession' },
  { name: 'Phone', value: 'phone' },
  { name: 'Address', value: '', showNullName: true }
];
]

<PropertyList showColon items={items} />
```
<a name="data-qa-id"></a>

## data-qa-id : <code>String</code>
defined the unique id for usage of automation test

**Kind**: global variable  
<a name="text"></a>

## text
The display text of answer option.

**Kind**: global variable  
<a name="value"></a>

## value
The value of answer option.

**Kind**: global variable  
<a name="ErrorType"></a>

## ErrorType : <code>enum</code>
Enum that definitions the type of ErrorObj.

**Kind**: global enum  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| EXCEPTION | <code>number</code> | <code>0</code> | 
| HTTP | <code>number</code> | <code>1</code> | 
| SERVICE | <code>number</code> | <code>2</code> | 
| APP | <code>number</code> | <code>3</code> | 

<a name="MessageType"></a>

## MessageType : <code>enum</code>
Enum that definitions the message types

**Kind**: global enum  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| INFO | <code>string</code> | <code>&quot;info&quot;</code> | 
| SUCCESS | <code>string</code> | <code>&quot;success&quot;</code> | 
| WARNING | <code>string</code> | <code>&quot;warning&quot;</code> | 
| ERROR | <code>string</code> | <code>&quot;error&quot;</code> | 

<a name="ResponseCode"></a>

## ResponseCode : <code>enum</code>
Enum definition for response code returned by REST services.

**Kind**: global enum  
**Example**  
```js
import { ResponseCode } from 'react-base-ui/lib/RestClient'
//....
if (response.code === ResponseCode.SESSION_TIMEOUT){
 //....
}
```
<a name="PlaceHolderType"></a>

## PlaceHolderType : <code>enum</code>
Enum that determines the waiting state.

**Kind**: global enum  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| TEXT | <code>string</code> | <code>&quot;text&quot;</code> | Indicates the waiting state with pure text |
| ICON | <code>string</code> | <code>&quot;icon&quot;</code> | Indicates the waiting state with both text and icon |

<a name="Dock"></a>

## Dock : <code>enum</code>
Enum that definitions the styles of how one element dock to another.

**Kind**: global enum  
<a name="Effect"></a>

## Effect : <code>enum</code>
Enum that animation effect.

**Kind**: global enum  
<a name="HAlignment"></a>

## HAlignment : <code>enum</code>
Enum that definitions horizontal alignment types.

**Kind**: global enum  
<a name="NumericType"></a>

## NumericType : <code>enum</code>
Type of numeric input.

**Kind**: global enum  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| DECIMAL | <code>string</code> | <code>&quot;decimal&quot;</code> | 
| CURRENCY | <code>string</code> | <code>&quot;currency&quot;</code> | 
| PERCENT | <code>string</code> | <code>&quot;percent&quot;</code> | 

<a name="SelectionMode"></a>

## SelectionMode : <code>enum</code>
Selection Mode

**Kind**: global enum  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| SINGLE | <code>string</code> | <code>&quot;single&quot;</code> | 
| MULTIPLE | <code>string</code> | <code>&quot;multiple&quot;</code> | 

<a name="Size"></a>

## Size : <code>enum</code>
General Size Enum.

**Kind**: global enum  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| EXTRA_SMALL | <code>string</code> | <code>&quot;xs&quot;</code> | 
| SMALL | <code>string</code> | <code>&quot;sm&quot;</code> | 
| MEDIUM | <code>string</code> | <code>&quot;md&quot;</code> | 
| LARGE | <code>string</code> | <code>&quot;lg&quot;</code> | 
| EXTRA_LARGE | <code>string</code> | <code>&quot;xl&quot;</code> | 

<a name="SortOrder"></a>

## SortOrder : <code>enum</code>
Enum that determines the sort order.

**Kind**: global enum  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| ORIGIN | <code>string</code> | <code>&quot;origin&quot;</code> | 
| ASC | <code>string</code> | <code>&quot;asc&quot;</code> | 
| DESC | <code>string</code> | <code>&quot;desc&quot;</code> | 

<a name="Theme"></a>

## Theme : <code>enum</code>
Enum the theme of components.

**Kind**: global enum  
<a name="Dock"></a>

## Dock : <code>enum</code>
Enum that trigger the target element event.

**Kind**: global enum  
<a name="VAlignment"></a>

## VAlignment : <code>enum</code>
Enum that definitions vertical alignment types.

**Kind**: global enum  
<a name="AsyncContentProps"></a>

## AsyncContentProps
Default Props for AsyncContent

**Kind**: global constant  

* [AsyncContentProps](#AsyncContentProps)
    * [.data-qa-id](#AsyncContentProps.data-qa-id)
    * [.prefix](#AsyncContentProps.prefix)
    * [.placeHolder](#AsyncContentProps.placeHolder)
    * [.placeHolderType](#AsyncContentProps.placeHolderType)

<a name="AsyncContentProps.data-qa-id"></a>

### AsyncContentProps.data-qa-id
Defines the unique id for automation test

**Kind**: static property of [<code>AsyncContentProps</code>](#AsyncContentProps)  
<a name="AsyncContentProps.prefix"></a>

### AsyncContentProps.prefix
Determines the prefix for CSS class names

**Kind**: static property of [<code>AsyncContentProps</code>](#AsyncContentProps)  
<a name="AsyncContentProps.placeHolder"></a>

### AsyncContentProps.placeHolder
The default charactor when loading.

**Kind**: static property of [<code>AsyncContentProps</code>](#AsyncContentProps)  
<a name="AsyncContentProps.placeHolderType"></a>

### AsyncContentProps.placeHolderType
The type of Placeholder.

**Kind**: static property of [<code>AsyncContentProps</code>](#AsyncContentProps)  
<a name="BreadcrumbPropTypes"></a>

## BreadcrumbPropTypes
Default PropTypes for Breadcrumb

**Kind**: global constant  

* [BreadcrumbPropTypes](#BreadcrumbPropTypes)
    * [.separator](#BreadcrumbPropTypes.separator)
    * [.routes](#BreadcrumbPropTypes.routes)
    * [.params](#BreadcrumbPropTypes.params)

<a name="BreadcrumbPropTypes.separator"></a>

### BreadcrumbPropTypes.separator
The path separator

**Kind**: static property of [<code>BreadcrumbPropTypes</code>](#BreadcrumbPropTypes)  
<a name="BreadcrumbPropTypes.routes"></a>

### BreadcrumbPropTypes.routes
Array of routes definition.

**Kind**: static property of [<code>BreadcrumbPropTypes</code>](#BreadcrumbPropTypes)  
<a name="BreadcrumbPropTypes.params"></a>

### BreadcrumbPropTypes.params
Hash object that stores the path params

**Kind**: static property of [<code>BreadcrumbPropTypes</code>](#BreadcrumbPropTypes)  
<a name="ButtonPropTypes"></a>

## ButtonPropTypes
Default PropTypes of Button.

**Kind**: global constant  

* [ButtonPropTypes](#ButtonPropTypes)
    * [.noSubmit](#ButtonPropTypes.noSubmit)
    * [.loading](#ButtonPropTypes.loading)
    * [.type](#ButtonPropTypes.type)
    * [.size](#ButtonPropTypes.size)
    * [.disabled](#ButtonPropTypes.disabled)
    * [.className](#ButtonPropTypes.className)
    * [.children](#ButtonPropTypes.children)
    * [.menuData](#ButtonPropTypes.menuData)
    * [.onMenuSelect](#ButtonPropTypes.onMenuSelect)
    * [.onClick](#ButtonPropTypes.onClick)
    * [.onMouseHover](#ButtonPropTypes.onMouseHover)
    * [.onMouseEnter](#ButtonPropTypes.onMouseEnter)
    * [.onMouseLeave](#ButtonPropTypes.onMouseLeave)

<a name="ButtonPropTypes.noSubmit"></a>

### ButtonPropTypes.noSubmit
Determines whether the button is a not a Submit button.

**Kind**: static property of [<code>ButtonPropTypes</code>](#ButtonPropTypes)  
<a name="ButtonPropTypes.loading"></a>

### ButtonPropTypes.loading
Whether or not to show loading icon.

**Kind**: static property of [<code>ButtonPropTypes</code>](#ButtonPropTypes)  
<a name="ButtonPropTypes.type"></a>

### ButtonPropTypes.type
Determines the button type.

**Kind**: static property of [<code>ButtonPropTypes</code>](#ButtonPropTypes)  
<a name="ButtonPropTypes.size"></a>

### ButtonPropTypes.size
Determines the button size.

**Kind**: static property of [<code>ButtonPropTypes</code>](#ButtonPropTypes)  
<a name="ButtonPropTypes.disabled"></a>

### ButtonPropTypes.disabled
Whether or not to disable button.

**Kind**: static property of [<code>ButtonPropTypes</code>](#ButtonPropTypes)  
<a name="ButtonPropTypes.className"></a>

### ButtonPropTypes.className
Custom class name.

**Kind**: static property of [<code>ButtonPropTypes</code>](#ButtonPropTypes)  
<a name="ButtonPropTypes.children"></a>

### ButtonPropTypes.children
Child Node

**Kind**: static property of [<code>ButtonPropTypes</code>](#ButtonPropTypes)  
<a name="ButtonPropTypes.menuData"></a>

### ButtonPropTypes.menuData
Menu data list.

**Kind**: static property of [<code>ButtonPropTypes</code>](#ButtonPropTypes)  
<a name="ButtonPropTypes.onMenuSelect"></a>

### ButtonPropTypes.onMenuSelect
Triger the functtion when select menu item.

**Kind**: static property of [<code>ButtonPropTypes</code>](#ButtonPropTypes)  
<a name="ButtonPropTypes.onClick"></a>

### ButtonPropTypes.onClick
Triger the functtion when click button.

**Kind**: static property of [<code>ButtonPropTypes</code>](#ButtonPropTypes)  
<a name="ButtonPropTypes.onMouseHover"></a>

### ButtonPropTypes.onMouseHover
Triger the function when hover button.

**Kind**: static property of [<code>ButtonPropTypes</code>](#ButtonPropTypes)  
<a name="ButtonPropTypes.onMouseEnter"></a>

### ButtonPropTypes.onMouseEnter
Triger the function when enter button.

**Kind**: static property of [<code>ButtonPropTypes</code>](#ButtonPropTypes)  
<a name="ButtonPropTypes.onMouseLeave"></a>

### ButtonPropTypes.onMouseLeave
Triger the function when leave button.

**Kind**: static property of [<code>ButtonPropTypes</code>](#ButtonPropTypes)  
<a name="ButtonProps"></a>

## ButtonProps
Default Props for Buttons

**Kind**: global constant  
<a name="ButtonBarPropTypes"></a>

## ButtonBarPropTypes
Default PropTypes of ButtonBar.

**Kind**: global constant  

* [ButtonBarPropTypes](#ButtonBarPropTypes)
    * [.data](#ButtonBarPropTypes.data)
    * [.disabled](#ButtonBarPropTypes.disabled)
    * [.className](#ButtonBarPropTypes.className)
    * [.onButtonClick](#ButtonBarPropTypes.onButtonClick)
    * [.onButtonMouseHover](#ButtonBarPropTypes.onButtonMouseHover)
    * [.onButtonMouseEnter](#ButtonBarPropTypes.onButtonMouseEnter)
    * [.onButtonMouseLeave](#ButtonBarPropTypes.onButtonMouseLeave)
    * [.onButtonMenuSelect](#ButtonBarPropTypes.onButtonMenuSelect)

<a name="ButtonBarPropTypes.data"></a>

### ButtonBarPropTypes.data
ButtonBar data list.

**Kind**: static property of [<code>ButtonBarPropTypes</code>](#ButtonBarPropTypes)  
<a name="ButtonBarPropTypes.disabled"></a>

### ButtonBarPropTypes.disabled
Whether or not to disable buttonbar.

**Kind**: static property of [<code>ButtonBarPropTypes</code>](#ButtonBarPropTypes)  
<a name="ButtonBarPropTypes.className"></a>

### ButtonBarPropTypes.className
ButtonBar class name.

**Kind**: static property of [<code>ButtonBarPropTypes</code>](#ButtonBarPropTypes)  
<a name="ButtonBarPropTypes.onButtonClick"></a>

### ButtonBarPropTypes.onButtonClick
Triger the functtion when click button.

**Kind**: static property of [<code>ButtonBarPropTypes</code>](#ButtonBarPropTypes)  
<a name="ButtonBarPropTypes.onButtonMouseHover"></a>

### ButtonBarPropTypes.onButtonMouseHover
Triger the function when hover button.

**Kind**: static property of [<code>ButtonBarPropTypes</code>](#ButtonBarPropTypes)  
<a name="ButtonBarPropTypes.onButtonMouseEnter"></a>

### ButtonBarPropTypes.onButtonMouseEnter
Triger the function when enter button.

**Kind**: static property of [<code>ButtonBarPropTypes</code>](#ButtonBarPropTypes)  
<a name="ButtonBarPropTypes.onButtonMouseLeave"></a>

### ButtonBarPropTypes.onButtonMouseLeave
Triger the function when leave button.

**Kind**: static property of [<code>ButtonBarPropTypes</code>](#ButtonBarPropTypes)  
<a name="ButtonBarPropTypes.onButtonMenuSelect"></a>

### ButtonBarPropTypes.onButtonMenuSelect
Triger the functtion when select menu item of the button.

**Kind**: static property of [<code>ButtonBarPropTypes</code>](#ButtonBarPropTypes)  
<a name="ButtonBarProps"></a>

## ButtonBarProps
Default Props for ButtonBar

**Kind**: global constant  
<a name="CalendarProps"></a>

## CalendarProps
Default Props for Calendar

**Kind**: global constant  
<a name="CheckboxPropTypes"></a>

## CheckboxPropTypes
Default PropTypes of Checkbox.

**Kind**: global constant  

* [CheckboxPropTypes](#CheckboxPropTypes)
    * [.disabled](#CheckboxPropTypes.disabled)
    * [.size](#CheckboxPropTypes.size)
    * [.name](#CheckboxPropTypes.name)
    * [.children](#CheckboxPropTypes.children)
    * [.onChange](#CheckboxPropTypes.onChange)
    * [.value](#CheckboxPropTypes.value)

<a name="CheckboxPropTypes.disabled"></a>

### CheckboxPropTypes.disabled
Determines enable/disable state.

**Kind**: static property of [<code>CheckboxPropTypes</code>](#CheckboxPropTypes)  
<a name="CheckboxPropTypes.size"></a>

### CheckboxPropTypes.size
Determines the Checkbox size.

**Kind**: static property of [<code>CheckboxPropTypes</code>](#CheckboxPropTypes)  
<a name="CheckboxPropTypes.name"></a>

### CheckboxPropTypes.name
Field name.

**Kind**: static property of [<code>CheckboxPropTypes</code>](#CheckboxPropTypes)  
<a name="CheckboxPropTypes.children"></a>

### CheckboxPropTypes.children
Child nodes.

**Kind**: static property of [<code>CheckboxPropTypes</code>](#CheckboxPropTypes)  
<a name="CheckboxPropTypes.onChange"></a>

### CheckboxPropTypes.onChange
Fires when value change.

**Kind**: static property of [<code>CheckboxPropTypes</code>](#CheckboxPropTypes)  
<a name="CheckboxPropTypes.value"></a>

### CheckboxPropTypes.value
Checkbox value.

**Kind**: static property of [<code>CheckboxPropTypes</code>](#CheckboxPropTypes)  
<a name="collapsePropTypes"></a>

## collapsePropTypes
Default PropTypes for Collapse

**Kind**: global constant  

* [collapsePropTypes](#collapsePropTypes)
    * [.activeKey](#collapsePropTypes.activeKey)
    * [.dataSource](#collapsePropTypes.dataSource)
    * [.onChange](#collapsePropTypes.onChange)
    * [.multiple](#collapsePropTypes.multiple)
    * [.className](#collapsePropTypes.className)
    * [.style](#collapsePropTypes.style)
    * [.isPanelHeaderFocusable](#collapsePropTypes.isPanelHeaderFocusable)

<a name="collapsePropTypes.activeKey"></a>

### collapsePropTypes.activeKey
Key of the active panel

**Kind**: static property of [<code>collapsePropTypes</code>](#collapsePropTypes)  
<a name="collapsePropTypes.dataSource"></a>

### collapsePropTypes.dataSource
Data record array to be displayed

**Kind**: static property of [<code>collapsePropTypes</code>](#collapsePropTypes)  
<a name="collapsePropTypes.onChange"></a>

### collapsePropTypes.onChange
Callback function executed when active panel is changed

**Kind**: static property of [<code>collapsePropTypes</code>](#collapsePropTypes)  
<a name="collapsePropTypes.multiple"></a>

### collapsePropTypes.multiple
multiple mode, default is null, is collapse mode

**Kind**: static property of [<code>collapsePropTypes</code>](#collapsePropTypes)  
<a name="collapsePropTypes.className"></a>

### collapsePropTypes.className
className to apply

**Kind**: static property of [<code>collapsePropTypes</code>](#collapsePropTypes)  
<a name="collapsePropTypes.style"></a>

### collapsePropTypes.style
The inline style for collapse container element.

**Kind**: static property of [<code>collapsePropTypes</code>](#collapsePropTypes)  
<a name="collapsePropTypes.isPanelHeaderFocusable"></a>

### collapsePropTypes.isPanelHeaderFocusable
Whether the panel header can been focused

**Kind**: static property of [<code>collapsePropTypes</code>](#collapsePropTypes)  
<a name="propTypes"></a>

## propTypes
Default PropTypes for Panel

**Kind**: global constant  

* [propTypes](#propTypes)
    * [.className](#propTypes.className)
    * [.content](#propTypes.content)
    * [.disabled](#propTypes.disabled)
    * [.ariaLableExpand](#propTypes.ariaLableExpand)
    * [.ariaLableCollapse](#propTypes.ariaLableCollapse)
    * [.className](#propTypes.className)
    * [.prefix](#propTypes.prefix)
    * [.items](#propTypes.items)
    * [.deleteFile](#propTypes.deleteFile)
    * [.className](#propTypes.className)
    * [.onClose](#propTypes.onClose)
    * [.title](#propTypes.title)
    * [.style](#propTypes.style)
    * [.shown](#propTypes.shown)
    * [.children](#propTypes.children)
    * [.className](#propTypes.className) : <code>String</code>
    * [.prefix](#propTypes.prefix) : <code>String</code>
    * [.showColon](#propTypes.showColon) : <code>Boolean</code>
    * [.items](#propTypes.items) : <code>Array</code>
    * [.status](#propTypes.status)
    * [.icon](#propTypes.icon)
    * [.description](#propTypes.description)
    * [.title](#propTypes.title)
    * [.className](#propTypes.className)
    * [.direction](#propTypes.direction)
    * [.labelPlacement](#propTypes.labelPlacement)
    * [.currentStatus](#propTypes.currentStatus)
    * [.current](#propTypes.current)
    * [.dataSource](#propTypes.dataSource)

<a name="propTypes.className"></a>

### propTypes.className
customize class for Collapse section

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.content"></a>

### propTypes.content
content of the panel

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.disabled"></a>

### propTypes.disabled
If true, panel cannot be opened or closed

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.ariaLableExpand"></a>

### propTypes.ariaLableExpand
Determines the aria-label text on expanded

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.ariaLableCollapse"></a>

### propTypes.ariaLableCollapse
Determines the aria-label text on collapsed

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.className"></a>

### propTypes.className
additional css class of root dom node.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.prefix"></a>

### propTypes.prefix
The prefix of FileGallery component element class name.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.items"></a>

### propTypes.items
Data record array to be displayed.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.deleteFile"></a>

### propTypes.deleteFile
set the handler to handle deleteFile event.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.className"></a>

### propTypes.className
A list of class names to pass along to the container element of component.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.onClose"></a>

### propTypes.onClose
The callback function that is triggered when the modal closes.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.title"></a>

### propTypes.title
The text value of modal title.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.style"></a>

### propTypes.style
The inline style for modal container element.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.shown"></a>

### propTypes.shown
Determines the display state of modal.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.children"></a>

### propTypes.children
The child nodes for modal component.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.className"></a>

### propTypes.className : <code>String</code>
Specified class name for the PropertyList.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.prefix"></a>

### propTypes.prefix : <code>String</code>
Determines the skin prefix of PropertyList.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.showColon"></a>

### propTypes.showColon : <code>Boolean</code>
whether to display : after label text

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.items"></a>

### propTypes.items : <code>Array</code>
Determines the data of list. It's element is an object, a total of these attributes:

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> \| <code>Number</code> \| <code>Element</code> | label name |
| value | <code>String</code> \| <code>Number</code> \| <code>Element</code> \| <code>Array</code> | label value |
| className | <code>String</code> | Specify item specified class name |
| showNullName | <code>Boolean</code> | When the item value is empty, the control name is displayed |
| onRenderValue | <code>function</code> | Function to customize the cell value |
| onRenderName | <code>function</code> | Function to customize the cell name |

<a name="propTypes.status"></a>

### propTypes.status
to specify the status. It will be automatically set by current of Steps if
not configured. Optional values are, wait, process, finish, error, other

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.icon"></a>

### propTypes.icon
icon of the step, optional property

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.description"></a>

### propTypes.description
description of the step, optional property

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.title"></a>

### propTypes.title
title of the step

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.className"></a>

### propTypes.className
className to apply

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.direction"></a>

### propTypes.direction
to specify the direction of the step bar, horizontal or vertical

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.labelPlacement"></a>

### propTypes.labelPlacement
place title and description with horizontal or vertical direction

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.currentStatus"></a>

### propTypes.currentStatus
to specify the status of current step, can be set to one of
the following values, wait process finish error

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.current"></a>

### propTypes.current
to set the current step, counting from 1. You can overwrite this state by using status of Step

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.dataSource"></a>

### propTypes.dataSource
Data record array to be displayed

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="ColumnListProps"></a>

## ColumnListProps
Default Props for List

**Kind**: global constant  
<a name="ComboBoxProps"></a>

## ComboBoxProps
Default Props of ComboBox

**Kind**: global constant  
<a name="DatePickerPropTypes"></a>

## DatePickerPropTypes
Default PropTypes of DatePicker.

**Kind**: global constant  

* [DatePickerPropTypes](#DatePickerPropTypes)
    * [.className](#DatePickerPropTypes.className)
    * [.style](#DatePickerPropTypes.style)
    * [.name](#DatePickerPropTypes.name)
    * [.showIcon](#DatePickerPropTypes.showIcon)
    * [.errored](#DatePickerPropTypes.errored)
    * [.min](#DatePickerPropTypes.min)
    * [.max](#DatePickerPropTypes.max)
    * [.disabledDates](#DatePickerPropTypes.disabledDates)
    * [.value](#DatePickerPropTypes.value)
    * [.formatDate](#DatePickerPropTypes.formatDate)
    * [.formatTextValue](#DatePickerPropTypes.formatTextValue)
    * [.onValueChange](#DatePickerPropTypes.onValueChange)
    * [.onCalendarOpen](#DatePickerPropTypes.onCalendarOpen)
    * [.onCalendarClose](#DatePickerPropTypes.onCalendarClose)

<a name="DatePickerPropTypes.className"></a>

### DatePickerPropTypes.className
Determines the class name.

**Kind**: static property of [<code>DatePickerPropTypes</code>](#DatePickerPropTypes)  
<a name="DatePickerPropTypes.style"></a>

### DatePickerPropTypes.style
Determines the style.

**Kind**: static property of [<code>DatePickerPropTypes</code>](#DatePickerPropTypes)  
<a name="DatePickerPropTypes.name"></a>

### DatePickerPropTypes.name
Determines the date picker name attribute.

**Kind**: static property of [<code>DatePickerPropTypes</code>](#DatePickerPropTypes)  
<a name="DatePickerPropTypes.showIcon"></a>

### DatePickerPropTypes.showIcon
whether to display the date picker icon.

**Kind**: static property of [<code>DatePickerPropTypes</code>](#DatePickerPropTypes)  
<a name="DatePickerPropTypes.errored"></a>

### DatePickerPropTypes.errored
whether to have errors.

**Kind**: static property of [<code>DatePickerPropTypes</code>](#DatePickerPropTypes)  
<a name="DatePickerPropTypes.min"></a>

### DatePickerPropTypes.min
Determines the min date.

**Kind**: static property of [<code>DatePickerPropTypes</code>](#DatePickerPropTypes)  
<a name="DatePickerPropTypes.max"></a>

### DatePickerPropTypes.max
Determines the max date.

**Kind**: static property of [<code>DatePickerPropTypes</code>](#DatePickerPropTypes)  
<a name="DatePickerPropTypes.disabledDates"></a>

### DatePickerPropTypes.disabledDates
Determines the min date value.

**Kind**: static property of [<code>DatePickerPropTypes</code>](#DatePickerPropTypes)  
<a name="DatePickerPropTypes.value"></a>

### DatePickerPropTypes.value
Determines the default date.

**Kind**: static property of [<code>DatePickerPropTypes</code>](#DatePickerPropTypes)  
<a name="DatePickerPropTypes.formatDate"></a>

### DatePickerPropTypes.formatDate
A function called when format date.

**Kind**: static property of [<code>DatePickerPropTypes</code>](#DatePickerPropTypes)  
<a name="DatePickerPropTypes.formatTextValue"></a>

### DatePickerPropTypes.formatTextValue
A function called when format date to text.

**Kind**: static property of [<code>DatePickerPropTypes</code>](#DatePickerPropTypes)  
<a name="DatePickerPropTypes.onValueChange"></a>

### DatePickerPropTypes.onValueChange
A function called when date changed.

**Kind**: static property of [<code>DatePickerPropTypes</code>](#DatePickerPropTypes)  
<a name="DatePickerPropTypes.onCalendarOpen"></a>

### DatePickerPropTypes.onCalendarOpen
A function called when date canlendar open.

**Kind**: static property of [<code>DatePickerPropTypes</code>](#DatePickerPropTypes)  
<a name="DatePickerPropTypes.onCalendarClose"></a>

### DatePickerPropTypes.onCalendarClose
A function called when date canlendar close.

**Kind**: static property of [<code>DatePickerPropTypes</code>](#DatePickerPropTypes)  
<a name="ContentViewPropTypes"></a>

## ContentViewPropTypes
Default PropTypes of DialogBox

**Kind**: global constant  

* [ContentViewPropTypes](#ContentViewPropTypes)
    * [.onCancel](#ContentViewPropTypes.onCancel)
    * [.onConfirm](#ContentViewPropTypes.onConfirm)

<a name="ContentViewPropTypes.onCancel"></a>

### ContentViewPropTypes.onCancel
The callback function that is triggered when click the cancel button.

**Kind**: static property of [<code>ContentViewPropTypes</code>](#ContentViewPropTypes)  
<a name="ContentViewPropTypes.onConfirm"></a>

### ContentViewPropTypes.onConfirm
The callback function that is triggered when click the confirm button.

**Kind**: static property of [<code>ContentViewPropTypes</code>](#ContentViewPropTypes)  
<a name="ContentViewDefaultProps"></a>

## ContentViewDefaultProps
Default Props for ContentView

**Kind**: global constant  
<a name="DialogBoxPropTypes"></a>

## DialogBoxPropTypes
Default PropTypes of DialogBox.

**Kind**: global constant  

* [DialogBoxPropTypes](#DialogBoxPropTypes)
    * [.onCancel](#DialogBoxPropTypes.onCancel)
    * [.onConfirm](#DialogBoxPropTypes.onConfirm)
    * [.title](#DialogBoxPropTypes.title)
    * [.contentView](#DialogBoxPropTypes.contentView)
    * [.contentProps](#DialogBoxPropTypes.contentProps)
    * [.showCancel](#DialogBoxPropTypes.showCancel)
    * [.cancelText](#DialogBoxPropTypes.cancelText)
    * [.confirmText](#DialogBoxPropTypes.confirmText)
    * [.dangerMode](#DialogBoxPropTypes.dangerMode)

<a name="DialogBoxPropTypes.onCancel"></a>

### DialogBoxPropTypes.onCancel
The callback function that is triggered when click the cancel button.

**Kind**: static property of [<code>DialogBoxPropTypes</code>](#DialogBoxPropTypes)  
<a name="DialogBoxPropTypes.onConfirm"></a>

### DialogBoxPropTypes.onConfirm
The callback function that is triggered when click the confirm button.

**Kind**: static property of [<code>DialogBoxPropTypes</code>](#DialogBoxPropTypes)  
<a name="DialogBoxPropTypes.title"></a>

### DialogBoxPropTypes.title
Determines dialog title.

**Kind**: static property of [<code>DialogBoxPropTypes</code>](#DialogBoxPropTypes)  
<a name="DialogBoxPropTypes.contentView"></a>

### DialogBoxPropTypes.contentView
Determines dialog content.

**Kind**: static property of [<code>DialogBoxPropTypes</code>](#DialogBoxPropTypes)  
<a name="DialogBoxPropTypes.contentProps"></a>

### DialogBoxPropTypes.contentProps
Determines the props of content view.

**Kind**: static property of [<code>DialogBoxPropTypes</code>](#DialogBoxPropTypes)  
<a name="DialogBoxPropTypes.showCancel"></a>

### DialogBoxPropTypes.showCancel
Whether to display the cancel button.

**Kind**: static property of [<code>DialogBoxPropTypes</code>](#DialogBoxPropTypes)  
<a name="DialogBoxPropTypes.cancelText"></a>

### DialogBoxPropTypes.cancelText
Determines cancel text.

**Kind**: static property of [<code>DialogBoxPropTypes</code>](#DialogBoxPropTypes)  
<a name="DialogBoxPropTypes.confirmText"></a>

### DialogBoxPropTypes.confirmText
Determines confirm text.

**Kind**: static property of [<code>DialogBoxPropTypes</code>](#DialogBoxPropTypes)  
<a name="DialogBoxPropTypes.dangerMode"></a>

### DialogBoxPropTypes.dangerMode
Determines whether to use useDangerouslySetInnerHTML to translate text.

**Kind**: static property of [<code>DialogBoxPropTypes</code>](#DialogBoxPropTypes)  
<a name="DialogBoxDefaultProps"></a>

## DialogBoxDefaultProps
Default Props for DialogBox.

**Kind**: global constant  
<a name="DropdownPropTypes"></a>

## DropdownPropTypes
Default PropTypes of Dropdown.

**Kind**: global constant  

* [DropdownPropTypes](#DropdownPropTypes)
    * [.className](#DropdownPropTypes.className)
    * [.value](#DropdownPropTypes.value)
    * [.defaultValue](#DropdownPropTypes.defaultValue)
    * [.maxHeight](#DropdownPropTypes.maxHeight)
    * [.placeholder](#DropdownPropTypes.placeholder)
    * [.filterPlaceholder](#DropdownPropTypes.filterPlaceholder)
    * [.preIcon](#DropdownPropTypes.preIcon)
    * [.size](#DropdownPropTypes.size)
    * [.theme](#DropdownPropTypes.theme)
    * [.isMoreButton](#DropdownPropTypes.isMoreButton)
    * [.disabled](#DropdownPropTypes.disabled)
    * [.filter](#DropdownPropTypes.filter)
    * [.highlight](#DropdownPropTypes.highlight)
    * [.data](#DropdownPropTypes.data)
    * [.style](#DropdownPropTypes.style)
    * [.onChange](#DropdownPropTypes.onChange)
    * [.renderFooter](#DropdownPropTypes.renderFooter)
    * [.className](#DropdownPropTypes.className)
    * [.style](#DropdownPropTypes.style)
    * [.disabled](#DropdownPropTypes.disabled)
    * [.placeholder](#DropdownPropTypes.placeholder)
    * [.maxHeight](#DropdownPropTypes.maxHeight)
    * [.filter](#DropdownPropTypes.filter)
    * [.filterPlaceholder](#DropdownPropTypes.filterPlaceholder)
    * [.serverFilter](#DropdownPropTypes.serverFilter)
    * [.autoOpen](#DropdownPropTypes.autoOpen)
    * [.theme](#DropdownPropTypes.theme)
    * [.errored](#DropdownPropTypes.errored)
    * [.showCheckbox](#DropdownPropTypes.showCheckbox)
    * [.showAllCheckbox](#DropdownPropTypes.showAllCheckbox)
    * [.showTextTip](#DropdownPropTypes.showTextTip)
    * [.showSpiner](#DropdownPropTypes.showSpiner)
    * [.errorInfo](#DropdownPropTypes.errorInfo)
    * [.showResults](#DropdownPropTypes.showResults)
    * [.results](#DropdownPropTypes.results)
    * [.showError](#DropdownPropTypes.showError)
    * [.errorInfoTemplate](#DropdownPropTypes.errorInfoTemplate)
    * [.onlyDefaultPlaceholder](#DropdownPropTypes.onlyDefaultPlaceholder)
    * [.prefix](#DropdownPropTypes.prefix)
    * [.value](#DropdownPropTypes.value)
    * [.defaultValue](#DropdownPropTypes.defaultValue)
    * [.data](#DropdownPropTypes.data)
    * [.onChange](#DropdownPropTypes.onChange)
    * [.fuzzyQuery](#DropdownPropTypes.fuzzyQuery)
    * [.showTxtOnlyCheckedOneItem](#DropdownPropTypes.showTxtOnlyCheckedOneItem)
    * [.visible](#DropdownPropTypes.visible)
    * [.showDeselectall](#DropdownPropTypes.showDeselectall)
    * [.txtSuffix](#DropdownPropTypes.txtSuffix)
    * [.noResult](#DropdownPropTypes.noResult)

<a name="DropdownPropTypes.className"></a>

### DropdownPropTypes.className
Custom class name.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.value"></a>

### DropdownPropTypes.value
Dropdown value.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.defaultValue"></a>

### DropdownPropTypes.defaultValue
Dropdown default value.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.maxHeight"></a>

### DropdownPropTypes.maxHeight
The max height of dropdown list.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.placeholder"></a>

### DropdownPropTypes.placeholder
Dropdown place holder, and the default value is 'Select one...'.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.filterPlaceholder"></a>

### DropdownPropTypes.filterPlaceholder
Filter place holder, and the default value is 'Filter...'.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.preIcon"></a>

### DropdownPropTypes.preIcon
Display which icon inside of dropdown.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.size"></a>

### DropdownPropTypes.size
Dropdown size such as m, lg. And the default value is m.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.theme"></a>

### DropdownPropTypes.theme
Dropdown theme such as flat, gradient and borderless. And the default value is flat.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.isMoreButton"></a>

### DropdownPropTypes.isMoreButton
Whether or not to show more buttons.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.disabled"></a>

### DropdownPropTypes.disabled
Whether or not to change dropdown.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.filter"></a>

### DropdownPropTypes.filter
Whether or not to show filter.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.highlight"></a>

### DropdownPropTypes.highlight
Whether or not to show highlight.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.data"></a>

### DropdownPropTypes.data
The data list of dropdown options.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.style"></a>

### DropdownPropTypes.style
Custom style object.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.onChange"></a>

### DropdownPropTypes.onChange
Fires when value change.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.renderFooter"></a>

### DropdownPropTypes.renderFooter
Render footer

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.className"></a>

### DropdownPropTypes.className
Custom class name.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.style"></a>

### DropdownPropTypes.style
Custom style object.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.disabled"></a>

### DropdownPropTypes.disabled
Whether or not to change dropdown.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.placeholder"></a>

### DropdownPropTypes.placeholder
Dropdown place holder, and the default value is 'Select one...'.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.maxHeight"></a>

### DropdownPropTypes.maxHeight
The max height of dropdown list.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.filter"></a>

### DropdownPropTypes.filter
Whether or not to show filter.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.filterPlaceholder"></a>

### DropdownPropTypes.filterPlaceholder
Filter place holder, and the default value is 'Filter...'.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.serverFilter"></a>

### DropdownPropTypes.serverFilter
Whether or not to show filter.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.autoOpen"></a>

### DropdownPropTypes.autoOpen
Whether or not to show data list when init.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.theme"></a>

### DropdownPropTypes.theme
Dropdown theme such as flat, gradient and borderless. And the default value is flat.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.errored"></a>

### DropdownPropTypes.errored
Whether or not to show error style.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showCheckbox"></a>

### DropdownPropTypes.showCheckbox
Whether or not to display checkbox of each option.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showAllCheckbox"></a>

### DropdownPropTypes.showAllCheckbox
Whether or not to dispaly check all option.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showTextTip"></a>

### DropdownPropTypes.showTextTip
Whether or not to show text tip when hovering the option.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showSpiner"></a>

### DropdownPropTypes.showSpiner
Whether or not to show spiner when loading data.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.errorInfo"></a>

### DropdownPropTypes.errorInfo
Error message.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showResults"></a>

### DropdownPropTypes.showResults
Whether or not to show the count of data list.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.results"></a>

### DropdownPropTypes.results
Customize how to render Count of data list.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showError"></a>

### DropdownPropTypes.showError
Whether or not to show error message.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.errorInfoTemplate"></a>

### DropdownPropTypes.errorInfoTemplate
Error infomation template.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.onlyDefaultPlaceholder"></a>

### DropdownPropTypes.onlyDefaultPlaceholder
Whether or not to onlyt show text as default place holder.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.prefix"></a>

### DropdownPropTypes.prefix
The prefix of text.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.value"></a>

### DropdownPropTypes.value
Dropdown value.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.defaultValue"></a>

### DropdownPropTypes.defaultValue
Dropdown default value.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.data"></a>

### DropdownPropTypes.data
Display which icon inside of dropdown.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.onChange"></a>

### DropdownPropTypes.onChange
Fires when value change.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.fuzzyQuery"></a>

### DropdownPropTypes.fuzzyQuery
Whether or not to get data with fuzzy query.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showTxtOnlyCheckedOneItem"></a>

### DropdownPropTypes.showTxtOnlyCheckedOneItem
Whether or not to show checked items text just checked one item.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.visible"></a>

### DropdownPropTypes.visible
Whether or not to show the menu list of Dropdown.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showDeselectall"></a>

### DropdownPropTypes.showDeselectall
Whether or not to show the icon of deselectting all items .

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.txtSuffix"></a>

### DropdownPropTypes.txtSuffix
The suffix text of button.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.noResult"></a>

### DropdownPropTypes.noResult
The text when length of data list is 0.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownProps"></a>

## DropdownProps
Default Props for Dropdown

**Kind**: global constant  
<a name="DropdownPropTypes"></a>

## DropdownPropTypes
Default PropTypes of Dropdown.

**Kind**: global constant  

* [DropdownPropTypes](#DropdownPropTypes)
    * [.className](#DropdownPropTypes.className)
    * [.value](#DropdownPropTypes.value)
    * [.defaultValue](#DropdownPropTypes.defaultValue)
    * [.maxHeight](#DropdownPropTypes.maxHeight)
    * [.placeholder](#DropdownPropTypes.placeholder)
    * [.filterPlaceholder](#DropdownPropTypes.filterPlaceholder)
    * [.preIcon](#DropdownPropTypes.preIcon)
    * [.size](#DropdownPropTypes.size)
    * [.theme](#DropdownPropTypes.theme)
    * [.isMoreButton](#DropdownPropTypes.isMoreButton)
    * [.disabled](#DropdownPropTypes.disabled)
    * [.filter](#DropdownPropTypes.filter)
    * [.highlight](#DropdownPropTypes.highlight)
    * [.data](#DropdownPropTypes.data)
    * [.style](#DropdownPropTypes.style)
    * [.onChange](#DropdownPropTypes.onChange)
    * [.renderFooter](#DropdownPropTypes.renderFooter)
    * [.className](#DropdownPropTypes.className)
    * [.style](#DropdownPropTypes.style)
    * [.disabled](#DropdownPropTypes.disabled)
    * [.placeholder](#DropdownPropTypes.placeholder)
    * [.maxHeight](#DropdownPropTypes.maxHeight)
    * [.filter](#DropdownPropTypes.filter)
    * [.filterPlaceholder](#DropdownPropTypes.filterPlaceholder)
    * [.serverFilter](#DropdownPropTypes.serverFilter)
    * [.autoOpen](#DropdownPropTypes.autoOpen)
    * [.theme](#DropdownPropTypes.theme)
    * [.errored](#DropdownPropTypes.errored)
    * [.showCheckbox](#DropdownPropTypes.showCheckbox)
    * [.showAllCheckbox](#DropdownPropTypes.showAllCheckbox)
    * [.showTextTip](#DropdownPropTypes.showTextTip)
    * [.showSpiner](#DropdownPropTypes.showSpiner)
    * [.errorInfo](#DropdownPropTypes.errorInfo)
    * [.showResults](#DropdownPropTypes.showResults)
    * [.results](#DropdownPropTypes.results)
    * [.showError](#DropdownPropTypes.showError)
    * [.errorInfoTemplate](#DropdownPropTypes.errorInfoTemplate)
    * [.onlyDefaultPlaceholder](#DropdownPropTypes.onlyDefaultPlaceholder)
    * [.prefix](#DropdownPropTypes.prefix)
    * [.value](#DropdownPropTypes.value)
    * [.defaultValue](#DropdownPropTypes.defaultValue)
    * [.data](#DropdownPropTypes.data)
    * [.onChange](#DropdownPropTypes.onChange)
    * [.fuzzyQuery](#DropdownPropTypes.fuzzyQuery)
    * [.showTxtOnlyCheckedOneItem](#DropdownPropTypes.showTxtOnlyCheckedOneItem)
    * [.visible](#DropdownPropTypes.visible)
    * [.showDeselectall](#DropdownPropTypes.showDeselectall)
    * [.txtSuffix](#DropdownPropTypes.txtSuffix)
    * [.noResult](#DropdownPropTypes.noResult)

<a name="DropdownPropTypes.className"></a>

### DropdownPropTypes.className
Custom class name.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.value"></a>

### DropdownPropTypes.value
Dropdown value.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.defaultValue"></a>

### DropdownPropTypes.defaultValue
Dropdown default value.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.maxHeight"></a>

### DropdownPropTypes.maxHeight
The max height of dropdown list.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.placeholder"></a>

### DropdownPropTypes.placeholder
Dropdown place holder, and the default value is 'Select one...'.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.filterPlaceholder"></a>

### DropdownPropTypes.filterPlaceholder
Filter place holder, and the default value is 'Filter...'.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.preIcon"></a>

### DropdownPropTypes.preIcon
Display which icon inside of dropdown.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.size"></a>

### DropdownPropTypes.size
Dropdown size such as m, lg. And the default value is m.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.theme"></a>

### DropdownPropTypes.theme
Dropdown theme such as flat, gradient and borderless. And the default value is flat.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.isMoreButton"></a>

### DropdownPropTypes.isMoreButton
Whether or not to show more buttons.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.disabled"></a>

### DropdownPropTypes.disabled
Whether or not to change dropdown.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.filter"></a>

### DropdownPropTypes.filter
Whether or not to show filter.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.highlight"></a>

### DropdownPropTypes.highlight
Whether or not to show highlight.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.data"></a>

### DropdownPropTypes.data
The data list of dropdown options.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.style"></a>

### DropdownPropTypes.style
Custom style object.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.onChange"></a>

### DropdownPropTypes.onChange
Fires when value change.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.renderFooter"></a>

### DropdownPropTypes.renderFooter
Render footer

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.className"></a>

### DropdownPropTypes.className
Custom class name.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.style"></a>

### DropdownPropTypes.style
Custom style object.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.disabled"></a>

### DropdownPropTypes.disabled
Whether or not to change dropdown.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.placeholder"></a>

### DropdownPropTypes.placeholder
Dropdown place holder, and the default value is 'Select one...'.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.maxHeight"></a>

### DropdownPropTypes.maxHeight
The max height of dropdown list.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.filter"></a>

### DropdownPropTypes.filter
Whether or not to show filter.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.filterPlaceholder"></a>

### DropdownPropTypes.filterPlaceholder
Filter place holder, and the default value is 'Filter...'.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.serverFilter"></a>

### DropdownPropTypes.serverFilter
Whether or not to show filter.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.autoOpen"></a>

### DropdownPropTypes.autoOpen
Whether or not to show data list when init.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.theme"></a>

### DropdownPropTypes.theme
Dropdown theme such as flat, gradient and borderless. And the default value is flat.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.errored"></a>

### DropdownPropTypes.errored
Whether or not to show error style.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showCheckbox"></a>

### DropdownPropTypes.showCheckbox
Whether or not to display checkbox of each option.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showAllCheckbox"></a>

### DropdownPropTypes.showAllCheckbox
Whether or not to dispaly check all option.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showTextTip"></a>

### DropdownPropTypes.showTextTip
Whether or not to show text tip when hovering the option.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showSpiner"></a>

### DropdownPropTypes.showSpiner
Whether or not to show spiner when loading data.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.errorInfo"></a>

### DropdownPropTypes.errorInfo
Error message.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showResults"></a>

### DropdownPropTypes.showResults
Whether or not to show the count of data list.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.results"></a>

### DropdownPropTypes.results
Customize how to render Count of data list.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showError"></a>

### DropdownPropTypes.showError
Whether or not to show error message.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.errorInfoTemplate"></a>

### DropdownPropTypes.errorInfoTemplate
Error infomation template.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.onlyDefaultPlaceholder"></a>

### DropdownPropTypes.onlyDefaultPlaceholder
Whether or not to onlyt show text as default place holder.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.prefix"></a>

### DropdownPropTypes.prefix
The prefix of text.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.value"></a>

### DropdownPropTypes.value
Dropdown value.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.defaultValue"></a>

### DropdownPropTypes.defaultValue
Dropdown default value.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.data"></a>

### DropdownPropTypes.data
Display which icon inside of dropdown.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.onChange"></a>

### DropdownPropTypes.onChange
Fires when value change.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.fuzzyQuery"></a>

### DropdownPropTypes.fuzzyQuery
Whether or not to get data with fuzzy query.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showTxtOnlyCheckedOneItem"></a>

### DropdownPropTypes.showTxtOnlyCheckedOneItem
Whether or not to show checked items text just checked one item.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.visible"></a>

### DropdownPropTypes.visible
Whether or not to show the menu list of Dropdown.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.showDeselectall"></a>

### DropdownPropTypes.showDeselectall
Whether or not to show the icon of deselectting all items .

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.txtSuffix"></a>

### DropdownPropTypes.txtSuffix
The suffix text of button.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownPropTypes.noResult"></a>

### DropdownPropTypes.noResult
The text when length of data list is 0.

**Kind**: static property of [<code>DropdownPropTypes</code>](#DropdownPropTypes)  
<a name="DropdownProps"></a>

## DropdownProps
Default Props for Dropdown

**Kind**: global constant  
<a name="ItemPropTypes"></a>

## ItemPropTypes
Default PropTypes of Dropdown item.

**Kind**: global constant  

* [ItemPropTypes](#ItemPropTypes)
    * [.data](#ItemPropTypes.data)
    * [.showTextTip](#ItemPropTypes.showTextTip)
    * [.ccs](#ItemPropTypes.ccs)
    * [.click](#ItemPropTypes.click)

<a name="ItemPropTypes.data"></a>

### ItemPropTypes.data
Item data list.

**Kind**: static property of [<code>ItemPropTypes</code>](#ItemPropTypes)  
<a name="ItemPropTypes.showTextTip"></a>

### ItemPropTypes.showTextTip
Whether or not to show text tip when hovering the item.

**Kind**: static property of [<code>ItemPropTypes</code>](#ItemPropTypes)  
<a name="ItemPropTypes.ccs"></a>

### ItemPropTypes.ccs
Custom class name..

**Kind**: static property of [<code>ItemPropTypes</code>](#ItemPropTypes)  
<a name="ItemPropTypes.click"></a>

### ItemPropTypes.click
Click event handler.

**Kind**: static property of [<code>ItemPropTypes</code>](#ItemPropTypes)  
<a name="ItemProps"></a>

## ItemProps
Default Props for Dropdown

**Kind**: global constant  
<a name="DurationPropTypes"></a>

## DurationPropTypes
Default PropTypes of Duration.

**Kind**: global constant  

* [DurationPropTypes](#DurationPropTypes)
    * [.value](#DurationPropTypes.value)
    * [.disabled](#DurationPropTypes.disabled)
    * [.onChange](#DurationPropTypes.onChange)

<a name="DurationPropTypes.value"></a>

### DurationPropTypes.value
Sets the duration, the format is 'hh:mm:ss'.

**Kind**: static property of [<code>DurationPropTypes</code>](#DurationPropTypes)  
<a name="DurationPropTypes.disabled"></a>

### DurationPropTypes.disabled
Whether the duration list is disabled.

**Kind**: static property of [<code>DurationPropTypes</code>](#DurationPropTypes)  
<a name="DurationPropTypes.onChange"></a>

### DurationPropTypes.onChange
The callback function that is triggered when changes the duration.

**Kind**: static property of [<code>DurationPropTypes</code>](#DurationPropTypes)  
<a name="propTypes"></a>

## propTypes
Default PropTypes for FileGallery

**Kind**: global constant  

* [propTypes](#propTypes)
    * [.className](#propTypes.className)
    * [.content](#propTypes.content)
    * [.disabled](#propTypes.disabled)
    * [.ariaLableExpand](#propTypes.ariaLableExpand)
    * [.ariaLableCollapse](#propTypes.ariaLableCollapse)
    * [.className](#propTypes.className)
    * [.prefix](#propTypes.prefix)
    * [.items](#propTypes.items)
    * [.deleteFile](#propTypes.deleteFile)
    * [.className](#propTypes.className)
    * [.onClose](#propTypes.onClose)
    * [.title](#propTypes.title)
    * [.style](#propTypes.style)
    * [.shown](#propTypes.shown)
    * [.children](#propTypes.children)
    * [.className](#propTypes.className) : <code>String</code>
    * [.prefix](#propTypes.prefix) : <code>String</code>
    * [.showColon](#propTypes.showColon) : <code>Boolean</code>
    * [.items](#propTypes.items) : <code>Array</code>
    * [.status](#propTypes.status)
    * [.icon](#propTypes.icon)
    * [.description](#propTypes.description)
    * [.title](#propTypes.title)
    * [.className](#propTypes.className)
    * [.direction](#propTypes.direction)
    * [.labelPlacement](#propTypes.labelPlacement)
    * [.currentStatus](#propTypes.currentStatus)
    * [.current](#propTypes.current)
    * [.dataSource](#propTypes.dataSource)

<a name="propTypes.className"></a>

### propTypes.className
customize class for Collapse section

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.content"></a>

### propTypes.content
content of the panel

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.disabled"></a>

### propTypes.disabled
If true, panel cannot be opened or closed

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.ariaLableExpand"></a>

### propTypes.ariaLableExpand
Determines the aria-label text on expanded

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.ariaLableCollapse"></a>

### propTypes.ariaLableCollapse
Determines the aria-label text on collapsed

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.className"></a>

### propTypes.className
additional css class of root dom node.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.prefix"></a>

### propTypes.prefix
The prefix of FileGallery component element class name.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.items"></a>

### propTypes.items
Data record array to be displayed.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.deleteFile"></a>

### propTypes.deleteFile
set the handler to handle deleteFile event.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.className"></a>

### propTypes.className
A list of class names to pass along to the container element of component.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.onClose"></a>

### propTypes.onClose
The callback function that is triggered when the modal closes.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.title"></a>

### propTypes.title
The text value of modal title.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.style"></a>

### propTypes.style
The inline style for modal container element.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.shown"></a>

### propTypes.shown
Determines the display state of modal.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.children"></a>

### propTypes.children
The child nodes for modal component.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.className"></a>

### propTypes.className : <code>String</code>
Specified class name for the PropertyList.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.prefix"></a>

### propTypes.prefix : <code>String</code>
Determines the skin prefix of PropertyList.

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.showColon"></a>

### propTypes.showColon : <code>Boolean</code>
whether to display : after label text

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.items"></a>

### propTypes.items : <code>Array</code>
Determines the data of list. It's element is an object, a total of these attributes:

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> \| <code>Number</code> \| <code>Element</code> | label name |
| value | <code>String</code> \| <code>Number</code> \| <code>Element</code> \| <code>Array</code> | label value |
| className | <code>String</code> | Specify item specified class name |
| showNullName | <code>Boolean</code> | When the item value is empty, the control name is displayed |
| onRenderValue | <code>function</code> | Function to customize the cell value |
| onRenderName | <code>function</code> | Function to customize the cell name |

<a name="propTypes.status"></a>

### propTypes.status
to specify the status. It will be automatically set by current of Steps if
not configured. Optional values are, wait, process, finish, error, other

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.icon"></a>

### propTypes.icon
icon of the step, optional property

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.description"></a>

### propTypes.description
description of the step, optional property

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.title"></a>

### propTypes.title
title of the step

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.className"></a>

### propTypes.className
className to apply

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.direction"></a>

### propTypes.direction
to specify the direction of the step bar, horizontal or vertical

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.labelPlacement"></a>

### propTypes.labelPlacement
place title and description with horizontal or vertical direction

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.currentStatus"></a>

### propTypes.currentStatus
to specify the status of current step, can be set to one of
the following values, wait process finish error

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.current"></a>

### propTypes.current
to set the current step, counting from 1. You can overwrite this state by using status of Step

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="propTypes.dataSource"></a>

### propTypes.dataSource
Data record array to be displayed

**Kind**: static property of [<code>propTypes</code>](#propTypes)  
<a name="FileUploadPropTypes"></a>

## FileUploadPropTypes
Default PropTypes for FileUpload

**Kind**: global constant  

* [FileUploadPropTypes](#FileUploadPropTypes)
    * [.prefixCls](#FileUploadPropTypes.prefixCls)
    * [.modalTitle](#FileUploadPropTypes.modalTitle)
    * [.modalClassName](#FileUploadPropTypes.modalClassName)
    * [.style](#FileUploadPropTypes.style)
    * [.className](#FileUploadPropTypes.className)
    * [.showUploadList](#FileUploadPropTypes.showUploadList)
    * [.drag](#FileUploadPropTypes.drag)
    * [.uploadListConfig](#FileUploadPropTypes.uploadListConfig)
    * [.multiple](#FileUploadPropTypes.multiple)
    * [.disabled](#FileUploadPropTypes.disabled)
    * [.headers](#FileUploadPropTypes.headers)
    * [.accept](#FileUploadPropTypes.accept)
    * [.name](#FileUploadPropTypes.name)
    * [.action](#FileUploadPropTypes.action)
    * [.uploadElemId](#FileUploadPropTypes.uploadElemId)
    * [.data](#FileUploadPropTypes.data)
    * [.renderContent](#FileUploadPropTypes.renderContent)
    * [.withCredentials](#FileUploadPropTypes.withCredentials)

<a name="FileUploadPropTypes.prefixCls"></a>

### FileUploadPropTypes.prefixCls
The prefix of file upload component element class name.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.modalTitle"></a>

### FileUploadPropTypes.modalTitle
The title of file upload modal. It's could be a react element.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.modalClassName"></a>

### FileUploadPropTypes.modalClassName
A list of class names to pass along to the file upload modal container.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.style"></a>

### FileUploadPropTypes.style
The inline style for file upload container element.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.className"></a>

### FileUploadPropTypes.className
A list of class names to pass along to the file upload container element.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.showUploadList"></a>

### FileUploadPropTypes.showUploadList
Determines displaying the upload file list.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.drag"></a>

### FileUploadPropTypes.drag
Determines enable select the upload file by dragging.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.uploadListConfig"></a>

### FileUploadPropTypes.uploadListConfig
The Upload file list configs which contains showRemoveIcon, errorMessage, className.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.multiple"></a>

### FileUploadPropTypes.multiple
Determines enable upload multiple files.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.disabled"></a>

### FileUploadPropTypes.disabled
Determines disable state of file upload component.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.headers"></a>

### FileUploadPropTypes.headers
The heads of upload file http request.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.accept"></a>

### FileUploadPropTypes.accept
Determines the types of files that the file upload accepts.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.name"></a>

### FileUploadPropTypes.name
Determines the file name which was sent to server.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.action"></a>

### FileUploadPropTypes.action
Determines the URL where to send the upload file to.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.uploadElemId"></a>

### FileUploadPropTypes.uploadElemId
Determines the upload file dom element id.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.data"></a>

### FileUploadPropTypes.data
Determines the upload form data. It could be function to do post process works.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.renderContent"></a>

### FileUploadPropTypes.renderContent
The function to return child nodes for file upload component

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="FileUploadPropTypes.withCredentials"></a>

### FileUploadPropTypes.withCredentials
Determines withCredentials attribute when uploading file by xhr.

**Kind**: static property of [<code>FileUploadPropTypes</code>](#FileUploadPropTypes)  
<a name="InputProps"></a>

## InputProps
Default Props for Input

**Kind**: global constant  
<a name="InputBankCardPropTypes"></a>

## InputBankCardPropTypes
Default PropTypes for InputBankCard

**Kind**: global constant  

* [InputBankCardPropTypes](#InputBankCardPropTypes)
    * [.className](#InputBankCardPropTypes.className)
    * [.value](#InputBankCardPropTypes.value)
    * [.group](#InputBankCardPropTypes.group)
    * [.maxLength](#InputBankCardPropTypes.maxLength)
    * [.gapChar](#InputBankCardPropTypes.gapChar)
    * [.showPrompt](#InputBankCardPropTypes.showPrompt)
    * [.keepPosition](#InputBankCardPropTypes.keepPosition)
    * [.onInput](#InputBankCardPropTypes.onInput)

<a name="InputBankCardPropTypes.className"></a>

### InputBankCardPropTypes.className
A list of class names to pass along to the container element of component.
Default value is "".

**Kind**: static property of [<code>InputBankCardPropTypes</code>](#InputBankCardPropTypes)  
<a name="InputBankCardPropTypes.value"></a>

### InputBankCardPropTypes.value
Externally exposed value.
Default value is null.

**Kind**: static property of [<code>InputBankCardPropTypes</code>](#InputBankCardPropTypes)  
<a name="InputBankCardPropTypes.group"></a>

### InputBankCardPropTypes.group
Set the length of a group's numbers.
Default value is 4.

**Kind**: static property of [<code>InputBankCardPropTypes</code>](#InputBankCardPropTypes)  
<a name="InputBankCardPropTypes.maxLength"></a>

### InputBankCardPropTypes.maxLength
Set the length of numbers that are allowed to enter.
Default is 16.

**Kind**: static property of [<code>InputBankCardPropTypes</code>](#InputBankCardPropTypes)  
<a name="InputBankCardPropTypes.gapChar"></a>

### InputBankCardPropTypes.gapChar
Determines the delimiter between each group.

**Kind**: static property of [<code>InputBankCardPropTypes</code>](#InputBankCardPropTypes)  
<a name="InputBankCardPropTypes.showPrompt"></a>

### InputBankCardPropTypes.showPrompt
Determines the prompt character displaying.

**Kind**: static property of [<code>InputBankCardPropTypes</code>](#InputBankCardPropTypes)  
<a name="InputBankCardPropTypes.keepPosition"></a>

### InputBankCardPropTypes.keepPosition
Determines the number only can be inserted at empty position.

**Kind**: static property of [<code>InputBankCardPropTypes</code>](#InputBankCardPropTypes)  
<a name="InputBankCardPropTypes.onInput"></a>

### InputBankCardPropTypes.onInput
The callback function that is triggered when changes the number.

**Kind**: static property of [<code>InputBankCardPropTypes</code>](#InputBankCardPropTypes)  
<a name="InputBaseProps"></a>

## InputBaseProps
Default Props for InputBase class

**Kind**: global constant  
<a name="InputDateProps"></a>

## InputDateProps
Default Props for InputDate

**Kind**: global constant  
<a name="InputMaskProps"></a>

## InputMaskProps
Default Props for InputMask

**Kind**: global constant  

* [InputMaskProps](#InputMaskProps)
    * [.mask](#InputMaskProps.mask)
    * [.promptChar](#InputMaskProps.promptChar)
    * [.passwordChar](#InputMaskProps.passwordChar)
    * [.passwordMode](#InputMaskProps.passwordMode)
    * [.hidePromptOnLeave](#InputMaskProps.hidePromptOnLeave)
    * [.allowPromptAsInput](#InputMaskProps.allowPromptAsInput)

<a name="InputMaskProps.mask"></a>

### InputMaskProps.mask
Determines the input mask to use at run time.
Mask must be a string composed of one or more of the masking elements.

The supported mask characters are:

- 0= Digit
- 9= Digit or space
- #= Digit, sign, or space
- L= Letter
- l= Letter or space
- A= Alphanumeric
- a= Alphanumeric or space
- .= Localized decimal point
- ,= Localized thousand separator
- := Localized time separator
- /= Localized date separator
- $= Localized currency symbol
- <= Converts characters that follow to lowercase
- \>= Converts characters that follow to uppercase
- |= Disables case conversion
- \= scapes any character, turning it into a literal

**Kind**: static property of [<code>InputMaskProps</code>](#InputMaskProps)  
<a name="InputMaskProps.promptChar"></a>

### InputMaskProps.promptChar
Determines the character used to represent the absence of user input.

**Kind**: static property of [<code>InputMaskProps</code>](#InputMaskProps)  
<a name="InputMaskProps.passwordChar"></a>

### InputMaskProps.passwordChar
Determines the character to be substituted for the actual input characters in password mode.

**Kind**: static property of [<code>InputMaskProps</code>](#InputMaskProps)  
<a name="InputMaskProps.passwordMode"></a>

### InputMaskProps.passwordMode
Determines whether password char is used.

**Kind**: static property of [<code>InputMaskProps</code>](#InputMaskProps)  
<a name="InputMaskProps.hidePromptOnLeave"></a>

### InputMaskProps.hidePromptOnLeave
Indicates whether the prompt characters in the input mask are hidden
when the input loses focus.

**Kind**: static property of [<code>InputMaskProps</code>](#InputMaskProps)  
<a name="InputMaskProps.allowPromptAsInput"></a>

### InputMaskProps.allowPromptAsInput
Indicates whether promptChar can be entered as valid data by the user.

**Kind**: static property of [<code>InputMaskProps</code>](#InputMaskProps)  
<a name="InputMomentProps"></a>

## InputMomentProps
Default Props for InputMoment

**Kind**: global constant  
<a name="InputNumericProps"></a>

## InputNumericProps
Default Props for InputNumeric class

**Kind**: global constant  
<a name="InputTimeRangePropTypes"></a>

## InputTimeRangePropTypes
Default PropTypes of InputTimeRange.

**Kind**: global constant  

* [InputTimeRangePropTypes](#InputTimeRangePropTypes)
    * [.format](#InputTimeRangePropTypes.format)
    * [.step](#InputTimeRangePropTypes.step)
    * [.disabled](#InputTimeRangePropTypes.disabled)
    * [.value](#InputTimeRangePropTypes.value)
    * [.showTextTip](#InputTimeRangePropTypes.showTextTip)
    * [.items](#InputTimeRangePropTypes.items)

<a name="InputTimeRangePropTypes.format"></a>

### InputTimeRangePropTypes.format
The format pattern to display the time.

**Kind**: static property of [<code>InputTimeRangePropTypes</code>](#InputTimeRangePropTypes)  
<a name="InputTimeRangePropTypes.step"></a>

### InputTimeRangePropTypes.step
Step in time unit when generating the time picker list.

**Kind**: static property of [<code>InputTimeRangePropTypes</code>](#InputTimeRangePropTypes)  
<a name="InputTimeRangePropTypes.disabled"></a>

### InputTimeRangePropTypes.disabled
Whether or not to edit time.

**Kind**: static property of [<code>InputTimeRangePropTypes</code>](#InputTimeRangePropTypes)  
<a name="InputTimeRangePropTypes.value"></a>

### InputTimeRangePropTypes.value
Determines the current selected timeRange

**Kind**: static property of [<code>InputTimeRangePropTypes</code>](#InputTimeRangePropTypes)  
<a name="InputTimeRangePropTypes.showTextTip"></a>

### InputTimeRangePropTypes.showTextTip
Whether or not to show text tip.

**Kind**: static property of [<code>InputTimeRangePropTypes</code>](#InputTimeRangePropTypes)  
<a name="InputTimeRangePropTypes.items"></a>

### InputTimeRangePropTypes.items
Determines the time range dropdowm list.

**Kind**: static property of [<code>InputTimeRangePropTypes</code>](#InputTimeRangePropTypes)  
<a name="InputTimeRangeProps"></a>

## InputTimeRangeProps
Default Props for InputTimeRange

**Kind**: global constant  
<a name="TimeRangePropTypes"></a>

## TimeRangePropTypes
Default PropTypes of TimeRange.

**Kind**: global constant  

* [TimeRangePropTypes](#TimeRangePropTypes)
    * [.format](#TimeRangePropTypes.format)
    * [.step](#TimeRangePropTypes.step)
    * [.unit](#TimeRangePropTypes.unit)

<a name="TimeRangePropTypes.format"></a>

### TimeRangePropTypes.format
The format pattern to display the time.

**Kind**: static property of [<code>TimeRangePropTypes</code>](#TimeRangePropTypes)  
<a name="TimeRangePropTypes.step"></a>

### TimeRangePropTypes.step
Step in time unit when generating the time picker list.

**Kind**: static property of [<code>TimeRangePropTypes</code>](#TimeRangePropTypes)  
<a name="TimeRangePropTypes.unit"></a>

### TimeRangePropTypes.unit
Which type of time unit to increase or decrease by hour or minute or second.

**Kind**: static property of [<code>TimeRangePropTypes</code>](#TimeRangePropTypes)  
<a name="TimeRangeProps"></a>

## TimeRangeProps
Default Props for TimeRange

**Kind**: global constant  
<a name="LabelProps"></a>

## LabelProps
Default Props for Label

**Kind**: global constant  
<a name="ListProps"></a>

## ListProps
Default Props for List

**Kind**: global constant  
<a name="IframeProps"></a>

## IframeProps
Default Props for Calendar

**Kind**: global constant  
<a name="ProgressPropTypes"></a>

## ProgressPropTypes
Default PropTypes of Progress.

**Kind**: global constant  

* [ProgressPropTypes](#ProgressPropTypes)
    * [.percent](#ProgressPropTypes.percent)
    * [.size](#ProgressPropTypes.size)
    * [.showInfo](#ProgressPropTypes.showInfo)

<a name="ProgressPropTypes.percent"></a>

### ProgressPropTypes.percent
Set the completion percentage.

**Kind**: static property of [<code>ProgressPropTypes</code>](#ProgressPropTypes)  
<a name="ProgressPropTypes.size"></a>

### ProgressPropTypes.size
Determines the progress size.

**Kind**: static property of [<code>ProgressPropTypes</code>](#ProgressPropTypes)  
<a name="ProgressPropTypes.showInfo"></a>

### ProgressPropTypes.showInfo
Whether to display the progress value.

**Kind**: static property of [<code>ProgressPropTypes</code>](#ProgressPropTypes)  
<a name="ProgressProps"></a>

## ProgressProps
Default Props for Progress.

**Kind**: global constant  
<a name="PropertyList Props"></a>

## PropertyList Props
Props for PropertyList

**Kind**: global constant  
<a name="ResourceCalendarPropTypes"></a>

## ResourceCalendarPropTypes
Default PropTypes of ResourceCalendar.

**Kind**: global constant  
<a name="ResourceCalendarProps"></a>

## ResourceCalendarProps
Default Props for ResourceCalendar

**Kind**: global constant  
<a name="ScrollerPropTypes"></a>

## ScrollerPropTypes
Default PropTypes of Scroller.

**Kind**: global constant  
<a name="ScrollerProps"></a>

## ScrollerProps
Default Props for Scroller

**Kind**: global constant  
<a name="ScrollerPanePropTypes"></a>

## ScrollerPanePropTypes
Default PropTypes of ScrollerPane.

**Kind**: global constant  
<a name="ScrollerPaneProps"></a>

## ScrollerPaneProps
Default Props for ScrollerPane

**Kind**: global constant  
<a name="HORIZONTAL"></a>

## HORIZONTAL
Horizontal layout as default which is used in AUI now.

**Kind**: global constant  
<a name="VERTICAL"></a>

## VERTICAL
Vertical layout is used in CUI.

**Kind**: global constant  
<a name="INPUT"></a>

## INPUT
free input

**Kind**: global constant  
<a name="RADIO"></a>

## RADIO
single selection shown as radio

**Kind**: global constant  
<a name="SINGLEDROPDOWN"></a>

## SINGLEDROPDOWN
single selection shown as dropdown

**Kind**: global constant  
<a name="CHECKBOX"></a>

## CHECKBOX
multiple selection shown as checkbox

**Kind**: global constant  
<a name="MULTIPLEDROPDOWN"></a>

## MULTIPLEDROPDOWN
multiple selection shown as dropdown

**Kind**: global constant  
<a name="defaultTableProps"></a>

## defaultTableProps
Default Props for Table

**Kind**: global constant  

* [defaultTableProps](#defaultTableProps)
    * [.prefix](#defaultTableProps.prefix) : <code>String</code>
    * [.className](#defaultTableProps.className) : <code>String</code>
    * [.sortable](#defaultTableProps.sortable) : <code>Boolean</code>
    * [.resizable](#defaultTableProps.resizable) : <code>Boolean</code>
    * [.rowSeperator](#defaultTableProps.rowSeperator) : <code>Boolean</code>
    * [.striped](#defaultTableProps.striped) : <code>Boolean</code>
    * [.minWidth](#defaultTableProps.minWidth) : <code>Number</code>
    * [.fixed](#defaultTableProps.fixed) : <code>String</code>
    * [.ariaLableExpand](#defaultTableProps.ariaLableExpand) : <code>String</code>
    * [.ariaLableCollapse](#defaultTableProps.ariaLableCollapse) : <code>String</code>
    * [.onExpand()](#defaultTableProps.onExpand) : <code>function</code>
    * [.onCollapse()](#defaultTableProps.onCollapse) : <code>function</code>

<a name="defaultTableProps.prefix"></a>

### defaultTableProps.prefix : <code>String</code>
Determines the skin prefix of table.

**Kind**: static property of [<code>defaultTableProps</code>](#defaultTableProps)  
<a name="defaultTableProps.className"></a>

### defaultTableProps.className : <code>String</code>
Specified class name for the table.

**Kind**: static property of [<code>defaultTableProps</code>](#defaultTableProps)  
<a name="defaultTableProps.sortable"></a>

### defaultTableProps.sortable : <code>Boolean</code>
Determines the table is sortable or not.

**Kind**: static property of [<code>defaultTableProps</code>](#defaultTableProps)  
<a name="defaultTableProps.resizable"></a>

### defaultTableProps.resizable : <code>Boolean</code>
Determines the table is resizable or not.

**Kind**: static property of [<code>defaultTableProps</code>](#defaultTableProps)  
<a name="defaultTableProps.rowSeperator"></a>

### defaultTableProps.rowSeperator : <code>Boolean</code>
Determines the table has borders between rows or not.

**Kind**: static property of [<code>defaultTableProps</code>](#defaultTableProps)  
<a name="defaultTableProps.striped"></a>

### defaultTableProps.striped : <code>Boolean</code>
Determines the table is striped or not.

**Kind**: static property of [<code>defaultTableProps</code>](#defaultTableProps)  
<a name="defaultTableProps.minWidth"></a>

### defaultTableProps.minWidth : <code>Number</code>
Determines the min width of the column.

**Kind**: static property of [<code>defaultTableProps</code>](#defaultTableProps)  
<a name="defaultTableProps.fixed"></a>

### defaultTableProps.fixed : <code>String</code>
Determines the default fixed row's position in the table.

**Kind**: static property of [<code>defaultTableProps</code>](#defaultTableProps)  
<a name="defaultTableProps.ariaLableExpand"></a>

### defaultTableProps.ariaLableExpand : <code>String</code>
Expand control aria-label text

**Kind**: static property of [<code>defaultTableProps</code>](#defaultTableProps)  
<a name="defaultTableProps.ariaLableCollapse"></a>

### defaultTableProps.ariaLableCollapse : <code>String</code>
Collapse control aria-label text

**Kind**: static property of [<code>defaultTableProps</code>](#defaultTableProps)  
<a name="defaultTableProps.onExpand"></a>

### defaultTableProps.onExpand() : <code>function</code>
Callback when row expanding.

**Kind**: static method of [<code>defaultTableProps</code>](#defaultTableProps)  
<a name="defaultTableProps.onCollapse"></a>

### defaultTableProps.onCollapse() : <code>function</code>
Callback when row collapsing.

**Kind**: static method of [<code>defaultTableProps</code>](#defaultTableProps)  
<a name="TextAreaPropTypes"></a>

## TextAreaPropTypes
Default PropTypes for TextArea

**Kind**: global constant  

* [TextAreaPropTypes](#TextAreaPropTypes)
    * [.className](#TextAreaPropTypes.className)
    * [.value](#TextAreaPropTypes.value)
    * [.onChange](#TextAreaPropTypes.onChange)

<a name="TextAreaPropTypes.className"></a>

### TextAreaPropTypes.className
A list of class names to pass along to the textarea element of component.

**Kind**: static property of [<code>TextAreaPropTypes</code>](#TextAreaPropTypes)  
<a name="TextAreaPropTypes.value"></a>

### TextAreaPropTypes.value
The text value.

**Kind**: static property of [<code>TextAreaPropTypes</code>](#TextAreaPropTypes)  
<a name="TextAreaPropTypes.onChange"></a>

### TextAreaPropTypes.onChange
The callback function that is triggered when changes the text value.

**Kind**: static property of [<code>TextAreaPropTypes</code>](#TextAreaPropTypes)  
<a name="attachResizeEvent"></a>

## attachResizeEvent
**Kind**: global constant  

| Param | Type |
| --- | --- |
| element | <code>HTMLElement</code> | 
| onResized | <code>function</code> | 

<a name="cleanMock"></a>

## cleanMock()
Explicily clean up the API hooks

**Kind**: global function  
<a name="mockAPI"></a>

## mockAPI()
Mock up a batch of API calls

**Kind**: global function  

| Type | Description |
| --- | --- |
| <code>Array</code> | data An array of API matching rule and result data Parameter data can be an object or an array of objects that define the matching rules and mocked result. The object has format as below: {  path: '/json/Cart/loadReservationCart.json',  time: 2,  result: { headers: {}, body: {}} } in which, - path: Path to match. We use strict matching. - time: Optional. Not mean date time, but how many times the API is called. - result: An object with headers & body which follow our response format from server or a redirected path to a new JSON file. |
| <code>function</code> | caseCaller An callback function, it will help to call cleanMock at the end of promise chain. For example(have caseCaller): ```js mockAPI({   path: 'json/Cart/Checkout/get_agreement.json',   result: 'json/Cart/Checkout/get_agreement_error.json' }, () => store.dispatch(getAgreementAsyncAction()).catch((e) => {   //...   done(); })); ``` For example(no caseCaller): ```js mockAPI({   path: 'json/Cart/Checkout/get_agreement.json',   result: 'json/Cart/Checkout/get_agreement_error.json' }); store.dispatch(getAgreementAsyncAction()).catch((e) => {   //...   cleanMock();   done(); })); ``` |

<a name="popup"></a>

## popup(calendarOptions, popupOptions) ⇒ <code>Promise</code>
Popup a calendar.

**Kind**: global function  
**Returns**: <code>Promise</code> - Returns a promise, from where we can get the selected date or error.  

| Param | Type | Description |
| --- | --- | --- |
| calendarOptions | <code>object</code> | Configured options of Calendar when calling the popup. |
| popupOptions | <code>object</code> | Configured options of popup service when calling the popup. |

<a name="popup"></a>

## popup(listOptions, popupOptions) ⇒ <code>Promise</code>
Popup a columnlist.

**Kind**: global function  
**Returns**: <code>Promise</code> - Returns a promise, from where we can get the selected date or error.  

| Param | Type | Description |
| --- | --- | --- |
| listOptions | <code>object</code> | Configured options of List when calling the popup. |
| popupOptions | <code>object</code> | Configured options of popup service when calling the popup. |

<a name="popup"></a>

## popup(popupOptions, dialogBoxOptions) ⇒ <code>Promise</code>
Popup a Dialog.

**Kind**: global function  
**Returns**: <code>Promise</code> - Returns a promise, from where we can get the selected date or error.  

| Param | Type | Description |
| --- | --- | --- |
| popupOptions | <code>object</code> | Configured options of popup service when calling the popup. |
| dialogBoxOptions | <code>object</code> | Configured options of DialogBox when calling the popup. |

<a name="popup"></a>

## popup(listOptions, popupOptions) ⇒ <code>Promise</code>
Popup a list.

**Kind**: global function  
**Returns**: <code>Promise</code> - Returns a promise, from where we can get the selected date or error.  

| Param | Type | Description |
| --- | --- | --- |
| listOptions | <code>object</code> | Configured options of List when calling the popup. |
| popupOptions | <code>object</code> | Configured options of popup service when calling the popup. |

<a name="Icon"></a>

## Icon()
UI component to display an icon based on the SVG sprite technology

Usage:

1. Install the "svg-sprite-loader", more details can be found at
https://www.npmjs.com/package/svg-sprite-loader
```bash
npm i -S "svg-sprite-loader"
```
2. Add a webpack rule to let it resolve the svg icons through the "svg-sprite-loader".
```js
// build/sections/rules/icon.js
{
  test: /\.svg$/,
  use: [
    {
      loader: 'svg-sprite-loader',
      options: {
        symbolId: 'icon-[name]'
      }
    }
  ]
  include: [/\/icons\//]
}
```
You may need to exclude your icon paths in the webpack's font rules because font rules
may also resolve the files with ".svg" suffix.
```js
// build/sections/rules/font.js
{
  test: /\.(eot|ttf|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        symbolId: 'fonts/[name].[ext]'
      }
    }
  ]
  exclude: [/\/icons\//]
}
```
3. Put the icon files in the paths follow your webpack's configuration.
```js
MyComponent
├── index.jsx
├── index.less
└── icons
    ├── icon1.svg
    ├── icon2.svg
    └── index.js
```
4. Add an index file and import the svg icons.
```js
// MyComponent/icons/index.js
import './icon1.svg';
import './icon2.svg';
```
5. Import the index file of your icon files.
```js
// MyComponent/index.jsx
import './icons';
```
6. Render the Icon component with the desired SVG symbol name.
```js
// MyComponent/index.jsx
<Icon name="icon1" />
<Icon name="icon2" />
```
There is a "symbolPrefix" prop and it's default value is "icon".
If your "svg-sprite-loader" set the "symbolId" in another value,
You should pass a "symbolPrefix" prop to follow the "symbolId" option.
```js
// build/sections/rules/icon.js
// set symbolId pattern as 'an-icon-[name]'
{
  test: /\.svg$/,
  use: [
    {
      loader: 'svg-sprite-loader',
      options: {
        symbolId: 'an-icon-[name]'
      }
    }
  ]
  include: [/\/icons\//]
}

// MyComponent/index.jsx
// keep the symbolId in the same pattern by "symbolPrefix" prop
<Icon symbolPrefix="an-icon" name="icon1" />
<Icon symbolPrefix="an-icon" name="icon2" />
```

**Kind**: global function  
<a name="SVG"></a>

## SVG()
UI component to display an SVG image based on the SVG sprite technology

Usage:

1. Install the "svg-sprite-loader", more details can be found at
https://www.npmjs.com/package/svg-sprite-loader
```bash
npm i -S "svg-sprite-loader"
```
2. Add a webpack rule to let it resolve the svg images through the "svg-sprite-loader".
```js
// build/sections/rules/svg.js
{
  test: /\.svg$/,
  use: [
    {
      loader: 'svg-sprite-loader',
      options: {
        symbolId: 'svg-[name]'
      }
    }
  ]
  include: [/\/svgs\//]
}
```
You may need to exclude your svg paths in the webpack's font rules because font rules
may also resolve the files with ".svg" suffix.
```js
// build/sections/rules/font.js
{
  test: /\.(eot|ttf|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        symbolId: 'fonts/[name].[ext]'
      }
    }
  ]
  exclude: [/\/svgs\//]
}
```
3. Put the svg images in the paths follow your webpack's configuration.
```js
MyComponent
├── index.jsx
├── index.less
└── svgs
    ├── a.svg
    ├── b.svg
    └── index.js
```
4. Add an index file and import the svg images.
```js
// MyComponent/svgs/index.js
import './a.svg';
import './b.svg';
```
5. Import the index file of your svg images.
```js
// MyComponent/index.jsx
import './svgs';
```
6. Render the SVG component with the desired SVG symbol name.
```js
// MyComponent/index.jsx
<SVG name="a" />
<SVG name="a" />
```
There is a "symbolPrefix" prop and it's default value is "svg".
If your "svg-sprite-loader" set the "symbolId" in another value,
You should pass a "symbolPrefix" prop to follow the "symbolId" option.
```js
// build/sections/rules/svg.js
// set symbolId pattern as 'an-svg-[name]'
{
  test: /\.svg$/,
  use: [
    {
      loader: 'svg-sprite-loader',
      options: {
        symbolId: 'an-svg-[name]'
      }
    }
  ]
  include: [/\/svgs\//]
}

// MyComponent/index.jsx
// keep the symbolId in the same pattern by "symbolPrefix" prop
<SVG name="a" />
<SVG name="b" />
```

**Kind**: global function  
<a name="attachPopupMenu"></a>

## attachPopupMenu(target, items, id, onSelected)
Add a simple PopupMenu to a dom element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>DOM</code> | Dom element which will be added PopupMenu |
| items | <code>Array</code> | A menu list for content @see [data](#List.ListPropTypes.data) |
| items.text | <code>string</code> | text of current item, it will display on menu |
| items.value | <code>string</code> | value of current item |
| id | <code>string</code> | PopupMenu's identify |
| onSelected | <code>function</code> | A function that will be triggered when menu be selected |

<a name="clearPopupMenu"></a>

## clearPopupMenu(target)
Remove PopUpMenu from a dom element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>DOM</code> | Dom element which will be removed PopupMenu |

<a name="popupMenu"></a>

## popupMenu()
Popup a menu immediately, you don't need to use this method in most time,
just using attachPopupMenu method.

All params are same with attachPopupMenu method,@see [attachPopupMenu](#attachPopupMenu)

**Kind**: global function  
<a name="RowData"></a>

## RowData : <code>Object</code>
Collection of structured data to render.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Plain Javascript object hold the row's data |
| expanded | <code>Boolean</code> | Determines the child rows expanded or not |
| hidden | <code>Boolean</code> | Determins the row is hidden or not |
| className | <code>String</code> | Specify row specified class name |
| fixed | <code>Number</code> | Fix row at specified position in the table - 'top' - 'bottom' |
| expandControl | <code>String</code> | Key name determines which column                                  should be the expand control |
| extraRows | [<code>Array.&lt;RowData&gt;</code>](#RowData) | An array of RowData contains extra rows for current row |
| children | [<code>Array.&lt;RowData&gt;</code>](#RowData) | An object array of RowData contains child rows for current row, and the child rows could be expanded or collapsed |

<a name="ColumnDef"></a>

## ColumnDef : [<code>Array.&lt;ColumnDef&gt;</code>](#ColumnDef)
Data rendering descriptions.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | Title of this column |
| keyName | <code>String</code> | Data's key name for this column in RowData's data property |
| className | <code>String</code> | Specify column specified class name |
| colSpan | <code>Number</code> | Specify cell to cross columns |
| format | <code>function</code> | Function to format cell date |
| render | <code>function</code> | Function to customize the cell rendering |
| sorter | <code>function</code> | Customer sort function for sorting column |

