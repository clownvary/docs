import React from 'react';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import { SafeText } from 'react-base-ui/lib/components/SafeText';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import UIComponent from 'shared/components/UIComponent';
import Associations from '../Associations';

export default class AddStageItem extends UIComponent {
  handleUpdateStage = () => {
    const { stageItem } = this.props;

    this.props.updateStageSequenceAsyncAction({
      stageSequenceID: stageItem.get('stageSequenceID'),
      checked: !stageItem.get('checked')
    });
  }

  render() {
    const { stageItem } = this.props;

    return (
      <div className="add-stage-item panel" onClick={this.handleUpdateStage}>
        <Checkbox
          className="stage-item-checkbox"
          readOnly
          checked={stageItem.get('checked')}
        />
        <div className="add-stage-item__content aaui-flex afx-xl-mg-12">
          <div className="add-stage-item__content-title afx-col afx-xl-6-12">
            <SafeText
              className="stage-sequence-name"
              title={decodeHtmlStr(stageItem.get('stageSequenceName'))}
              text={stageItem.get('stageSequenceName')}
            />
          </div>
          <div
            className="custom-title afx-col afx-xl-6-12"
          >
            <Associations data={stageItem.get('associations')} />
          </div>
        </div>
      </div>
    );
  }
}
