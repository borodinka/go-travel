/// <reference types="cypress" />
import { AppRoutes } from "../../src/app/config/routes/AppRoutes";

describe("Authentication", () => {
  beforeEach(() => {
    cy.clearWizardState();
    cy.clearAuth();
  });

  // -- LOGIN --
  it("logs in successfully and redirects to the dashboard", () => {
    cy.visit(AppRoutes.login);

    cy.get('input[name="email"]').should("be.visible").type("test@gmail.com");
    cy.get('input[name="password"]').should("be.visible").type("gotravel!");
    cy.get("button").contains("Login").click();

    cy.url().should("include", AppRoutes.dashboard);
    cy.contains(/hi,/i).should("be.visible");
  });

  // -- PROTECTED ROUTE --
  it("redirects unauthenticated users from protected routes to login", () => {
    cy.visit(AppRoutes.dashboard);
    cy.url().should("include", AppRoutes.login);
  });
  it("redirects unauthenticated users from the trips page to login", () => {
    cy.visit(AppRoutes.trips);
    cy.url().should("include", AppRoutes.login);
  });
});
