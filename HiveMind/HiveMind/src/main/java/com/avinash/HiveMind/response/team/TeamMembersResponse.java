package com.avinash.HiveMind.response.team;

import com.avinash.HiveMind.models.Team;
import org.bson.types.ObjectId;

import java.util.List;

public class TeamMembersResponse {
    public TeamMembersResponse(String id, String name, String phoneNumber, String email, List<String> skills) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
//        this.otherTeams = otherTeams;
        this.skills = skills;
    }

    private String id;
    private String name;
    private String phoneNumber;
    private String email;
//    private List<ObjectId> otherTeams;
    private List<String> skills;

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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

//    public List<ObjectId> getOtherTeams() {
//        return otherTeams;
//    }
//
//    public void setOtherTeams(List<ObjectId> otherTeams) {
//        this.otherTeams = otherTeams;
//    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }
}
