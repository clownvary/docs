import React from 'react';
import classNames from 'classnames';
import TextArea from 'src/components/TextArea';
import TextAreaMd from 'doc/api/components/TextArea/TextArea.md';
import { Form, Group } from '../../App/components/Form';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {

  static meta = {
    name: 'TextArea',
    icon: 'icon-edit-m',
    documents: [TextAreaMd],
    description: 'This example demonstrates the features of TextArea.'
  }

  getInitSettings() {
    return initSettings;
  }

  onValueChangeHandler = (value) => {
    this.log(value);
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings);
    const className = classNames({ input: props.useInput });

    return (
      <div>
        <Form title="TextArea">
          <Group>
            <span className="field-label">TextArea:</span>
            <span className="field">
              <TextArea
                className={className}
                onChange={Obj => this.onValueChangeHandler(Obj.target.value)}
              />
            </span>
          </Group>
        </Form>
      </div>
    );
  }
}
