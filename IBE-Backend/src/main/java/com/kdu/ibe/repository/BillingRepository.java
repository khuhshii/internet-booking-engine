package com.kdu.ibe.repository;

import com.kdu.ibe.entity.bookings.BillingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillingRepository extends JpaRepository<BillingEntity,Long> {
}
