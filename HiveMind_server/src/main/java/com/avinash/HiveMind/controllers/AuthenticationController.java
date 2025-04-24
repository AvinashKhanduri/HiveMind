package com.avinash.HiveMind.controllers;


import com.avinash.HiveMind.dto.authentication.*;
//import com.avinash.HiveMind.services.user.KeyCloakUserService;
import com.avinash.HiveMind.services.user.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {



    @Autowired
    private UserServices mongoUserService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserDto userDto){


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


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserDto loginUserDto){
        return mongoUserService.login(loginUserDto);
    }

    @PostMapping("/refresh/{refresh_token}")
    public ResponseEntity<?> refresh(@PathVariable String refresh_token){
        return mongoUserService.refereshToken(refresh_token);
    }



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
