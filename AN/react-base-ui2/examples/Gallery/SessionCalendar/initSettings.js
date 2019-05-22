import { createBooleanPropSpec } from '../../App/utils/createPropSpec';

const initSettings = {
  disableExpired: createBooleanPropSpec('disableExpired', 'Disable Expired', true),
  disableFutureUnavailable: createBooleanPropSpec('disableFutureUnavailable', 'Disable Future Unavailable', true)
};

export default initSettings;
