package com.avinash.HiveMind.response.authentication;

public class LoginResponse {


    private String jwtToken;
    private String verificationCodeExpireAt;
    private String refreshToken;

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

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
