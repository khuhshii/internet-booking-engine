package com.kdu.ibe.repository;

import com.kdu.ibe.entity.GuestUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestUserRepository extends JpaRepository<GuestUserEntity,Long> {
}
