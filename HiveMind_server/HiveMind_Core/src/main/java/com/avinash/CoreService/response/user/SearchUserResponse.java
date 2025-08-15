package com.avinash.CoreService.response.user;

import java.util.List;

public class SearchUserResponse {
    private String id;
    private String name;
    private String email;
    private String university;
    private List<String> skills;
    private String profilePictureUrl;

    public SearchUserResponse() {
    }

    public SearchUserResponse(String id, String name, String email, String university, String profilePictureUrl) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.university = university;

        this.profilePictureUrl = profilePictureUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }
}