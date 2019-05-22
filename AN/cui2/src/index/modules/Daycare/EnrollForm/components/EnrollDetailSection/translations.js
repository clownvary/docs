import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.daycare.EnrollForm.EnrollDetail';

export default defineMessages({
  detailSection: {
    id: `${PREFIX}.detail`,
    defaultMessage: 'Enrollment Details'
  },
  required: {
    id: `${PREFIX}.required`,
    defaultMessage: '(Required)'
  },
  pickup: {
    id: `${PREFIX}.pickupTitle`,
    defaultMessage: 'Who is authorized to pick {participantName}'
  },
  pickupAddMember: {
    id: `${PREFIX}.addMember`,
    defaultMessage: '+ Add New {familyMemberFriendLabel}'
  },
  pickupPlaceholder: {
    id: `${PREFIX}.pickupPlaceholder`,
    defaultMessage: 'Please select pickups from family list'
  },
  pickupRequiredErrorMessage: {
    id: `${PREFIX}.pickupRequiredErrorMessage`,
    defaultMessage: 'Please select an authorized pickup'
  }
});
