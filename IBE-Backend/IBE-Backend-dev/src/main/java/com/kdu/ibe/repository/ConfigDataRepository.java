package com.kdu.ibe.repository;

import com.kdu.ibe.entity.ConfigDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for accessing and managing ConfigDataEntity objects in the database.
 */
public interface ConfigDataRepository extends JpaRepository<ConfigDataEntity, String> {
}
