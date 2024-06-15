package com.kdu.ibe.dto.bookings;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BillingInfoDTO {
    @NotBlank(message = "First name cannot be blank")
    private String firstName;

    @NotBlank(message = "Last name cannot be blank")
    private String lastName;

    private String mailingAddress1;
    private String mailingAddress2;

    @NotBlank(message = "Country cannot be blank")
    private String country;

    @NotBlank(message = "City cannot be blank")
    private String city;

    @NotBlank(message = "State cannot be blank")
    private String state;

    @NotBlank(message = "Zip code cannot be blank")
    private String zipCode;
}