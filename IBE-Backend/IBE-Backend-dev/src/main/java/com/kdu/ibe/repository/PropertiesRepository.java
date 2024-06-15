package com.kdu.ibe.repository;

import com.kdu.ibe.entity.Properties;
import org.springframework.data.jpa.repository.JpaRepository;


/**
 * Repository interface for accessing and managing Properties entities in the database.
 */
public interface PropertiesRepository extends JpaRepository<Properties,Integer> {
}
