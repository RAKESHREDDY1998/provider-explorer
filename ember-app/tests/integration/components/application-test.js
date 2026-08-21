import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Template | application', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the layout wrapper', async function (assert) {
    await render(hbs`
      <div class="page-container">
        <header>
          <h1>Provider Directory Explorer</h1>
        </header>
        <main>
          <!-- outlet -->
        </main>
      </div>
    `);

    assert.dom('.page-container').exists();
    assert.dom('header h1').hasText('Provider Directory Explorer');
  });
});
