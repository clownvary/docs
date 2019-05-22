import fetch from 'isomorphic-fetch';
import fs from 'fs';
import config from '../test/report/coverage.json';

const serverUrl = `${config.jenkinsServer.url}/job/${config.jenkinsServer.job}`;

const getConsoleCoverage = (html) => {
  if (html) {
    const matchesCoverage = /All files([\s\S]+?)index\//g.exec(html);
    const matchesTitle = /File([\s\S]+?)Uncovered Lines/g.exec(html);

    if (matchesCoverage && matchesCoverage.length > 1 && matchesTitle && matchesTitle.length > 1) {
      let rates = matchesCoverage[1].match(/([^|]+)\s+\|/g);
      let titles = matchesTitle[1].match(/([^|]+)\s+\|/g);
      if (Array.isArray(titles) &&
        Array.isArray(rates) &&
        titles.length > 0) {
        const result = {};
        titles = titles.map(title => title.replace(/[^a-zA-Z]/g, ''));
        rates = rates.map(rate => rate.replace(/[^\d.]/g, ''));

        titles.forEach((title, index) => {
          if (title !== '') {
            result[title] = rates[index];
          }
        });

        return result;
      }
    }
  }

  return null;
};

/*
const getCoberturaCoverage = (html) => {
  if (html) {
    const matches =
      /<h3>Project Coverage summary<\/h3>(.+?)<h3>Coverage Breakdown by Package<\/h3>/g.exec(html);

    if (matches && matches.length > 1) {
      const tableHTML = matches[1];

      const htmlTitles = tableHTML.match(/<th[^>]+?>(.+?)<\/th>/g);
      const htmlRates = tableHTML.match(/<span[^>]+?>(.+?)<\/span>/g);

      const titles = htmlTitles.map(title => /<th[^>]+?>(.+?)<\/th>/g.exec(title)[1]);
      const rates = htmlRates.map(title => /<span[^>]+?>(.+?)<\/span>/g.exec(title)[1]);

      const result = {};
      titles.forEach((title, idx) => {
        result[title] = rates[idx];
      });

      return result;
    }
  }

  return '';
};
*/

fetch(`${serverUrl}/api/json`)
  .then(response => response.json())
  .then((jsonProject) => {
    if (Array.isArray(jsonProject.builds) && jsonProject.builds.length) {
      const newBuilds = jsonProject.builds.filter(
        build => !config.coverages.some(coverage => coverage.jobIndex === build.number));

      if (newBuilds.length > 0) {
        Promise.all(newBuilds.map((build) => {
          const { number } = build;
          return Promise.all([
            fetch(`${serverUrl}/${number}/api/json`),
            fetch(`${serverUrl}/${number}/console`)
          ]).then(results => results[0].json().then((jobJson) => {
            const { displayName, timestamp, result } = jobJson;
            let coverage = {
              jobIndex: number,
              branch: displayName,
              dateTime: new Date(timestamp),
              status: result
            };
            return results[1].text().then((consoleOutput) => {
              const rate = getConsoleCoverage(consoleOutput);
              coverage = { ...coverage, ...rate };
              return coverage;
            });
          }));
        })).then((newCoverages) => {
          config.coverages = config.coverages.concat(newCoverages
            .filter(coverage => !!coverage.status) // remove the job build in progress
            .sort(
              (coverage1, coverage2) => coverage1.jobIndex - coverage2.jobIndex));
          config.jenkinsServer.lastUpdate = new Date();
          fs.writeFile('test/report/coverage.json', JSON.stringify(config, null, 2), (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`The test coverage updated ${newCoverages.length} new records successfully!`);
            }
          });
        });
      } else {
        console.warn('no new build.');
      }
    }
  });
