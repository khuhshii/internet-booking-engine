package com.kdu.ibe.dto.bookings;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class PaymentInfoDTO {
    @NotBlank(message = "Card number cannot be blank")
    @Pattern(regexp = "\\d{16}", message = "Invalid card number")
    private String cardNumber;

    @NotBlank(message = "Expiry month cannot be blank")
    @Pattern(regexp = "\\d{2}", message = "Invalid expiry month")
    private String expMM;

    @NotBlank(message = "Expiry year cannot be blank")
    @Pattern(regexp = "\\d{4}", message = "Invalid expiry year")
    private String expYY;
}
