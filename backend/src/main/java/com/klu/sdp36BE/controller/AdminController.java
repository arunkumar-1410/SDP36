package com.klu.sdp36BE.controller;

import com.klu.sdp36BE.model.*;
import com.klu.sdp36BE.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private UserEnrollmentRepository enrollmentRepository;

    @Autowired
    private UserResourceHistoryRepository historyRepository;

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        long totalUsers = userRepository.count();
        long totalPrograms = programRepository.count();
        long totalResources = resourceRepository.count();

        // Very basic way to get most enrolled program
        List<Program> programs = programRepository.findAll();
        Program mostEnrolled = programs.stream()
                .max(Comparator.comparingLong(p -> enrollmentRepository.countByProgram(p)))
                .orElse(null);

        // Very basic way to get most accessed resource
        List<Resource> resources = resourceRepository.findAll();
        Resource mostAccessed = resources.stream()
                .max(Comparator.comparingLong(r -> historyRepository.countByResource(r)))
                .orElse(null);

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("totalPrograms", totalPrograms);
        stats.put("totalResources", totalResources);
        
        if (mostEnrolled != null) {
            stats.put("mostEnrolledProgram", Map.of(
                "title", mostEnrolled.getTitle(),
                "enrollmentCount", enrollmentRepository.countByProgram(mostEnrolled)
            ));
        }
        
        if (mostAccessed != null) {
            stats.put("mostAccessedResource", Map.of(
                "title", mostAccessed.getTitle(),
                "accessCount", historyRepository.countByResource(mostAccessed)
            ));
        }

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll().stream().map(this::getUserDetailMap).collect(Collectors.toList()));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserDetail(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(getUserDetailMap(user));
    }

    private Map<String, Object> getUserDetailMap(User user) {
        List<UserEnrollment> enrollments = enrollmentRepository.findByUser(user);
        List<UserResourceHistory> history = historyRepository.findByUser(user);

        Map<String, Object> m = new HashMap<>();
        m.put("id", user.getId());
        m.put("name", user.getName());
        m.put("email", user.getEmail());
        m.put("role", user.getRole());
        m.put("totalEnrolled", enrollments.size());
        m.put("totalResourcesAccessed", history.size());
        
        m.put("enrolledPrograms", enrollments.stream().map(e -> Map.of(
            "title", e.getProgram().getTitle(),
            "enrolledAt", e.getEnrolledAt()
        )).collect(Collectors.toList()));
        
        m.put("resourceHistory", history.stream().map(h -> Map.of(
            "title", h.getResource().getTitle(),
            "accessedAt", h.getAccessedAt()
        )).collect(Collectors.toList()));
        
        return m;
    }
}
