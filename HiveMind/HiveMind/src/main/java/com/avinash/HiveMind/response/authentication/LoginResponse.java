package com.avinash.HiveMind.response.authentication;

public class LoginResponse {
    public LoginResponse(String jwtToken, String verificationCodeExpireAt) {
        this.jwtToken = jwtToken;
        this.verificationCodeExpireAt = verificationCodeExpireAt;
    }

    private String jwtToken;
    private String verificationCodeExpireAt;

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getVerificationCodeExpireAt() {
        return verificationCodeExpireAt;
    }

    public void setVerificationCodeExpireAt(String verificationCodeExpireAt) {
        this.verificationCodeExpireAt = verificationCodeExpireAt;
    }
}
