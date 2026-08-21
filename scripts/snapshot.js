const fs = require('fs');
const https = require('https');
const path = require('path');

const baseUrl = 'https://npiregistry.cms.hhs.gov/api/?version=2.1';

const fetchJson = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
};

const run = async () => {
  const searchUrl = `${baseUrl}&limit=5&city=Baltimore`;
  const detailUrl = `${baseUrl}&number=1073731121`;
  const emptyUrl = `${baseUrl}&limit=5&city=NowhereCity123`;
  
  const searchData = await fetchJson(searchUrl);
  const detailData = await fetchJson(detailUrl);
  const emptyData = await fetchJson(emptyUrl);

  const fixturesDir = path.join(__dirname, '..', 'fixtures');
  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true });
  }

  fs.writeFileSync(path.join(fixturesDir, 'search.json'), JSON.stringify(searchData, null, 2));
  fs.writeFileSync(path.join(fixturesDir, 'detail.json'), JSON.stringify(detailData, null, 2));
  fs.writeFileSync(path.join(fixturesDir, 'empty.json'), JSON.stringify(emptyData, null, 2));
  
  console.log('Fixtures generated successfully.');
};

run().catch(console.error);
