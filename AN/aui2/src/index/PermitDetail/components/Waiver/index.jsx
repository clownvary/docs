import PropTypes from 'prop-types';
import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import Waiver from 'shared/components/Waiver';

export default class WaiverSection extends UIComponent {

  static propTypes = {
    saveWaiver: PropTypes.func.isRequired,
    changeWaiver: PropTypes.func.isRequired,
    setWaiverErrorMessage: PropTypes.func.isRequired,
    permitDetailsChanged: PropTypes.func.isRequired
  };

  render() {
    const { waiver, saveWaiver, changeWaiver, setWaiverErrorMessage,
      permitDetailsChanged, permitWording
    } = this.props;
    return (
      <Waiver
        showUpArrowIcon={false}
        readOnly={false}
        {
          ...{
            waiver,
            saveWaiver,
            changeWaiver,
            setWaiverErrorMessage,
            permitDetailsChanged,
            permitWording
          }
        }
      />
    );
  }

  componentWillMount() {
    this.props.fetchWaiver();
  }

}
