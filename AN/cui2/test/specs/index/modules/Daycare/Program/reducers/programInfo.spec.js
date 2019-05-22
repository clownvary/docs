import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Daycare/Program/consts/actionTypes';
import programInfoReducer from 'index/modules/Daycare/Program/reducers/programInfo';

import programInfoJson from 'Daycare/Program/get_program_info.json';

describe('index/modules/Daycare/Program/reducers/programInfo', () => {
  const initialState = fromJS({
    sessionFacilities: [],
    ageMinRestriction: [0, 0, 0],
    ageMaxRestriction: [0, 0, 0],
    description: '',
    extraDetails: [],
    enrollStatus: {}
  });

  const programInfo = programInfoJson.body.program_general;
  const sessionFacilities = programInfo.session_facilities.map((facility) => {
    const id = Object.keys(facility)[0];
    return { id, name: facility[id] };
  });

  const extraDetails = programInfo.extra_details.map(detail => ({
    extraDetailId: detail.extra_detail_id,
    extraDetailType: detail.extra_detail_type,
    detailValue: detail.detail_value,
    dataUrl: detail.data_url,
    thumbnailUrl: detail.thumbnail_url,
    attachmentId: detail.attachment_id,
    attachmentName: detail.attachment_name,
    attachmentType: detail.attachment_type,
    attachmentUrl: detail.attachment_url,
    extraDetailDescription: detail.extra_detail_description
  }));

  const enrollStatus = {
    enabled: programInfo.enroll_status.enabled,
    inPersonEnabled: programInfo.enroll_status.in_person_enabled,
    generalMessage: programInfo.enroll_status.general_msg,
    startMessage: programInfo.enroll_status.start_date_msg,
    endMessage: programInfo.enroll_status.end_date_msg
  };

  const expectedInitialState = fromJS({
    programId: programInfo.program_id,
    programName: programInfo.program_name,
    programNumber: programInfo.program_number,
    seasonName: programInfo.season_name,
    periodStartDate: programInfo.start_date,
    periodEndDate: programInfo.end_date,
    sessionFacilities: fromJS(sessionFacilities),
    gradeMinRestriction: programInfo.min_grade,
    gradeMaxRestriction: programInfo.max_grade,
    ageMinRestriction:
      [programInfo.age_min_year, programInfo.age_min_month, programInfo.age_min_week],
    ageMaxRestriction:
      [programInfo.age_max_year, programInfo.age_max_month, programInfo.age_max_week],
    gender: programInfo.allowed_gender,
    primaryCategory: programInfo.category,
    secondaryCategory: programInfo.sub_category,
    description: programInfo.catalog_description,
    extraDetails,
    enrollStatus
  });

  it('Should return the expected initial state', () => {
    expect(is(initialState, programInfoReducer(undefined, {}))).toBeTruthy();
  });

  it('Should return the initial state if response is empty', () => {
    const { PROGRAM_INFO_UI } = actionTypes;

    const returnState = programInfoReducer(initialState, {
      type: PROGRAM_INFO_UI,
      payload: {}
    });

    expect(is(initialState, returnState)).toBeTruthy();
  });

  it('Should handle program info successfully', () => {
    const { PROGRAM_INFO_UI } = actionTypes;

    const returnState = programInfoReducer(initialState, {
      type: PROGRAM_INFO_UI,
      payload: { programInfo }
    });

    expect(returnState.get('programId')).toEqual(expectedInitialState.get('programId'));
    expect(returnState.get('programName')).toEqual(expectedInitialState.get('programName'));
    expect(returnState.get('programNumber')).toEqual(expectedInitialState.get('programNumber'));
    expect(returnState.get('seasonName')).toEqual(expectedInitialState.get('seasonName'));
    expect(returnState.get('periodStartDate')).toEqual(expectedInitialState.get('periodStartDate'));
    expect(returnState.get('periodEndDate')).toEqual(expectedInitialState.get('periodEndDate'));
    expect(returnState.get('gradeMinRestriction'))
      .toEqual(expectedInitialState.get('gradeMinRestriction'));
    expect(returnState.get('gradeMaxRestriction'))
      .toEqual(expectedInitialState.get('gradeMaxRestriction'));
    expect(returnState.get('gender')).toEqual(expectedInitialState.get('gender'));
    expect(returnState.get('primaryCategory')).toEqual(expectedInitialState.get('primaryCategory'));
    expect(returnState.get('secondaryCategory'))
      .toEqual(expectedInitialState.get('secondaryCategory'));
    expect(returnState.get('description')).toEqual(expectedInitialState.get('description'));

    expect(is(returnState.get('sessionFacilities'), expectedInitialState.get('sessionFacilities')))
      .toBeTruthy();
    expect(is(returnState.get('ageMinRestriction'), expectedInitialState.get('ageMinRestriction')))
      .toBeTruthy();
    expect(is(returnState.get('ageMaxRestriction'), expectedInitialState.get('ageMaxRestriction')))
      .toBeTruthy();
    expect(is(returnState.get('extraDetails'), expectedInitialState.get('extraDetails')))
      .toBeTruthy();
    expect(is(fromJS(returnState.get('enrollStatus')), expectedInitialState.get('enrollStatus')))
      .toBeTruthy();
  });
});
