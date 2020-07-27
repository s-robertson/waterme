// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Adds a new plant", () => {
    cy.visit("/");
    cy.contains("Add a new plant").click();
    cy.get("#name").type("My Plant");
    cy.get("#days")
      .clear()
      .type("5");
    cy.contains("Add Plant").click();
  });
});
