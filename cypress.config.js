const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'uituoe',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
  env: {
      login_url: '/home',
      dashboardProducts: '/home?session='
  },
});
