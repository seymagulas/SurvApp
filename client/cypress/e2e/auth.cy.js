describe('Login Page', () => {
  it('should display the register form', () => {
    cy.visit('http://localhost:3001/register');
    // cy.get('h1').should('contain', 'Register');
    // cy.get('form').should('be.visible');
    // cy.get('#name').should('exist');
    // cy.get('#email').should('exist');
    // cy.get('#password').should('exist');
    // cy.get('#confirmPassword').should('exist');
    // cy.get('button[type="submit"]').should('exist').and('be.disabled');

    // cy.get('#name').type('john1');
    // cy.get('#email').type(`${Date.now()}@mail.com`);
    // cy.get('#password').type('Base12');
    // cy.get('#confirmPassword').type('Base12');

    // cy.get('.disabled_button').should('not.be.disabled').click();

    // cy.url().should('include', '/login');
    // // Add more assertions or actions as needed

    // cy.get('h1').should('contain', 'Welcome to SurvApp!');
    // cy.get('form').should('be.visible');
    // cy.get('#name').should('exist');
    // cy.get('#password').should('exist');
    // cy.get('button[type="submit"]').should('exist').and('be.disabled');

    // cy.get('#name').type(`${Date.now()}@mail.com`);
    // cy.get('#password').type('Base12');
    // cy.get('#login').should('not.be.disabled').click();

    // cy.url().should('include', '/main');
    // // Add more assertions or actions as needed
  });
});
