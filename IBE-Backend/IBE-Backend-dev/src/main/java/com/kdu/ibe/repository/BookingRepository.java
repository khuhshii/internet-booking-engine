package com.kdu.ibe.repository;

import com.kdu.ibe.entity.bookings.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<BookingEntity,Long> {
}
