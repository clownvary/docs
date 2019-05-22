import React from 'react';
import { Route, Switch } from 'react-router-dom';
import replace from 'lodash/replace';

import Mainframe from './components/Mainframe';
import TitlePanel from './components/TitlePanel';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Gallery from './components/Gallery';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSpec: null,
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
      showSettingsPanel: true
    };

    this.onSetOpen = this.onSetOpen.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.onNavItemClick = this.onNavItemClick.bind(this);
    this.onSettingsClick = this.onSettingsClick.bind(this);
  }

  onSetOpen(open) {
    this.setState({ open });
  }

  onMenuItemClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }

  onNavItemClick(item) {
    this.setState({
      open: false
    });
  }

  onSettingsClick() {
    this.setState({
      showSettingsPanel: !this.state.showSettingsPanel
    });
  }

  render() {
    const { pageSpec, docked, open, showSettingsPanel } = this.state;
    const DemoPage = pageSpec ? pageSpec.pageClass : null;

    const contentHeader = (
      <span>
        {!docked &&
        <a onClick={this.onMenuItemClick} className="header__menu-link">=</a>}
        <span>React UI Base Examples</span>
      </span>);

    const { gallery } = this.props;
    const sidebar = <Navbar items={gallery} onItemClick={this.onNavItemClick} />;
    const mainframeProps = {
      className: 'an-example-app',
      sidebar,
      open,
      onSetOpen: this.onSetOpen
    };

    return (
      <Mainframe {...mainframeProps}>
        <TitlePanel title={contentHeader} showSettings onSettingsClick={this.onSettingsClick}>
          <div className="an-example-app__content" id="app-content">
            <Switch>
              {
                  gallery.map((g, key) => {
                    const { name, pageClass: DemoPage } = g;
                    return DemoPage &&
                      <Route
                        key
                        path={`/${replace(name, /[ ]/g, '')}`}
                        render={() => (<DemoPage showSettingsPanel={showSettingsPanel} pageSpec={g} />)}
                      />;
                  }).filter(i => i)
                }
              <Route
                  exact path="/"
                  render={() => (<div><div className="main-bg" /><Gallery items={gallery} /></div>)}
                />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </TitlePanel>
      </Mainframe>
    );
  }
}
