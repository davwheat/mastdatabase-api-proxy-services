const { default: fetch } = require('node-fetch-commonjs');

module.exports = async function threeOutagesRequest(postcode) {
  const params = new URLSearchParams({
    postcode,
    content: 'true',
  });

  const data = await fetch(`https://www.three.co.uk/rig/outages?${params}`, {
    headers: {
      Referer: 'https://www.three.co.uk/support/network_and_coverage/network_support',
    },
  });

  return await data.json();
};
