package com.kdu.ibe.repository;

import com.kdu.ibe.entity.PreBookingCompositeKey;
import com.kdu.ibe.entity.TemporaryPreBookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;


public interface TemporaryPreBookingRepository extends JpaRepository<TemporaryPreBookingEntity, PreBookingCompositeKey> {
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO booking_check (start_date, room_type_id, room_id, property_id, end_date) VALUES (:startDate, :roomTypeId, :roomId, :propertyId, :endDate)", nativeQuery = true)
    void insertBookingCheck(@Param("startDate") LocalDate startDate, @Param("roomTypeId") Long roomTypeId, @Param("roomId") Long roomId, @Param("propertyId") Long propertyId, @Param("endDate") LocalDate endDate);
}