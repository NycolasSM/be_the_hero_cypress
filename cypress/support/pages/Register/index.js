const element = require("./elements").ELEMENTS;

class Register {
  acessarCadastro() {
    cy.visit("http://localhost:3000/register");
  }

  preencherCadastro() {
    cy.get(element.name).type("Inserindo Texto Teste");
    cy.get(element.email).type("Email@teste.com");
    cy.get(element.whatsapp).type("139999-9999");
    cy.get(element.city).type("Jacupiranga");
    cy.get(element.uf).type("SP");

    // rountig
    // start server com cy.server()
    // criar uma rota com cy.route()
    // atribuir rota a um alias
    // esperar com cy.wait

    cy.route("POST", "**/ongs").as("postOng");

    cy.get(element.submit).click();
  }

  validarCadastroDeOngComSucesso() {
    cy.wait("@postOng").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property("id");
      expect(xhr.response.body.id).is.not.null;
    });
  }
}

export default new Register();
