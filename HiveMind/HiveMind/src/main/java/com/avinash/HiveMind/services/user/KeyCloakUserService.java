//package com.avinash.HiveMind.services.user;
//
//import com.avinash.HiveMind.dto.authentication.RegisterUserDto;
//import com.avinash.HiveMind.models.User;
//import com.avinash.HiveMind.repositorys.KeyCloakRepository;
//import com.avinash.HiveMind.repositorys.UserRepository;
//import com.avinash.HiveMind.utils.Emails;
//import jakarta.ws.rs.core.Response;
//import org.keycloak.admin.client.Keycloak;
//import org.keycloak.admin.client.resource.UsersResource;
//import org.keycloak.representations.idm.CredentialRepresentation;
//import org.keycloak.representations.idm.UserRepresentation;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class KeyCloakUserService implements KeyCloakRepository {
//
//
//    @Autowired
//    private Keycloak keycloak;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private Emails emails;
//    @Value("${keycloak.auth-server-url}")
//    private String keycloakServerUrl;
//
//    @Value("${keycloak.realm}")
//    private String realm;
//
//    @Value("${keycloak.resource}")
//    private String clientId;
//
//    @Value("${keycloak.credentials.secret}")
//    private String clientSecret;
//
//    private UsersResource getUsersResources(){
//        return  keycloak.realm(realm).users();
//    }
//
//    RestTemplate restTemplate = new RestTemplate();
//    @Override
//    public int createUser(RegisterUserDto userDto) {
//        UserRepresentation userRepresentation = new UserRepresentation();
//        userRepresentation.setEnabled(true);
//        userRepresentation.setFirstName(userDto.getFirstName());
//        userRepresentation.setUsername(userDto.getUsername());
//        userRepresentation.setLastName(userDto.getLastName());
//        userRepresentation.setEmail(userDto.getEmail());
//        userRepresentation.setEmailVerified(false);
//
//        CredentialRepresentation credentialRepresentation  = new CredentialRepresentation();
//        credentialRepresentation.setValue(userDto.getPassword());
//        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
//
//        userRepresentation.setCredentials(List.of(credentialRepresentation));
//
//        UsersResource usersResource = getUsersResources();
//        try(Response response =  usersResource.create(userRepresentation)){
//            if(response.getStatus() == 201) {
//                System.out.println("Created");
//
//                String keycloakUserId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
//
//                User user = new User();
//                user.setId(keycloakUserId);
//                user.setName(userDto.getUsername());
//                user.setEmail(userDto.getEmail());
//                user.setPhoneNumber(userDto.getPhoneNumber());
//
//                String code = emails.generateVerificationCode();
//
//                emails.sendVerificationEmail(user,code);
//
//                user.setVerificationCode(code);
//                user.setVerificationCodeExpireAt(LocalDateTime.now().plusMinutes(15));
//                userRepository.saveUser(user);
//
//                return response.getStatus();
//            } else {
//                System.out.println(response.getStatus());
//                return response.getStatus();
//            }
//        }catch (Exception e) {
//            System.out.println(e.getMessage());
//            throw new RuntimeException(e.getMessage());
//        }
//    }
//
//    @Override
//    public Response deleteUser(String id) {
//        return getUsersResources().delete(id);
//    }
//
//    public Map authenticateUser(String username, String password) {
//        String tokenUrl = keycloakServerUrl + "/realms/" + realm + "/protocol/openid-connect/token";
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//
//        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
//        body.add("client_id", clientId);
//        body.add("client_secret", clientSecret);
//        body.add("grant_type", "password");
//        body.add("username", username);
//        body.add("password", password);
//
//        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
//
//        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);
//
//        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
//            return response.getBody(); // Return only the access token
//        }
//
//        throw new RuntimeException("Invalid credentials or authentication failed");
//    }
//
//
//}
//
