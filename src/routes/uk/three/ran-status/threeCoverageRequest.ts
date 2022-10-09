import fetch from 'node-fetch';

export default async function threeCoverageRequest(postcode: string) {
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
