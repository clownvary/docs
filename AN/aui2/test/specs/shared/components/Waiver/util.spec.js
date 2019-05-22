import {
  PopupWindowWithMenu,
  waiverNameClick,
  viewAttachment,
  waiverCheckBoxClick
} from 'shared/components/Waiver/util';

describe('shared -> components -> Waiver -> util', () => {
  it('should run function(PopupWindowWithMenu) correctly', () => {
    PopupWindowWithMenu('test', 'waiver', '1100', '600', 'yes');
  });

  it('should run function(waiverCheckBoxClick) correctly', () => {
    const index = 1;
    const waiverInput = document.createElement('input');
    const waiverCheckBox = document.createElement('input');
    const okButton = document.createElement('button');
    window.confirm = jest.fn(() => true).mockImplementationOnce(() => true).mockImplementationOnce(() => false);
    waiverInput.setAttribute('type', 'text');
    waiverInput.setAttribute('id', `${index}SigBase64`);
    waiverInput.setAttribute('value', '');

    waiverCheckBox.setAttribute('type', 'checkbox');
    waiverCheckBox.setAttribute('id', `${index}waiverCheckBox`);
    waiverCheckBox.setAttribute('checked', true);
    document.body.appendChild(waiverInput);
    document.body.appendChild(waiverCheckBox);
    document.body.appendChild(okButton);
    expect(waiverCheckBoxClick('waiver', true, index, 1)).toEqual({ cancel: false, checked: true });
    expect(waiverCheckBoxClick('waiver', false, index, 1)).toEqual({ cancel: false, checked: false });

    waiverCheckBox.removeAttribute('checked');
    expect(waiverCheckBoxClick('waiver', true, index, 1)).toEqual({ cancel: false, checked: false });

    waiverInput.value = '12';
    waiverCheckBox.setAttribute('checked', true);
    expect(waiverCheckBoxClick('waiver', true, index, 1)).toEqual({ cancel: true, checked: true });

    waiverInput.value = '12';
    expect(waiverCheckBoxClick('waiver', true, index, 0)).toEqual({ cancel: false, checked: false });
    expect(waiverCheckBoxClick('waiver', true, index, 1)).toEqual({ cancel: false, checked: true });
  });
});
