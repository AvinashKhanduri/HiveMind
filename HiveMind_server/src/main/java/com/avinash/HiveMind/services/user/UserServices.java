package com.avinash.HiveMind.services.user;


import com.avinash.HiveMind.dto.authentication.*;
import com.avinash.HiveMind.dto.team.JoinTeamRequestDto;
import com.avinash.HiveMind.dto.user.ConnectionDto;
import com.avinash.HiveMind.dto.user.ConnectionRequestResponseDto;
import com.avinash.HiveMind.dto.user.UpdateUserDto;
import com.avinash.HiveMind.models.ConnectionRequest;
import com.avinash.HiveMind.models.Notification;
import com.avinash.HiveMind.models.Team;
import com.avinash.HiveMind.models.User;
import com.avinash.HiveMind.repositorys.ConnectionRepository;
import com.avinash.HiveMind.repositorys.NotificationRepository;
import com.avinash.HiveMind.repositorys.TeamRepository;
import com.avinash.HiveMind.repositorys.UserRepository;
import com.avinash.HiveMind.response.authentication.LoginResponse;
import com.avinash.HiveMind.response.authentication.RegisterResponse;
import com.avinash.HiveMind.response.user.*;
import com.avinash.HiveMind.services.CloudinaryService;
import com.avinash.HiveMind.services.NotificationService;
import com.avinash.HiveMind.utils.Emails;
import com.avinash.HiveMind.utils.JwtServices;
import com.avinash.HiveMind.utils.Support;

import jakarta.servlet.http.HttpServletResponse;
import org.mapstruct.control.MappingControl;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServices {
    private static final Logger log = LoggerFactory.getLogger(UserServices.class);
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ConnectionRepository connectionRepository;
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private Support support;

    @Autowired
    private Emails emails;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private NotificationService notificationService;

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
        Notification notification = new Notification();
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
        notification.setTitle("You have received a connection request from " + from.getName());
        notification.setMessage(connectionDto.getMessage());
        notification.setStatus(Notification.Status.UNWATCHED);
        notification.setType(Notification.NotificationType.CONNECTION_REQUEST);
        notification.setFrom(from);
        notification.setTo(to);

        // Save the notification first to generate its ID
        notificationRepository.saveNotification(notification);

        // Add the notification to the User's notifications list
        to.getNotifications().add(notification);

        // Save the updated User object
        userRepository.saveUser(to);

        // Prepare the response
        response.setTitle(notification.getTitle());
        response.setMessage(notification.getMessage());
        response.setStatus(notification.getStatus().toString());
        response.setTime(support.getFormatedTime(notification.getTimeStamp()));
        response.setType(notification.getType().toString());

        // Send email notification
        emails.sendConnectionRequestMail(to, notification.getMessage());

        notificationService.notifiyUser(notification.getTo().getId(),notification.getTitle());

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

            Notification notification = notificationRepository.findNotificationByFromIdToIdAndType(
                    connectionRequest.getFrom(),
                    connectionRequest.getTo(),
                    Notification.NotificationType.CONNECTION_REQUEST);

            User from = connectionRequest.getFrom();
            User to = connectionRequest.getTo();

            if(from.getTeam() != null || to.getTeam() != null){

                if(from.getTeam()!=null){
                    teamRepository.deleteTeamMemberById(from.getId(),from.getTeam());
                }

                if (to.getTeam()!=null){
                    teamRepository.deleteTeamMemberById(to.getId(),to.getTeam());
                }



//                UserResource keycloakFrom,keyCloakTo;
//                keycloakFrom = getUsersResources().get(from.getId());
//                keyCloakTo = getUsersResources().get(to.getId());
//                keycloakFrom.roles().realmLevel().remove(Collections.singletonList(getRoleResource().get("TEAM_LEADER").toRepresentation()));
//                keyCloakTo.roles().realmLevel().remove(Collections.singletonList(getRoleResource().get("TEAM_LEADER").toRepresentation()));
//                keycloakFrom.roles().realmLevel().add(Collections.singletonList(getRoleResource().get("TEAM_LEADER").toRepresentation()));

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


                connectionRequest.getTo().getNotifications().removeIf(userNotification -> userNotification
                        .getId().equals(notification.getId()));
                userRepository.saveUser(connectionRequest.getTo());
                notificationRepository.deleteNotification(notification);

                TeamCreationResponse response = new TeamCreationResponse();
                response.setTeamLeader(team.getTeamAdmin().getName());
                response.setTeamName(team.getName());
                response.setTeamMembers(team.getTeamMembers().stream().map(User::getName).toList());
                response.setMessage("Team created successfully");

                notificationService.notifiyUser(from.getId(),to.getName()+" accepted your connection request");

                return ResponseEntity.ok(response);
            }


//            RolesResource rolesResource = getRoleResource();
//            keyCloakUser.roles().realmLevel().add(Collections.singletonList(rolesResource.get("TEAM_LEADER").toRepresentation()));

            to.setTeam(team);
            to.getRoles().add(User.UserRole.TEAM_MEMBER);
            from.getRoles().add(User.UserRole.TEAM_LEADER);
            from.setTeam(team);
            userRepository.saveUser(to);
            userRepository.saveUser(from);


            connectionRequest.getTo().getNotifications().removeIf(userNotification -> userNotification
                    .getId().equals(notification.getId()));
            userRepository.saveUser(connectionRequest.getTo());
            notificationRepository.deleteNotification(notification);

            TeamCreationResponse response = new TeamCreationResponse();
            response.setTeamLeader(team.getTeamAdmin().getName());
            response.setTeamName(team.getName());
            response.setTeamMembers(team.getTeamMembers().stream().map(User::getName).toList());
            response.setMessage("Team created successfully");

            notificationService.notifiyUser(from.getId(),to.getName()+" accepted your connection request");

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

            Notification notification = notificationRepository.findNotificationByFromIdToIdAndType(
                    connectionRequest.getFrom(),
                    connectionRequest.getTo(),
                    Notification.NotificationType.CONNECTION_REQUEST);

            to.getNotifications().removeIf(userNotification ->
                    userNotification.getId().equals(notification.getId())
            );

            userRepository.saveUser(to);
            notificationRepository.deleteNotification(notification);

            team.getTeamMembers().add(to);
            teamRepository.createTeam(team);

            emails.teamInvitationAcceptedEmail(connectionRequest.getFrom(), to);

            notificationService.notifiyUser(connectionRequest.getFrom().getId(),to.getName()+" accepted your invitation");
            return ResponseEntity.ok("You are now a member of team " + team.getName());
        }



        // Handle REJECTED status
        if (connectionRequestResponseDto.getStatus().equals(ConnectionRequest.Status.REJECTED.name())) {
            connectionRequest.setStatus(ConnectionRequest.Status.REJECTED);
            connectionRepository.createConnectionRequest(connectionRequest);
            Notification notification = notificationRepository.findNotificationByFromIdToIdAndType(
                    connectionRequest.getFrom(),
                    connectionRequest.getTo(),
                    Notification.NotificationType.CONNECTION_REQUEST);

            connectionRequest.getTo().getNotifications().removeIf(userNotification -> userNotification
                    .getId().equals(notification.getId()));

            userRepository.saveUser(connectionRequest.getTo());
            notificationRepository.deleteNotification(notification);
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
        emails.sendVerificationEmail(user,code);

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

            // Get Keycloak user by ID (since it's the same as your local user ID)
//            UsersResource usersResource = getUsersResources();
//            UserResource userResource = usersResource.get(user.getId()); // Directly get user by ID

            // Fetch current Keycloak user details
//            UserRepresentation userRepresentation = userResource.toRepresentation();

            // Update user in Keycloak
//            userRepresentation.setEmailVerified(true);
//            userRepresentation.setEnabled(true);
//            userResource.update(userRepresentation); // Apply changes

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

        emails.sendVerificationEmail(user,newCode);
        return ResponseEntity.ok("A code has been sent to your email "+user.getEmail());
    }

    public ResponseEntity<?> sendResetPasswordRequest(@RequestBody PasswordEmailDto passwordEmailDto){
        User user = userRepository.findByEmail(passwordEmailDto.getEmail());
        if(user!=null && user.isEnable()){
            String otp = emails.generateVerificationCode();
            user.setResetPasswordCode(otp);
            userRepository.saveUser(user);
            emails.sendPasswordResetOtpMail(user,otp);
            return ResponseEntity.ok("An email has been sent to your account");
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<?> updatePassword(@RequestBody ResetPasswordDto resetPasswordDto){
        User user  = userRepository.findByPasswordResetOtp(resetPasswordDto.getOtp());
        if(user!=null){
//            UserResource keyCloakUser = getUsersResources().get(user.getId());
//            CredentialRepresentation credentialRepresentation  = new CredentialRepresentation();
//            UserRepresentation userRepresentation = keyCloakUser.toRepresentation();
//            credentialRepresentation.setValue(resetPasswordDto.getNewPassword());
//            credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
//            userRepresentation.setCredentials(List.of(credentialRepresentation));
//            keyCloakUser.update(userRepresentation);


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
            response.setSkills(Optional.ofNullable(user.getSkills()).orElse(new ArrayList<>()));
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

        Notification notification = new Notification();
        notification.setMessage(joinTeamRequestDto.getMessage());
        notification.setFrom(me);
        notification.setTo(targetedTeam.getTeamAdmin());
        notification.setType(Notification.NotificationType.JOIN_TEAM_REQUEST);
        notificationRepository.saveNotification(notification);

        User targetedTeamLeader = targetedTeam.getTeamAdmin();
        targetedTeamLeader.getConnectionRequests().add(connectionRequest);
        targetedTeamLeader.getNotifications().add(notification);
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
            if(updateUserDto.getSkills()!=null){
                user.setSkills(updateUserDto.getSkills());
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

    public  ResponseEntity<?> getAllNotifications(){
       try{
           User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
           List<ConnectionRequest> connectionRequests = user.getConnectionRequests();
           List<NotificationsResponse> responses = connectionRequests.stream().map(
                   notification -> new NotificationsResponse(notification.getFrom().getName(),notification.getTo().getName(),notification.getFrom().getProfilePictureUrl(),notification.getId().toString())
           ).toList();
           return ResponseEntity.ok(responses);
       }catch (Exception e){
           return ResponseEntity.badRequest().body(e.getMessage());
       }
    }







}
