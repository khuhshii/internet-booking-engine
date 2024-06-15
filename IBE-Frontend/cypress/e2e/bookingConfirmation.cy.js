describe('Booking Confirmation Page', () => {
  beforeEach(() => {
    // Visit the booking confirmation page
    cy.visit('http://localhost:5173/bookings?bookingId=9');
  });

  it('should display the upcoming reservation div', () => {
    cy.get('.upcoming-reservation').should('exist');
  });

  it('should display the room details div', () => {
    cy.get('.room-details').should('exist');
  });

  it('should display the room image div', () => {
    cy.get('.room-image').should('exist');
  });

  it('should display the booking information div', () => {
    cy.get('.booking-information').should('exist');
  });

  it('should display the room total summary div', () => {
    cy.get('.room-total-summary').should('exist');
  });

  it('should display the guest information div', () => {
    cy.get('.guest-information').should('exist');
  });

  it('should display the billing information div', () => {
    cy.get('.billing-information').should('exist');
  });

  it('should display the payment information div', () => {
    cy.get('.payment-information').should('exist');
  });
});
