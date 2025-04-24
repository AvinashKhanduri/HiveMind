package com.avinash.HiveMind.controllers;

import com.avinash.HiveMind.dto.team.*;
import com.avinash.HiveMind.models.User;
import com.avinash.HiveMind.repositorys.UserRepository;
import com.avinash.HiveMind.services.team.ManageTeam;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/team")
public class TeamController {

    @Autowired
    private ManageTeam manageTeam;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/get-members")
    public ResponseEntity<?> getTeamMembers(){
        return manageTeam.getMyTeamMembers();
    }

    @PostMapping("/assign-task")
    public ResponseEntity<?> assignTask(@RequestBody AssignTaskDto assignTaskDto){
        try {
            return ResponseEntity.ok(manageTeam.giveTask(assignTaskDto));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/invite")
    public ResponseEntity<?> inviteTeamMember(@RequestBody InviteMemberDto inviteMemberDto){
        return manageTeam.inviteNewMember(inviteMemberDto);
    }

    @PutMapping("/change-leader")
    public ResponseEntity<?> changeLeader(@RequestBody ChangeLeaderDto changeLeaderDto){
                return manageTeam.passLeaderShip(changeLeaderDto.getId());
        }


    @PutMapping("/update-team-info")
    public ResponseEntity<?> updateTeamInfo(@RequestBody UpdateTeamDto updateTeamDto){
        return manageTeam.updateTeam(updateTeamDto);
    }

    @PutMapping("/kick-out-member")
    public ResponseEntity<?> kickOutTeamMember(@RequestBody KickoutMemberDto kickoutMemberDto){
        return manageTeam.kickOutMember(kickoutMemberDto);
    }


    @PutMapping("/update-task")
    public ResponseEntity<?> updateTask(@RequestBody UpdateTaskDto updateTaskDto){
        return manageTeam.updateTaskStatus(updateTaskDto);
    }

    @PutMapping("/handle-new-member-request")
    public ResponseEntity<?> handleNewMemberRequest(@RequestBody HandleNewMemberRequestDto handleNewMemberRequestDto){
        return manageTeam.handleNewMemberRequest(handleNewMemberRequestDto);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(){
        User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.ok(user);

    }



}
