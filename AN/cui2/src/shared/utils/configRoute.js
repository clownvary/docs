const configRoute = (context) => {
  let currentContext = context;

  const createRouteCreator = c => () => c(currentContext);

  const getRoutes = _createRoute => _context => {
    currentContext = _context;
    return _createRoute(currentContext);
  }

  return {
    getRoutes,
    createRouteCreator
  };
};

export default configRoute();
