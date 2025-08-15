package com.avinash.CoreService.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "teams")
public class Team {
    @Id
    private ObjectId id;
    private String name;
    private String aboutTeam;
    private String teamProfilePicture;
    private String tag;
    private String workPlaceOrUnivercity;
    @DBRef
    private User teamAdmin;
    @DBRef
    private List<User> teamMembers = new ArrayList<>();
    @DBRef
    private List<Project> projects;
    private Location location;
    private TeamStatus teamStatus;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;
    private boolean isOpen;
    private List<TeamRequirement> teamRequirements;

    public enum TeamStatus {
        ACTIVE, COMPLETED
    }

    public enum Location{
        LOCAL, REMOTE
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getTeamAdmin() {
        return teamAdmin;
    }

    public void setTeamAdmin(User teamAdmin) {
        this.teamAdmin = teamAdmin;
    }

    public List<User> getTeamMembers() {
        return teamMembers;
    }

    public void setTeamMembers(List<User> teamMembers) {
        this.teamMembers = teamMembers;
    }

    public TeamStatus getTeamStatus() {
        return teamStatus;
    }

    public void setTeamStatus(TeamStatus teamStatus) {
        this.teamStatus = teamStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getAboutTeam() {
        return aboutTeam;
    }

    public void setAboutTeam(String aboutTeam) {
        this.aboutTeam = aboutTeam;
    }
}

