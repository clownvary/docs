import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/PermitContract/actions';

import signatureBase64 from './signatureBase64';

const mockData = {
  "header": "test header<div>llllaalallala...</div>",
  "footer": "test footer:<div><ol><li>list one</li><li>list two</li></ol><div><b>bold content</b></div><div>llfalfals<span style=\"background-color: rgb(255, 0, 0);\"><font color=\"#ffffff\">falsfjalsfjzxv</font></span></div></div>",
  "permit_info": {
    "reservation_date": "Dec 30, 1899 0:00",
    "expiration_date": "Jun 11 2017",
    "system_user": "Admin Recware Admin Recware Admin Recware",
    "site_name": null,
    "user_name": "recware",
    "employee_id": "emp_111",
    "permit_status": "Tentative",
    "permit_number": 9000903,
    "customer_name": null,
    "permit_id": 2920,
    "event_name": null,
    "outstanding_balance": 0,
    "permit_start_date": null,
    "payers": [
      "Seymour212 Skinner212",
      "Seymour212 Skinner212",
      "Seymour212 Skinner212"
    ],
    "permit_end_date": null,
    "booking_number": 0,
    "event_number": 0,
    "invoice_total": 100.00,
    "status_id": 2
  },
  "org_info": {
    "site_name": "Central Community Center",
    "site_logo": "<a href=\" http://localcui.apm.activenet.com/Home\" target=\"_window\"><img class=\"bannerLogo\" src=\"downloadFile.sdi?uploadedfile_id=16\"  alt=\"banner_logo\" border=\"0\" vspace=\"0\" hspace=\"0\"></a>",
    "site_address": "Ninja Site ~!@#$%^&*()\nTiangu 8th Road ~!@#$%^&* - Line 1\nTiangu 8th Road - Line 2\nXian&, AA\n12345\n",
    "email_address": "yanbei0391@yahoo.com.cn",
    "phone_number": "(111) 111-1111",
    "fax_number": "(916) 925-0649"
  },
  "charge_summary": {
    "rental_fees": 1,
    "taxes": 0,
    "tax_list": [{
      "name": "tax1",
      "amount": 18.18
    }, {
      "name": "tax2",
      "amount": 18.18
    }],
    "discounts": 0,
    "deposits": 0,
    "deposits_taxes": 0,
    "deposits_discounts": 0,
    "refunds": 0,
    "charge_adjustment_for_refund": -9,
    "total_payments": 100001,
    "total_permit_fee": 2,
    "balance": 1002034340,
    "total_rental_fees": 1
  },
  "attached_files": [
    {
      "akamai_directory": "",
      "display_name": "9B2BB7AB.PNG",
      "file_size": "29.36kb",
      "file_type": "png",
      "upload_date": "2018 Mar 26 11:07 AM",
      "uploadedfile_id": "C28A0C890E"
    }
  ],
  "deposits_info": [{
    "amount_paid": 100.00,
    "balance": 0.00,
    "charge_amount": 100.00,
    "charge_amount_no_tax": 100.00,
    "charge_description": "Claim One-2017 Jun04 Party_3 #950-*lillian_facility",
    "charge_name": "Claim One",
    "event_name": "2017 Jun04 Party_3 #950",
    "receipt_detail_id": 71779,
    "refunds": 0,
    "resource_name": "*lillian_facility",
    "tax": 0
  }, {
    "amount_paid": 101.00,
    "balance": 0.00,
    "charge_amount": 101.00,
    "charge_amount_no_tax": 101.00,
    "charge_description": "Claim One-2017 Jun04 Party_2 #950-*lillian_facility",
    "charge_name": "Claim One",
    "event_name": "2017 Jun04 Party_2 #950",
    "receipt_detail_id": 71778,
    "refunds": 0,
    "resource_name": "*lillian_facility",
    "tax": 0
  }, {
    "amount_paid": 100.10,
    "balance": 0.00,
    "charge_amount": 100.10,
    "charge_amount_no_tax": 100.10,
    "charge_description": "Claim One-2017 Jun04 Party_1 #950-*lillian_facility",
    "charge_name": "Claim One",
    "event_name": "2017 Jun04 Party_1 #950",
    "receipt_detail_id": 71777,
    "refunds": 0,
    "resource_name": "*lillian_facility",
    "tax": 0
  }, {
    "amount_paid": 77.01,
    "balance": 30.00,
    "charge_amount": 77.01,
    "charge_amount_no_tax": 77.01,
    "charge_description": "Charge for intolerable condition",
    "charge_name": "Charge Intolerable",
    "event_name": "Charge Intolerable event",
    "receipt_detail_id": 77621,
    "refunds": 2.0,
    "resource_name": "resource_which_has_a_long_long_name_but_no_space_to_wrap",
    "tax": 0.1
  }],
  "events": [{
    "event_id": 1,
    "event_name": "2016 Annual Party",
    "resource_count": 1,
    "booking_count": 2,
    "customer_notes": "Though I have said this many times already, it seems necessary that I say it every time: I love accuracy in reporting. I care deeply about the truth, and lies and misinformation upset me a great deal. I believe that most of our problems in life can essentially be traced back to false beliefs, and as such, the ideas, stories and lies which create and reinforce false beliefs are the very things which perpetuate the problems we so desperately wish to solve.",
    "total_amount": 771.80,
    "resources": [{
      "additionfee_total": 21.80,
      "addtional_fee_details": [{
        "facility_charge_id": 0,
        "charge_name": "One_Time_Charge_Allen_1",
        "quantity": 1.00,
        "unit_fee": 21.00,
        "abbrev_unit_of_measure": "ea",
        "amount": 21.00,
        "receipt_detail_id": 71181,
        "facility_schedule_id": 0,
        "is_extra_booking_fee": false,
        "is_percentage_discount": false
      }, {
        "facility_charge_id": 0,
        "charge_name": "One_Time_Charge_Allen_2",
        "quantity": 1.00,
        "unit_fee": 21.00,
        "abbrev_unit_of_measure": "ea",
        "amount": 21.00,
        "receipt_detail_id": 71182,
        "facility_schedule_id": 0,
        "is_extra_booking_fee": true,
        "is_percentage_discount": false
      }, {
        "facility_charge_id": 0,
        "charge_name": "One_Time_Discount_Allen",
        "quantity": 1.00,
        "unit_fee": -16.00,
        "abbrev_unit_of_measure": "ea",
        "amount": -16.00,
        "receipt_detail_id": 71183,
        "facility_schedule_id": 0,
        "is_extra_booking_fee": false,
        "is_percentage_discount": false
      }, {
        "facility_charge_id": 0,
        "charge_name": "Percent_Discount_Allen_Hour",
        "quantity": 0.00,
        "unit_fee": -10.0000,
        "abbrev_unit_of_measure": "ea",
        "amount": -4.20,
        "receipt_detail_id": 71184,
        "facility_schedule_id": 0,
        "is_extra_booking_fee": false,
        "is_percentage_discount": true
      }],
      "event_type": "3 event type",
      "event_type_notes": "Though I have said this many times already, it seems necessary that I say it every time: I love accuracy in reporting. I care deeply about the truth, and lies and misinformation upset me a great deal. I believe that most of our problems in life can essentially be traced back to false beliefs, and as such, the ideas, stories and lies which create and reinforce false beliefs are the very things which perpetuate the problems we so desperately wish to solve.",
      "resource_name": "Allen_Facility",
      "center_name": "3 center",
      "facility_type": 0,
      "bookings": [{
        "resource_num": 3,
        "group_pattern_context": "{\"count\":4,\"frequency\":2,\"type\":1}",
        "group_pattern_description": "Daily, 2 times, from 27 Jul 2017",
        "exception_dates": [{
          "date": "Jul 29, 2017"
        }, {
          "start_date": "Jul 30, 2017",
          "end_date": "Jul 31, 2017"
        }],
        "recurring_items": [{
          "resource_num": 3,
          "group_pattern_context": null,
          "group_pattern_description": null,
          "exception_dates": null,
          "recurring_items": null,
          "schedule_fee": {
            "facility_schedule_id": 17358,
            "master_facility_schedule_id": 0,
            "schedule_amount": 375.00,
            "facility_schedule": {
              "start_date": "Jul 27, 2017",
              "start_time": "3:15 AM",
              "end_date": "Jul 28, 2017",
              "end_time": "4:15 AM",
              "start_dayofweek": "Thu",
              "end_dayofweek": "Fri"
            },
            "facility_charges": [{
              "facility_charge_id": 0,
              "charge_name": "Charge_Per_Hour_Allen",
              "quantity": 25.00,
              "unit_fee": 15.00,
              "abbrev_unit_of_measure": "/ hr",
              "amount": 375.00,
              "receipt_detail_id": 71179,
              "facility_schedule_id": 17358,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false
            }]
          },
          "is_recurring_master": false
        }, {
          "resource_num": 5,
          "group_pattern_context": null,
          "group_pattern_description": null,
          "exception_dates": null,
          "recurring_items": null,
          "schedule_fee": {
            "facility_schedule_id": 17359,
            "master_facility_schedule_id": 17358,
            "schedule_amount": 375.00,
            "facility_schedule": {
              "start_date": "Jul 31, 2017",
              "start_time": "3:15 AM",
              "end_date": "Aug 1, 2017",
              "end_time": "4:15 AM",
              "start_dayofweek": "Mon",
              "end_dayofweek": "Tue"
            },
            "facility_charges": [{
              "facility_charge_id": 0,
              "charge_name": "Charge_Per_Hour_Allen",
              "quantity": 25.00,
              "unit_fee": 15.00,
              "abbrev_unit_of_measure": "/ hr",
              "amount": 375.00,
              "receipt_detail_id": 71180,
              "facility_schedule_id": 17359,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false
            }]
          },
          "is_recurring_master": false
        }],
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 750.00,
          "facility_schedule": {
            "start_date": "Jul 27, 2017",
            "start_time": "3:15 AM",
            "end_date": "Aug 1, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Tue"
          },
          "facility_charges": []
        },
        "is_recurring_master": true
      }]
    }],
    "questions": [{
      "answers": [
        "01: answer_1"
      ],
      "customquestion_id": 1,
      "question": "question_1",
      "sub_questions": [{
        "answers": [
          "11: answer_1_sub"
        ],
        "customquestion_id": 2,
        "question": "question_1_sub",
        "sub_questions": [{
          "answers": [
            "111: answer_1_1_sub1",
            "112: answer_1_1_sub2",
            "113: answer_1_1_sub3",
            "114: answer_1_1_sub4"
          ],
          "customquestion_id": 2,
          "question": "question_1_1_sub?",
          "sub_questions": []
        }]
      }]
    }, {
      "answers": [
        "02: answer_2"
      ],
      "customquestion_id": 2,
      "question": "question_2",
      "sub_questions": []
    }],
    "checklist": {
      "information": [{
        "description": "Morgan Waiver 02",
        "signing_status": "Checked",
        "transactionstage_id": 3518
      }],
      "waivers": [{
        "akamai_directory": "http://localhost:8080/jettytest03/",
        "attachment_id": 123,
        "attachment_name": "sample.txt",
        "due_date": "9 Jul 2017",
        "print_payer_and_customer": true,
        "show_signature_line": false,
        "signature_base64": "",
        "signing_status": "Wavier Signed by: Jill Chen on 10 Jul 2017",
        "transactionstage_id": 3520,
        "uploadfile_href_text": null,
        "waiver_for": "Jill Chen",
        "waiver_name": "62118 - Jun.19 15:21",
        "waiver_text": "62118 - Jun.19 15:21"
      }, {
        "akamai_directory": null,
        "attachment_id": 0,
        "attachment_name": null,
        "due_date": "10 Jul 2017",
        "print_payer_and_customer": false,
        "show_signature_line": true,
        "signature_base64": "",
        "signing_status": "Wavier Signed",
        "transactionstage_id": 3519,
        "uploadfile_href_text": null,
        "waiver_for": "",
        "waiver_name": "Morgan Waiver 01",
        "waiver_text": "Definition of Waiver by ActiveNet123..."
      }, {
        "akamai_directory": null,
        "attachment_id": 0,
        "attachment_name": null,
        "due_date": "12 Jul 2017",
        "print_payer_and_customer": false,
        "show_signature_line": false,
        "signature_base64": "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",
        "signing_status": "Wavier Signed",
        "transactionstage_id": 3519,
        "uploadfile_href_text": null,
        "waiver_for": "",
        "waiver_name": "Morgan Waiver 01 - signed",
        "waiver_text": "Definition of Waiver by ActiveNet123... but signed"
      }, {
        "akamai_directory": null,
        "attachment_id": 0,
        "attachment_name": null,
        "due_date": "12 Jul 2017",
        "print_payer_and_customer": false,
        "show_signature_line": true,
        "signature_base64": "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",
        "signing_status": "Wavier Signed",
        "transactionstage_id": 3519,
        "uploadfile_href_text": null,
        "waiver_for": "",
        "waiver_name": "Morgan Waiver 01 - signed",
        "waiver_text": "U.S. Legal Forms offers waiver and release forms for many types of activities and events. A waiver and release form is typically used to protect a business or person from liability for dangerous activities by allowing the participant to sign a release before participating. Download our Release of Liability forms in Word format and preview online before you purchase. Waiver of Liability forms are provided for both adults and minors. U.S. Legal Forms offers waiver and release forms for many types of activities and events. A waiver and release form is typically used to protect a business or person from liability for dangerous activities by allowing the participant to sign a release before participating. Download our Release of Liability forms in Word format and preview online before you purchase. Waiver of Liability forms are provided for both adults and minors. U.S. Legal Forms offers waiver and release forms for many types of activities and events. A waiver and release form is typically used to protect a business or person from liability for dangerous activities by allowing the participant to sign a release before participating. Download our Release of Liability forms in Word format and preview online before you purchase. Waiver of Liability forms are provided for both adults and minors."
      }]
    }
  }, {
    "event_id": 2,
    "event_name": "2017 Annual Party",
    "resource_count": 1,
    "booking_count": 2,
    "customer_notes": "Though I have said this many times already, it seems necessary that I say it every time: I love accuracy in reporting. I care deeply about the truth, and lies and misinformation upset me a great deal. I believe that most of our problems in life can essentially be traced back to false beliefs, and as such, the ideas, stories and lies which create and reinforce false beliefs are the very things which perpetuate the problems we so desperately wish to solve.",
    "total_amount": 0,
    "resources": [{
      "additionfee_total": 0,
      "addtional_fee_details": [],
      "event_type": "3 event type",
      "event_type_notes": "3 event type notes",
      "facility_notes": "3 event facility notes",
      "center_notes": "3 event center notes",
      "prep_code_notes": "3 prep code notes",
      "resource_name": "Allen_Facility",
      "center_name": "3 center",
      "facility_type": 0,
      "bookings": [{
        "resource_num": 3,
        "group_pattern_context": "{\"count\":4,\"frequency\":2,\"type\":1}",
        "group_pattern_description": "Daily, 2 times, from 27 Jul 2017",
        "exception_dates": [{
          "date": "Jul 29, 2017"
        }, {
          "start_date": "Jul 30, 2017",
          "end_date": "Jul 31, 2017"
        }, {
          "invalid_exception_date": "test"
        }],
        "recurring_items": [{
          "resource_num": 3,
          "group_pattern_context": null,
          "group_pattern_description": null,
          "exception_dates": null,
          "recurring_items": null,
          "schedule_fee": {
            "facility_schedule_id": 17358,
            "master_facility_schedule_id": 0,
            "schedule_amount": 375.00,
            "facility_schedule": {
              "start_date": "Jul 27, 2017",
              "start_time": "3:15 AM",
              "end_date": "Jul 28, 2017",
              "end_time": "4:15 AM",
              "start_dayofweek": "Thu",
              "end_dayofweek": "Fri"
            },
            "facility_charges": [{
              "facility_charge_id": 0,
              "charge_name": "Charge_Per_Hour_Allen",
              "quantity": 25.00,
              "unit_fee": 15.00,
              "abbrev_unit_of_measure": "/ hr",
              "amount": 375.00,
              "receipt_detail_id": 71179,
              "facility_schedule_id": 17358,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false
            }]
          },
          "is_recurring_master": false
        }, {
          "resource_num": 5,
          "group_pattern_context": null,
          "group_pattern_description": null,
          "exception_dates": null,
          "recurring_items": null,
          "schedule_fee": {
            "facility_schedule_id": 17359,
            "master_facility_schedule_id": 17358,
            "schedule_amount": 375.00,
            "facility_schedule": {
              "start_date": "Jul 31, 2017",
              "start_time": "3:15 AM",
              "end_date": "Aug 1, 2017",
              "end_time": "4:15 AM",
              "start_dayofweek": "Mon",
              "end_dayofweek": "Tue"
            },
            "facility_charges": [{
              "facility_charge_id": 0,
              "charge_name": "Charge_Per_Hour_Allen",
              "quantity": 25.00,
              "unit_fee": 15.00,
              "abbrev_unit_of_measure": "/ hr",
              "amount": 375.00,
              "receipt_detail_id": 71180,
              "facility_schedule_id": 17359,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false
            }]
          },
          "is_recurring_master": false
        }],
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 750.00,
          "facility_schedule": {
            "start_date": "Jul 27, 2017",
            "start_time": "3:15 AM",
            "end_date": "Aug 1, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Tue"
          },
          "facility_charges": []
        },
        "is_recurring_master": true
      }, {
        "resource_num": 3,
        "group_pattern_context": "{\"count\":4,\"frequency\":2,\"type\":1}",
        "group_pattern_description": "Daily, 4 times, from 27 Jul 2017",
        "recurring_items": [{
          "resource_num": 3,
          "group_pattern_context": null,
          "group_pattern_description": null,
          "exception_dates": null,
          "recurring_items": null,
          "schedule_fee": {
            "facility_schedule_id": 17358,
            "master_facility_schedule_id": 0,
            "schedule_amount": 375.00,
            "facility_schedule": {
              "start_date": "Jul 27, 2017",
              "start_time": "3:15 AM",
              "end_date": "Jul 28, 2017",
              "end_time": "4:15 AM",
              "start_dayofweek": "Thu",
              "end_dayofweek": "Fri"
            },
            "facility_charges": [{
              "facility_charge_id": 0,
              "charge_name": "Charge_Per_Hour_Allen",
              "quantity": 25.00,
              "unit_fee": 15.00,
              "abbrev_unit_of_measure": "/ hr",
              "amount": 375.00,
              "receipt_detail_id": 71179,
              "facility_schedule_id": 17358,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false
            }]
          },
          "is_recurring_master": false
        }, {
          "resource_num": 5,
          "group_pattern_context": null,
          "group_pattern_description": null,
          "exception_dates": null,
          "recurring_items": null,
          "schedule_fee": {
            "facility_schedule_id": 17359,
            "master_facility_schedule_id": 17358,
            "schedule_amount": 375.00,
            "facility_schedule": {
              "start_date": "Jul 31, 2017",
              "start_time": "3:15 AM",
              "end_date": "Aug 1, 2017",
              "end_time": "4:15 AM",
              "start_dayofweek": "Mon",
              "end_dayofweek": "Tue"
            },
            "facility_charges": [{
              "facility_charge_id": 0,
              "charge_name": "Charge_Per_Hour_Allen",
              "quantity": 25.00,
              "unit_fee": 15.00,
              "abbrev_unit_of_measure": "/ hr",
              "amount": 375.00,
              "receipt_detail_id": 71180,
              "facility_schedule_id": 17359,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false
            }]
          },
          "is_recurring_master": false
        }],
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 750.00,
          "facility_schedule": {
            "start_date": "Jul 27, 2017",
            "start_time": "3:15 AM",
            "end_date": "Aug 1, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Tue"
          },
          "facility_charges": []
        },
        "is_recurring_master": true
      }, {
        "resource_num": 3,
        "group_pattern_context": null,
        "group_pattern_description": null,
        "exception_dates": null,
        "recurring_items": null,
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 0.00,
          "facility_schedule": {
            "start_date": "Jul 28, 2017",
            "start_time": "3:15 AM",
            "end_date": "Jul 29, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Fri"
          },
          "facility_charges": []
        },
        "is_recurring_master": false
      }, {
        "resource_num": 3,
        "group_pattern_context": null,
        "group_pattern_description": null,
        "exception_dates": null,
        "recurring_items": null,
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 375.00,
          "facility_schedule": {
            "start_date": "Jul 29, 2017",
            "start_time": "3:15 AM",
            "end_date": "Jul 29, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Fri"
          },
          "facility_charges": [{
            "facility_charge_id": 0,
            "charge_name": "Charge_Per_Hour_Allen",
            "quantity": 25.00,
            "unit_fee": 15.00,
            "abbrev_unit_of_measure": "/ hr",
            "amount": 375.00,
            "receipt_detail_id": 71179,
            "facility_schedule_id": 17358,
            "is_extra_booking_fee": false,
            "is_percentage_discount": false
          }]
        },
        "is_recurring_master": false
      }, {
        "resource_num": 3,
        "group_pattern_context": null,
        "group_pattern_description": null,
        "exception_dates": null,
        "recurring_items": null,
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 375.00,
          "facility_schedule": {
            "start_date": "Jul 30, 2017",
            "start_time": "3:15 AM",
            "end_date": "Jul 29, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Fri"
          },
          "facility_charges": [{
            "facility_charge_id": 0,
            "charge_name": "Charge_Per_Hour_Allen",
            "quantity": 25.00,
            "unit_fee": 15.00,
            "abbrev_unit_of_measure": "/ hr",
            "amount": 375.00,
            "receipt_detail_id": 71179,
            "facility_schedule_id": 17358,
            "is_extra_booking_fee": false,
            "is_percentage_discount": false
          }]
        },
        "is_recurring_master": false
      }]
    }, {
      "additionfee_total": 0,
      "addtional_fee_details": [],
      "event_type": "4 event type",
      "event_type_notes": "4 event type notes",
      "facility_notes": "4 event facility notes",
      "center_notes": "4 event center notes",
      "prep_code_notes": "4 prep code notes",
      "resource_name": "Test_Facility",
      "center_name": "4 center",
      "facility_type": 0,
      "bookings": [{
        "resource_num": 3,
        "group_pattern_context": "{\"count\":4,\"frequency\":2,\"type\":1}",
        "group_pattern_description": "Daily, 2 times, from 27 Jul 2017",
        "exception_dates": [{
          "date": "Jul 29, 2017"
        }, {
          "start_date": "Jul 30, 2017",
          "end_date": "Jul 31, 2017"
        }, {
          "invalid_exception_date": "test"
        }],
        "recurring_items": [{
          "resource_num": 3,
          "group_pattern_context": null,
          "group_pattern_description": null,
          "exception_dates": null,
          "recurring_items": null,
          "schedule_fee": {
            "facility_schedule_id": 17358,
            "master_facility_schedule_id": 0,
            "schedule_amount": 375.00,
            "facility_schedule": {
              "start_date": "Jul 27, 2017",
              "start_time": "3:15 AM",
              "end_date": "Jul 28, 2017",
              "end_time": "4:15 AM",
              "start_dayofweek": "Thu",
              "end_dayofweek": "Fri"
            },
            "facility_charges": [{
              "facility_charge_id": 0,
              "charge_name": "Charge_Per_Hour_Allen",
              "quantity": 25.00,
              "unit_fee": 15.00,
              "abbrev_unit_of_measure": "/ hr",
              "amount": 375.00,
              "receipt_detail_id": 71179,
              "facility_schedule_id": 17358,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false
            }]
          },
          "is_recurring_master": false
        }, {
          "resource_num": 5,
          "group_pattern_context": null,
          "group_pattern_description": null,
          "exception_dates": null,
          "recurring_items": null,
          "schedule_fee": {
            "facility_schedule_id": 17359,
            "master_facility_schedule_id": 17358,
            "schedule_amount": 375.00,
            "facility_schedule": {
              "start_date": "Jul 31, 2017",
              "start_time": "3:15 AM",
              "end_date": "Aug 1, 2017",
              "end_time": "4:15 AM",
              "start_dayofweek": "Mon",
              "end_dayofweek": "Tue"
            },
            "facility_charges": [{
              "facility_charge_id": 0,
              "charge_name": "Charge_Per_Hour_Allen",
              "quantity": 25.00,
              "unit_fee": 15.00,
              "abbrev_unit_of_measure": "/ hr",
              "amount": 375.00,
              "receipt_detail_id": 71180,
              "facility_schedule_id": 17359,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false
            }]
          },
          "is_recurring_master": false
        }],
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 750.00,
          "facility_schedule": {
            "start_date": "Jul 27, 2017",
            "start_time": "3:15 AM",
            "end_date": "Aug 1, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Tue"
          },
          "facility_charges": []
        },
        "is_recurring_master": true
      }, {
        "resource_num": 3,
        "group_pattern_context": "{\"count\":4,\"frequency\":2,\"type\":1}",
        "group_pattern_description": "Daily, 4 times, from 27 Jul 2017",
        "recurring_items": [{
          "resource_num": 3,
          "group_pattern_context": null,
          "group_pattern_description": null,
          "exception_dates": null,
          "recurring_items": null,
          "schedule_fee": {
            "facility_schedule_id": 17358,
            "master_facility_schedule_id": 0,
            "schedule_amount": 375.00,
            "facility_schedule": {
              "start_date": "Jul 27, 2017",
              "start_time": "3:15 AM",
              "end_date": "Jul 28, 2017",
              "end_time": "4:15 AM",
              "start_dayofweek": "Thu",
              "end_dayofweek": "Fri"
            },
            "facility_charges": [{
              "facility_charge_id": 0,
              "charge_name": "Charge_Per_Hour_Allen",
              "quantity": 25.00,
              "unit_fee": 15.00,
              "abbrev_unit_of_measure": "/ hr",
              "amount": 375.00,
              "receipt_detail_id": 71179,
              "facility_schedule_id": 17358,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false
            }]
          },
          "is_recurring_master": false
        }, {
          "resource_num": 5,
          "group_pattern_context": null,
          "group_pattern_description": null,
          "exception_dates": null,
          "recurring_items": null,
          "schedule_fee": {
            "facility_schedule_id": 17359,
            "master_facility_schedule_id": 17358,
            "schedule_amount": 375.00,
            "facility_schedule": {
              "start_date": "Jul 31, 2017",
              "start_time": "3:15 AM",
              "end_date": "Aug 1, 2017",
              "end_time": "4:15 AM",
              "start_dayofweek": "Mon",
              "end_dayofweek": "Tue"
            },
            "facility_charges": [{
              "facility_charge_id": 0,
              "charge_name": "Charge_Per_Hour_Allen",
              "quantity": 25.00,
              "unit_fee": 15.00,
              "abbrev_unit_of_measure": "/ hr",
              "amount": 375.00,
              "receipt_detail_id": 71180,
              "facility_schedule_id": 17359,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false
            }]
          },
          "is_recurring_master": false
        }],
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 750.00,
          "facility_schedule": {
            "start_date": "Jul 27, 2017",
            "start_time": "3:15 AM",
            "end_date": "Aug 1, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Tue"
          },
          "facility_charges": []
        },
        "is_recurring_master": true
      }, {
        "resource_num": 3,
        "group_pattern_context": null,
        "group_pattern_description": null,
        "exception_dates": null,
        "recurring_items": null,
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 0.00,
          "facility_schedule": {
            "start_date": "Jul 28, 2017",
            "start_time": "3:15 AM",
            "end_date": "Jul 29, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Fri"
          },
          "facility_charges": []
        },
        "is_recurring_master": false
      }, {
        "resource_num": 3,
        "group_pattern_context": null,
        "group_pattern_description": null,
        "exception_dates": null,
        "recurring_items": null,
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 375.00,
          "facility_schedule": {
            "start_date": "Jul 29, 2017",
            "start_time": "3:15 AM",
            "end_date": "Jul 29, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Fri"
          },
          "facility_charges": [{
            "facility_charge_id": 0,
            "charge_name": "Charge_Per_Hour_Allen",
            "quantity": 25.00,
            "unit_fee": 15.00,
            "abbrev_unit_of_measure": "/ hr",
            "amount": 375.00,
            "receipt_detail_id": 71179,
            "facility_schedule_id": 17358,
            "is_extra_booking_fee": false,
            "is_percentage_discount": false
          }]
        },
        "is_recurring_master": false
      }, {
        "resource_num": 3,
        "group_pattern_context": null,
        "group_pattern_description": null,
        "exception_dates": null,
        "recurring_items": null,
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 375.00,
          "facility_schedule": {
            "start_date": "Jul 30, 2017",
            "start_time": "3:15 AM",
            "end_date": "Jul 29, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Fri"
          },
          "facility_charges": [{
            "facility_charge_id": 0,
            "charge_name": "Charge_Per_Hour_Allen",
            "quantity": 25.00,
            "unit_fee": 15.00,
            "abbrev_unit_of_measure": "/ hr",
            "amount": 375.00,
            "receipt_detail_id": 71179,
            "facility_schedule_id": 17358,
            "is_extra_booking_fee": false,
            "is_percentage_discount": false
          }]
        },
        "is_recurring_master": false
      }]
    }, {
      "additionfee_total": 0,
      "addtional_fee_details": [],
      "event_type": "3 event type",
      "resource_name": "Allen_Facility",
      "center_name": "3 center",
      "event_type_notes": "3 event type notes",
      "facility_notes": "3 event facility notes",
      "center_notes": "3 event center notes",
      "prep_code_notes": "3 prep code notes",
      "facility_type": 0,
      "bookings": [{
        "resource_num": 3,
        "group_pattern_context": "{\"count\":4,\"frequency\":2,\"type\":1}",
        "group_pattern_description": "Daily, 2 times, from 27 Jul 2017",
        "exception_dates": [{
          "date": "Jul 29, 2017"
        }, {
          "start_date": "Jul 30, 2017",
          "end_date": "Jul 31, 2017"
        }, {
          "invalid_exception_date": "test"
        }],
        "recurring_items": [{
          "resource_num": 3,
          "group_pattern_context": null,
          "group_pattern_description": null,
          "exception_dates": null,
          "recurring_items": null,
          "schedule_fee": {
            "facility_schedule_id": 17358,
            "master_facility_schedule_id": 0,
            "schedule_amount": 375.00,
            "facility_schedule": {
              "start_date": "Jul 27, 2017",
              "start_time": "3:15 AM",
              "end_date": "Jul 28, 2017",
              "end_time": "4:15 AM",
              "start_dayofweek": "Thu",
              "end_dayofweek": "Fri"
            },
            "facility_charges": [{
              "facility_charge_id": 0,
              "charge_name": "Charge_Per_Hour_Allen",
              "quantity": 25.00,
              "unit_fee": 15.00,
              "abbrev_unit_of_measure": "/ hr",
              "amount": 375.00,
              "receipt_detail_id": 71179,
              "facility_schedule_id": 17358,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false
            }]
          },
          "is_recurring_master": false
        }, {
          "resource_num": 5,
          "group_pattern_context": null,
          "group_pattern_description": null,
          "exception_dates": null,
          "recurring_items": null,
          "schedule_fee": {
            "facility_schedule_id": 17359,
            "master_facility_schedule_id": 17358,
            "schedule_amount": 375.00,
            "facility_schedule": {
              "start_date": "Jul 31, 2017",
              "start_time": "3:15 AM",
              "end_date": "Aug 1, 2017",
              "end_time": "4:15 AM",
              "start_dayofweek": "Mon",
              "end_dayofweek": "Tue"
            },
            "facility_charges": [{
              "facility_charge_id": 0,
              "charge_name": "Charge_Per_Hour_Allen",
              "quantity": 25.00,
              "unit_fee": 15.00,
              "abbrev_unit_of_measure": "/ hr",
              "amount": 375.00,
              "receipt_detail_id": 71180,
              "facility_schedule_id": 17359,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false
            }]
          },
          "is_recurring_master": false
        }],
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 750.00,
          "facility_schedule": {
            "start_date": "Jul 27, 2017",
            "start_time": "3:15 AM",
            "end_date": "Aug 1, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Tue"
          },
          "facility_charges": []
        },
        "is_recurring_master": true
      }, {
        "resource_num": 3,
        "group_pattern_context": "{\"count\":4,\"frequency\":2,\"type\":1}",
        "group_pattern_description": "Daily, 4 times, from 27 Jul 2017",
        "recurring_items": [{
          "resource_num": 3,
          "group_pattern_context": null,
          "group_pattern_description": null,
          "exception_dates": null,
          "recurring_items": null,
          "schedule_fee": {
            "facility_schedule_id": 17358,
            "master_facility_schedule_id": 0,
            "schedule_amount": 375.00,
            "facility_schedule": {
              "start_date": "Jul 27, 2017",
              "start_time": "3:15 AM",
              "end_date": "Jul 28, 2017",
              "end_time": "4:15 AM",
              "start_dayofweek": "Thu",
              "end_dayofweek": "Fri"
            },
            "facility_charges": [{
              "facility_charge_id": 0,
              "charge_name": "Charge_Per_Hour_Allen",
              "quantity": 25.00,
              "unit_fee": 15.00,
              "abbrev_unit_of_measure": "/ hr",
              "amount": 375.00,
              "receipt_detail_id": 71179,
              "facility_schedule_id": 17358,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false
            }]
          },
          "is_recurring_master": false
        }, {
          "resource_num": 5,
          "group_pattern_context": null,
          "group_pattern_description": null,
          "exception_dates": null,
          "recurring_items": null,
          "schedule_fee": {
            "facility_schedule_id": 17359,
            "master_facility_schedule_id": 17358,
            "schedule_amount": 375.00,
            "facility_schedule": {
              "start_date": "Jul 31, 2017",
              "start_time": "3:15 AM",
              "end_date": "Aug 1, 2017",
              "end_time": "4:15 AM",
              "start_dayofweek": "Mon",
              "end_dayofweek": "Tue"
            },
            "facility_charges": [{
              "facility_charge_id": 0,
              "charge_name": "Charge_Per_Hour_Allen",
              "quantity": 25.00,
              "unit_fee": 15.00,
              "abbrev_unit_of_measure": "/ hr",
              "amount": 375.00,
              "receipt_detail_id": 71180,
              "facility_schedule_id": 17359,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false
            }]
          },
          "is_recurring_master": false
        }],
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 750.00,
          "facility_schedule": {
            "start_date": "Jul 27, 2017",
            "start_time": "3:15 AM",
            "end_date": "Aug 1, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Tue"
          },
          "facility_charges": []
        },
        "is_recurring_master": true
      }, {
        "resource_num": 3,
        "group_pattern_context": null,
        "group_pattern_description": null,
        "exception_dates": null,
        "recurring_items": null,
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 0.00,
          "facility_schedule": {
            "start_date": "Jul 28, 2017",
            "start_time": "3:15 AM",
            "end_date": "Jul 29, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Fri"
          },
          "facility_charges": []
        },
        "is_recurring_master": false
      }, {
        "resource_num": 3,
        "group_pattern_context": null,
        "group_pattern_description": null,
        "exception_dates": null,
        "recurring_items": null,
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 375.00,
          "facility_schedule": {
            "start_date": "Jul 29, 2017",
            "start_time": "3:15 AM",
            "end_date": "Jul 29, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Fri"
          },
          "facility_charges": [{
            "facility_charge_id": 0,
            "charge_name": "Charge_Per_Hour_Allen",
            "quantity": 25.00,
            "unit_fee": 15.00,
            "abbrev_unit_of_measure": "/ hr",
            "amount": 375.00,
            "receipt_detail_id": 71179,
            "facility_schedule_id": 17358,
            "is_extra_booking_fee": false,
            "is_percentage_discount": false
          }]
        },
        "is_recurring_master": false
      }, {
        "resource_num": 3,
        "group_pattern_context": null,
        "group_pattern_description": null,
        "exception_dates": null,
        "recurring_items": null,
        "schedule_fee": {
          "facility_schedule_id": 17358,
          "master_facility_schedule_id": 0,
          "schedule_amount": 375.00,
          "facility_schedule": {
            "start_date": "Jul 30, 2017",
            "start_time": "3:15 AM",
            "end_date": "Jul 29, 2017",
            "end_time": "4:15 AM",
            "start_dayofweek": "Thu",
            "end_dayofweek": "Fri"
          },
          "facility_charges": [{
            "facility_charge_id": 0,
            "charge_name": "Charge_Per_Hour_Allen",
            "quantity": 25.00,
            "unit_fee": 15.00,
            "abbrev_unit_of_measure": "/ hr",
            "amount": 375.00,
            "receipt_detail_id": 71179,
            "facility_schedule_id": 17358,
            "is_extra_booking_fee": false,
            "is_percentage_discount": false
          }]
        },
        "is_recurring_master": false
      }]
    }],
    "questions": [{
      "answers": [
        "01: answer_1"
      ],
      "customquestion_id": 1,
      "question": "question_1",
      "sub_questions": [{
        "answers": [
          "11: answer_1_sub"
        ],
        "customquestion_id": 2,
        "question": "question_1_sub",
        "sub_questions": [{
          "answers": [
            "111: answer_1_1_sub1",
            "112: answer_1_1_sub2",
            "113: answer_1_1_sub3",
            "114: answer_1_1_sub4"
          ],
          "customquestion_id": 2,
          "question": "question_1_1_sub?",
          "sub_questions": []
        }]
      }]
    }, {
      "answers": [
        "02: answer_2"
      ],
      "customquestion_id": 2,
      "question": "question_2",
      "sub_questions": []
    }],
    "checklist": {
      "information": [{
        "description": "Morgan Waiver 02",
        "signing_status": "Checked",
        "transactionstage_id": 3518
      }],
      "waivers": [{
        "akamai_directory": "http://localhost:8080/jettytest03/",
        "attachment_id": 123,
        "attachment_name": "sample.txt",
        "due_date": "9 Jul 2017",
        "print_payer_and_customer": true,
        "show_signature_line": false,
        "signature_base64": "",
        "signing_status": "Wavier Signed by: Jill Chen on 10 Jul 2017",
        "transactionstage_id": 3520,
        "uploadfile_href_text": null,
        "waiver_for": "Jill Chen",
        "waiver_name": "62118 - Jun.19 15:21",
        "waiver_text": "62118 - Jun.19 15:21"
      }, {
        "akamai_directory": null,
        "attachment_id": 0,
        "attachment_name": null,
        "due_date": "10 Jul 2017",
        "print_payer_and_customer": false,
        "show_signature_line": true,
        "signature_base64": "",
        "signing_status": "Wavier Signed",
        "transactionstage_id": 3519,
        "uploadfile_href_text": null,
        "waiver_for": "",
        "waiver_name": "Morgan Waiver 01",
        "waiver_text": "Definition of Waiver by ActiveNet123..."
      }, {
        "akamai_directory": null,
        "attachment_id": 0,
        "attachment_name": null,
        "due_date": "12 Jul 2017",
        "print_payer_and_customer": false,
        "show_signature_line": false,
        "signature_base64": "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",
        "signing_status": "Wavier Signed",
        "transactionstage_id": 3519,
        "uploadfile_href_text": null,
        "waiver_for": "",
        "waiver_name": "Morgan Waiver 01 - signed",
        "waiver_text": "Definition of Waiver by ActiveNet123... but signed"
      }, {
        "akamai_directory": null,
        "attachment_id": 0,
        "attachment_name": null,
        "due_date": "12 Jul 2017",
        "print_payer_and_customer": false,
        "show_signature_line": true,
        "signature_base64": "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",
        "signing_status": "Wavier Signed",
        "transactionstage_id": 3519,
        "uploadfile_href_text": null,
        "waiver_for": "",
        "waiver_name": "Morgan Waiver 01 - signed",
        "waiver_text": "Definition of Waiver by ActiveNet123... but signed"
      }]
    }
  }],
  "payments_and_refunds": [{
    "applied_amount": 1.00,
    "charge_amount": 0,
    "charge_name": "3 HOUR fee",
    "event_name": "2017 JUN04 Party#4 #950",
    "receipt_number": 1001210.069,
    "resource_name": "*lillian_facility",
    "transaction_date": "23 Jul 2017"
  }, {
    "applied_amount": 1.00,
    "charge_amount": 0,
    "charge_name": "3 HOUR fee",
    "event_name": "2017 Jun04 Party_3 #950",
    "receipt_number": 1001210.069,
    "resource_name": "*lillian_facility",
    "transaction_date": "13 Jul 2017"
  }, {
    "applied_amount": 100.00,
    "charge_amount": 0,
    "charge_name": "Claim One",
    "event_name": "2017 Jun04 Party_3 #950",
    "receipt_number": 1001238.069,
    "resource_name": "*lillian_facility",
    "transaction_date": "6 Jul 2017"
  }, {
    "applied_amount": 20.00,
    "charge_amount": 0,
    "charge_name": "new charge1",
    "event_name": "ww #950",
    "receipt_number": 1001244.069,
    "resource_name": "Becky new",
    "transaction_date": "10 Jul 2017"
  }, {
    "applied_amount": 95.00,
    "charge_amount": 0,
    "charge_name": "Administrative Fee",
    "event_name": "ww #950",
    "receipt_number": 1001244.069,
    "resource_name": "Becky new",
    "transaction_date": "10 Jul, 2016"
  }, {
    "applied_amount": -18.75,
    "charge_amount": 0,
    "charge_name": "Charge_Per_Hour_Allen",
    "event_name": "ww #950",
    "receipt_number": 1001244.069,
    "resource_name": "",
    "transaction_date": "10 Aug 2017"
  }],
  "signatures": {
    "company": {
      "company_id": 63,
      "company_name": "3 Company With Agent",
      "company_phone1": "+1US9927330123",
      "company_phone2": "+8613344445555",
      "customer_type": "Ancien/Alumni",
      "mailing_address1": "De",
      "mailing_address2": "Sw",
      "mailing_city": "Portland",
      "mailing_state": "CA",
      "mailing_zipcode": "90005"
    },
    "customer": {
      "cell_phone": "+8613344445555",
      "customer_id": 32436,
      "customer_name": "Company With Agent 1215",
      "email_address": "sw@887.com",
      "home_phone": "+1US4434467656",
      "mailing_address1": "Ef",
      "mailing_address2": "Gy",
      "mailing_city": "Boston",
      "mailing_state": "LA",
      "mailing_zipcode": "77823",
      "work_phone": "+1US9927330123"
    },
    "org": {
      "phone_number": "(234) 423-4323",
      "site_logo": "<img src=\"downloadFile.sdi?uploadedfile_id=187\" border=0 alt=\"Site Logo\"/>",
      "site_name": "Signature_Site",
      "fax_number": "FX-99721",
      "email_address": "sd@887.com",
      "mailing_address1": "De",
      "mailing_address2": "Sw",
      "mailing_city": "Portland",
      "mailing_state": "CA",
      "mailing_zipcode": "90005"
    }
  },
  "payment_schedules": {
    "original_balance": 100,
    "schedules": [{
        "due_date": "2017 Aug 2",
        "amount": 5,
        "paid": 0,
        "withdrawn_adjustment": 4,
        "balance": 33.33
    }, {
        "due_date": "2017 Aug 9",
        "amount": 10,
        "paid": 5,
        "withdrawn_adjustment": 10,
        "balance": 20
    }, {
        "due_date": "2017 Aug 16",
        "amount": 33.34,
        "paid": 12,
        "withdrawn_adjustment": 25.1,
        "balance": 5
    }],
    "current_balance": 100
  }
};

const mockSchedule = {
  "permit_schedules": [
    {
      "center_name": "",
      "end_date": "30 Jul 2017",
      "end_day_of_week": "Sun",
      "end_time": "1:30 AM",
      "event_name": "Test Recurring",
      "exceptions": [
        {
          "date": "8 Aug 2017",
        },
      ],
      "occurrences": 9,
      "recurring_indicator": true,
      "resource_name": "zack facility minutes",
      "schedules": [
        {
          "center_name": "*lillian_center1",
          "end_date": "30 Jul 2017",
          "end_day_of_week": "Sun",
          "end_time": "1:30 AM",
          "event_name": "Test Recurring",
          "occurrences": 0,
          "recurring_indicator": false,
          "resource_name": "zack facility minutes",
          "start_date": "30 Jul 2017",
          "start_day_of_week": "Sun",
          "start_time": "1:00 AM",
        },
      ],
      "start_date": "29 Jul 2017",
      "start_day_of_week": "Sun",
      "start_time": "1:00 AM",
    },
    {
      "center_name": "*lillian_center2",
      "end_date": "17 Jul 2017",
      "end_day_of_week": "Sun",
      "end_time": "1:30 AM",
      "event_name": "Test Recurring",
      "exceptions": [],
      "occurrences": 0,
      "recurring_indicator": false,
      "resource_name": "zack facility minutes",
      "schedules": [],
      "start_date": "8 Jul 2017",
      "start_day_of_week": "Sun",
      "start_time": "2:00 AM",
    },
    {
      "center_name": "",
      "end_date": "18 Jul 2017",
      "end_day_of_week": "Sun",
      "end_time": "1:30 AM",
      "event_name": "Test Recurring",
      "exceptions": [],
      "occurrences": 0,
      "recurring_indicator": false,
      "resource_name": "zack facility minutes",
      "schedules": [],
      "start_date": "10 Jul 2017",
      "start_day_of_week": "Sun",
      "start_time": "4:00 AM",
    },
    {
      "center_name": "*lillian_center3",
      "end_date": "20 Jul 2017",
      "end_day_of_week": "Sun",
      "end_time": "1:30 AM",
      "event_name": "Test Recurring",
      "exceptions": [],
      "occurrences": 0,
      "recurring_indicator": false,
      "resource_name": "zack facility minutes",
      "schedules": [],
      "start_date": "20 Jul 2017",
      "start_day_of_week": "Sun",
      "start_time": "3:00 PM",
    },
    {
      "center_name": "*lillian_center1",
      "end_date": "30 Jul 2017",
      "end_day_of_week": "Sun",
      "end_time": "1:30 AM",
      "event_name": "Test Recurring",
      "exceptions": [
        {
          "date": "8 Aug 2017",
        },
        {
          "date": "9 Aug 2017",
        },
        {
          "date": "10 Aug 2017",
        },
      ],
      "occurrences": 9,
      "recurring_indicator": true,
      "resource_name": "zack facility minutes",
      "schedules": [
        {
          "center_name": "*lillian_center1",
          "end_date": "30 Jul 2017",
          "end_day_of_week": "Sun",
          "end_time": "1:30 AM",
          "event_name": "Test Recurring",
          "occurrences": 0,
          "recurring_indicator": false,
          "resource_name": "zack facility minutes",
          "start_date": "30 Jul 2017",
          "start_day_of_week": "Sun",
          "start_time": "9:00 AM",
        },
        {
          "center_name": "*lillian_center1",
          "end_date": "31 Jul 2017",
          "end_day_of_week": "Mon",
          "end_time": "1:30 AM",
          "event_name": "Test Recurring",
          "occurrences": 0,
          "recurring_indicator": false,
          "resource_name": "zack facility minutes",
          "start_date": "31 Jul 2017",
          "start_day_of_week": "Mon",
          "start_time": "1:00 AM",
        },
        {
          "center_name": "*lillian_center1",
          "end_date": "1 Aug 2017",
          "end_day_of_week": "Tue",
          "end_time": "1:30 AM",
          "event_name": "Test Recurring",
          "occurrences": 0,
          "recurring_indicator": false,
          "resource_name": "zack facility minutes",
          "start_date": "1 Aug 2017",
          "start_day_of_week": "Tue",
          "start_time": "1:00 AM",
        },
      ],
      "start_date": "30 Jul 2017",
      "start_day_of_week": "Sun",
      "start_time": "1:00 AM",
    },
  ],
};

const initialData = {
  permitId: 11112
}

describe('index -> payment -> actions -> PermitContract', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({ initialData });
  });

  afterEach(() => {
    store.clearActions();
  });

  test('fetchPermitContract method should works fine', () => {
    const { fetchPermitContract } = actions;

    return store.dispatch(fetchPermitContract())
      .then(({ payload: { headers, body } }) => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(headers.response_code).toBe('0000');
        expect(headers.response_message).toBe('Successful');
        expect(body).toEqual(mockData);
    });
  });

  test('fetchPermitSchedule method should works fine', () => {
    const { fetchPermitSchedule } = actions;

    return store.dispatch(fetchPermitSchedule())
      .then(({ payload: { headers, body } }) => {
        const storeActions = store.getActions();

        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(headers.response_code).toBe('0000');
        expect(headers.response_message).toBe('Successful');
        expect(body).toEqual(mockSchedule);
      });
  });

  test('emailContract method should works fine', () => {
    const { emailContract } = actions;

    return store.dispatch(emailContract({
      to: 'recipient@example.com',
      subject: 'Permit #R021233',
      content: 'Here\'s your permit contract'
    })).then(({ payload: { headers } }) => {
      const storeActions = store.getActions();

      expect(Array.isArray(storeActions)).toBeTruthy();

      expect(headers.response_code).toBe('0000');
      expect(headers.response_message).toBe('Successful');
    });
  });

  test('fetchAmendment method should works fine', () => {
    const { fetchAmendment } = actions;

    return store.dispatch(fetchAmendment()).then(({ payload: { headers } }) => {
      const storeActions = store.getActions();

      expect(Array.isArray(storeActions)).toBeTruthy();

      expect(headers.response_code).toBe('0000');
      expect(headers.response_message).toBe('Successful');
    });
  });

  test('savePdfAction method should works fine', () => {
    const { savePdfAction } = actions;

    return store.dispatch(savePdfAction({
      option: 'permit',
      permitNumber: 1,
      containsRecurring: 'permit recurring'
    })).then(({ payload: { headers } }) => {
      const storeActions = store.getActions();

      expect(Array.isArray(storeActions)).toBeTruthy();

      expect(headers.response_code).toBe('0000');
      expect(headers.response_message).toBe('Successful');
    });
  });
});
