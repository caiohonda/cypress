describe('Login Page', () => {

  beforeEach(() => {
    // Visit the login page before each test
    cy.visit(Cypress.env('base_url'))
  })
  
  it('should login with valid credentials', () => {

    // Enter valid credentials and click login
    cy.get('#P9999_USERNAME').type(Cypress.env('qa_usr'))
    cy.get('#P9999_PASSWORD').type(Cypress.env('qa_psw'))
    cy.get('#B12601466532783624621').click()
    cy.wait(5000)
    // Assert successful login
    cy.url().should('contain', 'https://apex.oracle.com/pls/apex/r/danmende/qa-application/home?')
    cy.get('#L12601473034917624729 > .t-Button-label').should('be.visible')
  })

  it('should show error for invalid username', () => {

    // Enter invalid username and valid password
    cy.get('#P9999_USERNAME').type(Cypress.env('invalidUsr'))
    cy.get('#P9999_PASSWORD').type(Cypress.env('qa_psw'))
    cy.get('#B12601466532783624621').click()
    cy.wait(2000)
    // Assert error message
    cy.contains('Please wait').should('be.visible');
    cy.url().should('contain', 'https://apex.oracle.com/pls/apex/r/danmende/qa-application/login');
  });

  it('should show error for invalid password', () => {

    // Enter valid username and invalid password
    cy.get('#P9999_USERNAME').type(Cypress.env('qa_usr'))
    cy.get('#P9999_PASSWORD').type(Cypress.env('invalidPsw'))
    cy.get('#B12601466532783624621').click()
    cy.wait(2000)
    // Assert error message
    cy.contains('Please wait').should('be.visible');
    cy.url().should('contain', 'https://apex.oracle.com/pls/apex/r/danmende/qa-application/login');
  });

  it('should show error for both invalid username and password', () => {

    // Enter invalid username and password
    cy.get('#P9999_USERNAME').type(Cypress.env('invalidUsr'))
    cy.get('#P9999_PASSWORD').type(Cypress.env('invalidPsw'))
    cy.get('#B12601466532783624621').click()
    cy.wait(2000)
    // Assert error message
    cy.contains('Please wait').should('be.visible');
    cy.url().should('contain', 'https://apex.oracle.com/pls/apex/r/danmende/qa-application/login');
  });
  Cypress.on('uncaught:exception', (err, runnable) => {
  // Your custom handling for uncaught exceptions
  // For example, you can log the error or take specific actions based on the error type.
  // You can also prevent Cypress from failing the test by returning false here.

  // For demonstration purposes, let's log the error to the console.
  console.error('Uncaught Exception:', err.message);

  // Returning false here prevents Cypress from failing the test due to the uncaught exception.
  return false;
  });

})

