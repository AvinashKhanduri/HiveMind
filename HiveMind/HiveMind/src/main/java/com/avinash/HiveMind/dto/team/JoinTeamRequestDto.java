package com.avinash.HiveMind.dto.team;

import org.bson.types.ObjectId;

public class JoinTeamRequestDto {
    private ObjectId teamId;
    private String message;

    public ObjectId getTeamId() {
        return teamId;
    }

    public void setTeamId(ObjectId teamId) {
        this.teamId = teamId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
