import React from 'react';
import AttachmentLink from 'shared/components/AttachmentLink';
import { mount } from 'enzyme';

describe('shared/components/AttachmentLink', () => {
  it('Should render component correctly', () => {
    const attachmentUrl = 'http://www.google.com/logo.png';
    const attachmentName = 'logo';
    const attachmentType = 'png';
    const component = mount(
      <AttachmentLink
        attachmentUrl={attachmentUrl}
        attachmentName={attachmentName}
        attachmentType={attachmentType}
      />
    );

    expect(component.find('a')).toHaveLength(1);
    expect(component.text()).toEqual('logo.png');
  });

  it('Should render component correctly if no attachmentType', () => {
    const attachmentUrl = 'http://www.google.com/logo';
    const attachmentName = 'logo';
    const component = mount(
      <AttachmentLink
        attachmentUrl={attachmentUrl}
        attachmentName={attachmentName}
      />
    );

    expect(component.find('a')).toHaveLength(1);
    expect(component.text()).toEqual('logo');
  });
});
