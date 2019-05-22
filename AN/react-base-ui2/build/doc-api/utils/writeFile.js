import fs from 'fs';

const writeFile = (markDownString, path) => {
  const output = fs.createWriteStream(path);

  output.write(markDownString);
};

export default writeFile;
