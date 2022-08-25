const fs = require('fs');
const path = require('path');
const fetchData = require('./fetchData');

const args = process.argv.slice(2);
const argsObj = {};
const tsconfigPath = path.resolve(__dirname, '../../tsconfig.base.json');

args.forEach((arg) => {
  const [key, val] = arg.split('=');

  argsObj[key] = val;
});

const setup = async () => {
  try {
    const aliasesTmpl = await fetchData(argsObj.a);
    const aliases = aliasesTmpl.replace(/__PROJECT__/gm, argsObj.p);
    const aliasesObj = JSON.parse(aliases);
    const tsconfig = fs.readFileSync(tsconfigPath, {
      encoding: 'utf8',
      flag: 'r',
    });
    const tsConfigObj = JSON.parse(tsconfig);
    tsConfigObj.compilerOptions.paths = {
      ...tsConfigObj.compilerOptions.paths,
      ...aliasesObj,
    };
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsConfigObj, null, 2));
  } catch (error) {
    console.log('Error', error);
  }
};

setup();
