describe("spec for room details page", () => {
    beforeEach(() => {
      cy.visit(
        "http://localhost:5173/rooms?startDate=2024-03-24&endDate=2024-03-26&propertyName=Team%2015%20Hotel&roomCount=1&accessible=false&Adults=1&Teens=0&Kids=0"
      );
      cy.wait(2000);
    });
  
    it("displayes the header component", () => {
      cy.viewport("macbook-15");
      cy.get(".header").should("exist");
      cy.get(".header-container").should("exist");
      cy.get(".right-section").should("exist");
    });
    it("renders itneary correctly", () => {
      cy.viewport("macbook-15");
      cy.get(".trip-iteanary-container").should("exist");
      cy.get(".itenary-heading").should("exist");
    });
    it("should sort by price", () => {
      cy.get(".price-iteanary").click();
      cy.contains(".price-options button", "high").click();
      cy.get(".price").should("contain", "Price:high");
    });
    it("renders correctly rooms card", () => {
      cy.viewport("macbook-15");
      cy.get(".roomCardHolder").should("exist");
      cy.get(".roomCards").should("exist");
      cy.get(".indiv-card").should("have.length.above", 0);
    });
    it("displays room details properly", () => {
      cy.viewport("macbook-15");
      cy.get(".roomcard-details")
        .first()
        .within(() => {
          cy.get("#roomName").should("exist");
          cy.get(".rating").should("exist");
        });
    });
    it("renders filter options correctly", () => {
      cy.viewport("macbook-15");
      cy.get(".filter-options-container").should("exist");
    });
  });