import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import classNames from 'classnames';

import { Row, Col } from '../grid';
import L10nMessage from '../shared/L10nMessage';
import { FormFieldPropTypes } from './types';

var propTypes = _extends({}, FormFieldPropTypes);
var defaultProps = {
  l10nMessageValues: {}
};

export default (function (_ref) {
  var _ref$sm = _ref.sm,
      sm = _ref$sm === undefined ? [] : _ref$sm,
      _ref$span = _ref.span,
      span = _ref$span === undefined ? [] : _ref$span,
      _ref$fluid = _ref.fluid,
      fluid = _ref$fluid === undefined ? true : _ref$fluid,
      _ref$gutter = _ref.gutter,
      gutter = _ref$gutter === undefined ? true : _ref$gutter,
      align = _ref.align,
      className = _ref.className;

  var FormFieldLayout = function FormFieldLayout(_ref2) {
    var label = _ref2.label,
        errMsg = _ref2.errMsg,
        required = _ref2.required,
        children = _ref2.children,
        l10nMessageValues = _ref2.l10nMessageValues,
        rest = _objectWithoutProperties(_ref2, ['label', 'errMsg', 'required', 'children', 'l10nMessageValues']);

    var rowClasses = classNames({
      form__group: true,
      'form__group--error': errMsg
    }, className);
    var labelClasses = classNames({
      form__label: true,
      'form__label--require': required
    });
    var controlClasses = classNames({
      form__control: true,
      'form__control--static': rest.static
    });
    var validateClasses = classNames('form__validate');

    var smLabel = sm[0],
        smControl = sm[1],
        smValidate = sm[2];
    var spanLabel = span[0],
        spanControl = span[1],
        spanValidate = span[2];


    return React.createElement(
      Row,
      { fluid: fluid, gutter: gutter, align: align, className: rowClasses },
      React.createElement(
        Col,
        { sm: smLabel, span: spanLabel, className: labelClasses },
        React.createElement(
          'label',
          null,
          React.createElement(L10nMessage, { id: label })
        )
      ),
      React.createElement(
        Col,
        { sm: smControl, span: spanControl, className: controlClasses },
        children
      ),
      !!errMsg && React.createElement(
        Col,
        { sm: smValidate, span: spanValidate, className: validateClasses },
        React.createElement('i', { className: 'icon-times-circle' }),
        React.createElement(L10nMessage, { id: errMsg, values: l10nMessageValues })
      )
    );
  };

  FormFieldLayout.propTypes = propTypes;
  FormFieldLayout.defaultProps = defaultProps;

  return FormFieldLayout;
});