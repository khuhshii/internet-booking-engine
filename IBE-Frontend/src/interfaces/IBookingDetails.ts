export interface Room {
  name: string;
  guests: string;
  checkInDate: string;
  checkOutDate: string;
  packageDetails: string;
  amountDetails: string;
  finalAmount: string;
}

export interface Guest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface Billing {
  firstName: string;
  lastName: string;
  mailingAddress1: string;
  mailingAddress2: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}

export interface Payment {
  cardNumber: string;
  expMM: string;
  expYY: string;
  cvvCode: string;
}

export interface EmailData {
  room: Room;
  guest: Guest;
  billing: Billing;
  payment: Payment;
}
