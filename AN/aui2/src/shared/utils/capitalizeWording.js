import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import capitalize from 'lodash/capitalize';

const capitalizeWording = wording => capitalize(decodeHtmlStr(wording));

export default capitalizeWording;
