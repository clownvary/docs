const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;

function genContent() {
    let content = [
        '[![Build Status](https://travis-ci.org/clownvary/docs.svg?branch=master)](https://travis-ci.org/clownvary/docs)',
        '# Docs and conclusion skills of personal.',
        '## File Tree'
    ];
    try {
        const rawTree = exec("tree -P '*.md' -I 'build|README.md|node_modules'").toString();
        const arrTree = rawTree.split('\n');
        arrTree.unshift('```');
        arrTree.push('```');
        content = content.concat(arrTree);
    } catch (error) {
        console.error('error occured please check your command');
        console.error(error);
        return false;
    }
    return content.join('\n');
}

function writeFile(path, data) {
    fs.writeFile(path, data, (writeError) => {
        if (writeError) {
            console.error(`writefile ${path} error`, writeError);
        }
        console.log('write success!');
    });
}

function run(params) {
    const filePath = path.resolve(__dirname, '../README.md');
    const content = genContent();
    writeFile(filePath, content);
}

run();