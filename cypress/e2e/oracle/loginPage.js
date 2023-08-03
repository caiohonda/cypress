describe('Login Page', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('https://apex.oracle.com/pls/apex/r/danmende/qa-application/home');
  });

  it('should login with valid credentials', () => {
    const username = 'QA_USER';
    const password = 'qatest123';

    // Enter valid credentials and click login
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Assert successful login
    cy.url().should('eq', 'https://apex.oracle.com/pls/apex/r/danmende/qa-application/home/dashboard');
    cy.contains('Logged in as: QA_USER').should('be.visible');
  });

  it('should show error for invalid username', () => {
    const invalidUsername = 'invalid_user';
    const validPassword = 'qatest123';

    // Enter invalid username and valid password
    cy.get('input[name="username"]').type(invalidUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    // Assert error message
    cy.contains('Invalid username or password').should('be.visible');
    cy.url().should('eq', 'https://apex.oracle.com/pls/apex/r/danmende/qa-application/home');
  });

  it('should show error for invalid password', () => {
    const validUsername = 'QA_USER';
    const invalidPassword = 'invalid_pass';

    // Enter valid username and invalid password
    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(invalidPassword);
    cy.get('button[type="submit"]').click();

    // Assert error message
    cy.contains('Invalid username or password').should('be.visible');
    cy.url().should('eq', 'https://apex.oracle.com/pls/apex/r/danmende/qa-application/home');
  });

  it('should show error for both invalid username and password', () => {
    const invalidUsername = 'invalid_user';
    const invalidPassword = 'invalid_pass';

    // Enter invalid username and password
    cy.get('input[name="username"]').type(invalidUsername);
    cy.get('input[name="password"]').type(invalidPassword);
    cy.get('button[type="submit"]').click();

    // Assert error message
    cy.contains('Invalid username or password').should('be.visible');
    cy.url().should('eq', 'https://apex.oracle.com/pls/apex/r/danmende/qa-application/home');
  });
});
