const fs = require('fs');
const path = require('path');
const https = require('https');

const args = process.argv.slice(2);
const argsObj = {};
const tsconfigPath = path.resolve(__dirname, '../../tsconfig.base.json');

args.forEach((arg) => {
  const [key, val] = arg.split('=');

  argsObj[key] = val;
});

function doRequest(path) {
  return new Promise((resolve, reject) => {
    const req = https.get(path, (res) => {
      res.setEncoding('utf8');
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        resolve(responseBody);
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

const fetchData = async () => {
  try {
    const data = await doRequest(argsObj.a);
    return data;
  } catch (error) {
    console.log('fetchData', error);
  }
};

try {
  const aliasesTmpl = fetchData();
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
