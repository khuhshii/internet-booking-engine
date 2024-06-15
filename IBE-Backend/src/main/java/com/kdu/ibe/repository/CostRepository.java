package com.kdu.ibe.repository;

import com.kdu.ibe.entity.bookings.CostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CostRepository extends JpaRepository<CostEntity,Long> {

}
