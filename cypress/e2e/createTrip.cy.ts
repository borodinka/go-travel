import { AppRoutes } from "../../src/app/config/routes/AppRoutes";

describe("Trip Creation - Full Wizard Flow", () => {
  beforeEach(() => {
    cy.clearWizardState();
    cy.clearAuth();
    cy.login();
  });

  it("completes all 7 wizard steps and shows the new trip on the dashboard", () => {
    cy.visit(AppRoutes.addTrip);

    // -- STEP 1 --

    cy.contains("Travel information").should("be.visible");

    cy.get('input[name="name"]').type("Cypress Test Trip");

    cy.contains("Preview image").click();
    cy.get('img[alt="Mountains and lake with sunset."]')
      .should("be.visible")
      .parent()
      .click();
    cy.contains("Save").click();

    cy.contains("Start date").parent().find("input").type("10/10/2026");
    cy.contains("End date").parent().find("input").type("10/24/2026");

    cy.contains("Next").click();

    // -- STEP 2 --

    cy.contains("Destination").should("be.visible");
    cy.get('input[name="locationFrom"]').type("Los Angeles");
    cy.get('input[name="destinations.0.name"]').type("Tokyo");
    cy.contains("Next").click();

    // -- STEP 3 --

    cy.contains("Places to visit").should("be.visible");
    cy.get('input[aria-label="Place Name"]').first().type("Shibuya Crossing");
    cy.contains("Next").click();

    // -- STEPS 4–7 --

    for (let step = 4; step <= 7; step++) {
      cy.contains("Next").click();
      cy.wait(300);
    }

    // -- RESULT --

    cy.url().should("include", AppRoutes.trips);
    cy.contains("Cypress Test Trip").should("be.visible");
  });
});
