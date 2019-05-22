import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import Collapse from 'react-base-ui/lib/components/Collapse';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import StageSequenceItem from './StageSequenceItem';

import './index.less';

export default class ApprovalStages extends UIComponent {
  onStageSequenceChange = (e, stageSequenceID) => {
    const { receiptEntryID, batchID, receiptID } = this.props.initialData;
    this.props.updateStageSequenceAsyncAction({
      receiptEntryID,
      batchID,
      receiptID,
      stageSequenceID,
      checked: e.target.checked
    });
  }

  render() {
    const { stageSequencesList } = this.props;

    if (!count(stageSequencesList)) {
      return null;
    }

    return (
      <Collapse activeKey="approvalStages">
        <Collapse.Panel Header="Approval Stages" key="approvalStages">
          <div>
            <div className="header-section">
              <span>STAGE SEQUENCE</span>
            </div>
            <div className="approval-stages">
              {
                stageSequencesList.map((item, index) =>
                  <StageSequenceItem
                    key={index}
                    item={item}
                    onStageSequenceChange={this.onStageSequenceChange}
                  />)
              }
            </div>
          </div>
        </Collapse.Panel>
      </Collapse>
    );
  }
}
