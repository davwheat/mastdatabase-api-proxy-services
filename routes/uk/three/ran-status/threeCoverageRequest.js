const { default: fetch } = require('node-fetch-commonjs');

module.exports = async function threeCoverageRequest(postcode) {
  const params = new URLSearchParams({
    postcode,
    content: 'true',
  });

  const data = await fetch(`https://www.three.co.uk/rig/coverageandoutages?${params}`, {
    headers: {
      Referer: 'https://www.three.co.uk/Discover/Network/Coverage',
    },
  });

  return await data.json();
};
