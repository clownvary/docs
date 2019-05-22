import React from 'react';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import { SafeText } from 'react-base-ui/lib/components/SafeText';
import AssociationItem from './AssociationItem';

export default ({ item, onStageSequenceChange }) => (
  <div key={item.get('stageSequenceID')} className="approval-stages__item">
    <div className="association">
      {item.get('associations').map((value, index) =>
        <AssociationItem
          key={index}
          value={value}
          isShowDivider={count(item.get('associations')) - 1 !== index}
        />
      )
    }
    </div>
    <Checkbox
      checked={item.get('checked')}
      onChange={e => onStageSequenceChange(e, item.get('stageSequenceID'))}
    >
      <SafeText text={item.get('stageSequenceName')} />
    </Checkbox>
  </div>
);
