/* eslint import/no-extraneous-dependencies: off */
import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import args from 'yargs';

const host = args.argv.HOST || process.env.HOST;
const port = args.argv.PORT || process.env.PORT;

const writeError = (response, err) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.end(`<h1>404 Server Error ${err}</h1>`);
};

const processRequest = (request, response) => {
  const pathName = decodeURI(url.parse(request.url).pathname);
  let filePath;
  if (pathName.toLowerCase().indexOf('json') > -1) {
    filePath = path.join(path.resolve(), 'test/report', 'coverage.json');
  } else {
    filePath = path.join(path.resolve(), 'test/report', 'index.html');
  }

  if (fs.existsSync(filePath)) {
    console.log('filePath', filePath);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        writeError(response, err);
        return;
      }
      response.writeHead(200, {
        'Accept-Ranges': 'bytes',
        'Content-Type': 'text/html'
      });
      response.write(data);
      response.end();
    });
  } else {
    writeError(response);
  }
};

const httpServer = http.createServer(processRequest);

httpServer.listen(port, () => {
  console.log('Report', `runing at http://${host}:${port}`);
});

httpServer.on('error', error => console.log(error));
httpServer.on('close', () => console.log('closed'));
