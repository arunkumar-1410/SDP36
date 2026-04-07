package com.klu.sdp36BE.repository;

import com.klu.sdp36BE.model.Resource;
import com.klu.sdp36BE.model.User;
import com.klu.sdp36BE.model.UserResourceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserResourceHistoryRepository extends JpaRepository<UserResourceHistory, Long> {
    List<UserResourceHistory> findByUser(User user);
    long countByResource(Resource resource);
}
