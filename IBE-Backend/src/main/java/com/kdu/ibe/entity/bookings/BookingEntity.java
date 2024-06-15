package com.kdu.ibe.entity.bookings;


import com.kdu.ibe.entity.GuestUserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "booking")
public class BookingEntity {
    @Id
    private Long bookingId;
    private String startDate;
    private String endDate;
    private Long roomCount;
    private Long adultCount;
    private Long teenCount;
    private Long kidCount;
    private Long propertyId;
    private Long roomTypeId;
    private boolean isCancelled;
    private String roomType;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private GuestUserEntity user;

    @OneToOne
    private PromotionEntity promotion;

    @OneToOne
    private BillingEntity billing;

    @OneToOne
    private PaymentEntity payment;

    @OneToOne
    private CostEntity cost;

}
