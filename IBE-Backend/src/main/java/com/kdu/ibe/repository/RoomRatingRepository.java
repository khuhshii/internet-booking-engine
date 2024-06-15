package com.kdu.ibe.repository;

import com.kdu.ibe.entity.ReviewRatingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRatingRepository extends JpaRepository<ReviewRatingEntity,String> {
}
