const fs = require('fs');
const path = require('path');
const fetchData = require('./fetchData');

const scriptsPath = process.argv.slice(2)[0];
const packagePath = path.resolve(__dirname, '../../package.json');

const setup = async () => {
  try {
    const scripts = await fetchData(scriptsPath);
    const scriptsObj = JSON.parse(scripts);
    const packageJson = fs.readFileSync(packagePath, {
      encoding: 'utf8',
      flag: 'r',
    });
    const packageJsonObj = JSON.parse(packageJson);
    packageJsonObj.scripts = {
      ...packageJsonObj.scripts,
      ...scriptsObj,
    };
    fs.writeFileSync(packagePath, JSON.stringify(packageJsonObj, null, 2));
  } catch (error) {
    console.log('Error', error);
  }
};

setup();
