import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Alert from 'react-base-ui/lib/components/Alert';
import Input from 'react-base-ui/lib/components/Input';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import UIComponent from 'shared/components/UIComponent';

import './index.less';

export default class Prerequisite extends UIComponent {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    prerequisite: PropTypes.object
  };
  /* eslint-disable react/forbid-prop-types */

  render() {
    const {
      prerequisite,
      className
    } = this.props;
    const wrapperClassName = classNames(
      'prerequisite',
      className
    );
    const haveOverrideAuthority = prerequisite.get('haveOverrideAuthority');
    const needOverride = prerequisite.get('needOverride');
    const isOverride = prerequisite.get('isOverride');
    const warningMessage = prerequisite.get('overrideMessage');

    const showPrerequisite = needOverride || (isOverride && !haveOverrideAuthority);
    return (
      <div>
        {
          showPrerequisite ? <div className={wrapperClassName}>
            { needOverride &&
              this.renderWarning(warningMessage, isOverride)
            }
            { (isOverride && !haveOverrideAuthority) &&
              this.renderUser()
            }
          </div> : null
        }
      </div>

    );
  }

  renderWarning(warningMessage, isOverride) {
    return (
      <Alert
        type="warning"
        className="prerequisite-warning aaui-flexbox u-flex-nowrap u-align-items-start"
        noClose
      >
        <div className="prerequisite-warning-content">
          {warningMessage}
          <Checkbox
            className="prerequisite-warning-override"
            checked={isOverride}
            onChange={() => this.updateOverride(!isOverride)}
          >Override</Checkbox>
        </div>
      </Alert>
    );
  }

  renderUser() {
    let errIndex = -1;
    const { errors, userName, userPassword } = this.props.prerequisite.toJS();
    const userErr = errors.filter((err, index) => {
      /* istanbul ignore next */
      if (err.type === 'user') {
        errIndex = index;
        return true;
      }

      return false;
    });
    const isShowErr = userErr.length;

    return (
      <div className="override-field">
        <div className="override-field__user-name">
          <span className={`override-field__label ${isShowErr ? 'override-field__label-error' : ''}`}>Override User</span>
          <Input
            className="override-field__value"
            errored={isShowErr}
            autoComplete="off"
            defaultValue={userName}
            onInput={() => this.clearErr(isShowErr, errIndex)}
            onBlur={e => this.props.updateUserNameAction(e.target.value)}
          />
        </div>
        <div>
          <span className={`override-field__label ${isShowErr ? 'override-field__label-error' : ''}`}>Password</span>
          <Input
            type="password"
            className="override-field__value"
            autoComplete="off"
            defaultValue={userPassword}
            errored={isShowErr}
            onInput={() => this.clearErr(isShowErr, errIndex)}
            onBlur={e => this.props.updateUserPasswordAction(e.target.value)}
          />
        </div>
      </div>
    );
  }

  clearErr(isShowErr, errIndex) {
    /* istanbul ignore next */
    if (isShowErr) {
      this.props.clearPrerequisiteErrsAction(errIndex);
    }
  }

  updateOverride(override) {
    this.props.updateIsOverrideAction(override);
    /* istanbul ignore next */
    this.props.clearPrerequisiteErrsAction();
  }
}
