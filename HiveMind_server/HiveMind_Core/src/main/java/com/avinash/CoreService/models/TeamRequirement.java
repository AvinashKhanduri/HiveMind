package com.avinash.CoreService.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "team_requirements")
public class TeamRequirement {

    @Id
    private ObjectId id;

    private String role; // e.g., "Frontend Developer"
    private List<String> requiredSkills; // e.g., ["React", "Tailwind CSS", "REST APIs"]
    private String description; // e.g., "Build interactive UIs for our AI project"
    private boolean isFilled; // false if still hiring

    // Optionally, link it to a project or team
    private ObjectId projectId;

    public TeamRequirement() {}

    public TeamRequirement(String role, List<String> requiredSkills, String description, boolean isFilled, ObjectId projectId) {
        this.role = role;
        this.requiredSkills = requiredSkills;
        this.description = description;
        this.isFilled = isFilled;
        this.projectId = projectId;
    }

    // Getters & Setters
    public ObjectId getId() { return id; }
    public void setId(ObjectId id) { this.id = id; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isFilled() { return isFilled; }
    public void setFilled(boolean filled) { isFilled = filled; }

    public ObjectId getProjectId() { return projectId; }
    public void setProjectId(ObjectId projectId) { this.projectId = projectId; }
}
