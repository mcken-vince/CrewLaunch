/// <reference types="cypress" />


describe('User Login', () => {
  it('can login with an existing account', () => {
    cy.visit(`http://localhost:${Cypress.env('port')}/login`);
    cy.contains('Login');
    cy.get('.login-form-email')
      .type('hello@mail.com');
    cy.get('.login-form-password')
      .type('asdfasdf');
    cy.get('.login-form-submit').click();

    cy.contains('Success');
    });

  it('cannot login with nonexistent account', () => {
    cy.visit(`http://localhost:${Cypress.env('port')}/login`);
    cy.contains('Login');
    cy.get('.login-form-email')
      .type('nonexistent234987234987234987234@fake.com');
    cy.get('.login-form-password')
      .type('doesntreallymatter');
    cy.get('.login-form-submit').click();

    cy.contains('Error');
  });
});