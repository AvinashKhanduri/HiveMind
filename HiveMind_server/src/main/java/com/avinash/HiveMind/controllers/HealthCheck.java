package com.avinash.HiveMind.controllers;

import com.avinash.HiveMind.repositorys.UserRepository;
import com.avinash.HiveMind.services.NotificationService;
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

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public ResponseEntity<?> healthCheck() throws InterruptedException {
        Thread.sleep(2000);
        return ResponseEntity.ok("Every this is working fine") ;
    }


    @GetMapping("/subscribe/{userId}")
    public SseEmitter subscribe(@PathVariable String userId) {
        return notificationService.subscribe(userId);
    }

}
