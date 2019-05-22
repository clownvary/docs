let actions = [];
let mockDispatchRejectResponse = {};

function dispatch(action) {
  actions.push(action);

  return Promise.resolve();
}

function dispatchReject(action) {
  actions.push(action);

  return Promise.reject(mockDispatchRejectResponse);
}

export function mockDispatch(thunk, state, rejectDispatch) {
  return thunk(rejectDispatch ? dispatchReject : dispatch, () => state);
}

export function getMockActions() {
  return actions;
}

export function clearMockActions() {
  actions = [];
}

export function setMockDispatchRejectResponse(response) {
  mockDispatchRejectResponse = response;
}

export function clearMockDispatchRejectResponse() {
  mockDispatchRejectResponse = {};
}