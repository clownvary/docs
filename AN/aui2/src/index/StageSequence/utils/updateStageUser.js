
const updateStageUser = (listData, userInfo) => {
  const { stageSequenceID, trasactionStageID, approvalUserID, approvalUserName } = userInfo;
  const updateIndex = listData
  .findIndex(item => item.getIn(['header', 'stageSequenceID']) === stageSequenceID);

  const stageData = listData.get(updateIndex);

  const newStageData = stageData.withMutations((sData) => {
    sData.get('content').forEach((item, cIndex) => {
      item.get('stage').forEach((stage, sIndex) => {
        if (stage.get('trasactionStageID') === trasactionStageID) {
          sData.setIn(['content', cIndex, 'stage', sIndex, 'approvalUserID'], approvalUserID);
          sData.setIn(['content', cIndex, 'stage', sIndex, 'approvalUserName'], approvalUserName);
        }
      });
    });
  });

  return listData.set(updateIndex, newStageData);
};

export default updateStageUser;
