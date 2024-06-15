package com.kdu.ibe.repository;

import com.kdu.ibe.entity.PreBookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PreBookingRepository extends JpaRepository<PreBookingEntity,Long> {

    List<PreBookingEntity> findByRoomTypeId(Integer roomTypeId);
}
