/* eslint import/no-extraneous-dependencies: off */
import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import args from 'yargs';
import cp from 'child_process';

const host = args.argv.HOST || process.env.HOST;
const port = args.argv.PORT || process.env.PORT;
const script = args.argv.SCRIPT || process.env.SCRIPT;
const scriptArgs = args.argv.SCRIPTARGS || process.env.SCRIPTARGS || '';
const messages = [];

let exitCode = 0;

const writeError = (response, err) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.end(`<h1>404 Server Error ${err}</h1>`);
};

const processRequest = (request, response) => {
  const pathName = decodeURI(url.parse(request.url).pathname);
  const filePath = path.join(path.resolve(__dirname, '../..'), pathName);
  if (path.extname(pathName) === '.json' && fs.existsSync(filePath)) {
    // messages.push(`@@@@load json file ${pathName}`);
    if (!script) {
      console.log(`@@@@load json file ${pathName}`);
    }
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        writeError(response, err);
      }
      response.writeHead(200, {
        'Accept-Ranges': 'bytes',
        'Content-Type': 'application/json'
      });
      response.write(data);
      response.end();
    });
  } else {
    messages.push(`**** fail to load json file ${pathName}`);
    if (!script) {
      console.log(`**** fail to load json file ${pathName}`);
    }
    writeError(response);
  }
};

const httpServer = http.createServer(processRequest);

httpServer.listen(port, () => {
  console.log('[JSON Server][Start]', `runing at http://${host}:${port}/`);

  if (script) {
    console.log(`try to run ${script} ${scriptArgs.split(',').join(' ')}`);
    const ls = cp.spawn(script, scriptArgs.split(','), { stdio: [0, 1, 2] });
    ls.stdout && ls.stdout.on('data', data => console.log(` ${data}`));
    ls.on('exit', (code) => {
      httpServer.close();
      exitCode = code;
    });
    ls.on('close', () => {
      httpServer.close();
    });
  }
});

httpServer.on('error', error => console.log(error));
httpServer.on('close', () => {
  console.log(messages.join('\r\n'));
  console.log('[JSON Server][Close]');
  process.exit(exitCode);
});
