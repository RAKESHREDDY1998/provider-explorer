import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ProviderRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('provider', params.id);
  }
}
