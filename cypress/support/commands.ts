/// <reference types="cypress" />
import { AppRoutes } from "../../src/app/config/routes/AppRoutes";

Cypress.Commands.add(
  "login",
  (email = "test@gmail.com", password = "gotravel!") => {
    cy.session(
      ["login", email],
      () => {
        cy.visit(AppRoutes.login);
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type(password);
        cy.get("button").contains("Login").click();
        cy.url().should("include", AppRoutes.dashboard);
      },
      {
        validate() {
          cy.visit(AppRoutes.dashboard);
          cy.contains(/hi,/i).should("be.visible");
        },
      },
    );
  },
);

Cypress.Commands.add("clearWizardState", () => {
  cy.clearLocalStorage();
  cy.clearCookies();

  cy.window().then((win) => {
    win.localStorage.clear();
    win.sessionStorage.clear();
  });
});

Cypress.Commands.add("clearAuth", () => {
  cy.window().then((win) => {
    win.indexedDB.databases?.().then((dbs) => {
      dbs.forEach((db) => {
        if (db.name?.includes("firebase")) {
          win.indexedDB.deleteDatabase(db.name);
        }
      });
    });
  });
});
