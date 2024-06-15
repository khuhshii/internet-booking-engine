package com.kdu.ibe.repository;

import com.kdu.ibe.entity.TokenValidatorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenValidatorRepository extends JpaRepository<TokenValidatorEntity,String> {
}
