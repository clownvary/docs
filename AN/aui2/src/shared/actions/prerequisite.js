
export const PREREQUISITE_UPDATE_USER_NAME = 'PREREQUISITE_UPDATE_USER_NAME';
export const PREREQUISITE_UPDATE_USER_PASSWORD = 'PREREQUISITE_UPDATE_USER_PASSWORD';
export const PREREQUISITE_UPDATE_OVERRIDE = 'PREREQUISITE_UPDATE_OVERRIDE';
export const PREREQUISITE_ADD_ERRORS = 'PREREQUISITE_ADD_ERRORS';
export const PREREQUISITE_CLEAR_ERRORS = 'PREREQUISITE_CLEAR_ERRORS';
export const PREREQUISITE_UPDATE_OVERRIDE_AUTHORITY = 'PREREQUISITE_UPDATE_OVERRIDE_AUTHORITY';
export const PREREQUISITE_UPDATE_NEED_OVERRIDE = 'PREREQUISITE_UPDATE_NEED_OVERRIDE';
export const PREREQUISITE_UPDATE_OVERRIDE_MESSAGE = 'PREREQUISITE_UPDATE_OVERRIDE_MESSAGE';

export const updateIsOverrideAction = isOverride => ({
  type: PREREQUISITE_UPDATE_OVERRIDE,
  payload: {
    isOverride
  }
});

export const updateNeedOverrideAction = needOverride => ({
  type: PREREQUISITE_UPDATE_NEED_OVERRIDE,
  payload: {
    needOverride
  }
});

export const updateUserNameAction = value => ({
  type: PREREQUISITE_UPDATE_USER_NAME,
  payload: {
    value
  }
});

export const updateOverrideAuthorityAction = haveOverrideAuthority => ({
  type: PREREQUISITE_UPDATE_OVERRIDE_AUTHORITY,
  payload: {
    haveOverrideAuthority
  }
});

export const updateUserPasswordAction = value => ({
  type: PREREQUISITE_UPDATE_USER_PASSWORD,
  payload: {
    value
  }
});

export const addPrerequisiteErrsAction = errors => ({
  type: PREREQUISITE_ADD_ERRORS,
  payload: {
    errors
  }
});

export const clearPrerequisiteErrsAction = (errorIndex = -1) => ({
  type: PREREQUISITE_CLEAR_ERRORS,
  payload: {
    errorIndex
  }
});

export const validatePrerequisiteFunc = (prerequisite) => {
  const needOverride = prerequisite.get('needOverride');

  if (needOverride && !prerequisite.get('isOverride')) {
    return [{
      type: 'override',
      message: 'You must check override to complete the transaction.'
    }];
  }

  if (
    needOverride &&
    !prerequisite.get('haveOverrideAuthority') &&
    (!prerequisite.get('userName') || !prerequisite.get('userPassword'))) {
    return [{
      type: 'user',
      message: 'You must supply a user authorized to perform override.'
    }];
  }

  return false;
};

export const authorizedUserErrMsg = [{
  type: 'user',
  message: 'You must supply a user authorized to perform override.'
}];

export const updateOverrideMsgAction = overrideMessage => ({
  type: PREREQUISITE_UPDATE_OVERRIDE_MESSAGE,
  payload: {
    overrideMessage
  }
});
