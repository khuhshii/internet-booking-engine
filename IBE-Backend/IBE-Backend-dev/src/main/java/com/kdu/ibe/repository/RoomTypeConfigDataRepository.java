package com.kdu.ibe.repository;

import com.kdu.ibe.entity.RoomTypeAmenitiesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomTypeConfigDataRepository extends JpaRepository<RoomTypeAmenitiesEntity,String> {
}
