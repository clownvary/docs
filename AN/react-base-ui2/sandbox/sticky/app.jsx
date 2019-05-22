import React, { PureComponent } from 'react';
import classNames from 'classnames';

import { Sticky, StickyContainer } from '../../src/components/Sticky';
import InputMoment from '../../src/components/InputMoment';
import Input from '../../src/components/Input';

import '../base.less';
import '../layout.less';
import './app.less';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    };
  }
  triggerCollapse() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded
    });
  }
  render() {
    const { expanded } = this.state;

    return (
      <div style={{ height: 1500, margin: '0 30px' }}>
        <h2>Content before the Sticky...</h2>
        <div style={{ marginBottom: 200 }} />
        <StickyContainer style={{ background: '#b0c4de', padding: '0 30px' }}>
          <Sticky>
            <div style={{ overflow: 'auto', background: '#4dbde9', padding: '0 30px 30px' }}>
              <h2 onClick={() => this.triggerCollapse()}>Sticky Header
                <i
                  className={classNames('icon icon-trigger', {
                    'icon-chevron-down': !expanded,
                    'icon-chevron-up': expanded
                  })}
                />
              </h2>
              {
                expanded ?
                <div className="stickyForm">
                  <div className="sample-content">
                    <div className="sample-form">
                      <div className="row">
                        <span className="field-label">
                          Enter Sticky Code:
                        </span>
                        <div className="field field-wide">
                          <Input
                            id="enter-sticky-code"
                            maxLength={20}
                            value={null}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <span className="field-label">
                          Select Sticky Code:
                        </span>
                        <div className="field field-wide">
                          <select className="form-selector">
                            <option value={1}>sticky option one</option>
                            <option value={2}>sticky option two</option>
                            <option value={3}>sticky option three</option>
                            <option value={4}>sticky option four</option>
                            <option value={5}>sticky option five</option>
                            <option value={6}>sticky option six</option>
                            <option value={7}>sticky option seven</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <span className="field-label" />
                        <div className="field field-wide">
                          <button type="submit" className="btn-cancel">Cancel</button>
                          <button type="submit" className="btn-primary">Save</button>
                        </div>
                      </div>
                      <div className="row">
                        <span className="field-label">Date & Time:</span>
                        <div className="field field-wide">
                          <InputMoment
                            format="dddd, MMM DD, YYYY HH:mm A"
                            showTrigger
                            showTrigger2
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              : null
              }
            </div>
          </Sticky>

          <h2 className="text-center" style={{ marginTop: 150, paddingBottom: 150 }}>&lt;StickyContainer /&gt;</h2>
        </StickyContainer>
        <div style={{ marginBottom: 200 }} />
        <h2>Content after the Sticky...</h2>
      </div>
    );
  }
}
export default App;
