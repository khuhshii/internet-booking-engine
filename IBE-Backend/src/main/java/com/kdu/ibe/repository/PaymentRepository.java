package com.kdu.ibe.repository;

import com.kdu.ibe.entity.bookings.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<PaymentEntity,Long> {
}
