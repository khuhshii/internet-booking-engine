package com.kdu.ibe.repository;

import com.kdu.ibe.entity.bookings.OtpEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface OtpRepository extends JpaRepository<OtpEntity,Long> {
    // Custom method to delete expired OTPs
    @Modifying
    @Transactional
    @Query("DELETE FROM OtpEntity o WHERE o.expiryTime <= CURRENT_TIMESTAMP")
    void deleteExpiredOtps();
}
