/// <reference types="cypress" />

describe('Ongs', () => {
  it('devem poder realizar um cadastro', () => {
    cy.visit('http://localhost:3000/register');
    // cy.get - busca um elemento
    // .type - insere um texto
    cy.get('[data-cy=name]').type('Inserindo Texto Teste')
    cy.get('[data-cy=email]').type('Email@teste.com')
    cy.get('[data-cy=whatsapp]').type('139999-9999')
    cy.get('[data-cy=city]').type('Jacupiranga')
    cy.get('[data-cy="uf"]').type('SP')

    cy.get('[data-cy="submit"]').click()
  });

  it('deve poder realizar um login no sistema', () => {
    
  });
})