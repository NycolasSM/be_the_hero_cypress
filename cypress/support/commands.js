// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("createOng", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3333/ongs",
    body: {
      city: "Jacucity",
      email: "PetsOng@email.com",
      name: "Pets Ong",
      uf: "Sp",
      whatsapp: "13999999999",
    },
  }).then((response) => {
    expect(response.body.id).has.is.not.null;
    cy.log(response.body.id);

    Cypress.env("createdOngId", response.body.id);
  });
});

Cypress.Commands.add("createNewIncident", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3333/incidents",
    headers: { Authorization: `${Cypress.env("createdOngId")}` },
    body: {
      description: "Animais abandonados",
      title: "Animais que precisam de novos donos",
      value: "150"
    },
  }).then((response) => {
    expect(response.body.id).is.not.null;
    cy.log(response.body.id);

    Cypress.env("createdIncidentId", response.body.id);
  });
});

Cypress.Commands.add("login", () => {
  cy.visit("http://localhost:3000/profile", {
    onBeforeLoad: (browser) => {
      browser.localStorage.setItem("ongId", Cypress.env("createdOngId"));
      browser.localStorage.setItem("ongName", "Pets Ong");
    },
  });
});
