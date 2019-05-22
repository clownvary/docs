export default (oldSessionsList, updateSessions) => {
  const newSessionsList = oldSessionsList.withMutations((list) => {
    list.forEach((sessionItem, index) => {
      updateSessions.forEach((item) => {
        if (sessionItem.get('session_id') === item.session_id) {
          list.set(index, sessionItem.mergeDeep(item));
        }
      });
    });
  });

  return newSessionsList;
};
