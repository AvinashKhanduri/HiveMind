package com.avinash.CoreService.services.team;

import com.avinash.CoreService.dto.team.*;
import com.avinash.CoreService.kafka.NotificationProducer;
import com.avinash.CoreService.models.*;
import com.avinash.CoreService.repositorys.*;
import com.avinash.CoreService.response.team.TeamMembersResponse;
import com.avinash.CoreService.utils.Emails;
import com.avinash.CoreService.utils.Support;

import notification.NotificationEvent;
import notification.NotificationStatus;
import notification.NotificationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ManageTeam {

    @Autowired
    private Support support;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private Emails emails;

    @Autowired
    private ConnectionRepository connectionRepository;

    @Autowired
    private NotificationProducer notificationProducer;

    @Autowired
    private TeamRepository teamRepository;





    public ResponseEntity<?> giveTask(AssignTaskDto assignTaskDto) {
        User user = userRepository.findById(assignTaskDto.getId());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User teamLeader = userRepository.findByUserName(authentication.getName());

        Team myTeam = teamLeader.getTeam();
        List<User> teamMembers = myTeam.getTeamMembers();

        if(user!=null  ){
            Task task = new Task();
            task.setTaskStatus(Task.TaskStatus.TO_DO);
            task.setFromTeam(myTeam);
            task.setToUser(user);
            task.setTitle(assignTaskDto.getTitle());
            task.setDescription(assignTaskDto.getDescription());
            task.setDeadLine(assignTaskDto.getDeadLine());
            taskRepository.createTask(task);

            NotificationEvent notification = NotificationEvent.newBuilder()
                    .setFrom(teamLeader.getId())
                    .setTo(user.getId())
                    .setTitle(assignTaskDto.getTitle())
                    .setMessage(assignTaskDto.getDescription())
                    .setReceiverEmail(user.getEmail())
                    .setSenderEmail(teamLeader.getEmail())
                    .setType(NotificationType.valueOf("TASK_NOTIFICATION"))
                    .setSenderName(teamLeader.getName())
                    .setReceiverName(user.getName())
                    .setStatus(NotificationStatus.valueOf("UNWATCHED"))
                    .build();

            notificationProducer.sendEvent(notification);
            user.getNotifications().add(notification);
            user.setTasks(List.of(task));
            userRepository.saveUser(user);

            return ResponseEntity.ok("Task assigned successfully");
        }
        throw  new RuntimeException("user not found or user is not a member of your team anymore");
    }


    public ResponseEntity<?> updateTaskStatus(UpdateTaskDto updateTaskDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User teamLeader = userRepository.findByUserName(authentication.getName());
        User to = userRepository.findById(updateTaskDto.getUserId());

        if (teamLeader == null || to == null) {
            if (teamLeader == null) {
                return ResponseEntity.badRequest().body("Team leader not found");
            }
            if (to == null) {
                return ResponseEntity.badRequest().body("Team member not found");
            }
        }

        Task task = taskRepository.getTaskById(updateTaskDto.getTaskId());
        if (task == null) {
            return ResponseEntity.badRequest().body("Task not found");
        }

        // **Manually check and update only non-null fields**
        if (updateTaskDto.getTaskStatus() != null) {
            task.setTaskStatus(updateTaskDto.getTaskStatus());
        }
        if (updateTaskDto.getTitle() != null) {
            task.setTitle(updateTaskDto.getTitle());
        }
        if (updateTaskDto.getDescription() != null) {
            task.setDescription(updateTaskDto.getDescription());
        }
        if (updateTaskDto.getDeadLine() != null) {
            task.setDeadLine(updateTaskDto.getDeadLine());
        }

        task.setUpdatedAt(LocalDateTime.now());  // Always update timestamp
        taskRepository.createTask(task);

        NotificationEvent notification = NotificationEvent.newBuilder()
                .setFrom(teamLeader.getId())
                .setTo(to.getId())
                .setTitle(updateTaskDto.getTitle())
                .setMessage(updateTaskDto.getDescription())
                .setReceiverEmail(to.getEmail())
                .setSenderEmail(teamLeader.getEmail())
                .setType(NotificationType.valueOf("TASK_NOTIFICATION"))
                .setSenderName(teamLeader.getName())
                .setReceiverName(to.getName())
                .setStatus(NotificationStatus.valueOf("UNWATCHED"))
                .build();

        notificationProducer.sendEvent(notification);

        return ResponseEntity.ok("Task updated successfully");
    }



    public ResponseEntity<?> getMyTeamMembers() {
       try{
           Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
           System.out.println(SecurityContextHolder.getContext().getAuthentication().getName());
           User teamLeader = userRepository.findByEmail(authentication.getName());
           System.out.println(teamLeader.getName());

           Team myTeam = teamLeader.getTeam();
           List<TeamMembersResponse> teamMembers = myTeam.getTeamMembers().stream().map(teamMember ->
                   new TeamMembersResponse(
                           teamMember.getId(),
                           teamMember.getName(),
                           teamMember.getPhoneNumber(),
                           teamMember.getEmail()
//                           teamMember.getSkills()
                   )
           ).toList();
           return ResponseEntity.ok().body(teamMembers);
       }
       catch (NullPointerException e){
           return ResponseEntity.ok("No members");
       }
    }


    public ResponseEntity<?> inviteNewMember(InviteMemberDto inviteMemberDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User from = userRepository.findByUserName(authentication.getName());
        User to = userRepository.findById(inviteMemberDto.getTo());

        if(from==null || to==null){
            if(from==null){
                return ResponseEntity.badRequest().body("sender not found");
            }
            return ResponseEntity.badRequest().body("Receiver not found");
        }

        if(to.getRoles().contains(User.UserRole.TEAM_LEADER)){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(to.getName()+" is already a team leader");
        }

        ConnectionRequest connectionRequest = new ConnectionRequest();

        connectionRequest.setStatus(ConnectionRequest.Status.PENDING);
        connectionRequest.setTo(to);
        connectionRequest.setFrom(from);
        connectionRequest.setType(ConnectionRequest.ConnectionRequestType.TEAM_REQUEST);
        connectionRepository.createConnectionRequest(connectionRequest);



        NotificationEvent notification = NotificationEvent.newBuilder()
                .setFrom(from.getId())
                .setTo(to.getId())
                .setTitle("You have an invitation from "+ from.getTeam().getName())
                .setMessage(inviteMemberDto.getMessage())
                .setReceiverEmail(to.getEmail())
                .setSenderEmail(from.getEmail())
                .setType(NotificationType.valueOf("CONNECTION_REQUEST"))
                .setSenderName(from.getName())
                .setReceiverName(to.getName())
                .setStatus(NotificationStatus.valueOf("UNWATCHED"))
                .build();

        notificationProducer.sendEvent(notification);
        to.getConnectionRequests().add(connectionRequest);
        userRepository.saveUser(to);
        return ResponseEntity.ok("Invitation sent successfully");

    }

    public ResponseEntity<?> handleNewMemberRequest(HandleNewMemberRequestDto handleNewMemberRequestDto) {
        ConnectionRequest connectionRequest = connectionRepository.findConnectionRequestById(handleNewMemberRequestDto.getRequestId());
        User from = connectionRequest.getFrom();

        // **Retrieve logged-in user only once**
        String loggedInUserName = SecurityContextHolder.getContext().getAuthentication().getName();
        User teamLeader = userRepository.findByUserName(loggedInUserName);
        Team team = teamLeader.getTeam();
        Team newTeam = teamLeader.getTeam();

        System.out.println("This request is from ---> " + from.getName());
        System.out.println("Team leader is-->"+teamLeader.getName());

        if (connectionRequest.getStatus().equals(ConnectionRequest.Status.ACCEPTED) ||
                connectionRequest.getStatus().equals(ConnectionRequest.Status.REJECTED)) {
            return ResponseEntity.badRequest().body("Request already processed");
        }

        if (connectionRequest.getType().equals(ConnectionRequest.ConnectionRequestType.JOIN_TEAM) &&
                handleNewMemberRequestDto.getStatus().equals(ConnectionRequest.Status.ACCEPTED.toString())) {

            System.out.println("exicution is inside accepted if statement");

            if (from.getTeam() != null) {
                System.out.println("execution is inside if user team is not null");
                teamRepository.deleteTeamMemberById(from.getId(), from.getTeam());
                System.out.println("user team deleted from it's previes team");
            }
            System.out.println("execution is outside of if statement where user team was not null");

            from.setTeam(null);
            from.getTasks().clear();
            from.getRoles().clear();

            System.out.println("from team and task and roles deleted");

            from.getRoles().add(User.UserRole.TEAM_MEMBER);
            from.setTeam(team);

            newTeam.getTeamMembers().add(from);
            teamRepository.createTeam(team);

            System.out.println("new roles and team added to "+ from.getName());
            userRepository.saveUser(from);
            userRepository.saveUser(teamLeader);



            connectionRequest.setStatus(ConnectionRequest.Status.ACCEPTED);
            connectionRepository.createConnectionRequest(connectionRequest);

//            notificationService.notifiyUser(from.getId(),"Your are now member of  team "+teamLeader.getTeam().getName());
            NotificationEvent notification = NotificationEvent.newBuilder()
                    .setType(NotificationType.valueOf("CONNECTION_REQUEST_ACCEPTED"))
                    .setMessage(from.getName()+" accepted your connection request")
                    .setFrom(connectionRequest.getFrom().getId()+" accepted your invitation")
                    .build();
            notificationProducer.sendEvent(notification);

            return ResponseEntity.ok(from.getName() + " is now a member of your team");
        }

        if (connectionRequest.getType().equals(ConnectionRequest.ConnectionRequestType.JOIN_TEAM) ||
                handleNewMemberRequestDto.getStatus().equals(ConnectionRequest.Status.REJECTED.toString())) {

            connectionRequest.setStatus(ConnectionRequest.Status.REJECTED);
            connectionRepository.createConnectionRequest(connectionRequest);


            userRepository.saveUser(teamLeader);

            return ResponseEntity.ok("Your response has been submitted successfully");
        }

        return ResponseEntity.badRequest().body("Something went wrong");
    }


    public ResponseEntity<?> updateTeam(UpdateTeamDto updateTeamDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User teamLeader = userRepository.findByUserName(authentication.getName());

        if (teamLeader == null || teamLeader.getTeam() == null ||
                !teamLeader.getRoles().contains(User.UserRole.TEAM_LEADER)) {
            return ResponseEntity.badRequest().body("Unauthorized or team not found");
        }

        Team team = teamLeader.getTeam();

        // **Manually check and update only non-null fields**
        if (updateTeamDto.getTeamName() != null) {
            team.setName(updateTeamDto.getTeamName());
        }
        if (updateTeamDto.getTeamStatus() != null) {
            team.setTeamStatus(updateTeamDto.getTeamStatus());
        }
        if (updateTeamDto.getAboutTeam() != null) {
            team.setAboutTeam(updateTeamDto.getAboutTeam());
        }

        team.setUpdatedAt(LocalDateTime.now());  // Always update timestamp
        teamRepository.createTeam(team);

        return ResponseEntity.ok("Team info updated successfully");
    }


    public ResponseEntity<?> passLeaderShip(String to) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User teamLeader = userRepository.findByUserName(authentication.getName());
        User newLeader = userRepository.findById(to);

        if (teamLeader == null || newLeader == null) {
            return ResponseEntity.badRequest().body(teamLeader == null ? "Leader not found" : "Target user not found");
        }

        Team team = teamLeader.getTeam();

        // **Check if newLeader is a part of the team using ID comparison**
        boolean isMember = team.getTeamMembers().stream()
                .anyMatch(member -> member.getId().equals(newLeader.getId()));

        if (isMember) {
            teamLeader.getRoles().clear();
            teamLeader.getRoles().add(User.UserRole.TEAM_MEMBER);

            newLeader.getRoles().clear();
            newLeader.getRoles().add(User.UserRole.TEAM_LEADER);



            userRepository.saveUser(teamLeader);
            userRepository.saveUser(newLeader);

            team.setTeamAdmin(newLeader);
            teamRepository.createTeam(team);

            return ResponseEntity.ok("Leadership passed successfully");
        }

        return ResponseEntity.badRequest().body(newLeader.getName() + " is not in your team");
    }


    public ResponseEntity<?> kickOutMember(KickoutMemberDto kickoutMemberDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Team team = userRepository.findByUserName(authentication.getName()).getTeam();
        User targetUser = userRepository.findById(kickoutMemberDto.getId());
        if(!team.getTeamMembers().contains(targetUser)){
            return ResponseEntity.badRequest().body(targetUser.getName()+" is not in your team");
        }

        teamRepository.deleteTeamMemberById(targetUser.getId(),targetUser.getTeam());

        targetUser.setTeam(null);
        targetUser.getRoles().clear();
        targetUser.getTasks().clear();
        userRepository.saveUser(targetUser);


        return ResponseEntity.ok(targetUser.getName()+" successfully removed from you team");
    }


}
