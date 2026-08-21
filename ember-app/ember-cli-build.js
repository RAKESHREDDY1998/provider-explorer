'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { execSync } = require('child_process');

module.exports = function (defaults) {
  // Execute the external gulp task
  console.log('Running gulp svg-sprite task...');
  try {
    execSync('npx gulp svg-sprite', { stdio: 'inherit', cwd: '..' });
  } catch (error) {
    console.error('Failed to build SVG sprites', error);
  }

  const app = new EmberApp(defaults, {
    'ember-cli-babel': { enableTypeScriptTransform: true },

    // Add options here
  });

  return app.toTree();
};
