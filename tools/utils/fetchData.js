const https = require('https');

async function doRequest(path) {
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

const fetchData = async (path) => {
  try {
    const data = await doRequest(path);
    return data;
  } catch (error) {
    console.log('fetchData', error);
  }
};

module.exports = fetchData;
