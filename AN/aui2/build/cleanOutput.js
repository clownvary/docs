import del from 'del';
import _debug from 'debug';
import output from './sections/output';

const debug = _debug('aui:webpack:clean');

export default function cleanOutput() {
  let deleteErr = null;
  debug(`Cleaning the output directory [${output.path}]`);
  try {
    del.sync([output.path], { force: true });
    debug(`Clean ${output.path} success`);
  } catch (err) {
    deleteErr = err;
    console.error(`==>     ERROR: Error deleting ${output.path} directory!`);
  }

  return Promise.resolve(deleteErr);
}

