package com.avinash.HiveMind.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Document(collection = "users")
public class User implements UserDetails {
    public User() {
    }

    public User(String id,
                String email,
                String name,
                String education,
                String university,
                String phoneNumber,
                boolean enable,
                String verificationCode,
                LocalDateTime verificationCodeExpireAt,
                String resetPasswordCode,
                LocalDateTime createdAt,
                LocalDateTime updatedAt,
                Team team,
                List<Task> tasks,
                List<UserRole> roles,
                List<String> skills,
                List<String> achievements,
                List<String> socialMedia,
                List<Notification> notifications,
                List<ConnectionRequest> connectionRequests) {

        this.id = id;
        this.email = email;
        this.name = name;
        this.education = education;
        this.university = university;
        this.phoneNumber = phoneNumber;
        this.enable = enable;
        this.verificationCode = verificationCode;
        this.verificationCodeExpireAt = verificationCodeExpireAt;
        this.resetPasswordCode = resetPasswordCode;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.team = team;
        this.tasks = tasks;
        this.roles = roles;
        this.skills = skills;
        this.achievements = achievements;
        this.socialMedia = socialMedia;
        this.notifications = notifications;
        this.connectionRequests = connectionRequests;
    }

    @Id
    private String id;
    @Indexed(unique = true)
    private String email;

    @Indexed(unique = true)
    private String name;

    private String firstName;
    private String lastName;
    private String education;
    private String university;
    private String phoneNumber;
    private String password;

    private boolean enable;
    private String verificationCode;
    private LocalDateTime verificationCodeExpireAt;
    private String resetPasswordCode;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;
    @DBRef
    private Team team;
    @DBRef
    private List<Task> tasks = new ArrayList<>();
    private List<UserRole> roles = new ArrayList<>();
    private List<String> skills;
    private List<String> achievements;
    private List<String> socialMedia;
    private List<Notification> notifications = new ArrayList<>();
    private List<ConnectionRequest> connectionRequests = new ArrayList<>();
    private Club club;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public List<UserRole> getRoles() {
        return roles;
    }

    public void setRoles(List<UserRole> roles) {
        this.roles = roles;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<String> getAchievements() {
        return achievements;
    }

    public void setAchievements(List<String> achievements) {
        this.achievements = achievements;
    }

    public List<String> getSocialMedia() {
        return socialMedia;
    }

    public void setSocialMedia(List<String> socialMedia) {
        this.socialMedia = socialMedia;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public LocalDateTime getVerificationCodeExpireAt() {
        return verificationCodeExpireAt;
    }

    public void setVerificationCodeExpireAt(LocalDateTime verificationCodeExpireAt) {
        this.verificationCodeExpireAt = verificationCodeExpireAt;
    }

    public String getResetPasswordCode() {
        return resetPasswordCode;
    }

    public void setResetPasswordCode(String resetPasswordCode) {
        this.resetPasswordCode = resetPasswordCode;
    }

    public List<ConnectionRequest> getConnectionRequests() {
        return connectionRequests;
    }

    public void setConnectionRequests(List<ConnectionRequest> connectionRequests) {
        this.connectionRequests = connectionRequests;
    }

    public enum UserRole{
        TEAM_LEADER, TEAM_MEMBER, ADMIN, CLUB_HEAD
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
