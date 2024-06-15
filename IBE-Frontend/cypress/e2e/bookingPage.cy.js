describe("spec for room modal", () => {
  beforeEach(() => {
    cy.visit(
      "http://localhost:5173/rooms?startDate=2024-03-24&endDate=2024-03-26&propertyName=Team%2015%20Hotel&roomCount=1&accessible=false&Adults=1&Teens=0&Kids=0"
    );
    cy.get(".roomcard-details")
      .first()
      .within(() => {
        cy.get("#roomName").should("exist");
        cy.get(".select-room").click();
      });
    cy.get(".card")
      .should("exist")
      .should("be.visible")
      .then(($dealCards) => {
        cy.log(`Found ${$dealCards.length} deal cards`);
        cy.wrap($dealCards.first()).within(() => {
          cy.get("button").click();
        });
      });
    cy.url().should("include", "/checkoutPage");
  });

  it("displays trip itinerary", () => {
    cy.viewport("macbook-15");
    cy.get(".trip-iteanary-container").should("be.visible");
  });

  it("returns to room result page on clicking 'Continue Shopping'", () => {
    cy.viewport("macbook-15");
    cy.get(".trip-iteanary-container").should("be.visible");
    cy.get("#checkout").first().click({ force: true }); // Adjusted selector to find the button inside the appropriate div
    cy.url().should("include", "/");
  });


});
