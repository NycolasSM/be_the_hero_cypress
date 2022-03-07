/// <reference types="cypress" />

import Logon from "../support/pages/Logon";
import Register from "../support/pages/Register";
import Profile from "../support/pages/Profile";
import NewIncident from "../support/pages/NewIncident";

describe("Ongs", () => {
  it("devem poder realizar um cadastro", () => {
    Register.acessarCadastro();
    Register.preencherCadastro();
    Register.validarCadastroDeOngComSucesso();
  });

  it("deve poder realizar um login no sistema", () => {
    Logon.acessarLogin();
    Logon.preencherLogin();
  });

  it("devem poder fazer logout", () => {
    cy.login(); // custom commands
    Profile.clicarNoBotaoLogout();
  });

  it("devem poder cadastrar novos casos", () => {
    cy.login();

    Profile.clicarNoBotaoCadastrarNovosCasos();

    NewIncident.preencherCadastroDeCaso();
    NewIncident.validarCadastroDeCaso();

  });

  it("devem poder excluir um caso", () => {
    cy.createNewIncident();
    cy.login();

    Profile.clicarNoBotaoExcluirUmCaso();
    Profile.validarExclusaoDeCasoComSucesso

  });
});
