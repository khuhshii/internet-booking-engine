package com.kdu.ibe.dto.email;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EmailDto {

    @NotBlank(message = "Email must not be blank")
    @Email(message = "Invalid email format")
    String email;

    @NotBlank(message = "Data must not be blank")
    String data;
}
