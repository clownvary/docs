const resetActions = (actions) => Object.keys(actions).forEach((fn) => { actions[fn].mockClear(); });

export default resetActions;
