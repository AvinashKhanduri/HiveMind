package com.avinash.HiveMind.controllers;

import com.avinash.HiveMind.models.User;
import com.avinash.HiveMind.repositorys.UserRepository;
import com.avinash.HiveMind.response.user.SearchUserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<List<SearchUserResponse>> getAllUsers() {
        List<User> users = userRepository.findAll();  // Assuming `findAll()` fetches all users

        List<SearchUserResponse> response = users.stream()
                .map(user -> new SearchUserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getUniversity(),
                        user.getSkills(),  // Assuming this is a List<String>
                        user.getProfilePictureUrl()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }


}
