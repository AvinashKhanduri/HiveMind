package com.avinash.CoreService.services.user;


import com.avinash.CoreService.dto.authentication.*;
import com.avinash.CoreService.dto.team.JoinTeamRequestDto;
import com.avinash.CoreService.dto.user.ConnectionDto;
import com.avinash.CoreService.dto.user.ConnectionRequestResponseDto;
import com.avinash.CoreService.dto.user.UpdateUserDto;
import com.avinash.CoreService.kafka.NotificationProducer;
import com.avinash.CoreService.models.ConnectionRequest;
import com.avinash.CoreService.models.Team;
import com.avinash.CoreService.models.User;
import com.avinash.CoreService.repositorys.ConnectionRepository;
import com.avinash.CoreService.repositorys.TeamRepository;
import com.avinash.CoreService.repositorys.UserRepository;
import com.avinash.CoreService.response.authentication.LoginResponse;
import com.avinash.CoreService.response.authentication.RegisterResponse;
import com.avinash.CoreService.response.user.*;
import com.avinash.CoreService.services.CloudinaryService;
import com.avinash.CoreService.utils.Emails;
import com.avinash.CoreService.utils.JwtServices;
import com.avinash.CoreService.utils.Support;

import jakarta.servlet.http.HttpServletResponse;
import notification.NotificationEvent;
import notification.NotificationStatus;
import notification.NotificationType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
public class UserServices {
    private static final Logger log = LoggerFactory.getLogger(UserServices.class);
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ConnectionRepository connectionRepository;
    @Autowired
    private NotificationProducer notificationProducer;

    @Autowired
    private Support support;

    @Autowired
    private Emails emails;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtServices jwtServices;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Value("${jwt.cookieExpiry}")
    private String cookieExpiry;

    public ResponseEntity<?> findUserBySkill(String skill) {
        if (userRepository.findUserBySkills(skill).isEmpty()) {
            return ResponseEntity.ok("No user found");
        }
        List<User> users = userRepository.findUserBySkills(skill);
        List<SearchUserResult> results = users.stream().map(user ->
                new SearchUserResult(user.getName(), user.getEmail(), user.getId())).toList();
        return ResponseEntity.ok(List.of(results));
    }


    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    public ResponseEntity<?> getConnectionRequest(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserName(authentication.getName());
        List<MyRequestResponse> response = user.getConnectionRequests().stream().map(request->
                new MyRequestResponse(
                        request.getId().toString(),
                        request.getFrom().getId(),
                        request.getTo().getId(),
                        request.getStatus().toString(),
                        request.getRequestTime()
                )
        ).toList();
        return ResponseEntity.ok(response);
    }


    public ResponseEntity<?> sendConnectionRequest(ConnectionDto connectionDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User from = userRepository.findByEmail(authentication.getName());
        System.out.println("sender id --> " + from.getId());
        User to = userRepository.findById(connectionDto.getTo());
        System.out.println("receiver id -> " + to.getId());

        ConnectionRequest connectionRequest = new ConnectionRequest();
        ConnectionRequestResponse response = new ConnectionRequestResponse();

        if (from == null || to == null) {
            if (from == null) {
                return ResponseEntity.badRequest().body("Can't find sender");
            }
            if (to == null) {
                return ResponseEntity.badRequest().body("Can't find receiver");
            }
        }

        if(from.getRoles().contains(User.UserRole.TEAM_LEADER)){
            return ResponseEntity.badRequest().body(from.getName()+" you are a team leader you can invite someone as team invitation not as user");
        }

        if(to.getRoles().contains(User.UserRole.TEAM_LEADER)){
        return ResponseEntity.badRequest().body(to.getName()+" is a team leader");
         }



        // Create the connection request
        connectionRequest.setFrom(from);
        connectionRequest.setTo(to);
        connectionRequest.setStatus(ConnectionRequest.Status.PENDING);
        connectionRequest.setType(ConnectionRequest.ConnectionRequestType.USER_REQUEST);
        to.getConnectionRequests().add(connectionRequest);
        connectionRepository.createConnectionRequest(connectionRequest);

        // Create and save the notification
        NotificationEvent notification = NotificationEvent.newBuilder()
                .setFrom(from.getId())
                .setTo(to.getId())
                .setTitle("You have received a connection request from " + from.getName())
                .setMessage(" ")
                .setReceiverEmail(to.getEmail())
                .setSenderEmail(from.getEmail())
                .setType(NotificationType.valueOf("CONNECTION_REQUEST"))
                .setSenderName(from.getName())
                .setReceiverName(from.getName())
                .setStatus(NotificationStatus.valueOf("UNWATCHED"))
                .build();

        notificationProducer.sendEvent(notification);
        to.getNotifications().add(notification);
        // Save the updated User object
        userRepository.saveUser(to);

        // Prepare the response
        response.setTitle(notification.getTitle());
        response.setMessage(notification.getMessage());
        response.setStatus(notification.getStatus().toString());
        response.setTime(support.getFormatedTime(LocalDateTime.now()));
        response.setType(notification.getType().toString());

        return ResponseEntity.ok(response);
    }


    public ResponseEntity<?> handleConnectionRequest(
            ConnectionRequestResponseDto connectionRequestResponseDto
    ) {
        ConnectionRequest connectionRequest = connectionRepository.findConnectionRequestById(connectionRequestResponseDto.getId());

        if (connectionRequest == null) {
            throw new RuntimeException("Connection request not found");
        }

        // Ensure proper comparison of status with enum names
        if (connectionRequest.getStatus().name().equals("REJECTED") ||
                connectionRequest.getStatus().name().equals("ACCEPTED")) {
            throw new RuntimeException("Request already processed");
        }



        // Handle ACCEPTED status for USER_REQUEST type
        if (connectionRequestResponseDto.getStatus().equals(ConnectionRequest.Status.ACCEPTED.name())
                && connectionRequest.getType().equals(ConnectionRequest.ConnectionRequestType.USER_REQUEST)) {

            connectionRequest.setStatus(ConnectionRequest.Status.ACCEPTED);
            connectionRepository.createConnectionRequest(connectionRequest);

//            UserResource keyCloakUser = getUsersResources().get(connectionRequest.getFrom().getId());

            Team team = new Team();
            team.setTeamAdmin(connectionRequest.getFrom());
            team.getTeamMembers().add(connectionRequest.getFrom());
            team.getTeamMembers().add(connectionRequest.getTo());
            team.setName(connectionRequest.getFrom().getName());
            team.setTeamStatus(Team.TeamStatus.ACTIVE);
            emails.sendTeamCreationMailToRequest(connectionRequest.getFrom(), connectionRequest.getTo());
            teamRepository.createTeam(team);



            User from = connectionRequest.getFrom();
            User to = connectionRequest.getTo();

            if(from.getTeam() != null || to.getTeam() != null){

                if(from.getTeam()!=null){
                    teamRepository.deleteTeamMemberById(from.getId(),from.getTeam());
                }

                if (to.getTeam()!=null){
                    teamRepository.deleteTeamMemberById(to.getId(),to.getTeam());
                }
                from.setTeam(null);
                from.getRoles().clear();
                from.getRoles().add(User.UserRole.TEAM_LEADER);
                from.setTeam(team);

                to.setTeam(null);
                to.getRoles().clear();
                to.getRoles().add(User.UserRole.TEAM_MEMBER);
                to.setTeam(team);

                userRepository.saveUser(from);
                userRepository.saveUser(to);

                TeamCreationResponse response = new TeamCreationResponse();
                response.setTeamLeader(team.getTeamAdmin().getName());
                response.setTeamName(team.getName());
                response.setTeamMembers(team.getTeamMembers().stream().map(User::getName).toList());
                response.setMessage("Team created successfully");

                  NotificationEvent notification = NotificationEvent.newBuilder()
                          .setType(NotificationType.valueOf("CONNECTION_REQUEST_ACCEPTED"))
                          .setMessage(to.getName()+" accepted your connection request")
                          .setFrom(from.getId())
                          .build();
                  notificationProducer.sendEvent(notification);

                return ResponseEntity.ok(response);
            }




            to.setTeam(team);
            to.getRoles().add(User.UserRole.TEAM_MEMBER);
            from.getRoles().add(User.UserRole.TEAM_LEADER);
            from.setTeam(team);
            userRepository.saveUser(to);
            userRepository.saveUser(from);



            userRepository.saveUser(connectionRequest.getTo());


            TeamCreationResponse response = new TeamCreationResponse();
            response.setTeamLeader(team.getTeamAdmin().getName());
            response.setTeamName(team.getName());
            response.setTeamMembers(team.getTeamMembers().stream().map(User::getName).toList());
            response.setMessage("Team created successfully");

            return ResponseEntity.ok(response);
        }

        // Handle ACCEPTED status for TEAM_REQUEST type
        if (connectionRequestResponseDto.getStatus().equals(ConnectionRequest.Status.ACCEPTED.name())
                && connectionRequest.getType().equals(ConnectionRequest.ConnectionRequestType.TEAM_REQUEST)) {
            connectionRequest.setStatus(ConnectionRequest.Status.ACCEPTED);
            connectionRepository.createConnectionRequest(connectionRequest);

            Team team = connectionRequest.getFrom().getTeam();
            User to = connectionRequest.getTo();
            to.setTeam(null);
            to.setTeam(team);
            to.getRoles().clear();
            to.getRoles().add(User.UserRole.TEAM_MEMBER);




            userRepository.saveUser(to);


            team.getTeamMembers().add(to);
            teamRepository.createTeam(team);
            NotificationEvent notification = NotificationEvent.newBuilder()
                    .setType(NotificationType.valueOf("CONNECTION_REQUEST_ACCEPTED"))
                    .setMessage(to.getName()+" accepted your connection request")
                    .setFrom(connectionRequest.getFrom().getId()+" accepted your invitation")
                    .build();
            notificationProducer.sendEvent(notification);
            return ResponseEntity.ok("You are now a member of team " + team.getName());
        }



        // Handle REJECTED status
        if (connectionRequestResponseDto.getStatus().equals(ConnectionRequest.Status.REJECTED.name())) {
            connectionRequest.setStatus(ConnectionRequest.Status.REJECTED);
            connectionRepository.createConnectionRequest(connectionRequest);

            return ResponseEntity.ok("Your response has been submitted successfully");
        }

        return ResponseEntity.badRequest().body("Something went wrong");
    }



    public ResponseEntity<?> registerUser(RegisterUserDto registerUserDto){
        User user = new User();
        String code = emails.generateVerificationCode();
        user.setName(registerUserDto.getUsername());
        user.setFirstName(registerUserDto.getFirstName());
        user.setLastName(registerUserDto.getLastName());
        user.setPhoneNumber(registerUserDto.getPhoneNumber());
        user.setEmail(registerUserDto.getEmail());
        user.setEnable(false);
        user.setPassword(passwordEncoder.encode(registerUserDto.getPassword()));
        user.setVerificationCode(code);
        user.setVerificationCodeExpireAt(LocalDateTime.now().plusMinutes(5));
        userRepository.saveUser(user);

        NotificationEvent notification = NotificationEvent.newBuilder()
                .setType(NotificationType.valueOf("AUTH"))
                .setMessage(code)
                .setReceiverEmail(user.getEmail())
                .build();
        notificationProducer.sendEvent(notification);


        RegisterResponse response = new RegisterResponse(
                user.getName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.isEnable(),
                support.getFormatedTime(user.getVerificationCodeExpireAt()),
                "User created successfully"

        );
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> activateAccountRequest(VerifyUserDto verifyUserDto) {
        User user = userRepository.findByEmail(verifyUserDto.getEmail());

        if (user != null && !user.isEnable() && user.getVerificationCodeExpireAt().isAfter(LocalDateTime.now()) && Objects.equals(user.getVerificationCode(), verifyUserDto.getVerificationCode())) {

//           userRepository.updateUserForActivateAccount(user);
            user.setVerificationCode(null);
            user.setVerificationCodeExpireAt(null);
            user.setEnable(true);
            userRepository.saveUser(user);



            return ResponseEntity.ok("Your account has been successfully activated");
        }

        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<?> resendVerificationCode(String email){
        User user = userRepository.findByEmail(email);
        if(user.isEnable()){
            return ResponseEntity.badRequest().body("Account is already Activated");
        }
        String newCode = emails.generateVerificationCode();
        user.setVerificationCode(newCode);
        user.setVerificationCodeExpireAt(LocalDateTime.now().plusMinutes(5));
        userRepository.saveUser(user);

        NotificationEvent notification = NotificationEvent.newBuilder()
                .setType(NotificationType.valueOf("AUTH"))
                .setMessage(newCode)
                .setReceiverEmail(user.getEmail())
                .build();
        notificationProducer.sendEvent(notification);
        return ResponseEntity.ok("A code has been sent to your email "+user.getEmail());
    }

    public ResponseEntity<?> sendResetPasswordRequest(@RequestBody PasswordEmailDto passwordEmailDto){
        User user = userRepository.findByEmail(passwordEmailDto.getEmail());
        if(user!=null && user.isEnable()){
            String otp = emails.generateVerificationCode();
            user.setResetPasswordCode(otp);
            userRepository.saveUser(user);
//            emails.sendPasswordResetOtpMail(user,otp);
            NotificationEvent notification = NotificationEvent.newBuilder()
                    .setType(NotificationType.valueOf("PASSWORD_RESET"))
                    .setMessage(otp)
                    .setReceiverEmail(user.getEmail())
                    .build();
            notificationProducer.sendEvent(notification);
            return ResponseEntity.ok("An email has been sent to your account");
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<?> updatePassword(@RequestBody ResetPasswordDto resetPasswordDto){
        User user  = userRepository.findByPasswordResetOtp(resetPasswordDto.getOtp());
        if(user!=null){
            user.setPassword(null);
            user.setPassword(passwordEncoder.encode(resetPasswordDto.getNewPassword()));
            user.setResetPasswordCode(null);
            userRepository.saveUser(user);
            return ResponseEntity.ok("Password updated successfully");
        }
        return ResponseEntity.badRequest().body("user not found");
    }


    public ResponseEntity<?> login(LoginUserDto loginUserDto, HttpServletResponse httpServletResponse){
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginUserDto.getEmail(),loginUserDto.getPassword())
            );

            User user = userRepository.findByEmail(loginUserDto.getEmail());
            String jwtToken = jwtServices.generateToken(user);
            String refreshToken = jwtServices.generateRefresh(new HashMap<>(),user);

            ResponseCookie responseCookie = ResponseCookie.from("access_token",jwtToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(Duration.ofMinutes(30))
                    .build();
            httpServletResponse.addHeader(HttpHeaders.SET_COOKIE,responseCookie.toString());

            LoginResponse response = new LoginResponse();

            // Set JWT tokens
            response.setRefreshToken(Optional.ofNullable(refreshToken).orElse(""));

            // Set user details
            response.setFirstname(Optional.ofNullable(user.getFirstName()).orElse(""));
            response.setLastname(Optional.ofNullable(user.getLastName()).orElse(""));
            response.setProfilePictureUrl(Optional.ofNullable(user.getProfilePictureUrl()).orElse(""));
            response.setEmail(Optional.ofNullable(user.getEmail()).orElse(""));
            response.setPhoneNumber(Optional.ofNullable(user.getPhoneNumber()).orElse(""));

            // Use Optional to avoid null checks and set defaults for lists
            response.setRoles(Optional.ofNullable(user.getRoles()).orElse(new ArrayList<>()));
//            response.setSkills(Optional.ofNullable(user.getSkills()).orElse(new ArrayList<>()));
            response.setAchievements(Optional.ofNullable(user.getAchievements()).orElse(new ArrayList<>()));
            response.setSocialMedia(Optional.ofNullable(user.getSocialMedia()).orElse(new ArrayList<>()));

            return ResponseEntity.ok(response);

        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public ResponseEntity<?> refereshToken(String refereshToken){
        try{
            User user = userRepository.findByEmail(jwtServices.getEmailFromToken(refereshToken));
            String jwtToken = jwtServices.generateToken(user);
            String newRefereshToken = jwtServices.generateRefresh(new HashMap<>(),user);
            LoginResponse authenticationResponse = new LoginResponse();
            authenticationResponse.setRefreshToken(newRefereshToken);
            authenticationResponse.setJwtToken(jwtToken);
            return ResponseEntity.ok(authenticationResponse);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }


    public ResponseEntity<?> joinTeamRequest(JoinTeamRequestDto joinTeamRequestDto){

        User me = userRepository.findByUserName(SecurityContextHolder.getContext().getAuthentication().getName());
        Team targetedTeam = teamRepository.findTeamById(joinTeamRequestDto.getTeamId());

        if(me.getRoles().contains(User.UserRole.TEAM_LEADER)){
            return ResponseEntity.badRequest().body("You are a Team Leader you can not join another team without making someone else team leader");
        }

        ConnectionRequest connectionRequest = new ConnectionRequest();
        connectionRequest.setType(ConnectionRequest.ConnectionRequestType.JOIN_TEAM);
        connectionRequest.setStatus(ConnectionRequest.Status.PENDING);
        connectionRequest.setFrom(me);
        connectionRequest.setTo(targetedTeam.getTeamAdmin());
        connectionRepository.createConnectionRequest(connectionRequest);

//        Notification notification = new Notification();
//        notification.setMessage(joinTeamRequestDto.getMessage());
//        notification.setFrom(me);
//        notification.setTo(targetedTeam.getTeamAdmin());
//        notification.setType(Notification.NotificationType.JOIN_TEAM_REQUEST);
//        notificationRepository.saveNotification(notification);
        NotificationEvent notificationEvent = NotificationEvent.newBuilder()
                .setMessage(joinTeamRequestDto.getMessage())
                .setTitle(" ")
                .setFrom(me.getId())
                .setSenderName(me.getName())
                .setSenderEmail(me.getEmail())
                .setTo(targetedTeam.getTeamAdmin().getId())
                .setReceiverName(targetedTeam.getTeamAdmin().getName())
                .setReceiverEmail(targetedTeam.getTeamAdmin().getEmail())
                .setType(NotificationType.JOIN_TEAM_REQUEST)
                .build();
        notificationProducer.sendEvent(notificationEvent);
        User targetedTeamLeader = targetedTeam.getTeamAdmin();
        targetedTeamLeader.getConnectionRequests().add(connectionRequest);
//        targetedTeamLeader.getNotifications().add(notification);
        userRepository.saveUser(targetedTeamLeader);

        return ResponseEntity.ok("Request sent successfully.");
    }

    public ResponseEntity<?> updateProfile(UpdateUserDto updateUserDto){
        User user = userRepository.findByUserName(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user!=null){
            if(updateUserDto.getAchievements()!=null){
                user.setAchievements(updateUserDto.getAchievements());
            }
            if(updateUserDto.getEducation()!=null){
                user.setEducation(updateUserDto.getEducation());
            }

            if(updateUserDto.getPhoneNumber()!=null){
                user.setPhoneNumber(updateUserDto.getPhoneNumber());
            }
            if(updateUserDto.getUniversity()!=null){
                user.setUniversity(updateUserDto.getUniversity());
            }
            if(updateUserDto.getSocialMedia()!=null){
                user.setSocialMedia(updateUserDto.getSocialMedia());
            }

            userRepository.saveUser(user);
            return ResponseEntity.ok("user updated successfully");
        }
        return ResponseEntity.badRequest().body("something went wrong");
    }


    public ResponseEntity<?> leaveTeam(){
        User user = userRepository.findByUserName(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user==null){
            return ResponseEntity.badRequest().body("user not found");
        }
        if(user.getRoles().contains(User.UserRole.TEAM_LEADER)){
            return ResponseEntity.badRequest().body("you are a team leader your have to make someone else team leader before leaving the team");
        }

        Team team = user.getTeam();
        user.setTeam(null);
        user.getRoles().clear();
        user.getTasks().clear();
        userRepository.saveUser(user);
        teamRepository.deleteTeamMemberById(user.getId(),team);
        return ResponseEntity.ok("Your ar now no longer team member of team "+team.getName());
    }


    public ResponseEntity<?> uploadProfilePicture(MultipartFile image) throws IOException {
        if(userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())!=null){
            Map response = cloudinaryService.upload(image,"User");
            User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
            user.setProfilePictureUrl(null);
            user.setProfilePictureUrl(response.get("secure_url").toString());
            userRepository.saveUser(user);
            return ResponseEntity.ok(response);
        }else {
            System.out.println("user not found");
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteProfilePicture(){
        if(userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())!=null){
            User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
            String url = user.getProfilePictureUrl();
            cloudinaryService.delete(List.of(url));
            return ResponseEntity.ok("Profile picture deleted successfully");
        }else {
            System.out.println("can not found user");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
