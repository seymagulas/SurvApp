describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/login'); //
  });

  it('should navigate to the about page', () => {
    cy.get('#name').type('john@mail.com');
    cy.get('#password').type('Base1');
    cy.get('#login').should('not.be.disabled').click();

    cy.url().should('include', '/main');
    cy.get('p').should('contain', 'SurVapp');
  });

  it('should logout and navigate to the homepage', () => {
    cy.get('#name').type('john@mail.com');
    cy.get('#password').type('Base1');
    cy.get('#login').should('not.be.disabled').click();
    cy.get('nav').contains('Logout').click();

    cy.url().should('include', '/');
  });

  it('should navigate to the profile page', () => {
    cy.get('#name').type('john@mail.com');
    cy.get('#password').type('Base1');
    cy.get('#login').should('not.be.disabled').click();
    cy.viewport('iphone-6');
    cy.get('svg.h-6.w-6').click();
    cy.get('nav').contains('Profile').click();

    cy.url().should('include', '/profile');
  });
});
