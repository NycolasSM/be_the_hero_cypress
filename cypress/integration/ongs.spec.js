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

    cy.route("POST", "**/ongs").as("postOng");

    cy.get('[data-cy="submit"]').click();

    cy.wait("@postOng").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property("id");
      expect(xhr.response.body.id).is.not.null;
    });
  });

  it("deve poder realizar um login no sistema", () => {
    cy.visit("http://localhost:3000");
    cy.get("input").type(Cypress.env("createdOngId"));
    cy.get(".button").click();
  });

  it("devem poder fazer logout", () => {
    cy.login();

    cy.get("button").click();
  });

  it("devem poder cadastrar novos casos", () => {
    cy.login();

    cy.get(".button").click();
    cy.get('[placeholder="Título do caso"]').type("Animais abandonados");
    cy.get("textarea").type(
      "Animais que precisam de apoio para ter aonde morarem"
    );
    cy.get('[placeholder="Valor em reais"]').type("200");

    cy.route("POST", "**/incidents").as("newIncident");

    cy.get(".button").click();

    cy.wait("@newIncident").then((xhr) => {
      expect(xhr.status).to.eq(200);
      expect(xhr.response.body).has.property("id");
      expect(xhr.response.body.id).is.not.null;
    });
  });

  it("devem poder excluir um caso", () => {
    cy.createNewIncident();
    cy.login();

    // http://localhost:3333/incidents/31

    cy.route("DELETE", "**/incidents/*").as("deleteIncident");
  
    cy.get('li > button > svg').click();

    cy.wait("@deleteIncident").then((xhr) => {
      expect(xhr.status).to.eq(204);
      expect(xhr.response.body).to.be.empty;
    })
  });
});
