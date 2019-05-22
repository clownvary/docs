import React from "react";
import {IndexLink as RouterIndexLink, Link as RouterLink} from "react-router";

export class Link extends React.Component {

  render() {
    const {to, ...rest} = this.props;
    const href = `${window.__siteBaseName ? window.__siteBaseName : ""}${to}`;

    return (
      <RouterLink {...rest} to={href}/>
    )
  }

}

export class IndexLink extends React.Component {

  render() {
    const {to, ...rest} = this.props;
    const href = `${window.__siteBaseName}${to}`;
    return (
      <RouterIndexLink {...rest} to={href}/>
    )
  }

}
