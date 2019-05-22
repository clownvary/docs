export default (sessionsLength, selectedSessionIdsLength, sessionsMessageCode) => {
  if (sessionsMessageCode === 0) {
    return false;
  }

  if (sessionsMessageCode !== 1 && sessionsMessageCode !== 2) {
    return true;
  }

  // sessionsMessageCode equal to 1 or 2 and must selected return true
  if (sessionsLength <= 1 || !selectedSessionIdsLength) {
    return false;
  }

  return true;
};
