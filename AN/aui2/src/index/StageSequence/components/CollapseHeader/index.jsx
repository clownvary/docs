import React from 'react';
import classNames from 'classnames';
import { SafeText } from 'react-base-ui/lib/components/SafeText';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { stepItemStatus } from '../../consts/stageStatus';
import Associations from '../Associations';

export default class CollapseHeader extends React.PureComponent {
  handleClick = () => {
    this.props.onToggleClick();
  }

  deleteStageSequence = () => {
    const { data, isEnableDelete } = this.props;
    if (isEnableDelete) {
      this.props.deleteStageSequence(data.stageSequenceID);
    }
  }

  render() {
    const { data, isEnableDelete } = this.props;

    return (
      <div className="stage-collapse-header" onClick={e => e.stopPropagation()}>
        <div
          className={classNames('icon-box', `stage-${data.status}`)}
        >
          {
            data.status === stepItemStatus.ERROR ?
              <i className="icon icon-close" />
            :
              <i className="icon icon-check-thin" />
          }
        </div>
        <div className="header-content aaui-flex afx-xl-mg-12">
          <span className="header-content-title afx-col afx-xl-6-12">
            <SafeText
              className="stage-sequence-name"
              title={decodeHtmlStr(data.stageSequenceName)}
              text={data.stageSequenceName}
            />
            <i
              className="icon icon-chevron-down"
              onClick={this.handleClick}
            />
          </span>
          <div className="afx-col afx-xl-4-12">
            <Associations data={data.associations} />
          </div>

          <span className="afx-col afx-xl-2-12 delete-container">
            <i
              className={classNames('icon icon-delete-m', {
                'icon--disabled': !isEnableDelete
              })}
              onClick={this.deleteStageSequence}
            />
          </span>
        </div>
      </div>
    );
  }
}
