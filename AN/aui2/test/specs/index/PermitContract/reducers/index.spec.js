import { is, fromJS } from 'immutable';
import {
  FETCH_PERMIT_CONTRACT_SUCCESS,
  FETCH_PERMIT_SCHEDULE_SUCCESS,
  FETCH_AMENDMENT_SUCCESS
} from 'index/PermitContract/consts/actionTypes';
import reducers from 'index/PermitContract/reducers';

const body = {
  permit_info: {
    reservation_date: 'Dec 30, 1899 0:00',
    expiration_date: 'Jun 11, 2017',
    system_user: 'Admin Recware',
    site_name: null,
    permit_status: 'Tentative',
    permit_number: 9000903,
    customer_name: null,
    permit_id: 2920,
    event_name: null,
    outstanding_balance: 0,
    permit_start_date: null,
    payers: [
      'Seymour212 Skinner212'
    ],
    permit_end_date: null,
    booking_number: 0,
    event_number: 0,
    invoice_total: 100.00,
    status_id: 2
  },
  org_info: {
    site_name: 'Central Community Center',
    site_logo: '<a href=" http://localcui.apm.activenet.com/Home" target="_window"><img class="bannerLogo" src="downloadFile.sdi?uploadedfile_id=16"  alt="banner_logo" border="0" vspace="0" hspace="0"></a>',
    site_address: 'Central Community Center\n937 Enterprise Dr\nSacramento, CA, CA\n95825\n',
    email_address: 'yanbei0391@yahoo.com.cn',
    phone_number: '(111) 111-1111',
    fax_number: '(916) 925-0649'
  },
  charge_summary: {
    rental_fees: 1,
    taxes: 0,
    discounts: 0,
    deposits: 0,
    deposits_taxes: 0,
    deposits_discounts: 0,
    refunds: 0,
    charge_adjustment_for_refund: -9,
    total_payments: 1,
    balance: 0,
    total_rental_fees: 1
  },
  events: [
    {
      event_id: 1,
      event_name: '2016 Annual Party',
      questions: [
        {
          answers: [
            '01: answer_1'
          ],
          customquestion_id: 1,
          question: 'question_1',
          sub_questions: [
            {
              answers: [
                '11: answer_1_sub'
              ],
              customquestion_id: 2,
              question: 'question_1_sub',
              sub_questions: [
                {
                  answers: [
                    '111: answer_1_1_sub1',
                    '112: answer_1_1_sub2',
                    '113: answer_1_1_sub3',
                    '114: answer_1_1_sub4'
                  ],
                  customquestion_id: 2,
                  question: 'question_1_1_sub?',
                  sub_questions: []
                }
              ]
            }
          ]
        },
        {
          answers: [
            '02: answer_2'
          ],
          customquestion_id: 2,
          question: 'question_2',
          sub_questions: []
        }
      ],
      checklist: {
        information: [
          {
            description: 'Morgan Waiver 02',
            signing_status: 'Checked',
            transactionstage_id: 3518
          }
        ],
        waivers: [
          {
            akamai_directory: 'http://localhost:8080/jettytest03/',
            attachment_id: 123,
            attachment_name: 'sample.txt',
            due_date: '9 Jul 2017',
            print_payer_and_customer: true,
            show_signature_line: true,
            signature_base64: '',
            signing_status: 'Wavier Signed by: Jill Chen on 10 Jul 2017',
            transactionstage_id: 3520,
            uploadfile_href_text: null,
            waiver_for: 'Jill Chen',
            waiver_name: '62118 - Jun.19 15:21',
            waiver_text: '62118 - Jun.19 15:21'
          }
        ]
      }
    }
  ],
  deposits_info: [
    {
      amount_paid: 100.00,
      balance: 0.00,
      charge_amount: 100.00,
      charge_amount_no_tax: 100.00,
      charge_description: 'Claim One-2017 Jun04 Party_3 #950-*lillian_facility',
      charge_name: 'Claim One',
      event_name: '2017 Jun04 Party_3 #950',
      receipt_detail_id: 71779,
      refunds: 0,
      resource_name: '*lillian_facility',
      tax: 0
    }
  ],
  payments_and_refunds: [
    {
      applied_amount: 1.00,
      charge_amount: 0,
      charge_name: '3 HOUR fee',
      event_name: '2017 JUN04 Party#4 #950',
      receipt_number: 1001210.069,
      resource_name: '*lillian_facility',
      transaction_date: '3 Jul 2017'
    }
  ],
  payment_schedules: {
    original_balance: 100,
    schedules: [
      {
        due_date: '25 Jul 2017',
        amount: 40,
        paid: 40,
        withdrawn_adjustment: 0,
        balance: 0
      },
      {
        due_date: '28 Jul 2017',
        amount: 20,
        paid: 0,
        withdrawn_adjustment: 0,
        balance: 20
      }
    ],
    current_balance: 60
  },
  attached_files: [
    {
      display_name: "Test Attachment",
      file_type: "jpeg",
      uploadedfile_id: "C1890D8A0C",
      upload_date: "Mar 13, 2018 10:33",
      file_size: "102.19kb"
    }
  ],
  signatures: {},
  header: 'header content',
  footer: 'footer content'
};

const schedulesBody = {
  permit_schedules: [
    {
      resource_name: 'zack facility minutes',
      center_name: '*lillian_center1',
      event_name: 'Test Recurring',
      start_date: '30 Jul 2017',
      end_date: '30 Jul 2017',
      schedules: [
        {
          resource_name: 'zack facility minutes',
          center_name: '*lillian_center1',
          event_name: 'Test Recurring',
          start_date: '30 Jul 2017',
          end_date: '30 Jul 2017',
          end_day_of_week: 'Sun',
          start_time: '1:00 AM',
          end_time: '1:30 AM',
          start_day_of_week: 'Sun',
          recurring_indicator: false,
          occurrences: 0
        }
      ],
      exceptions: [
        {
          date: '8 Aug 2017'
        }
      ],
      end_day_of_week: 'Sun',
      start_time: '1:00 AM',
      end_time: '1:30 AM',
      start_day_of_week: 'Sun',
      recurring_indicator: true,
      occurrences: 9
    }
  ]
};

const fetchSuccessState = {
  permitInfo: {
    reservation_date: 'Dec 30, 1899 0:00',
    expiration_date: 'Jun 11, 2017',
    system_user: 'Admin Recware',
    site_name: null,
    permit_status: 'Tentative',
    permit_number: 9000903,
    customer_name: null,
    permit_id: 2920,
    event_name: null,
    outstanding_balance: 0,
    permit_start_date: null,
    payers: [
      'Seymour212 Skinner212'
    ],
    permit_end_date: null,
    booking_number: 0,
    event_number: 0,
    invoice_total: 100.00,
    status_id: 2
  },
  orgInfo: {
    site_name: 'Central Community Center',
    site_logo: '<a href=" http://localcui.apm.activenet.com/Home" target="_window"><img class="bannerLogo" src="downloadFile.sdi?uploadedfile_id=16"  alt="banner_logo" border="0" vspace="0" hspace="0"></a>',
    site_address: 'Central Community Center\n937 Enterprise Dr\nSacramento, CA, CA\n95825\n',
    email_address: 'yanbei0391@yahoo.com.cn',
    phone_number: '(111) 111-1111',
    fax_number: '(916) 925-0649'
  },
  chargeSummary: {
    rental_fees: 1,
    taxes: 0,
    discounts: 0,
    deposits: 0,
    deposits_taxes: 0,
    deposits_discounts: 0,
    refunds: 0,
    charge_adjustment_for_refund: -9,
    total_payments: 1,
    balance: 0,
    total_rental_fees: 1
  },
  events: [
    {
      eventID: 1,
      eventName: '2016 Annual Party',
      questions: [
        {
          answers: ["01: answer_1"],
          customQuestionID: 1,
          parentQuestionIDs: [],
          question: "question_1",
          subQuestions: [
            {
              answers: ["11: answer_1_sub"],
              customQuestionID: 2,
              parentQuestionIDs: [1],
              question: "question_1_sub"
            },
            {
              answers: [
                "111: answer_1_1_sub1",
                "112: answer_1_1_sub2",
                "113: answer_1_1_sub3",
                "114: answer_1_1_sub4"
              ],
              customQuestionID: 2,
              parentQuestionIDs: [1, 2],
              question: "question_1_1_sub?"
            }
          ]
        },
        {
          answers: ["02: answer_2"],
          customQuestionID: 2,
          parentQuestionIDs: [],
          question: "question_2",
          subQuestions: []
        }
      ],
      infos: [
        {
          description: 'Morgan Waiver 02',
          signingStatus: 'Checked',
          transactionstageID: 3518
        }
      ],
      waivers: [
        {
          akamaiDirectory: 'http://localhost:8080/jettytest03/',
          attachmentID: 123,
          attachmentName: 'sample.txt',
          dueDate: '9 Jul 2017',
          printPayerAndCustomer: true,
          showSignatureLine: true,
          signatureBase64: '',
          signingStatus: 'Wavier Signed by: Jill Chen on 10 Jul 2017',
          transactionstageID: 3520,
          uploadfileHrefText: null,
          waiverFor: 'Jill Chen',
          waiverName: '62118 - Jun.19 15:21',
          waiverText: '62118 - Jun.19 15:21'
        }
      ]
    }
  ],
  deposits: [
    {
      receipt_detail_id: 71779,
      charge_description: 'Claim One-2017 Jun04 Party_3 #950-*lillian_facility',
      charge_amount: 100,
      amount_paid: 100,
      charge_amount_no_tax: 100,
      tax: 0,
      refunds: 0,
      balance: 0,
      event_name: '2017 Jun04 Party_3 #950',
      resource_name: '*lillian_facility',
      charge_name: 'Claim One'
    }
  ],
  paymentRefunds: [
    {
      applied_amount: 1,
      charge_amount: 0,
      charge_name: '3 HOUR fee',
      event_name: '2017 JUN04 Party#4 #950',
      receipt_number: 1001210.069,
      resource_name: '*lillian_facility',
      transaction_date: '3 Jul 2017'
    }
  ],
  paymentSchedules: {
    original_balance: 100,
    schedules: [
      {
        due_date: '25 Jul 2017',
        amount: 40,
        paid: 40,
        withdrawn_adjustment: 0,
        balance: 0
      },
      {
        due_date: '28 Jul 2017',
        amount: 20,
        paid: 0,
        withdrawn_adjustment: 0,
        balance: 20
      }
    ],
    current_balance: 60
  },
  attachedFiles: [
    {
      display_name: "Test Attachment",
      file_type: "jpeg",
      uploadedfile_id: "C1890D8A0C",
      upload_date: "Mar 13, 2018 10:33",
      file_size: "102.19kb"
    }
  ],
  permitSchedules: {},
  signatures: {},
  amendments: [],
  header: 'header content',
  footer: 'footer content'
};

const schedulesState = [
  {
    resource_name: 'zack facility minutes',
    center_name: '*lillian_center1',
    event_name: 'Test Recurring',
    start_date: '30 Jul 2017',
    end_date: '30 Jul 2017',
    schedules: [
      {
        resource_name: 'zack facility minutes',
        center_name: '*lillian_center1',
        event_name: 'Test Recurring',
        start_date: '30 Jul 2017',
        end_date: '30 Jul 2017',
        end_day_of_week: 'Sun',
        start_time: '1:00 AM',
        end_time: '1:30 AM',
        start_day_of_week: 'Sun',
        recurring_indicator: false,
        occurrences: 0
      }
    ],
    exceptions: [
      {
        date: '8 Aug 2017'
      }
    ],
    end_day_of_week: 'Sun',
    start_time: '1:00 AM',
    end_time: '1:30 AM',
    start_day_of_week: 'Sun',
    recurring_indicator: true,
    occurrences: 9
  }
];

const amendmentBody = {
  amendments: [{
    resource_name: 'zack facility minutes',
    center_name: '*lillian_center1',
    event_name: 'Test Recurring',
    start_date: '30 Jul 2017',
    end_date: '30 Jul 2017',
    schedules: [
      {
        resource_name: 'zack facility minutes',
        center_name: '*lillian_center1',
        event_name: 'Test Recurring',
        start_date: '30 Jul 2017',
        end_date: '30 Jul 2017',
        end_day_of_week: 'Sun',
        start_time: '1:00 AM',
        end_time: '1:30 AM',
        start_day_of_week: 'Sun',
        recurring_indicator: false,
        occurrences: 0
      }
    ],
    exceptions: [
      {
        date: '8 Aug 2017'
      }
    ],
    end_day_of_week: 'Sun',
    start_time: '1:00 AM',
    end_time: '1:30 AM',
    start_day_of_week: 'Sun',
    recurring_indicator: true,
    occurrences: 9
  }]
};

describe('index/PermitContract/reducers/index', () => {
  const initialState = fromJS({
    permitInfo: {},
    orgInfo: {},
    chargeSummary: {},
    events: [],
    deposits: [],
    paymentRefunds: [],
    signatures: {},
    permitSchedules: {},
    attachedFiles: [],
    paymentSchedules: {},
    amendments: [],
    header: '',
    footer: ''
  });

  it('Return the expected initial state', () => {
    const state = reducers(undefined, {});
    expect(is(initialState, state)).toBe(true);
  });

  it('Should fetch PermitContract info work fine', () => {
    const state = reducers(initialState, {
      type: FETCH_PERMIT_CONTRACT_SUCCESS,
      payload: { body }
    });

    expect(state.toJS()).toEqual(fetchSuccessState);
  });

  it('Should fetch PermitSchedule info work fine', () => {
    const state = reducers(initialState, {
      type: FETCH_PERMIT_SCHEDULE_SUCCESS,
      payload: { body: schedulesBody }
    });
    expect(state.get('permitSchedules').toJS()).toEqual(schedulesState);
  });

  it('Should fetch Amendmet info work fine', () => {
    const state = reducers(initialState, {
      type: FETCH_AMENDMENT_SUCCESS,
      payload: { body: amendmentBody }
    });
    expect(state.get('amendments').toJS()).toEqual(amendmentBody.amendments);
  });
});
