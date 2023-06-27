describe('Login Page', () => {
    beforeEach(() => {
      // Visit the login page before each test
      cy.visit('/login');
    });
  
    it('should display an error message with invalid credentials', () => {
      // Type invalid username and password
      cy.get('#name').type('invaliduser');
      cy.get('#password').type('invalidpassword');
  
      // Click the login button
      cy.get('#login-button').click();
  
      // Assert that the error message is displayed
      cy.get('#error-message').should('be.visible');
    });
  
    it('should successfully log in with valid credentials', () => {
      // Type valid username and password
      cy.get('#name').type('validuser');
      cy.get('#password').type('validpassword');
  
      // Click the login button
      cy.get('#login-button').click();
  
      // Assert that the user is redirected to the dashboard
      cy.url().should('include', '/dashboard');
  
      // Assert that the user's name is displayed on the dashboard
      cy.get('#user-name').should('contain', 'Valid User');
    });
  });
  
  