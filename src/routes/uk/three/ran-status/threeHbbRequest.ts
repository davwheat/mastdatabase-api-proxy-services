import fetch from 'node-fetch';

export default async function threeHbbRequest(postcode: string) {
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
}
