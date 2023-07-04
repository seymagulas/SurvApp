describe('Create Survey', () => {
  it('should navigate to the new survey page', () => {
    cy.visit('http://localhost:3001/login');
    cy.get('#name').type('john@mail.com');
    cy.get('#password').type('Base1');
    cy.get('#login').should('not.be.disabled').click();

    cy.url().should('include', '/main');
    cy.get('p').should('contain', 'SurVapp');
    cy.get('button[aria-label="Create question"]').click();
    cy.url().should('include', '/survey/new');
    cy.get('h2').should('contain', 'Survey Name:');
    cy.get('input[aria-label="Survey name"]').type('Christopher Nolan');
  });
});
