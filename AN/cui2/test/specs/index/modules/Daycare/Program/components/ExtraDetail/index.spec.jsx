import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';

import ExtraDetail from 'index/modules/Daycare/Program/components/ExtraDetail';

const defaultProps = {
  extraDetails: [
    {
      attachmentId: 661,
      attachmentName: 'Lakeshore Parent Handbook',
      attachmentType: 'docx',
      attachmentUrl: 'https://jirafnd.dev.activenetwork.com/secure/projectavatar?avatarId=19743',
      dataUrl: 'https://jirafnd.dev.activenetwork.com/browse/ANE-81144',
      detailValue: 'Sora and Shiro are two hikikomori step-siblings who are known in the online gaming world as Blank, an undefeated group of gamers.',
      extraDetailDescription: 'Kids Activity News #12',
      extraDetailId: 111,
      extraDetailType: 'Document',
      thumbnailUrl: 'https://jirafnd.dev.activenetwork.com/secure/projectavatar?avatarId=19743'
    },
    {
      extraDetailId: 112,
      extraDetailType: 'Document',
      detailValue: 'No more information...'
    }
  ]
};

const setup = (_props = {}) => {
  const props = Object.assign({}, defaultProps, _props);
  const component = mountWithIntl(<ExtraDetail {...props} />);
  return {
    component,
    header: component.find('h2'),
    items: component.find('.detail-item')
  };
};

describe('index/modules/Daycare/Program/components/ExtraDetail', () => {
  it('Should render header fine', () => {
    const { header } = setup();
    expect(header).toHaveLength(1);
    expect(header.text()).toEqual('More Information');
  });

  it('Should render extra detail items fine', () => {
    const { items } = setup();

    expect(items).toHaveLength(2);

    const item1 = items.at(0);
    const data1 = defaultProps.extraDetails[0];
    expect(item1.find('.detail-item__head').text()).toEqual(data1.extraDetailDescription);
    expect(item1.find('.detail-item__head a')).toHaveLength(1);
    expect(item1.find('.detail-item__paragraph')).toHaveLength(1);
    expect(item1.find('.an-paragraph img')).toHaveLength(1);
    expect(item1.find('.detail-item__attachment')).toHaveLength(1);
    expect(item1.find('.an-split-line')).toHaveLength(0);

    const item2 = items.at(1);
    const data2 = defaultProps.extraDetails[1];
    expect(item2.find('.detail-item__head').text()).toEqual(data2.extraDetailType);
    expect(item2.find('.detail-item__head a')).toHaveLength(0);
    expect(item2.find('.detail-item__paragraph')).toHaveLength(1);
    expect(item2.find('.an-paragraph img')).toHaveLength(0);
    expect(item2.find('.detail-item__attachment')).toHaveLength(0);
    expect(item2.find('.an-split-line')).toHaveLength(1);
  });
});
