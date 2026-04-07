package com.klu.sdp36BE.controller;

import com.klu.sdp36BE.model.Resource;
import com.klu.sdp36BE.service.ResourceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/resources")
public class ResourceController {

    private final ResourceService service;

    public ResourceController(ResourceService service) {
        this.service = service;
    }
    
    @PutMapping("/{id}")
    public Resource update(@PathVariable Long id, @RequestBody Resource r) {
        r.setId(id);
        return service.addResource(r);
    }
    
    @GetMapping
    public List<Resource> getAll() {
        return service.getAllResources();
    }

    @PostMapping
    public Resource add(@RequestBody Resource r) {
        return service.addResource(r);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteResource(id);
    }
}