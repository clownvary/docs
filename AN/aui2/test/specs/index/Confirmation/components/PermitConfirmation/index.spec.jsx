import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import PermitConfirmation from 'index/Confirmation/components/PermitConfirmation';

const setup = (store, props) => mount(<PermitConfirmation store={store} {...props} />);

describe('index/Confirmation/components/PermitConfirmation', () => {
  const store = configureStore(middlewares)(fromJS({
    permitNumber: null,
    autoPrintPermits: false,
    autoPrintReceipts: false,
    email: '',
    receiptHeaderID: '',
    permitOwnerName: '',
    customerName: '',
    companyName: '',
    permitTransactions: [],
    automaticReceiptEmail: false,
    receiptNumber: ''
  }));

  const getProps = (props = {}) => ({
    data: fromJS(
      Object.assign({
        autoPrintPermits: false,
        autoPrintReceipts: false,
        automaticReceiptEmail: true,
        companyName: 'Becky Company',
        customerName: 'Becky',
        email: 'Becky@example.com',
        permitNumber: '',
        permitOwnerName: 'Becky',
        permitTransactions: [
          {
            facility_details: [
              {
                name: 'Party facility#1',
                quantity: 1
              },
              {
                name: 'Living facility#1',
                quantity: 1
              }
            ],
            permit_id: 5310,
            reservation_summary: 'Becky Jun.05 Party #9004616',
            total_charge: 68.5
          }
        ],
        receiptHeaderID: 1514934,
        receiptNumber: '1012631.041'
      }, props)
    ),
    initialData: {
      receiptHeaderID: 0,
      permitWording: 'Permit'
    }
  });

  it('component and initialization works fine with permit number', () => {
    const props = getProps({
      permitNumber: '9004616',
      autoPrintReceipts: true,
      automaticReceiptEmail: false
    });

    const component = setup(store, props);
    const container = component.find('.permit-confirmation');
    expect(container).toHaveLength(1);

    const header = container.find('div.header');
    expect(header).toHaveLength(1);
    expect(header.find('.title').node.textContent).toBe('Confirmation');
    const newReservationBtn = header.find('.btn');
    expect(newReservationBtn).toHaveLength(1);
    expect(newReservationBtn.text()).toBe('New Reservation');

    const modifyMsgDiv = container.find('.automatic-email-section').at(0);
    expect(modifyMsgDiv.node.textContent).toBe(`Permit #${props.data.get(`permitNumber`)} is successfully modified.`);
    expect(modifyMsgDiv.node.className.indexOf('u-hidden') >= 0).toBe(false);

    const completeMsgDiv = container.find('.automatic-email-section').at(1);
    expect(completeMsgDiv.node.className.indexOf('u-hidden') >= 0).toBe(true);

    const transactionSection = container.find('.permit-transactions-section');
    expect(transactionSection.node.className.indexOf('u-hidden') >= 0).toBe(true);
  });

  it('component and initialization works fine without permit number but no company name', () => {
    const props = getProps({
      autoPrintPermits: true,
      automaticReceiptEmail: false,
      companyName: null
    });

    const component = setup(store, props);
    const container = component.find('.permit-confirmation');
    expect(container).toHaveLength(1);

    const header = container.find('div.header');
    expect(header).toHaveLength(1);
    expect(header.find('.title').node.textContent).toBe('Confirmation');
    const newReservationBtn = header.find('.btn');
    expect(newReservationBtn).toHaveLength(1);
    expect(newReservationBtn.text()).toBe('New Reservation');

    const modifyMsgDiv = container.find('.automatic-email-section').at(0);
    expect(modifyMsgDiv.node.className.indexOf('u-hidden') >= 0).toBe(true);

    const completeMsgDiv = container.find('.automatic-email-section').at(1);
    expect(completeMsgDiv.node.className.indexOf('u-hidden') >= 0).toBe(false);
    const completeTitle = completeMsgDiv.find('h2').node;
    expect(completeTitle.textContent).toBe(
      `Transaction has been completed for ${(props.data.get('permitOwnerName'))}!`
    );
    const confirmationSentMsg = completeMsgDiv.find('small');
    expect(confirmationSentMsg.node.className.indexOf('u-hidden') >= 0).toBe(true);
    expect(confirmationSentMsg.node.textContent).toBe(
      `A confirmation E-mail has been sent to ${props.data.get('customerName')}.`
    )

    const permitSection = container.find('.permit-transactions-section');
    expect(permitSection.node.className.indexOf('u-hidden') >= 0).toBe(false);
    expect(permitSection.find('h3.title').node.textContent).toBe(`Receipt Summary #${props.data.get('receiptNumber')}`);

    const viewLinks = permitSection.find('header.header').find('a.view-link');
    expect(viewLinks.at(0).node.textContent.trim()).toBe('Receipt');
    viewLinks.at(0).simulate('click');
    expect(viewLinks.at(1).node.textContent.trim()).toBe('Permit');
    viewLinks.at(1).simulate('click');

    const transactionSection = container.find('.transaction-section');
    expect(transactionSection.find('div.title').node.textContent).toBe('TRANSACTION ITEMS');
    expect(transactionSection.find('ul.transaction-list')).toHaveLength(1);

    const footer = container.find('footer.page-footer');
    expect(footer.find('span.text-color-strong').node.textContent).toBe('$68.50');
  });

  it('component and initialization works fine without permit number', () => {
    const props = getProps();

    const component = setup(store, props);
    const container = component.find('.permit-confirmation');
    expect(container).toHaveLength(1);

    const header = container.find('div.header');
    expect(header).toHaveLength(1);
    expect(header.find('.title').node.textContent).toBe('Confirmation');
    const newReservationBtn = header.find('.btn');
    expect(newReservationBtn).toHaveLength(1);
    expect(newReservationBtn.text()).toBe('New Reservation');

    const modifyMsgDiv = container.find('.automatic-email-section').at(0);
    expect(modifyMsgDiv.node.className.indexOf('u-hidden') >= 0).toBe(true);

    const completeMsgDiv = container.find('.automatic-email-section').at(1);
    expect(completeMsgDiv.node.className.indexOf('u-hidden') >= 0).toBe(false);
    const completeTitle = completeMsgDiv.find('h2').node;
    expect(completeTitle.textContent).toBe(
      `Transaction has been completed for ${(props.data.get('permitOwnerName'))}!`
    );
    const confirmationSentMsg = completeMsgDiv.find('small');
    expect(confirmationSentMsg.node.className.indexOf('u-hidden') >= 0).toBe(false);
    expect(confirmationSentMsg.node.textContent).toBe(`A confirmation E-mail has been sent to ${props.data.get('companyName')}.`)

    const permitSection = container.find('.permit-transactions-section');
    expect(permitSection.node.className.indexOf('u-hidden') >= 0).toBe(false);
    expect(permitSection.find('h3.title').node.textContent).toBe(`Receipt Summary #${props.data.get('receiptNumber')}`);

    const viewLinks = permitSection.find('header.header').find('a.view-link');
    expect(viewLinks.at(0).node.textContent.trim()).toBe('Receipt');
    viewLinks.at(0).simulate('click');
    expect(viewLinks.at(1).node.textContent.trim()).toBe('Permit');
    viewLinks.at(1).simulate('click');

    const transactionSection = container.find('.transaction-section');
    expect(transactionSection.find('div.title').node.textContent).toBe('TRANSACTION ITEMS');
    expect(transactionSection.find('ul.transaction-list')).toHaveLength(1);

    const footer = container.find('footer.page-footer');
    expect(footer.find('span.text-color-strong').node.textContent).toBe('$68.50');
  });
});
