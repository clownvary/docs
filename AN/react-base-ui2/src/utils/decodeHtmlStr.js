import isString from 'lodash/isString';
import toString from 'lodash/toString';

/* The mostly concerned characters are
    &amp; -> '&'
    &lt; -> '<'
    &gt; -> '>'
    &nbsp; -> ' '
    &#39; -> '\''
    &quot; -> '\"'
    &#126; -> '~'
    &#096; -> '`'
*/


export default (str = '') => {
  if (!str) {
    return '';
  }
  if (!isString(str)) {
    str = toString(str);
  }
  str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const span = document.createElement('span');
  span.innerHTML = str;
  return span.textContent;
};
