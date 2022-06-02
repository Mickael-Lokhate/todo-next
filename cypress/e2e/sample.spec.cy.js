describe("Check a todo from category", () => {
  it("Should check first todo from first category", () => {
    cy.visit("/");
    cy.get("h1").contains("Home");
    cy.get(".cat-container").first().click();
    cy.url().should("include", "/category/");
    cy.get("body").then(($body) => {
      if ($body.find(".div-checked").length > 0) {
        cy.get(".todo").first().should("have.class", "checked-true");
        cy.get(".todo").first().click();
        cy.get(".todo").first().should("have.class", "checked-false");
      } else {
        cy.get(".todo").first().should("have.class", "checked-false");
        cy.get(".todo").first().click();
        cy.get(".todo").first().should("have.class", "checked-true");
      }
    });
  });
});
