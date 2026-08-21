import RESTSerializer from '@ember-data/serializer/rest';

export default class ProviderSerializer extends RESTSerializer {
  primaryKey = 'number';

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (payload.Errors && payload.Errors.length > 0) {
      // Throw an error so the adapter catches it
      throw new Error(payload.Errors[0].description);
    }
    
    let normalizedPayload = {};
    if (payload.results) {
      normalizedPayload = {
        providers: payload.results
      };
    } else {
      normalizedPayload = { providers: [] };
    }

    return super.normalizeResponse(store, primaryModelClass, normalizedPayload, id, requestType);
  }
}
