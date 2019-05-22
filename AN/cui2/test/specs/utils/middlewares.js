import { presetRedux } from 'react-base-ui/lib/middlewares';
import { redirectMiddleware, legacyCuiMiddleware } from 'shared/middlewares';
// import '../../json/mockup';

const middlewares = [
  redirectMiddleware, ...presetRedux, legacyCuiMiddleware
];

export default middlewares;
