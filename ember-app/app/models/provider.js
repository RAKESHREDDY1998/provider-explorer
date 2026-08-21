import Model, { attr } from '@ember-data/model';

export default class ProviderModel extends Model {
  @attr('string') number;
  @attr basic;
  @attr taxonomies;
  @attr addresses;
}
