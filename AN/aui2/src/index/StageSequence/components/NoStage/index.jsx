import React from 'react';
import EmptyState from 'shared/components/EmptyState';
import AddButton from '../AddButton';

export default props => (
  <div className="no-stage">
    <EmptyState
      title="No stage sequences associated with this permit"
    />
    {
      props.hasAddableStagesequence &&
      <AddButton
        loadAddAbleStageSequences={props.loadAddAbleStageSequences}
        hasAddableStagesequence={props.hasAddableStagesequence}
        isEnableAdd={props.isEnableAdd}
      />
    }
  </div>
);
