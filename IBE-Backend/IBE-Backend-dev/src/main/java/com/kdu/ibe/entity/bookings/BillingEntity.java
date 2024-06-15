package com.kdu.ibe.entity.bookings;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "billing")
public class BillingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long billingId;

    private String firstName;
    private String lastName;
    private String address1;
    private String address2;
    private String city;
    private String zipcode;
    private String state;
    private String country;
    private String phone;
    private String emailId;

}
