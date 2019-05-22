import { fromJS } from 'immutable';
import * as actions from 'shared/actions/prerequisite';

describe('shared -> actions -> prerequisite', () => {

  test('updateIsOverrideAction should work fine', () => {
    const {
      PREREQUISITE_UPDATE_OVERRIDE,
      updateIsOverrideAction
    } = actions;
    const result = updateIsOverrideAction(true);

    expect(result.type).toBe(PREREQUISITE_UPDATE_OVERRIDE);
    expect(result.payload.isOverride).toBe(true);
  });

  test('updateUserNameAction should work fine', () => {
    const {
      PREREQUISITE_UPDATE_USER_NAME,
      updateUserNameAction
    } = actions;
    const result = updateUserNameAction('');

    expect(result.type).toBe(PREREQUISITE_UPDATE_USER_NAME);
    expect(result.payload.value).toBe('');
  });

  test('updateOverrideAuthorityAction should work fine', () => {
    const {
      PREREQUISITE_UPDATE_OVERRIDE_AUTHORITY,
      updateOverrideAuthorityAction
    } = actions;
    const result = updateOverrideAuthorityAction(true);

    expect(result.type).toBe(PREREQUISITE_UPDATE_OVERRIDE_AUTHORITY);
    expect(result.payload.haveOverrideAuthority).toBe(true);
  });

  test('updateUserPasswordAction should work fine', () => {
    const {
      PREREQUISITE_UPDATE_USER_PASSWORD,
      updateUserPasswordAction
    } = actions;
    const result = updateUserPasswordAction('');

    expect(result.type).toBe(PREREQUISITE_UPDATE_USER_PASSWORD);
    expect(result.payload.value).toBe('');
  });

  test('addPrerequisiteErrsAction should work fine', () => {
    const {
      PREREQUISITE_ADD_ERRORS,
      addPrerequisiteErrsAction
    } = actions;
    const result = addPrerequisiteErrsAction('');

    expect(result.type).toBe(PREREQUISITE_ADD_ERRORS);
    expect(result.payload.errors).toBe('');
  });

  test('clearPrerequisiteErrsAction should work fine', () => {
    const {
      PREREQUISITE_CLEAR_ERRORS,
      clearPrerequisiteErrsAction
    } = actions;
    const result = clearPrerequisiteErrsAction();

    expect(result.type).toBe(PREREQUISITE_CLEAR_ERRORS);
    expect(result.payload.errorIndex).toBe(-1);
  });

  test('validatePrerequisiteFunc should work fine', () => {
    const {
      PREREQUISITE_CLEAR_ERRORS,
      validatePrerequisiteFunc
    } = actions;
    const result = validatePrerequisiteFunc(fromJS({
      needOverride: {},
      isOverride: true,
      haveOverrideAuthority: true,
      userName: 'kaely',
      userPassword: '123'
    }));

    expect(result).toBe(false);
  });

  test('validatePrerequisiteFunc should work fine, haveOverrideAuthority is false and userPassword is empty', () => {
    const {
      PREREQUISITE_CLEAR_ERRORS,
      validatePrerequisiteFunc
    } = actions;
    const result = validatePrerequisiteFunc(fromJS({
      needOverride: {},
      isOverride: true,
      haveOverrideAuthority: false,
      userName: 'kaely',
      userPassword: ''
    }));

    expect(result.length).toBe(1);
    expect(result[0].message).toBe('You must supply a user authorized to perform override.');
    expect(result[0].type).toBe('user');
  });

  test('validatePrerequisiteFunc should work fine, isOverride is false', () => {
    const {
      PREREQUISITE_CLEAR_ERRORS,
      validatePrerequisiteFunc
    } = actions;
    const result = validatePrerequisiteFunc(fromJS({
      needOverride: {},
      isOverride: false
    }));

    expect(result.length).toBe(1);
    expect(result[0].message).toBe('You must check override to complete the transaction.');
    expect(result[0].type).toBe('override');
  });

  test('updateOverrideMsgAction should work fine', () => {
    const {
      PREREQUISITE_UPDATE_OVERRIDE_MESSAGE,
      updateOverrideMsgAction
    } = actions;
    const result = updateOverrideMsgAction('');

    expect(result.type).toBe(PREREQUISITE_UPDATE_OVERRIDE_MESSAGE);
    expect(result.payload.overrideMessage).toBe('');
  });

  test('updateNeedOverrideAction should work fine', () => {
    const {
      PREREQUISITE_UPDATE_NEED_OVERRIDE,
      updateNeedOverrideAction
    } = actions;
    const result = updateNeedOverrideAction('');

    expect(result.type).toBe(PREREQUISITE_UPDATE_NEED_OVERRIDE);
    expect(result.payload.needOverride).toBe('');
  });
});
