import { stepItemStatus, stageStatus } from '../consts/stageStatus';

const getSetpObject = data => ({
  approvalUserID: data.get('approvalUserID'),
  stageName: data.get('stageName'),
  status: data.get('status'),
  trasactionStageID: data.get('trasactionStageID'),
  comments: data.get('comments'),
  approvalUserName: data.get('approvalUserName'),
  transactionID: data.get('transactionID'),
  stageID: data.get('stageID')
});


const getSetpsData = (stageLinks) => {
  const setpsData = [];
  stageLinks.forEach((item) => {
    const headStage = item.get('headStage');
    if (headStage && headStage.get('stageName') !== 'END') {
      if (setpsData[0]) {
        setpsData[0].stage.push(getSetpObject(headStage));
      } else {
        setpsData.push({
          status: stepItemStatus.WAIT,
          stage: [getSetpObject(headStage)]
        });
      }

      const getNextStageItme = (nextStages, index = 0) => {
        if (nextStages) {
          index += 1;
          nextStages.forEach((stageItem) => {
            if (stageItem.get('stageName') !== 'END') {
              if (setpsData[index]) {
                setpsData[index].stage.push(getSetpObject(stageItem));
              } else {
                setpsData[index] = {
                  status: stepItemStatus.WAIT,
                  stage: [getSetpObject(stageItem)]
                };
              }
              getNextStageItme(stageItem.get('nextStages'), index);
            }
          });
        }
      };

      const nextStages = headStage.get('nextStages');
      getNextStageItme(nextStages);
    }
  });

  return setpsData;
};

const checkStageState = (stageListData, systemUserID) => {
  stageListData.forEach(({ header, content }) => {
    let allStage = [];
    content.forEach((item) => {
      allStage = allStage.concat(item.stage);
    });

    const isStageItemHasDeny = allStage.some(
      ({ status }) => status === stageStatus.DENIED
    );

    if (isStageItemHasDeny) {
      header.status = stepItemStatus.ERROR;
    } else {
      const isStageItemAllApproved = allStage.every(
        ({ status }) => status === stageStatus.APPROVED
      );
      if (isStageItemAllApproved) {
        header.status = stepItemStatus.FINISH;
      }
    }

    const isStageProcess = status => status === stageStatus.PROGRESS ||
      status === stageStatus.PROGRESS_NO_EMAIL;

    const hasProcessAndPermission = allStage.some(
      ({ status, approvalUserID }) => isStageProcess(status) && approvalUserID === systemUserID
    );

    header.hasProcessAndPermission = false;
    if (hasProcessAndPermission) {
      header.hasProcessAndPermission = true;
    }
  });

  return stageListData;
};

const formatStageList = (data, systemUserID) => {
  const panelData = [];
  data.forEach((item) => {
    panelData.push({
      header: {
        status: 'wait',
        stageSequenceName: item.get('stageSequenceName'),
        associations: item.get('associations'),
        stageSequenceID: item.get('stageSequenceID')
      },
      content: getSetpsData(item.get('stageLinks'))
    });
  });
  return checkStageState(panelData, systemUserID);
};

export default formatStageList;
