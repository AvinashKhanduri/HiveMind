package com.avinash.CoreService.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "connection_requests")
public class ConnectionRequest {
    @Id
    private ObjectId id;
    @DBRef
    private User from;
    @DBRef
    private User to;
    private Status status;

    private ConnectionRequestType type;
    private LocalDateTime requestTime = LocalDateTime.now();

    public enum Status {
        PENDING, ACCEPTED, REJECTED
    }

    public enum ConnectionRequestType{
        USER_REQUEST, TEAM_REQUEST, JOIN_TEAM
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public User getFrom() {
        return from;
    }

    public void setFrom(User from) {
        this.from = from;
    }

    public User getTo() {
        return to;
    }

    public void setTo(User to) {
        this.to = to;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(LocalDateTime requestTime) {
        this.requestTime = requestTime;
    }

    public ConnectionRequestType getType() {
        return type;
    }

    public void setType(ConnectionRequestType type) {
        this.type = type;
    }
}

