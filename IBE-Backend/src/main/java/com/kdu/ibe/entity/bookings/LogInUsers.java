package com.kdu.ibe.entity.bookings;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class LogInUsers {

    @Id
    private String emailId;

    @OneToMany
    private List<BookingEntity> bookings;

    @Lob
    private String jwtToken;

}
