package com.kdu.ibe.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "guest_user")
public class GuestUserEntity {
    @Id
    private Long userId;
    private String emailId;
    private boolean hasSubscribed = false;
    private String firstName;
    private String lastName;
    private String phone;
    private Long tenantId;

}
