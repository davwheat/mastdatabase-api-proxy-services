import fetch from 'node-fetch';

export enum ThreeClient {
  CoverageChecker = 'COVERAGECHECKER',
  StatusChecker = 'STATUSCHECKER',
}

export async function postcodeToLatLong(postcode: string): Promise<
  | {
      error: true;
      response: {
        status: number;
        statusText: string;
        text: string;
      };
    }
  | { latitude: number; longitude: number }
> {
  const locationData = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`, {
    headers: {
      'User-Agent': `mastdatabase.co.uk backend (contact: david@mastdatabase.co.uk)`,
    },
  });

  if (!locationData.ok) {
    return {
      error: true,
      response: {
        status: locationData.status,
        statusText: locationData.statusText,
        text: await locationData.text(),
      },
    };
  }

  const locationDataResponse: any = await locationData.json();

  const { latitude, longitude } = locationDataResponse.result;

  return { latitude, longitude };
}

export default async function threeOutagesRequest(latitude: number, longitude: number, client: ThreeClient, postcode: string = 'SW1A 1AA') {
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
