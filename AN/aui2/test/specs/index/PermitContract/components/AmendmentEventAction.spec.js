import React from 'react';
import { mount } from 'enzyme';
import AmendmentEventAction from 'index/PermitContract/components/Amendment/AmendmentEventAction';
import amendmentDatum from 'json/PermitContract/amendment.json';

const addActionEvents = amendmentDatum.body.amendments[0].amendment_details.add_event;

const editActionEvents =
  [
    {
      action_type: 4,
      amendment_permit_event_id: 8,
      new_customer_notes: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      new_event_name: 'kaely_amendment_changed',
      old_customer_notes: '',
      old_event_name: 'kaely_amendment',
      permit_amendment_id: 80,
      permit_event_id: 1389,
      question_list: [
        {
          action_type: 1,
          amendment_permit_event_id: 27,
          amendment_question_answer_id: 22,
          new_answers: [
            '02:04:00'
          ],
          new_question: '62118_duration - The custom questions section shall list the custom question(s) that attached to the given permit? event.',
          new_question_id: 283,
          old_answers: [],
          old_question: '',
          old_question_id: 0,
          permit_amendment_id: 36
        },
        {
          amendment_question_answer_id: 30,
          amendment_permit_event_id: 12,
          permit_amendment_id: 83,
          action_type: 2,
          old_question_id: 211,
          old_question: 'I am a cat1?',
          old_answers: [
            'asdfasdf', 'given codes'
          ],
          new_question_id: 211,
          new_question: 'I am a cat2?',
          new_answers: [
            'asdfasdf edit question',
            'given codes new'
          ]
        },
        {
          amendment_question_answer_id: 10,
          amendment_permit_event_id: 9,
          permit_amendment_id: 34,
          action_type: 3,
          old_question_id: 1047,
          old_question: 'RL-Free',
          old_answers: [
            'cccccc'
          ],
          new_question_id: 0,
          new_question: '',
          new_answers: []
        },
        {
          amendment_question_answer_id: 10,
          amendment_permit_event_id: 9,
          permit_amendment_id: 34,
          action_type: 3,
          old_question_id: 1047,
          old_question: 'RL-Free',
          old_answers: [
            'cccccc'
          ],
          new_question_id: 0,
          new_question: '',
          new_answers: []
        }
      ],
      resource_list: [
        {
          action_type: 2,
          amendment_permit_event_id: 10,
          amendment_transaction_id: 12,
          booking_list: [],
          center_id: 65,
          center_name: '*lillian_center1',
          new_additional_fee: 0,
          new_event_type_id: 33,
          new_event_type_name: 'Café',
          old_additional_fee: 0,
          old_event_type_id: 34,
          old_event_type_name: '\'South West Hub Café Long Name \'South West Hub Caf',
          permit_amendment_id: 81,
          resource_id: 774,
          resource_name: 'zack facility rental',
          resource_type: 0,
          transaction_id: 49484
        }
      ]
    }
  ];

const setup = initProps => mount(<AmendmentEventAction {...initProps} />);

it('AmendmentEventAction of add event action should render without errors', () => {
  const component = setup({ actionEvents: addActionEvents });
  expect(component).toBeTruthy();

  const actionTable = component.find('.amendment-action-table');
  expect(actionTable).toBeTruthy();

  const addEventRow = actionTable.find('tbody').at(0).childAt(0);
  expect(addEventRow.childAt(0).text()).toEqual('Add event');

  const addEventCell = addEventRow.childAt(1);
  expect(addEventCell.find('.event-header-name').text()).toEqual('Event Name: Aug.10 16:18');
  expect(addEventCell.find('.event-header-note').at(0).text()).toEqual('Event Notes:');
  expect(addEventCell.find('.event-header-note').at(1).text()).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

  const addEventDetailHeader = addEventCell.find('.event-detail-header');
  expect(addEventDetailHeader.childAt(0).text()).toEqual('zack facility minutes long name zack fac - 62118-2');
  expect(addEventDetailHeader.childAt(1).text()).toEqual('Center: zack long name center zack long name center zack l');

  const addEventBookingTable = addEventCell.find('.amendment-action-resource-table');
  expect(addEventBookingTable).toBeTruthy();
  const addEventBookingTableRows = addEventBookingTable.find('tr');
  expect(addEventBookingTableRows).toHaveLength(6);

  const addEventAdditionalFeeDiv = addEventCell.find('.amendment-additional-fee');
  expect(addEventAdditionalFeeDiv).toBeTruthy();

  const addEventQuestionTable = addEventCell.find('.amendment-action-question-table');
  expect(addEventQuestionTable).toBeTruthy();
  const addEventQuestionTableRows = addEventQuestionTable.find('tr');
  expect(addEventQuestionTableRows).toHaveLength(4);
});

it('AmendmentEventAction of edit event action should render without errors', () => {
  const component = setup({ actionEvents: editActionEvents });
  expect(component).toBeTruthy();

  const actionTable = component.find('.amendment-action-table');
  expect(actionTable).toBeTruthy();

  const addEventRow = actionTable.find('tbody').at(0).childAt(0);
  expect(addEventRow.childAt(0).text()).toEqual('Edit event');

  const addEventCell = addEventRow.childAt(1);
  expect(addEventCell.find('.event-header-name').at(0).text()).toEqual('[REVISED FROM] Event Name: kaely_amendment');
  expect(addEventCell.find('.event-header-note').at(0).text()).toEqual('Event Notes:');
  expect(addEventCell.find('.event-header-note').at(1).text()).toEqual('--');
  expect(addEventCell.find('.event-header-name').at(1).text()).toEqual('[TO] Event Name: kaely_amendment_changed');
  expect(addEventCell.find('.event-header-note').at(2).text()).toEqual('Event Notes:');
  expect(addEventCell.find('.event-header-note').at(3).text()).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  const addEventDetailHeader = addEventCell.find('.event-detail-header');
  expect(addEventDetailHeader.childAt(0).text()).toEqual('zack facility rental - Café (revised from \'South West Hub Café Long Name \'South West Hub Caf)');
  expect(addEventDetailHeader.childAt(1).text()).toEqual('Center: *lillian_center1');
});
