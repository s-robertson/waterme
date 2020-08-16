// https://docs.cypress.io/api/introduction/api.html
import { authenticate } from "../helpers";

describe("Critical flow", () => {
  beforeEach(() => {
    authenticate();
  });

  it("Adds, waters, and deletes a plant", () => {
    const expectedPlantName = "Snake Plant";
    const expectedPlantDays = 5;

    cy.get("[data-test=button-add-new-plant]").click();
    cy.get("[data-test=input-plant-name]").type(expectedPlantName);
    cy.get("[data-test=input-plant-days]").type(expectedPlantDays);
    cy.get("[data-test=button-add-plant-submit]").click();

    cy.get("[data-test=plant-card]").should("contain", expectedPlantName);
    cy.get("[data-test=plant-card]").should("contain", "0 Days Remaining");

    cy.get("[data-test=checkbox-water-plant]").click();
    cy.get("[data-test=button-water-plants-submit]").click();

    cy.get("[data-test=plant-card]").should(
      "contain",
      `${expectedPlantDays} Days Remaining`
    );

    cy.get("[data-test=button-delete-plant]").click();
    cy.get("[data-test=feedback-no-plants]").should("exist");
  });
});
