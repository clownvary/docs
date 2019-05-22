import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.daycare.EnrollForm.ParticipantSection';

export default defineMessages({
  who: {
    id: `${PREFIX}.who`,
    defaultMessage: 'Who are you enrolling?'
  },
  addMember: {
    id: `${PREFIX}.addMember`,
    defaultMessage: '+ Add New {familyMemberFriendLabel}'
  },
  participant: {
    id: `${PREFIX}.participant`,
    defaultMessage: 'Participant'
  },
  placeholder: {
    id: `${PREFIX}.placeholder`,
    defaultMessage: 'Select Participant'
  },
  requiredErrorMessage: {
    id: `${PREFIX}.requiredErrorMessage`,
    defaultMessage: 'Please select a participant'
  }
});
