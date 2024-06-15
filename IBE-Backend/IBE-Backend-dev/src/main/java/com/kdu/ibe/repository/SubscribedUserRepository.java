package com.kdu.ibe.repository;

import com.kdu.ibe.entity.bookings.SubscribedUsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscribedUserRepository extends JpaRepository<SubscribedUsersEntity,Long> {
    List<SubscribedUsersEntity> findByEmail(String email);
}
