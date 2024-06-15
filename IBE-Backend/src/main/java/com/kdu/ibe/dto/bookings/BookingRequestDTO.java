package com.kdu.ibe.dto.bookings;

import jakarta.validation.Valid;
import lombok.Data;

@Data
public class BookingRequestDTO {
    @Valid
    private TravelerInfoDTO travelerInfo;

    @Valid
    private BillingInfoDTO billingInfo;

    @Valid
    private PaymentInfoDTO paymentInfo;

    @Valid
    private ItineraryDTO itineraryInfo;


}
