package com.kdu.ibe.repository;

import com.kdu.ibe.entity.bookings.LogInUsers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogInUsersRepository extends JpaRepository<LogInUsers,String> {
}
