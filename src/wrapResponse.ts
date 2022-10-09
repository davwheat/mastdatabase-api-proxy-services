export default function wrapResponse(
  response: string | null | boolean | any[] | Record<string, unknown>,
  metadata: Record<string, unknown> = { ok: true }
) {
  return {
    info: [
      'This service is provided free-of-charge (for now), courtesy of dav.network.',
      'If you use this a lot, please consider supporting me: https://github.com/sponsors/davwheat',
      'Documenation is found at https://github.com/davwheat/mastdatabase-api-proxy-services#readme',
      'Anyway, the raw data from the API you wanted is found below! Enjoy!',
    ],
    ...metadata,
    data: response,
  };
}
