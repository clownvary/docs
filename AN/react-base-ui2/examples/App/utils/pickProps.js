
import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';
import isEmpty from 'lodash/isEmpty';

const pickProps = (settings, names) => {
  const props = isEmpty(names) ? settings : pick(settings, names);
  return mapValues(props, p => p.value);
};

export default pickProps;
