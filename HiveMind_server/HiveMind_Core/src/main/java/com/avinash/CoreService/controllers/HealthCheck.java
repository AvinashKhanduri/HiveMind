package com.avinash.CoreService.controllers;

import com.avinash.CoreService.repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequestMapping("/healthCheck")
@RestController
@CrossOrigin(origins = "*")
public class HealthCheck {

    @Autowired
    private UserRepository userRepository;



    @GetMapping
    public ResponseEntity<?> healthCheck() throws InterruptedException {
        Thread.sleep(2000);
        return ResponseEntity.ok("Every this is working fine") ;
    }




}
