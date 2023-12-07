import fetch from 'node-fetch';

export enum ThreeClient {
  CoverageChecker = 'COVERAGECHECKER',
  StatusChecker = 'STATUSCHECKER',
}

export default async function threeOutagesRequest(postcode: string, client: ThreeClient) {
  const locationData = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`, {
    headers: {
      'User-Agent': `mastdatabase.co.uk backend (contact: david@mastdatabase.co.uk)`,
    },
  });

  if (!locationData.ok) {
    return {
      error: 'Unknown postcode or error fetching location information',
      detail: `${locationData.status} ${locationData.statusText}`,
      upstreamBody: await locationData.text(),
    };
  }

  const locationDataResponse: any = await locationData.json();

  const { latitude, longitude } = locationDataResponse.result;

  const data = await fetch(`https://www.three.co.uk/bin/threedigital/rigview`, {
    method: 'POST',
    body: JSON.stringify({
      location: { postcode, latitude, longitude, precisionLocation: 'APPROXIMATE' },
      ClientID: client.toString(),
    }),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Referer: 'https://www.three.co.uk/support/network-and-coverage/network-support?intid=coveragecheckpage-button-checknetworkissues',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    },
  });

  return await data.json();
}
