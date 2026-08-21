import RESTAdapter from '@ember-data/adapter/rest';

export default class ProviderAdapter extends RESTAdapter {
  host = 'https://npiregistry.cms.hhs.gov';
  namespace = 'api';

  buildURL(modelName, id, snapshot, requestType, query) {
    let url = super.buildURL(...arguments);
    url += '?version=2.1';
    
    if (id) {
      url += `&number=${id}`;
    }
    
    // Append any query params for the search
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value) {
          url += `&${key}=${encodeURIComponent(value)}`;
        }
      }
    }
    return url;
  }

  // Ensure query params don't get sent twice (once in URL, once in body/query string normally handled by jQuery/fetch)
  sortQueryParams() {
    return {};
  }
}
