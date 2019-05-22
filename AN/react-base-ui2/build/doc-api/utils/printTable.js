import Table from 'cli-table';
import colors from 'colors';


const table = new Table({
  head: [
    colors.cyan('Source File'),
    colors.cyan('Components Found')
  ]
})


const printTable = files => {
  files.forEach(file => {
    const length = file.components.length;
    table.push([
      length ? colors.green(file.filename) : colors.gray(file.filename),
      length ? colors.green(length) : colors.gray('-')
    ]);
  });

  console.log(`${table.toString()}\n`);
}

export default printTable;
