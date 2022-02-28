/// <reference types="cypress" />

describe("Ongs", () => {
  it("devem poder realizar um cadastro", () => {
    cy.visit("http://localhost:3000/register");
    // cy.get - busca um elemento
    // .type - insere um texto
    cy.get('[data-cy="name"]').type("Inserindo Texto Teste");
    cy.get('[data-cy="email"]').type("Email@teste.com");
    cy.get('[data-cy="whatsapp"]').type("139999-9999");
    cy.get('[data-cy="city"]').type("Jacupiranga");
    cy.get('[data-cy="uf"]').type("SP");

    // rountig
    // start server com cy.server()
    // criar uma rota com cy.route()
    // atribuir rota a um alias
    // esperar com cy.wait

    // cy.intercept();  TODO o server esta deprecated, preciso ver sobre o intercept

    cy.route("POST", "**/ongs").as("postOng");

    cy.get('[data-cy="submit"]').click();

    cy.wait("@postOng").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property("id");
      expect(xhr.response.body.id).is.not.null;
    });
  });

  it("deve poder realizar um login no sistema", () => {
    const createOngId = Cypress.env("createdOngId");

    cy.log(createOngId);

    cy.visit("http://localhost:3000");
    cy.get("input").type(createOngId);
    cy.get(".button").click();
  });
});
