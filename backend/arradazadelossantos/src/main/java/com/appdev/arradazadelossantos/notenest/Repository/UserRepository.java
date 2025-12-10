package com.appdev.arradazadelossantos.notenest.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.appdev.arradazadelossantos.notenest.Entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);
}
