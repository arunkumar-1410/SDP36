package com.klu.sdp36BE.controller;

import com.klu.sdp36BE.model.Program;
import com.klu.sdp36BE.service.ProgramService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/programs")
public class ProgramController {

    private final ProgramService service;

    public ProgramController(ProgramService service) {
        this.service = service;
    }
    
    @PutMapping("/{id}")
    public Program update(@PathVariable Long id, @RequestBody Program p) {
        p.setId(id);
        return service.addProgram(p);
    }

    @GetMapping
    public List<Program> getAll() {
        return service.getAllPrograms();
    }

    @PostMapping
    public Program add(@RequestBody Program p) {
        return service.addProgram(p);
    }
}