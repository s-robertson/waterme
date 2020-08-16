export function authenticate() {
  cy.visit("/");
  cy.get("#email").type(Cypress.env("account_username"));
  cy.get("#password").type(Cypress.env("account_password"));
  cy.contains("Login").click();
}
