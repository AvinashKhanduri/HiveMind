package com.avinash.HiveMind.controllers;

import com.avinash.HiveMind.dto.team.JoinTeamRequestDto;
import com.avinash.HiveMind.dto.user.ConnectionDto;
import com.avinash.HiveMind.dto.user.ConnectionRequestResponseDto;
import com.avinash.HiveMind.dto.user.UpdateUserDto;
import com.avinash.HiveMind.services.NotificationService;
import com.avinash.HiveMind.services.user.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserServices userServices;




    @PostMapping("/searchUsers/{skill}")
    public ResponseEntity<?> searchUsers(@PathVariable String skill){
        return userServices.findUserBySkill(skill);
    }

    @PostMapping("/sendConnectionRequest")
    public ResponseEntity<?> sendConnectionRequest(@RequestBody ConnectionDto connectionDto){
        try {
            return ResponseEntity.ok(userServices.sendConnectionRequest(connectionDto));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/get-connection-requests")
    public ResponseEntity<?> getConnectionRequest(){
        return ResponseEntity.ok(userServices.getConnectionRequest());
    }


    @PutMapping("/handle-connection-request")
    public  ResponseEntity<?> handleConnectionRequest(
            @RequestBody ConnectionRequestResponseDto connectionRequestResponseDto){
        try {
            return userServices.handleConnectionRequest(connectionRequestResponseDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("/join-team-request")
    public ResponseEntity<?> joinTeamRequest(@RequestBody JoinTeamRequestDto joinTeamRequestDto){
        return userServices.joinTeamRequest(joinTeamRequestDto);
    }




    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateUserDto updateUserDto){
        return userServices.updateProfile(updateUserDto);
    }

    @PutMapping("/leave-team")
    public ResponseEntity<?> leaveTeam(){
        return userServices.leaveTeam();
    }


    @PostMapping("/upload-profile-picture")
    public ResponseEntity<?> uploadProfilePicure(@RequestBody MultipartFile image){
        try{
            return userServices.uploadProfilePicture(image);
        }catch (IOException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/delete-profile-picture")
    public ResponseEntity<?> deleteProfilePicute(@RequestBody MultipartFile image){

            return userServices.deleteProfilePicture();

    }



}
