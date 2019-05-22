
import os from 'os';
import args from 'yargs';
import _debug from 'debug';

const debug = _debug('aui:webpack:endpoint');
debug('Building endpoint....');

let _host = process.env.HOST || 'localhost';
const runByIp = !!args.argv.ip || !!process.env.RUN_BY_IP;
if (runByIp) {
  const interfaces = os.networkInterfaces();
  const ips = [];
  Object.keys(interfaces).forEach((name) => {
    const iface = interfaces[name];
    iface.forEach((details) => {
      if (details.family === 'IPv4') {
        if (/10\./.test(details.address)) {
          ips.push(details.address);
        }
      }
    });
  });

  _host = ips.length ? ips[0] : _host;
}

const _port = process.env.PORT || '7001';

debug(`host:${_host}  port:${_port}`);

export const host = _host;
export const port = _port;
