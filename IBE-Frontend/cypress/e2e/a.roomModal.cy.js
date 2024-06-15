describe("spec for room modal", () => {
  beforeEach(() => {
    cy.visit(
      "http://localhost:5173/rooms?startDate=2024-03-24&endDate=2024-03-26&propertyName=Team%2015%20Hotel&roomCount=1&accessible=false&Adults=1&Teens=0&Kids=0"
    );
    cy.wait(1500);
  });

  it("does not display trip itinerary initially", () => {
    cy.viewport("macbook-15");
    cy.get(".trip-iteanary-container").should("not.be.visible");
  });
  it("displays room modal on clicking select room button", () => {
    cy.viewport("macbook-15");
    cy.get(".roomcard-details")
      .first()
      .within(() => {
        cy.get("#roomName").should("exist");
        cy.get(".select-room").click();
      });
    cy.get(".custom-modal").should("be.visible");
  });
  it("displays room details and amenities", () => {
    cy.viewport("macbook-15");
    cy.get(".roomcard-details")
      .first()
      .within(() => {
        cy.get("#roomName").should("exist");
        cy.get(".select-room").click();
      });
    cy.get(".desc-amenities").should("exist");
  });
  it("displays standard rates and deals", () => {
    cy.viewport("macbook-15");
    cy.get(".roomcard-details")
      .first()
      .within(() => {
        cy.get("#roomName").should("exist");
        cy.get(".select-room").click();
      });
    cy.get(".rates").should("exist");
  });
  it("displays custom promo", () => {
    cy.viewport("macbook-15");
    cy.get(".roomcard-details")
      .first()
      .within(() => {
        cy.get("#roomName").should("exist");
        cy.get(".rating").should("exist");
        cy.get(".select-room").click();
      });
    cy.get(".promocode").should("exist");
  });

  it("displays room modal and components in mobile view", () => {
    cy.viewport("iphone-xr");
    cy.get(".roomcard-details")
      .first()
      .within(() => {
        cy.get("#roomName").should("exist");
        cy.get(".rating").should("exist");
        cy.get(".select-room").click();
      });
    cy.get(".desc-amenities").should("exist");
    cy.get(".rates").should("exist");
    cy.get(".promocode").should("exist");
  });
  it("should redirect to checkout page on selecting a deal", () => {
    cy.viewport("macbook-15");
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
  it("displays trip itinerary on booking page", () => {
    cy.viewport("macbook-15");
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
    cy.get(".trip-iteanary-container").should("be.visible");
  });
  it("returns to room result page on clicking 'Continue Shopping'", () => {
    cy.viewport("macbook-15");
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
    cy.get("#checkout").first().click({ force: true });
    cy.url().should("include", "/");
  });
});
