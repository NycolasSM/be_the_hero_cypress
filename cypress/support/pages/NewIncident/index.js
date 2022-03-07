const element = require("./elements").ELEMENTS;

class NewIncident {
  preencherCadastroDeCaso() {
    cy.get(element.title).type("Animais abandonados");
    cy.get(element.description).type(
      "Animais que precisam de apoio para ter aonde morarem"
    );
    cy.get(element.value).type("200");

    cy.route("POST", "**/incidents").as("newIncident");

    cy.get(element.buttonSave).click();
  }

  validarCadastroDeCaso() {
    cy.wait("@newIncident").then((xhr) => {
      expect(xhr.status).to.eq(200);
      expect(xhr.response.body).has.property("id");
      expect(xhr.response.body.id).is.not.null;
    });
  }
}

export default new NewIncident();
