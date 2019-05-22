import $ from 'jquery';
import initStates from './init-state.jest';
import { XMLHttpRequest } from 'xmlhttprequest';
import Globalize from 'react-base-ui/lib/services/i18n';
import DateTimeFormat from 'shared/utils/DateTimeFormat';

global.XMLHttpRequest = XMLHttpRequest;
global.document = window.document;
global.$ = $;

window.open = () => ({ window: { focus: () => true } });
window.focus = () => true;
window.parent = { location: 'parent' };
window.frameElement = {};

window.__environment__ = {
  ROOT_URL: '',
  wordingLogic: 'test'
};

window.__TESTING__ = true;

const __initialState__ = {
  sites: initStates.__sites__.items,
  centers: initStates.__centers__.items,
  permitStatus: initStates.__status__.items,
  facilityTypes: initStates.__facilityTypes__.items,
  eventTypes: initStates.__eventTypes__.items,
  paymentOptions: initStates.__paymentOptions__,
  payer: initStates.__payer__,
  paymentPlanInitData: initStates.__paymentPlanInitData__,
  jqueryPath: '',
  permitWording: 'Permit',
  permitLabel: '',
  facilityWording: 'Facility',
  companyLabel: 'OrganizationXXX',
  dateFormat: 'YYYY/MM/DD',
  timeFormat: 'h:mm a',
  paymentSummary: initStates.__paymentSummary__,
  initData: initStates.__initData__,
  savedData: initStates.__savedData__,
  allowPaymentByCashWithChangeCalculation: true,
  helpFileFolder: '',
  cashCustomerId: 1
};

window.__confirmation__ = {__initialState__};
window.__payment__ = {__initialState__};
window.__refund__ = {__initialState__};
window.__reservation__ = {__initialState__};
window.__initialState__ = __initialState__

window.__resourceCalender__ = {
  __initialState__: {
    limitBookingsPerPermit: 700,
    sites: initStates.__sites__.items,
    centers: initStates.__centers__.items,
    resourceTypes: initStates.__resourceTypes__.items,
    eventTypes: initStates.__eventTypes__.items,
    facilityTypes: initStates.__facilityTypes__.items,
    facilityTypeLabel: initStates.__facilityTypeLabel__,
    instructorLabel: 'Saj',
    permitStartEventDate: '2016 Jun 5',
    currentDate: '2016 JUN 20',
    currentTime: '10:00 AM',
    dateFormat: 'YYYY/MM/DD',
    timeFormat: 'h:mm a',
    permit_label: 'permit',
    activity_label: 'activity',
    daycare_label: 'daycare',
    company_label: 'company',
    permitID: -1,
    authority : [
      {
        "id": "addGlobalQuickView ",
        "authorityType": "enabled",
        "name": "Add Global Quick View"
      }
    ],
    event: {
      resourceBookingID: 8620,
      attendance: 0,
      isActivityIgnoreMaximum: true,
      scheduleTypeID: 11,
      scheduleType: 'unique schedule',
      bookingAssignment: 0,
      eventName: 'resource booked by day',
      eventType: 'facility event',
      reservationScope: 'Normal',
      resourceID: 1,
      resourceName: '',
      resourceNumber: '12',
      resourceType: 0,
      transactionID: 36378,
      permitID: -1,
      permitNumber: 349,
      permitDate: '2016 Jun 1',
      permitStatus: 2,
      permitStatusDescription: 'Approved',
      setupMinutes: 300,
      cleanupMinutes: 30,
      startEventDate: '2016 Jun 5',
      endEventDate: '2016 Jun 7',
      startEventTime: '1:00 AM',
      endEventTime: '12:30 AM',
      reservationExpiration: '2016 Jun 4 expiration',
      startScheduleDate: '2016 Jun 4',
      endScheduleDate: '2016 Jun 7',
      startScheduleDay: 'Tue',
      endScheduleDay: 'Tue',
      startScheduleTime: '8:00 PM',
      endScheduleTime: '11:30 AM',
      customerID: 32523,
      customerType: 'f customerType',
      customerName: '',
      eventNotes: 'aa',
      ownerPendingReceipt: false,
      companyName: 'MM companyName'
    },
    quickView : [
        {
            "id": 6,
            "name": "test1",
            "selected": true,
            "resource_ids": [
                10,
                11
            ]
        },
        {
            "id": 7,
            "name": "test2 ",
            "selected": false,
            "resource_ids": [
                10,
                11
            ]
        },
        {
            "id": 8,
            "name": "test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3",
            "selected": false,
            "resource_ids": [
                10,
                11
            ]
        }
    ]
  }
};

window.__cart__ = {
  __initialState__: {
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  }
};

window.__reservationDetail__ = {
  __initialState__: {
    permitID: '1111111',
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333',
    permitWording: 'Change Status',
    akamaiDirectory: '/whyy/',
    akamaiEnabled: true,
    homeUrl: 'http://localhost:8080/linux01/servlet/',
    images: '123/',
    permitLabel: '',

    ssn_numeric_only: 'true',
    ssn_label: 'SSN',
    ssn_valid_length: '12',
    country_code: 'US',
    area_code: '010',
    isReservationDetailUpdated: false,
    hasRefundAmount: true,

    authorities: [{
      id: 'newReservationHome',
      authorityType: 'display',
      name: 'New Reservation Home'
    }, {
      id: 'bookingGrid',
      authorityType: 'display',
      name: 'Booking Grid'
    }, {
      id: 'permitActions',
      authorityType: 'enabled',
      name: 'Permit Actions'
    }, {
      id: 'resourceCalendar',
      authorityType: 'display',
      name: 'Resource Calendar'
    }, {
      id: 'bookingGridIcon',
      authorityType: 'enabled',
      name: 'Booking Grid Icon'
    }, {
      id: 'reserveActions',
      authorityType: 'enabled',
      name: 'Reserve Actions'
    }, {
      id: 'changePermitStatus',
      authorityType: 'enabled',
      name: 'Change Permit Status'
    }, {
      id: 'cancelPermit',
      authorityType: 'disabled',
      name: 'Cancel Permit'
    }, {
      id: 'modifyPaymentPlan',
      authorityType: 'disabled',
      name: 'Cancel Permit'
    }, {
      id: 'makePayment',
      authorityType: 'enabled',
      name: 'Cancel Permit'
    }, {
      id: 'refundCharges',
      authorityType: 'disabled',
      name: 'Cancel Permit'
    }, {
      id: 'refundDeposit',
      authorityType: 'enabled',
      name: 'Cancel Permit'
    }, {
      id: 'viewEmailPrintPermit',
      authorityType: 'enabled',
      name: 'Cancel Permit'
    }, {
      id: 'viewPrintAmendment',
      authorityType: 'enabled',
      name: 'Cancel Permit'
    }, {
      id: 'editEvent',
      authorityType: 'disabled',
      name: 'Edit Event'
    }, {
      id: 'addEvent',
      authorityType: 'disabled',
      name: 'Add Event'
    }, {
      id: 'deleteEvent',
      authorityType: 'disabled',
      name: 'Delete Event'
    }, {
      id: 'addCharge',
      authorityType: 'display',
      name: 'Add Charge'
    }, {
      id: 'deleteCharge',
      authorityType: 'hide',
      name: 'Delete Charge'
    }, {
      id: 'editCharge',
      authorityType: 'hide',
      name: 'Edit Charge'
    }, {
      id: 'editQuestion',
      authorityType: 'enabled',
      name: 'Edit Question'
    }, {
      id: 'editWaiver',
      authorityType: 'enabled',
      name: 'Edit Waiver'
    }, {
      id: 'editNote',
      authorityType: 'disabled',
      name: 'Edit Note'
    },
    {
      id: 'addCustomerQuestions',
      authorityType: 'disabled',
      name: 'Add Customer Questions'
    },
    {
      id: 'addWaivers',
      authorityType: 'disabled',
      name: 'Add Waivers'
    },
    {
      id: 'resetFees',
      authorityType: 'enabled',
      name: 'Reset Fees'
    }],
    reservationDetail: {
      event_action_information: {
        edit_event: {
          system_behavior_id: 'editEvent'
        },
        add_event: {
          system_behavior_id: 'addEvent'
        },
        delete_event: {
          system_behavior_id: 'deleteEvent'
        },
        add_charge: {
          system_behavior_id: 'addCharge'
        },
        delete_Charge: {
          system_behavior_id: 'deleteCharge'
        },
        edit_Charge: {
          system_behavior_id: 'editCharge'
        },
        edit_Question: {
          system_behavior_id: 'editQuestion'
        },
        delete_question: {
          system_behavior_id: 'deleteQuestion'
        },
        edit_Waiver: {
          system_behavior_id: 'editWaiver'
        },
        edit_Note: {
          system_behavior_id: 'editNote'
        },
        add_questions: {
          system_behavior_id: 'addCustomerQuestions'
        },
        add_waivers: {
          system_behavior_id: 'addWaivers'
        },
        reset_fees: {
          system_behavior_id: "resetFees"
        }
      },
      action_bar_information: {
        change_permit_status: {
          system_behavior_id: 'changePermitStatus',
          current_status: {
            status_type: 0,
            status_text: 'Issue',
            stage_id: -1,
            status_id: 4,
            value: 4,
            text: 'Issue',
            permit_status_action: -1,
            transaction_stage_id: -1
          },
          available_status_list: [{
            status_type: 0,
            status_text: 'Issue',
            stage_id: -1,
            status_id: 4,
            value: 4,
            text: 'Issue',
            permit_status_action: -1,
            transaction_stage_id: -1
          }, {
            status_type: 0,
            status_text: 'Complete',
            stage_id: -1,
            status_id: 7,
            value: 7,
            text: 'Complete',
            permit_status_action: -1,
            transaction_stage_id: -1
          }, {
            status_type: 0,
            status_text: 'Deny',
            stage_id: -1,
            status_id: 9,
            value: 9,
            text: 'Deny',
            permit_status_action: -1,
            transaction_stage_id: -1
          }]
        },
        cancel_permit: {
          system_behavior_id: 'cancelPermit'
        },
        modify_payment_plan: {
          system_behavior_id: 'modifyPaymentPlan'
        },
        make_payment: {
          system_behavior_id: 'makePayment'
        },
        refund_charges: {
          system_behavior_id: 'refundCharges'
        },
        refund_deposit: {
          system_behavior_id: 'refundDeposit'
        },
        view_email_print_permit: {
          system_behavior_id: 'viewEmailPrintPermit'
        },
        view_print_amendment: {
          system_behavior_id: 'viewPrintAmendment'
        }
      },
      general_information: {
        company_name: '',
        customer_name: 'Mr. Raymond Commercial',
        customer_type: 'Commercial',
        permit_date: '2016 Nov 18',
        system_user: 'ActiveNet Admin',
        balance_due_detail: {
          rental_charges: 8.34,
          taxes: 2.49,
          deposit_claims: 0.00,
          charge_discounts: -1.00,
          rental_charge_payments_credits: -9.83,
          rental_charges_balance_due: 0.00,
          deposits: 8.34,
          deposit_taxes: 2.49,
          deposit_discounts: -1.00,
          deposit_payments_credits: -9.83,
          rental_charge_refunds: 0.83,
          deposit_refunds: 0.00,
          deposit_balance_due: 0.00,
          total_balance_due: 9999999.00
        }
      },
      payment_plan_information: {
        payer_name: 'Mr. Raymond Commercial',
        number_of_payment: 6,
        next_due_date: 'Dec 12, 2016 ',
        next_due_amount: 20.00,
        payment_method: 'Master Card ends in 1232',
        over_due_amount: 19.66
      },
      event_list: [{
        event_id: 1,
        permit_id: 1,
        event_name: '2016 Annual Party',
        attendance: 200,
        resource_count: 1,
        booking_count: 3,
        total_amount: 300.00,
        validated: true,
        hideCustomQuestionsSection: true,
        hideChecklistItemsSection: true
      }, {
        event_id: 2,
        permit_id: 1,
        event_name: '2016 Technic Conference',
        attendance: 100,
        resource_count: 3,
        booking_count: 14,
        total_amount: 230.00,
        validated: true,
        hideCustomQuestionsSection: true,
        hideChecklistItemsSection: true
      }],
      fee_summary: {
        sub_total: 127.5,
        taxes: [{
          name: 'Tax8',
          amount: 12.75
        }, {
          name: 'test1',
          amount: 12.75
        }, {
          name: 'test2',
          amount: 12.75
        }, {
          name: 'test3',
          amount: 4.78
        }],
        total: 170.53,
        amount_paid: null,
        due_now: null,
        refund_amount: null
      }
    }
  }
};

window.__permitDetail__ = {
  __initialState__: {
    permitID: '0',
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333',
    akamaiDirectory: '/whyy/',
    akamaiEnabled: true,
    homeUrl: 'http://localhost:8080/linux01/servlet/',
    images: '123/',
    agents: [{
      id: 1,
      name: 'Flynn 1',
      selected: false
    }, {
      id: 2,
      name: 'Flynn 2',
      selected: true
    }],
    customerAndCompany: {
      company_id: 2,
      agent_name: 'Flynn',
      agent_id: 1,
      company_name: 'ActiveNetwork',
      customer_id: 0,
      customer_name: ''
    },
    permitTypeDetail: {
      permit_hold_types: [{
        selected: false,
        hold_type_id: 0,
        hold_type_name: 'Normal',
        expiration_date_required: false,
        expiration_date_allowed: false,
        system_user_names_allowed: false
      }, {
        selected: false,
        hold_type_id: 1,
        hold_type_name: 'Tentative',
        expiration_date_required: true,
        expiration_date_allowed: true,
        system_user_names_allowed: false
      }, {
        selected: true,
        hold_type_id: 2,
        hold_type_name: 'Temporary',
        expiration_date_required: false,
        expiration_date_allowed: true,
        system_user_names_allowed: true
      }],
      permit_reservation_users: [179],
      expiration_date: 'Jul 12, 2016',
      default_expiration_date: 'Jul 14, 2016'
    },
    permitReservationUsers: [{
      id: 179,
      name: '#Becky 0118',
      selected: false
    }, {
      id: 133,
      name: 'Becky 0512 long long long long long long long long long',
      selected: false
    }, {
      id: 230,
      name: '$flynn 1',
      selected: false
    }, {
      id: 231,
      name: '@flynn 2',
      selected: false
    }, {
      id: 218,
      name: 'éGrace 3 site',
      selected: false
    }, {
      id: 243,
      name: 'a1 a1',
      selected: false
    }, {
      id: 258,
      name: 'AA Demo AA Demo',
      selected: false
    }, {
      id: 232,
      name: 'flynn 2',
      selected: false
    }, {
      id: 281,
      name: 'Grace 3 site',
      selected: false
    }, {
      id: 242,
      name: 'a1 a1',
      selected: false
    }, {
      id: 259,
      name: 'AA Demo AA Demo',
      selected: false
    }],
    currentDate: 'Jun 30, 2016',
    currentTime: '19:13',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'H:mm',
    enableDigitalSignature: true,
    hideChecklistItemsSection: 'false',
    hideNotesSection: 'false',
    hideReservationCharges: 'false',
    hideCustomQuestionsSection: 'false',
    ssn_numeric_only: 'true',
    ssn_label: 'SSN',
    ssn_valid_length: '12',
    country_code: 'US',
    area_code: '010',
    companyWording: 'CompanyWording',
    showLightingPINRequired: false,
    isLightingPINRequired: false
  }
};

window.__permit__ = {
  __initialState__: {
    "mailingAddressLabel": "Mailing AddressXXX",
    "companyLabel": "CompanyXXX",
    "homeLabel": "HomeXXX",
    "workLabel": "WorkXXX",
    "cellLabel": "CellXXX",
    "showSignature4PermitHolder": true,
    "showSignature4AdditionalCustomer": true,
    "showSignature4Organization": true,
    "dateFormat": "MM/DD/YYYY",
    "timeFormat": "h:mm a",
    "showEmail": true
  }
};

window.__customerror__ = {
  __initialState__: {
    "errorMessage": "this is a error",
    "dateFormat" : "DD/MM/YYYY",
    "timeFormat" : "h:mm a",
    "timeZoneOffset": -8
  }
}

const formats = DateTimeFormat.getSystemDateTimeFormats({
  dateFormat: "YYYY/MM/DD",
  timeFormat: "h:mm a",
  timeZoneOffset: -8
});
Globalize.ANDateFormat = formats.systemDateFormat;
Globalize.ANTimeFormat = formats.systemTimeFormat;


window.roundCashPayments = function(roundCashType, roundCashTo, amount) {
  if (roundCashType === 0) { return amount; }

  let roundedAmount = parseFloat(amount);
  const remainingAmount = Math.round((parseFloat(amount) * 100) %
    (parseFloat(roundCashTo) * 100)) / 100;

  if (remainingAmount === 0) { return roundedAmount; }

  roundedAmount = (Math.round(parseFloat(amount) * 100) -
    Math.round(parseFloat(remainingAmount) * 100)) / 100;

  switch (roundCashType) {
    case 1:
      if (remainingAmount > (roundCashTo / 2)) {
        roundedAmount = (Math.round(parseFloat(roundedAmount) * 100)
        + Math.round(parseFloat(roundCashTo) * 100)) / 100;
      }
      break;
    case 2:
      if (remainingAmount >= roundCashTo / 2) {
        roundedAmount = (Math.round(parseFloat(roundedAmount) * 100)
        + Math.round(parseFloat(roundCashTo) * 100)) / 100;
      }
      break;
    case 3:
      roundedAmount = (Math.round(parseFloat(roundedAmount) * 100)
      + Math.round(parseFloat(roundCashTo) * 100)) / 100;
      break;
    default:
      break;
  }
  return roundedAmount;
}


window.__authoritiy__ = [
  {
    "authorityType": "enabled",
    "id": "newReservationHome",
    "name": "New Reservation Home"
  },
  {
    "authorityType": "display",
    "id": "reservationsPage",
    "name": "Reservations Page"
  },
  {
    "authorityType": "display",
    "id": "permitActionsOnReservationsPage",
    "name": "Permit Actions On Reservations Page"
  },
  {
    "authorityType": "display",
    "id": "calendarPage",
    "name": "Calendar Page"
  },
  {
    "authorityType": "enabled",
    "id": "buttonToCalendarPage",
    "name": "Button To Calendar Page"
  },
  {
    "authorityType": "enabled",
    "id": "buttonToReservationsPage",
    "name": "Button To Reservations Page"
  },
  {
    "id": "viewPermitContract",
    "authorityType": "hide",
    "name": "View Permit Contract"
  },
  {
    "id": "addGlobalQuickView",
    "authorityType": "enabled",
    "name": "Add Global Quick View"
  }
];
