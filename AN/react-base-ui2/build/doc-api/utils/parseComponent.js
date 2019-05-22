import doctrine from 'doctrine';
import colors from 'colors';
import isObject from 'lodash/isObject';
import escapeCell from './escapeCell';

const parseComponent = (filename, originalComponent) => {
  try {
    const description = doctrine.parse(originalComponent.description, {
      sloppy: true
    }).description;
    const escapedDescription = escapeCell(description);

    const component = {
      title: originalComponent.displayName,
      description: escapedDescription,
      className: originalComponent.displayName,
      superClassName: originalComponent.superClassName,
      props: []
    };


    if (!originalComponent.props) {
      return component;
    }

    component.props = parseProps(originalComponent.props);
    component.superClassName;

    return component;
  } catch (e) {
    console.log(colors.red(`[Parse Component]: parse ${colors.cyan(originalComponent.displayName)} failed!`));
    throw e;
  }
}

function parseProps(originalProps) {
  return Object.keys(originalProps)
    .filter(key => {
      const prop = originalProps[key];
      return prop.type;
    })
    .map(key => {
      const originalProp = originalProps[key];

      const description = doctrine.parse(originalProp.description, {
        sloppy: true
      }).description;

      const escapedDescription = escapeCell(description)
        .replace(/\n\n/g, '<br>')
        .replace(/\n/g, ' ');
        // .replace(/</g, '&lt;');

      const prop = {
        name: key,
        description: escapedDescription || '&ensp;',
        required: originalProp.required,
        type: getParsedProp(originalProp),
        default: (originalProp.defaultValue && originalProp.defaultValue.value) ? originalProp.defaultValue.value : '&ensp;'
      }

      // if(prop.default === 'identity' ) {
      //   prop.default = 'lodash.identity';
      // }
      // TODO: new default filter will be addded soon
      // if ((/[^\w\s.&:\-+*,!@%$]+/igm).test(prop.default)) {
      //   prop.default = '';
      // }
      return prop;
    });

}


function getParsedProp(prop) {
  if (!prop.type) {
    return null;
  }

  return parseTypeField(prop.type);

}

function parseTypeField(type) {
  switch (type.name) {
    case 'arrayOf':
      return `[${isObject(type.value) ? parseTypeField(type.value) : type.value.name}]`;
    case 'instanceOf':
      return `${type.value}`;
    case 'shape':
      if(isObject(type.value)) {
        return `{<br>${Object.keys(type.value).map(k => `&emsp;&emsp;${k}: ${isObject(type.value[k]) && parseTypeField(type.value[k])  }`).join(',<br>')}<br>}`
      }
      return 'object';
    case 'union':
      return parseUnionProp(type.value);
    case 'enum':
      return `enum:<br>[${type.value.map(v => v.value).join(', ')}]`;
    default:
      return type.name;
  }
}


function parseUnionProp(prop) {
  return prop
    .map(value => value.name === 'instanceOf' ? value.value : value.name)
    .join(' &#124; ');
}

export default parseComponent;
