const { default: fetch } = require('node-fetch-commonjs');

module.exports = async function threeHbbRequest(postcode) {
  const params = new URLSearchParams({
    Postcode: postcode,
    // content: 'true',
  });

  const data = await fetch(`https://www.threebroadband.co.uk/coverage/GetDevicesByCoverage5G3UK_1_3?${params}`, {
    // headers: {
    //   Referer: 'https://www.three.co.uk/Discover/Network/Coverage',
    // },
  });

  return await data.json();
};
