import fs from 'fs';
import path from 'path';
import glob from 'glob';
import _debug from 'debug';
import parsePath from 'parse-filepath';

const debug = _debug('aui:webpack:modules');

export function retriveModules(selectedModules = []) {
  const env = process.env.NODE_ENV || 'developmet';
  const filter = !!process.env.RUN_BY_FILTER;
  const appEntries = {};
  const MODULESMAP = {};
  const jadeTemplatesInfo = [];
  const isShowExamples = process.env.showExamplesOnStatic === 'true' && env === 'static';
  let modulesQuery = './src/**/@(.md.json)';
  let modules = null;

  if (isShowExamples) {
    modulesQuery = `{${modulesQuery},./examples/**/@(.md.json)}`;
  }
  try {
    modules = glob.sync(modulesQuery, { dot: true });
  } catch (err) {
    console.error('==>     ERROR: Error reading your module json file[md.json]');
  }

  if (modules) {
    modules = filter ? modules.filter(module => selectedModules.includes(module.match(/\w+(?=\/\.)/)[0])) : modules;
    modules.forEach((mdPath) => {
      const mdData = fs.readFileSync(mdPath, 'utf-8');
      const fileInfo = parsePath(mdPath);
      let mdJson;

      try {
        mdJson = JSON.parse(mdData);
      } catch (err) {
        console.error('==>     ERROR: Error parsing your module json file[md.json]');
        console.error(err);
      }

      if (mdJson.isModule || mdJson.isExample) {
        let cleanModulePath = fileInfo.dirname.replace(/^.\/src\//, '');
        if (isShowExamples) {
          cleanModulePath = cleanModulePath.replace(/^.\//, '');
        }
        const moduleName = cleanModulePath.replace(/\//g, '.');
        const filename = mdJson.filename && env !== 'static' ? mdJson.filename : moduleName;
        const template = mdJson.template ? path.join(process.cwd(), fileInfo.dirname, mdJson.template) : 'build/helper/common.jade';
        const htmlConfig = {
          title: mdJson.filename,
          template,
          diff: env,
          linkExtraPrefix: 'app/facility/',
          inject: false,
          chunks: ['vendor', moduleName],
          filename: env === 'static' ? `${filename}.html` : `${filename}.jsp`
        };
        jadeTemplatesInfo.push(htmlConfig);
        MODULESMAP[moduleName] = {
          name: moduleName,
          pathName: cleanModulePath,
          config: mdJson
        };
        appEntries[moduleName] = [`${fileInfo.dirname}/app`];
        debug(`[${moduleName}]=${appEntries[moduleName]}`);
      }
    });
  }

  return Promise.resolve({
    appEntries,
    jadeTemplatesInfo,
    MODULESMAP
  });
}

export function getModulesName() {
  const modulesName = [];
  const modulesQuery = './src/**/@(.md.json)';
  let modules;
  try {
    modules = glob.sync(modulesQuery, { dot: true });
  } catch (err) {
    console.error('==>     ERROR: Error reading your module json file[md.json]');
  }
  if (modules) {
    modules.forEach((mdPath) => {
      const mdData = fs.readFileSync(mdPath, 'utf-8');
      let mdJson;
      try {
        mdJson = JSON.parse(mdData);
      } catch (err) {
        console.error('==>     ERROR: Error parsing your module json file[md.json]');
        console.error(err);
      }
      if (mdJson.isModule) {
        const moduleName = mdPath.match(/\w+(?=\/\.)/)[0];
        modulesName.push(moduleName);
      }
    });
  }
  return modulesName;
}

