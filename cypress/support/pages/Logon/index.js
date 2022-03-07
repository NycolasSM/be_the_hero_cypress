// ações de interação

const element = require("./elements").ELEMENTS;

class Logon {
  acessarLogin() {
    cy.visit("http://localhost:3000");
  }
  preencherLogin() {
    cy.get(element.id).type(Cypress.env("createdOngId"));
    cy.get(element.buttonLogin).click();
  }
}

export default new Logon();
