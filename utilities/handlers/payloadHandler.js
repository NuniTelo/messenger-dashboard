module.exports = (function payloadHandler() {
  const
    { entryIds } = require('../constants/index'),
    { processFMS2019Response, processOXC2019Response } = require('./responseHandler');

  function processPayload(entryId, payload) {
    switch (entryId) {
      case entryIds.FMS2019:
        return processFMS2019Response(payload);

      case entryIds.OXC2019:
        return processOXC2019Response(payload);
    }
  }

  return {
    processPayload: processPayload
  }
})();