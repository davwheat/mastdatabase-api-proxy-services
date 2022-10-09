import fetch from 'node-fetch';

export default async function threeOutagesRequest(postcode: string) {
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
}
