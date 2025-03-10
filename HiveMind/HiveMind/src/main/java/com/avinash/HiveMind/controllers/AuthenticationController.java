package com.avinash.HiveMind.controllers;


import com.avinash.HiveMind.dto.authentication.PasswordEmailDto;
import com.avinash.HiveMind.dto.authentication.RegisterUserDto;
import com.avinash.HiveMind.dto.authentication.ResetPasswordDto;
import com.avinash.HiveMind.dto.authentication.VerifyUserDto;
//import com.avinash.HiveMind.services.user.KeyCloakUserService;
import com.avinash.HiveMind.services.user.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

//    @Autowired
//    private KeyCloakUserService userService;

    @Autowired
    private UserServices mongoUserService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserDto userDto){
//        try{
//            int statusCode = userService.createUser(userDto);
//            if(statusCode==201){
//                return ResponseEntity.status(statusCode).body("user created");
//            }
//            else {
//                return ResponseEntity.status(statusCode).body("Can't create user");
//            }
//        }catch (Exception e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }

        try {
            return mongoUserService.registerUser(userDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyAccount(@RequestBody VerifyUserDto verifyUserDto){
        return mongoUserService.activateAccountRequest(verifyUserDto);
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
//        Map token = userService.authenticateUser(username, password);
//        return ResponseEntity.ok(token);
//    }



//    @DeleteMapping("/delete-user/{id}")
//    public ResponseEntity<?> deleteUser(@PathVariable String id){
//        System.out.println("id is   "+id);
//        try {
//            Response response = userService.deleteUser(id);
//            return ResponseEntity.ok("User deleted successfully");
//        }catch (Exception e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//
//
//    }



    @PutMapping("/resend-verificationCode/{email}")
    public ResponseEntity<?> resentVerificationCode(@PathVariable String email){
        return mongoUserService.resendVerificationCode(email);
    }

    @PostMapping("/reset-password-request")
    public void resetPassword(@RequestBody PasswordEmailDto passwordEmailDto){
            mongoUserService.sendResetPasswordRequest(passwordEmailDto);
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetNewPassword(@RequestBody ResetPasswordDto resetPasswordDto){
        return mongoUserService.updatePassword(resetPasswordDto);
    }


}
