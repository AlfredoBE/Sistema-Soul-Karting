const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Cambia esto según tu entorno
    specPattern: 'cypress/e2e/**/*.spec.js',
    supportFile: 'cypress/support/e2e.js',
  },
});