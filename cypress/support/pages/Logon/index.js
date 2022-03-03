// ações de interação

class Logon {
  acessarLogin() {
    cy.visit("http://localhost:3000");
  }
  preencherLogin() {
    cy.get("[data-cy=id]").type(Cypress.env("createdOngId"));
    cy.get("[data-cy=button-login]").click();
  }
}

export default new Logon();
