import React from 'react';
import { shallowEqualImmutable } from 'react-immutable-render-mixin';

export default class UIComponent extends React.Component {

  constructor(props) {
    super(props);
    this._refs = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqualImmutable(this.props, nextProps) ||
      !shallowEqualImmutable(this.state, nextState);
  }

  bind(...methods) {
    methods.map(method => (this[method] = this[method].bind(this)));
  }

}
