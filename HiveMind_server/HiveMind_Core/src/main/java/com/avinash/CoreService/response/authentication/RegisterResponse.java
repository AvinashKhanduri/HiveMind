package com.avinash.CoreService.response.authentication;

public class RegisterResponse {
    public RegisterResponse(String username, String email, String phoneNumber, boolean isVerify,String verificationCodeExpireAt,String message) {
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        IsVerify = isVerify;
        this.message = message;
        this.verificationCodeExpireAt = verificationCodeExpireAt;
    }

    private String username;
    private String email;
    private String phoneNumber;
    private boolean IsVerify;
    private String message;

    private String verificationCodeExpireAt;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isVerify() {
        return IsVerify;
    }

    public void setVerify(boolean verify) {
        IsVerify = verify;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    public String getVerificationCodeExpireAt() {
        return verificationCodeExpireAt;
    }

    public void setVerificationCodeExpireAt(String verificationCodeExpireAt) {
        this.verificationCodeExpireAt = verificationCodeExpireAt;
    }
}
