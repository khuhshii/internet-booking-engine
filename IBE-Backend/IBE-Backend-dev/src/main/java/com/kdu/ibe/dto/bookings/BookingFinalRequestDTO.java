package com.kdu.ibe.dto.bookings;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingFinalRequestDTO {

    private Long tenantId;

    private String emailId;

    @NotNull(message = "Start date cannot be null")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Invalid date format. Use yyyy-MM-dd")
    private String startDate;

    @NotNull(message = "End date cannot be null")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Invalid date format. Use yyyy-MM-dd")
    private String endDate;

    @NotNull(message = "Room count cannot be null")
    @Min(value = 1, message = "Room count must be at least 1")
    private Long roomCount;

    @NotNull(message = "Adult count cannot be null")
    @Min(value = 1, message = "Adult count must be at least 1")
    private Long adultCount;

    @NotNull(message = "Teen count cannot be null")
    @Min(value = 0, message = "Teen count cannot be negative")
    private Long teenCount;

    @NotNull(message = "Kid count cannot be null")
    @Min(value = 0, message = "Kid count cannot be negative")
    private Long kidCount;

    @NotNull(message = "Property ID cannot be null")
    @Min(value = 1, message = "Property ID must be at least 1")
    private Long propertyId;

    @NotNull(message = "Room type ID cannot be null")
    @Min(value = 1, message = "Room type ID must be at least 1")
    private Long roomTypeId;

    private String roomTypeName;

    @NotNull(message = "Cost information cannot be null")
    @Valid
    private CostDTO costInfo;

    @Valid
    private PromotionDTO promotionInfo;

    @NotNull(message = "Guest information cannot be null")
    @Valid
    private GuestDTO guestInfo;

    @NotNull(message = "Billing information cannot be null")
    @Valid
    private BillingDTO billingInfo;

    @NotNull(message = "Payment information cannot be null")
    @Valid
    private PaymentDTO paymentInfo;


    @Data
    public static class CostDTO {
        @NotNull(message = "Total cost cannot be null")
        @DecimalMin(value = "0.0", message = "Total cost cannot be negative")
        private Double totalCost;

        @NotNull(message = "Amount due at resort cannot be null")
        @DecimalMin(value = "0.0", message = "Amount due at resort cannot be negative")
        private Double amountDueAtResort;

        @NotNull(message = "Nightly rate cannot be null")
        @DecimalMin(value = "0.0", message = "Nightly rate cannot be negative")
        private Double nightlyRate;

        @NotNull(message = "Taxes cannot be null")
        @DecimalMin(value = "0.0", message = "Taxes cannot be negative")
        private Double taxes;

        @NotNull(message = "VAT cannot be null")
        @DecimalMin(value = "0.0", message = "VAT cannot be negative")
        private Double vat;
    }

    @Data
    public static class PromotionDTO {
        private Long promotionId;
        private String promotionTitle;
        private String priceFactor;
        private String promotionDescription;
    }

    @Data
    public static class GuestDTO {
        @NotBlank(message = "First name cannot be blank")
        private String firstName;
        @NotBlank(message = "Last name cannot be blank")
        private String lastName;
        @NotBlank(message = "Phone number cannot be blank")
        private String phone;
        @NotBlank(message = "Email ID cannot be blank")
        @Email(message = "Invalid email format")
        private String emailId;
        private boolean hasSubscribed;
    }

    @Data
    public static class BillingDTO {
        @NotBlank(message = "First name cannot be blank")
        private String firstName;
        @NotBlank(message = "Last name cannot be blank")
        private String lastName;
        @NotBlank(message = "Address line 1 cannot be blank")
        private String address1;
        private String address2;
        @NotBlank(message = "City cannot be blank")
        private String city;

        @NotBlank(message = "Zip code cannot be blank")
        private String zipcode;

        @NotBlank(message = "State cannot be blank")
        private String state;

        @NotBlank(message = "Country cannot be blank")
        private String country;

        @NotBlank(message = "Phone number cannot be blank")
        @Pattern(regexp = "\\d{10}", message = "Invalid phone number")
        private String phone;

        @NotBlank(message = "Email ID cannot be blank")
        @Email(message = "Invalid email format")
        private String emailId;
    }

    @Data
    public static class PaymentDTO {
        @NotBlank(message = "Card number cannot be blank")
        private String cardNumber;

        @NotBlank(message = "Expiry month cannot be blank")
        @Pattern(regexp = "^(0[1-9]|1[0-2])$", message = "Expiry month must be in MM format")
        private String expiryMonth;

        @NotBlank(message = "Expiry year cannot be blank")
        @Pattern(regexp = "^\\d{4}$", message = "Expiry year must be in YYYY format")
        private String expiryYear;
    }
}