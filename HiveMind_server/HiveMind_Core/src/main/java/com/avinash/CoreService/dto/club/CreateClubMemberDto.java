package com.avinash.CoreService.dto.club;

import java.util.List;

public class CreateClubMemberDto {
    private String name;
    private String role;
    private List<String> socialMedia;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<String> getSocialMedia() {
        return socialMedia;
    }

    public void setSocialMedia(List<String> socialMedia) {
        this.socialMedia = socialMedia;
    }
}
