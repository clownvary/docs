
import { createTextPropSpec, createBooleanPropSpec, createNumberPropSpec } from '../../App/utils/createPropSpec';


const initSettings = {
  url: createTextPropSpec('url', 'url', 'wss.active.com'),
  port: createNumberPropSpec('port', 'port', 1000),
  heartBeatInterval: createNumberPropSpec('heartBeatInterval', 'heartBeatInterval', 30),
  reconnectable: createBooleanPropSpec('reconnectable', 'reconnectable', false)
};

export default initSettings;
