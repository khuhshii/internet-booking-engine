describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("renders correctly", () => {
    cy.get(".main-app-landing-page").should("exist");
    cy.get(".landing-page").should("exist");
  });

  it("displayes the header component", () => {
    cy.viewport("macbook-15");
    cy.get(".header").should("exist");
    cy.get(".header-container").should("exist");
    cy.get(".right-section").should("exist");
  });

  it("should change the language correctly", () => {
    cy.viewport("macbook-15");
    cy.contains(".custom-language .language-display", "En").click();
    cy.contains(
      ".custom-language-drop-down-menu .language-drop-down-option",
      "Ita"
    ).click();
    cy.contains("Motore di prenotazione Internet").should("be.visible");
  });

  it("should navigate to the landing page on logo click", () => {
    cy.get(".linkToHome").click();
    cy.url().should("include", "/");
  });

  it("must have footer", () => {
    cy.viewport("macbook-15");
    cy.get(".footer").should("exist");
    cy.contains("Kickdrum Technology Group LLC.");
  });

  it("has hamburger in mobile viewport", () => {
    cy.viewport("iphone-xr");
    cy.get(".toggle-btn").should("exist");
    cy.get(".nav-btn").click();
    cy.get(".select-mobile").should("have.value", "en");
  });
  it("hamburger toggles in mobile viewport", () => {
    cy.viewport("iphone-xr");
    cy.get(".toggle-btn").should("exist");
    cy.get(".nav-btn").click();
    cy.get(".select-mobile").should("have.value", "en");
    cy.get(".nav-btn").click();
  });

  it("should navigate to the landing page on logo click in mobile view", () => {
    cy.viewport("iphone-xr");
    cy.get(".linkToHome").click();
    cy.url().should("include", "/");
  });

  it("displays the property dropdown", () => {
    cy.get(".property-container").should("exist");
    cy.get(".properties-select-dropdown").click();
    cy.get(".properties-dropdown").should("be.visible");
  });

  it("displays the date range picker", () => {
    cy.get(".select-dates-container").should("exist");
    cy.get(".select-dates").click();
    cy.get(".date-range-calendar-picker").should("be.visible");
  });

  it("changes the currency correctly", () => {
    cy.viewport("macbook-15");
    cy.contains(".custom-currency .currency-display", "USD").click();
    cy.contains(
      ".custom-currency-drop-down-menu .currency-drop-down-option",
      "EUR"
    ).click();
    cy.get(".currency-display").should("contain", "EUR");
    cy.get(".select-dates").click();
    cy.get(".date-range-calendar-picker").should("be.visible");
  });

//   it("displays the rooms dropdown", () => {
//     cy.get(".rooms-container").should("exist");
//     cy.get(".rooms-drop-down").click();
//     cy.get(".rooms-options-container").should("be.visible");
//   });

//   it("selects room count correctly", () => {
//     cy.get(".rooms-container").should("exist");
//     cy.get(".rooms-drop-down").click();
//     cy.get(".rooms-options-container").should("be.visible");
//     cy.get(".rooms-option").eq(1).click();
//     cy.get(".rooms-place-holder").should("have.text", "2");
//   });

//   it("increments and decrements guests count correctly", () => {
//     cy.get(".guests-container").should("exist");
//     cy.get(".guests-dropdown").click();
//     cy.get(".guests-drop-down-menu").should("exist");
//     cy.get(".category-inc").eq(0).click();
//     cy.get(".category-count-display").eq(0).should("have.text", "2");
//     cy.get(".category-dec").eq(0).click();
//     cy.get(".category-count-display").eq(0).should("have.text", "1");
//   });

//   it("displays the guests dropdown", () => {
//     cy.get(".guests-container").should("exist");
//     cy.get(".guests-dropdown").click();
//     cy.get(".guest-category-container")
//       .should("be.visible")
//       .and("have.css", "display", "block");
//   });

//   it("applies dates correctly", () => {
//     cy.get(".select-dates").click();
//     cy.get(".date-range-calendar-picker").should("be.visible");
//     cy.get(".apply-btn").should("exist");
//     cy.get(".select-dates").click();
//     cy.get(".date-range-calendar-picker").should("not.be.visible");
//   });
});