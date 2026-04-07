package com.klu.sdp36BE.service;

import com.klu.sdp36BE.model.User;
import com.klu.sdp36BE.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository repo;

    public AuthService(UserRepository repo) {
        this.repo = repo;
    }

    public User signup(User user) {
        return repo.save(user);
    }

    public User login(User user) {
        Optional<User> u = repo.findByEmail(user.getEmail());

        if (u.isPresent() && u.get().getPassword().equals(user.getPassword())) {
            return u.get();
        }
        return null;
    }
}