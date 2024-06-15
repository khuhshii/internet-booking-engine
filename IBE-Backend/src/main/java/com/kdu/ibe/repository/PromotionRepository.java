package com.kdu.ibe.repository;

import com.kdu.ibe.entity.bookings.PromotionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionRepository extends JpaRepository<PromotionEntity,Long> {
}
