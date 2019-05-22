
const {
  permitLabel
} = window.__permit__.__initialState__;

export const optionsEnum = {
  permit: 'permit',
  schedule: 'schedule',
  amendment: 'amendment'
};

export const optionLabelsEnum = {
  permit: permitLabel,
  schedule: 'Schedule',
  amendment: 'Amendment History'
};

// Backend API: /rest/permit/htmlToPdf needs option ID as number
export const optionIdsEnum = {
  permit: 1,
  schedule: 2,
  amendment: 3
};
