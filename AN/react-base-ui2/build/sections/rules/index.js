import { jsxRule } from './jsx';
import { jadeRule } from './jade';
import { lessRuleExtract } from './less';
import { imageRule } from './image';
import { fontRules } from './font';
import { svgRule } from './svg';

const rules = [
  svgRule,
  jsxRule,
  jadeRule,
  fontRules,
  imageRule,
  lessRuleExtract
];

export default rules;
