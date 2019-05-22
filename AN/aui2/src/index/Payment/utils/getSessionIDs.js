const getSessionIDs = (state) => {
  const { initialData: { permitID, batchID, receiptID } } = state;

  return {
    permitID,
    receiptID,
    batchID
  };
};


export default getSessionIDs;
