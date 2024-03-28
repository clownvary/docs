const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;

function genContent() {
    let content = [
        '[![gitbook deploy](https://github.com/clownvary/docs/actions/workflows/gitbook.yml/badge.svg)](https://github.com/clownvary/docs/actions/workflows/gitbook.yml)',
        '# Docs and conclusion skills of personal.',
        '## TOC'
    ];
    try {
        const technology = getJsonFiles('technology');
        const hobby = getJsonFiles('hobby');
        const other = getJsonFiles('other');
        const technologySection = genSection('Part I - 技术工具',technology);
        const hobbySection = genSection('Part II - 兴趣爱好',hobby);
        const otherSection = genSection('Part III - 其他',other);
        content = content.concat(technologySection,hobbySection,otherSection);
    } catch (error) {
        console.error('error occured please check your command');
        console.error(error);
        return false;
    }
    return content.join('\n');
}

function genSection(sectionName,data) {
    let mdStr = [];
    mdStr.unshift(`### ${sectionName}`);
    data.map(item=>{
        const str = `- [${item.name}](${item.path})`;
        mdStr.push(str);
    });
    return mdStr;
}

function getJsonFiles(jsonPath){
    let jsonFiles = [];
    function findJsonFile(filePath){
        let files = fs.readdirSync(filePath);
        files.forEach(function (item, index) {
            let fPath = path.join(filePath,item);
            let stat = fs.statSync(fPath);
            if(stat.isDirectory() === true) {
                findJsonFile(fPath);
            }
            if (stat.isFile() === true) { 
                const name = item.split('.')[0];
                if(name) {
                    jsonFiles.push({path: fPath, name});
                }
            }
        });
    }
    findJsonFile(jsonPath);
    return jsonFiles;
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