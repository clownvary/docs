import React from 'react';
import Alert from 'shared/components/Alert';
import Stepper from 'shared/components/Stepper';
import Button from 'react-base-ui/lib/components/Button';
import Input from 'react-base-ui/lib/components/Input';
import Intro from 'shared/components/Intro';

const steps = [{
  text: 'This is the first step in the tour.',
  position: 'left-top',
  element: '.intro-step-1'
}, {
  text: 'This is the second step in the tour.',
  position: 'middle-bottom',
  element: '.intro-step-2',
  className: 'step2'
}, {
  text: 'This is the third step in the tour.',
  position: 'right',
  element: '.intro-step-3',
  className: 'step3'
}]

export default React.createClass({
  displayName: 'Demo',
  render() {
    return (
      <div>
        <h1>Alert Dialog</h1>
        <span className="intro-step-1">
          <Button type="primary" onClick={this.open}>Show Alert</Button>
        </span>
        <Alert onClose={this.close}
          ref="alert"
          title="Change Status"
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          onOpen={this.onOpen}
          cancelText="Cancel"
          confirmText="Change">
          Permit status will be changed to Complete, and it can't be undo.
        </Alert>

        <h1 className="intro-step-2">Stepper</h1>
        <Stepper/>

        <h1>Test interaction when introduction info is on a page.</h1>
        <form className="intro-step-3" style={{width: 300}}>
          <Input defaultValue="test" />
          <a href="https://facebook.github.io/react/docs/reusable-components.html">Reusable Components in react</a>
        </form>

        <Intro steps={steps}/>
      </div>
    );
  },

  open() {
    this.refs.alert.open();
  }
});
