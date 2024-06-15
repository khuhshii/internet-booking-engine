import '@istanbuljs/nyc-config-typescript/register';
declare const Cypress: any;

Cypress.on('window:before:load', (win) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const instrumenter = require('cypress-istanbul/instrumenter-loader');

  const coverageExclude = [/node_modules/];
  win.__coverage__ = win.__coverage__ || {};
  instrumenter.hookIstanbulLoader(coverageExclude);
});
