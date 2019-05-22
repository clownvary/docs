import React from 'react';
import reduce from 'lodash/reduce';
import Dropdown from 'src/components/Dropdown';

import Form from './components/form';
import { Dock, Trigger, Theme, Effect } from '../../src/consts';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components//Button';
import Checkbox from '../../src/components/Checkbox';

import '../base.less';
import '../layout.less';
import './app.less';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.dockStyles = this.setValues(Dock);
    this.effects = this.setValues(Effect);
    this.theme = this.setValues(Theme);
    this.trigger = this.setValues(Trigger);

    this.state = {
      disabled: true
    };
  }

  onClickHandler = (e) => {
    const tooltipOptions = {
      dockStyle: Dock.BOTTOM_LEFT,
      content: 'Just a sample!',
      onOpen: (() => {
        console.log('onOpen');
      }),
      onClose: (() => {
        console.log('onClose');
      })
    };

    if (this.isOpen) {
      Tooltip.close();
      this.isOpen = false;
    } else {
      Tooltip.open(e.currentTarget, tooltipOptions);
      this.isOpen = true;
    }
  }

  onPromiseHandler = (e) => {
    const tooltipOptions = {
      trigger: Trigger.HOVER,
      theme: Theme.DARK,
      dockStyle: Dock.BOTTOM_LEFT,
      content: () => (new Promise((resolve) => {
        setTimeout(() => {
          resolve('Success!');
        }, 1000);
      })),
      onOpen: (() => {
        console.log('onOpen');
      }),
      onClose: (() => {
        console.log('onClose');
      })
    };

    Tooltip.open(e.currentTarget, tooltipOptions);
  }

  onOptinsBuild = () => {
    Tooltip.option(this.tooltipOptions);
    Tooltip.build('.tooltipBtn', document.querySelector('.sample-btton'));
    this.setState({
      disabled: false
    });
  }

  onOptinsClean = () => {
    Tooltip.clean(document.querySelector('.sample-btton'));
    this.setState({
      disabled: true
    });
  }

  onCleanTooltip = (container = document) => {
    Tooltip.clean(container);
  }

  onBuildTooltip = (container = null) => {
    const selector = '.demo-ul > li, .test-build';
    if (container) {
      Tooltip.build(selector, container);
    } else {
      Tooltip.build(selector);
    }
  }

  setValues = enumList => reduce(enumList, (result, value, key) => {
    if (key !== '__esModule') {
      result.push({ text: key, value });
    }
    return result;
  }, []);

  tooltipOptions = {
    dockStyle: Dock.BOTTOM_LEFT,
    theme: Theme.LIGHT,
    effect: Effect.NONE,
    distance: 0,
    trigger: Trigger.HOVER,
    content: 'samples tooltip, and the tooltip options come from the side',
    onOpen: () => {
      console.log('samples Input tooltip on Open');
    },
    onClose: () => {
      console.log('samples Input tooltip on close: ');
    }
  }

  render() {
    return (
      <div>
        <div className="form">
          <div className="warp sample-btton">
            <Button className="tooltipBtn">Be controled by the side options.</Button>
          </div>
          <div className="warp">
            <h4>What is Tooltip:</h4>
            <p>
              A simple example by using Tooltip is replacing the native tooltips,
              making them themeable as well as allowing various customizations:
            </p>
            <ul>
              <li>Display rich content other than title</li>
              <li>Customize the position</li>
              <li>Customize the theme</li>
              <li>Animations</li>
            </ul>

            <h4>Tooltip Options:</h4>
            <ul>
              <li>
                <strong>className:</strong>
                Custom CSS class to be added to the tooltip’s outer DOM</li>
              <li>
                <strong>content:</strong>
                The content of the tooltip.
                <ol>
                  <li>
                    <strogn>Function:</strogn>
                    A callback which can return the content directly,
                    or a Promise that returns the content.</li>
                  <li><strong>String:</strong> HTML string for tooltip content</li>
                  <li><strong>Element:</strong> A DOM element to use for the tooltip content</li>
                  <li><strong>Component:</strong> A React UI component</li>
                </ol>
              </li>
              <li>
                <strong>dockStyle:</strong>
                Determines the position of the tooltip relative to the associated target element.
                The value is one of the const defined in Dock.</li>
              <li>
                <strong>offset:</strong>
                Offset in pixel between the tooltip and the target element.</li>
              <li>
                <strong>selector:</strong>
                A CSS selector that determines which items should have tooltips.
                <ol>
                  <li>Default is `[data-tooltip]`,
                  which means these doms which have *data-tooltip* attribute will be used.</li>
                  <li>If set selector is empty string,
                  which means the title attribute will be used.</li>
                </ol>
              </li>
              <li>
                <strong>trigger:</strong>
                Determines the trigger method when popping up the tooltip.
                Values can be: HOVER, CLICK or FOCUS.</li>
              <li>
                <strong>theme:</strong>
                Determines the color them of the tooltip.
                Values can be: DARK, LIGHT, SUCCESS, WARNING, ERROR, INFO
                (Only implemented `DARK`` and `LIGHT`).</li>
              <li>
                <strogn>trackMouse:</strogn>
                Determines whether the tooltip will track the mouse’ position
                (Not implemented).</li>
              <li>
                <strong>showEffect:</strong>
                Determines the animation effect when displaying the tooltip.
                Values can be: NONE, FADE, SLIDE, SCALE
                (Only implemented `NONE`).</li>
              <li><strong>hideEffect:</strong>
                Determines the animation effect when hiding the tooltip.
                Values can be: NONE, FADE, SLIDE, SCALE
                (Only implemented `NONE`).</li>
            </ul>

            <h4>Tooltip Methods:</h4>
            <ul>
              <li>
                <strong>open(target, options):</strong>
                Programmatically open a tooltip, returns a tooltip instance for later use.
                <ol>
                  <li>
                    <strong>target:</strong>
                    Target DOM element or query selector
                  </li>
                  <li>
                    <strong>options:</strong>
                    Customized option object and event handlers
                  </li>
                </ol>
              </li>
              <li>
                <strong>close():</strong>
                Close the current tooltip.
              </li>
              <li>
                <strong>option():</strong>
                Gets the default settings for the Tooltip.
              </li>
              <li>
                <strong>option(options):</strong>
                Sets one or more options for the Tooltip.
                <ol>
                  <li>
                    <strong>options:</strong>
                    Option object to apply to the default settings.
                  </li>
                </ol>
              </li>
              <li>
                <strong>build(selectors, container):</strong>
                Used to parse the DOM and bind the tooltip attribute to target items.
                An example is to build up the tooltip when displaying a model box.
                <ol>
                  <li>
                    <strong>selectors:</strong>
                    DOMString selectors.
                    <ol>
                      <li>
                        Default is Tooltip attribute,
                        which means the element
                        that have the tooltip attribute will be added trigger eventListener.
                      </li>
                      <li>
                        If the value is empty string,
                        which means the element
                        that has the title attribute will be used trigger eventListener.
                      </li>
                      <li>
                        The selectors value can be recognized by document.querySelectorAll().
                      </li>
                    </ol>
                  </li>
                  <li>
                    <strong>container:</strong>
                    Container DOM element to build the tooltip.
                    <ol>
                      <li>
                        Default is document.
                      </li>
                      <li>
                        The value is a DOM element.
                      </li>
                      <li>
                        Every element in container will to add the tooltip eventListener.
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                <strong>clean(container):</strong>
                Container DOM element to remove the tooltip eventListener.
                <ol>
                  <li>
                    <strong>container:</strong>
                    DOMString selectors or ``</li>
                  <li>Default is document.</li>
                  <li>The value is a DOM element.</li>
                  <li>Every element in container will to remove the tooltip eventListener.</li>
                </ol>
              </li>
            </ul>

            <h4>Tooltip Event:</h4>
            <ul>
              <li>
                <strong>onOpen:</strong>
                Fired after the tooltip is open.
              </li>
              <li>
                <strong>onClose: </strong>
                Fired after the tooltip is close.
              </li>
            </ul>

            <h4>Tooltip usages: three kinds of usages</h4>
            <ul>
              <li>Global default settings for all tooltip instance.</li>
              <li>API mode (instantiated by calling APIs).</li>
              <li>Directive mode (instantiated by the attributes on DOM).</li>
            </ul>
          </div>

          <div className="warp">
            <h4>Tooltip usage 1: Global default settings for all tooltip instance.</h4>
            <p>Global default settings for all tooltip instance:
              add the tooltip attributes on the selectors element, need the prefix `data-tooltip`:
            </p>
            <ul>
              <li>
                <strong>Selectors options:</strong>
                <ol>
                  <li>content --- data-tooltip-content.</li>
                  <li>className --- data-tooltip-classname.</li>
                  <li>theme --- data-tooltip-theme.</li>
                  <li>dockStyle --- data-tooltip-dockstyle.</li>
                  <li>trigger --- data-tooltip-trigger.</li>
                  <li>offset --- data-tooltip-offset.</li>
                  <li>onOpen --- data-tooltip-onOpen.</li>
                  <li>onClose --- data-tooltip-onClose.</li>
                </ol>
              </li>
              <li>
                <strong>Tooltip methods:</strong>
                <ol>
                  <li>Tooltip.option(options).</li>
                  <li>Tooltip.build(selectors).</li>
                  <li>Tooltip.clean(selectors).</li>
                  <li>
                    <strong>Notice: </strong>
                    <ol>
                      <li>If calll `Tooltip.build(selectors)`,
                      then need to call `Tooltip.clean()`
                      if want to re-call `Tooltip.build(newSelectors)`.</li>
                      <li>If calll `Tooltip.build(selectors)`,
                      then need to call `Tooltip.clean()`
                      if want to re-set options (call `Tooltip.option(options)`).</li>
                    </ol>
                  </li>
                  <li>
                    Notice reason:
                    <p>This target addEventListener based on
                     the `data-tooltip-trigger` attribute of the target.</p>
                  </li>
                </ol>
              </li>
            </ul>
            <div className="btns">
              <p>
                <strong>Be controled by the following bule-bttons</strong>
              </p>
              <p>
                <Button type="primary" onClick={() => this.onBuildTooltip(document.querySelector('.demo-ul'))}>Only build ul tooltip</Button>
                <Button type="primary" onClick={() => this.onCleanTooltip(document.querySelector('.demo-ul'))}>only clean ul tooltip</Button>
              </p>
              <p>
                <Button type="primary" onClick={() => this.onBuildTooltip()}>Build ul and button</Button>
                <Button type="primary" onClick={() => this.onCleanTooltip()}>Clean tooltip</Button>
              </p>
            </div>
            <ul className="demo-ul">
              <li
                data-tooltip-classname="tooltip-height"
                data-tooltip-trigger={Trigger.CLICK}
                data-tooltip-content="tooltip arrow=BOTTOM_LEFT"
                data-tooltip-dockstyle={Dock.BOTTOM_LEFT}
                data-tooltip-offset="0"
              >BOTTOM_LEFT</li>
              <li
                data-tooltip-classname="tooltip-height"
                data-tooltip-trigger={Trigger.HOVER}
                data-tooltip-content="tooltip arrow=BOTTOM_CENTER"
                data-tooltip-dockstyle={Dock.BOTTOM_CENTER}
                data-tooltip-offset="0"
              >BOTTOM_CENTER</li>
              <li
                data-tooltip-classname="tooltip-height"
                data-tooltip-trigger={Trigger.HOVER}
                data-tooltip-content="tooltip arrow=BOTTOM_RIGHT"
                data-tooltip-dockstyle={Dock.BOTTOM_RIGHT}
                data-tooltip-offset="0"
              >BOTTOM_RIGHT</li>
              <li
                data-tooltip-classname="tooltip-height"
                data-tooltip-trigger={Trigger.HOVER}
                data-tooltip-content="tooltip arrow=TOP_LEFT"
                data-tooltip-dockstyle={Dock.TOP_LEFT}
                data-tooltip-offset="0"
              >TOP_LEFT</li>
              <li
                data-tooltip-classname="tooltip-height"
                data-tooltip-trigger={Trigger.HOVER}
                data-tooltip-content="tooltip arrow=TOP_CENTER"
                data-tooltip-dockstyle={Dock.TOP_CENTER}
                data-tooltip-offset="0"
              >TOP_CENTER</li>
              <li
                data-tooltip-classname="tooltip-height"
                data-tooltip-trigger={Trigger.HOVER}
                data-tooltip-content="tooltip arrow=TOP_RIGHT"
                data-tooltip-dockstyle={Dock.TOP_RIGHT}
                data-tooltip-offset="0"
              >TOP_RIGHT</li>
              <li
                data-tooltip-classname="tooltip-height"
                data-tooltip-trigger={Trigger.HOVER}
                data-tooltip-content="tooltip arrow=LEFT_TOP"
                data-tooltip-dockstyle={Dock.LEFT_TOP}
                data-tooltip-offset="0"
              >LEFT_TOP</li>
              <li
                data-tooltip-classname="tooltip-height"
                data-tooltip-trigger={Trigger.HOVER}
                data-tooltip-content="tooltip arrow=LEFT_MIDDLE"
                data-tooltip-dockstyle={Dock.LEFT_MIDDLE}
                data-tooltip-offset="0"
              >LEFT_MIDDLE</li>
              <li
                data-tooltip-classname="tooltip-height"
                data-tooltip-trigger={Trigger.HOVER}
                data-tooltip-content="tooltip arrow=LEFT_BOTTOM"
                data-tooltip-dockstyle={Dock.LEFT_BOTTOM}
                data-tooltip-offset="0"
              >LEFT_BOTTOM</li>
              <li
                data-tooltip-classname="tooltip-height"
                data-tooltip-trigger={Trigger.HOVER}
                data-tooltip-content="tooltip arrow=RIGHT_TOP"
                data-tooltip-dockstyle={Dock.RIGHT_TOP}
                data-tooltip-offset="0"
              >RIGHT_TOP</li>
              <li
                data-tooltip-classname="tooltip-height"
                data-tooltip-trigger={Trigger.HOVER}
                data-tooltip-content="tooltip arrow=RIGHT_MIDDLE"
                data-tooltip-dockstyle={Dock.RIGHT_MIDDLE}
                data-tooltip-offset="0"
              >RIGHT_MIDDLE</li>
              <li
                data-tooltip-classname="tooltip-height"
                data-tooltip-trigger={Trigger.HOVER}
                data-tooltip-content="tooltip arrow=RIGHT_BOTTOM"
                data-tooltip-dockstyle={Dock.RIGHT_BOTTOM}
                data-tooltip-offset="0"
              >RIGHT_BOTTOM</li>
            </ul>
            <div className="btns">
              <Button
                className="tooltip-btn test-build"
                data-tooltip="true"
                data-tooltip-trigger={Trigger.FOCUS}
                data-tooltip-theme={Theme.DARK}
                data-tooltip-offset={5}
                data-tooltip-onOpen={() => { console.log('tooltip onOpen'); }}
                data-tooltip-onClose={() => { console.log('tooltip onClose'); }}
                title="tooltip content = attribute title"
              >
                build tooltip(trigger: FOCUS)
              </Button>
              <Button
                className="tooltip-btn test-build"
                data-tooltip="true"
                data-tooltip-trigger={Trigger.CLICK}
                data-tooltip-theme={Theme.DARK}
                data-tooltip-offset={5}
                data-tooltip-onOpen={() => { console.log('tooltip onOpen'); }}
                data-tooltip-onClose={() => { console.log('tooltip onClose'); }}
                title="tooltip content = attribute title"
              >
                build tooltip(trigger: CLICK)
              </Button>
            </div>
          </div>

          <div className="warp">
            <h4>Tooltip usage 2: API mode (instantiated by calling APIs)</h4>
            <ul>
              <li>
                <strong>Tooltip usage:</strong>
                Tooltip.open(target, tooltipOptions);
              </li>
            </ul>
            <p>Avaliable tooltipOptions:</p>
            <ul>
              <li>content.</li>
              <li>className.</li>
              <li>theme.</li>
              <li>dockStyle.</li>
              <li>trigger.</li>
              <li>offset.</li>
              <li>onOpen.</li>
              <li>onClose.</li>
            </ul>
            <p><strong>Example:</strong></p>
            <Button
              onClick={(e) => { this.onClickHandler(e); }}
              type="primary"
            >
              Open/Close tooltip
            </Button>

            <p><strong>Example (content is promise):</strong></p>
            <Button
              onClick={(e) => { this.onPromiseHandler(e); }}
              type="primary"
            >
              Open/Close tooltip and content is a promise
            </Button>
          </div>

          <div className="warp">
            <h4>Tooltip usage 3: Directive mode (instantiated by the attributes on DOM).</h4>
            <p>Tooltip avaliable attributes:</p>
            <ul>
              <li>content.</li>
              <li>className.</li>
              <li>theme.</li>
              <li>dockStyle.</li>
            </ul>
            <p>Example light theme:</p>
            <Tooltip
              content={(<Form />)}
              className="tooltip-btn"
              theme={Theme.LIGHT}
            />
            <p>Example dark theme:</p>
            <Tooltip
              content={() => <div>content is a function</div>}
              className="tooltip-btn"
              theme={Theme.DARK}
              dockStyle={Dock.BOTTOM_CENTER}
            />

          </div>
        </div>
        <div className="side-bar">

          <div className="options">
            <div className="row">
              <span>Dock Style: </span>
              <Dropdown
                className="tooltip-dropdown"
                data={this.dockStyles}
                defaultValue={this.tooltipOptions.dockStyle}
                onChange={({ value }) => { this.tooltipOptions.dockStyle = value; }}
              />
            </div>
            <div className="row">
              <span>Effect</span>
              <Dropdown
                data={this.effects}
                defaultValue={this.tooltipOptions.effect}
                onChange={({ value }) => { this.tooltipOptions.effect = value; }}
              />
            </div>
            <div className="row">
              <span>Theme Style: </span>
              <Dropdown
                className="tooltip-dropdown"
                data={this.theme}
                defaultValue={this.tooltipOptions.theme}
                onChange={({ value }) => { this.tooltipOptions.theme = value; }}
              />
            </div>
            <div className="row gray">
              Theme: Only implemented DARK and Light theme.
            </div>
            <div className="row">
              <span>Trigger Style: </span>
              <Dropdown
                className="tooltip-dropdown"
                data={this.trigger}
                defaultValue={this.tooltipOptions.trigger}
                onChange={({ value }) => { this.tooltipOptions.trigger = value; }}
              />
            </div>
            <div className="row">
              <Checkbox
                value={this.tooltipOptions.distance !== 0}
                defaultChecked={this.tooltipOptions.distance !== 0}
                onChange={(e) => { this.tooltipOptions.distance = e.target.checked ? 10 : 0; }}
              >Offset (10px)</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                value={this.tooltipOptions.showShadow}
                defaultChecked={this.tooltipOptions.showShadow}
                onChange={(e) => { this.tooltipOptions.showShadow = e.target.checked; }}
              >Show Shadow</Checkbox>
            </div>
            <div className="row">
              <Button
                type="primary"
                size="sm"
                disabled={!this.state.disabled}
                onClick={() => { this.onOptinsBuild(); }}
              >
                Build for Input
              </Button>
              <Button
                type="primary"
                size="sm"
                disabled={this.state.disabled}
                onClick={() => { this.onOptinsClean(); }}
              >
                Clean for Input
              </Button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
