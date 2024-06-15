package com.kdu.ibe.entity.bookings;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "otp_table")
public class OtpEntity {

    @Id
    private Long bookingId;

    private String otpCode;

    @Temporal(TemporalType.TIMESTAMP)
    private Date expiryTime;
}
