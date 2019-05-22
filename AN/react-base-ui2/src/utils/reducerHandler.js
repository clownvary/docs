export default (initialState, handlers) => (state = initialState, action) => {
  const type = action.type;

  if (!handlers[type]) {
    return state;
  }

  return handlers[type](state, action);
};
