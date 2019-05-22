import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  PROGRAM_INFO_UI
} from '../consts/actionTypes';

const initialState = fromJS({
  sessionFacilities: [],
  ageMinRestriction: [0, 0, 0],
  ageMaxRestriction: [0, 0, 0],
  description: '',
  extraDetails: [],
  enrollStatus: {}
});

const adaptFacilities = facilities => facilities.map((facility) => {
  const id = Object.keys(facility)[0];
  return { id, name: facility[id] };
});

const adaptExtraDetails = details => details.map(detail => ({
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

const adaptEnrollStatus = status => ({
  enabled: status.enabled,
  inPersonEnabled: status.in_person_enabled,
  generalMessage: status.general_msg,
  startMessage: status.start_date_msg,
  endMessage: status.end_date_msg
});

const handlers = {
  [PROGRAM_INFO_UI](state, { payload: { programInfo } }) {
    if (programInfo) {
      return state.withMutations((s) => {
        s.set('programId', programInfo.program_id);
        s.set('programName', programInfo.program_name);
        s.set('programNumber', programInfo.program_number);
        s.set('seasonName', programInfo.season_name);
        s.set('periodStartDate', programInfo.start_date);
        s.set('periodEndDate', programInfo.end_date);
        const sessionFacilities = adaptFacilities(programInfo.session_facilities);
        s.set('sessionFacilities', fromJS(sessionFacilities));
        s.set('gradeMinRestriction', programInfo.min_grade);
        s.set('gradeMaxRestriction', programInfo.max_grade);
        s.set('ageMinRestriction', fromJS([programInfo.age_min_year, programInfo.age_min_month, programInfo.age_min_week]));
        s.set('ageMaxRestriction', fromJS([programInfo.age_max_year, programInfo.age_max_month, programInfo.age_max_week]));
        s.set('gender', programInfo.allowed_gender);
        s.set('primaryCategory', programInfo.category);
        s.set('secondaryCategory', programInfo.sub_category);
        s.set('description', programInfo.catalog_description);
        s.set('firstDate', programInfo.first_date);
        s.set('lastDate', programInfo.last_date);
        s.set('extraDetails', fromJS(adaptExtraDetails(programInfo.extra_details)));
        s.set('enrollStatus', adaptEnrollStatus(programInfo.enroll_status));
      });
    }
    return initialState;
  }
};

export default reducerHandler(initialState, handlers);
