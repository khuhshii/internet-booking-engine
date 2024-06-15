package com.kdu.ibe.repository;

import com.kdu.ibe.entity.AverageRatingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AverageRatingRepository extends JpaRepository<AverageRatingEntity,String> {
}
