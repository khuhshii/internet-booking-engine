package com.kdu.ibe.repository;

import com.kdu.ibe.entity.CustomPromotionsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomPromotionRepository extends JpaRepository<CustomPromotionsEntity,String> {

}
