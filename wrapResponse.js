module.exports = function wrapResponse(response, metadata = { ok: true }) {
  return {
    info: [
      'This service is provided free-of-charge (for now), courtesy of dav.network.',
      'If you use this a lot, please consider supporting me: https://github.com/sponsors/davwheat',
      'Anyway, the raw data from the API you wanted is found below! Enjoy!',
    ],
    ...metadata,
    data: response,
  };
};
