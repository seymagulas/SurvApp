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
    cy.get('button[aria-label="Add question"]').click();
    cy.url().should('include', '/survey/questions');
    cy.get('h2').should('contain', 'Add question');
    cy.get('input[aria-label="add question"]').type('Favourite Movie');
    cy.get('select[aria-label="select type of question"]').select(
      'Multiple choice answers',
    );
    cy.get('button[aria-label="Add option"]').click();
    cy.get('input[aria-label="add answer option"]').type('Batman');
    cy.get('button[aria-label="Add option"]').click();
    cy.get('input[aria-label="add answer option"]').eq(1).type('Interstellar');
    cy.get('button[aria-label="Add option"]').click();
    cy.get('input[aria-label="add answer option"]').eq(2).type('Inception');
    cy.get('button[aria-label="Add option"]').click();
    cy.get('input[aria-label="add answer option"]').eq(3).type('Dunkrik');
    cy.get('button[aria-label="Save question"]').click();
    cy.get('button[aria-label="Add question"]').click();
    cy.get('input[aria-label="add question"]').type('Favourite genre');
    cy.get('select[aria-label="select type of question"]').select(
      'Rating answers',
    );
    cy.get('button[aria-label="Save question"]').click();
    cy.url().should('include', '/survey/new');
    cy.get('button[aria-label="Save question"]').click();
  });
});
