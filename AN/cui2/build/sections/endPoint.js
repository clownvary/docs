
import os from 'os';
import args from 'yargs';
import _debug from 'debug';

const debug = _debug('anet-cui:webpack:endpoint');
debug('Building endpoint....');

let _host = 'localhost' || process.env.HOST;
const runByIp = !!args.argv.ip || !!process.env.RUN_BY_IP;
if (runByIp) {
  const interfaces = os.networkInterfaces();
  const ips = [];
  Object.keys(interfaces).forEach((name) => {
    const iface = interfaces[name];
    iface.forEach((details) => {
      if (details.family === 'IPv4') {
        if (details.address !== '127.0.0.1') {
          ips.push(details.address);
        }
      }
    });
  });

  _host = ips.length ? ips[0] : _host;
}

const _port = '7002' || process.env.PORT;

debug(`host:${_host}  port:${_port}`);

// export const host = '10.110.10.161';
export const host = _host;
export const port = _port;
