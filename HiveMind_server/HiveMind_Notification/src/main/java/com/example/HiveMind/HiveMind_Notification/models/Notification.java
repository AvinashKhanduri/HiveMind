package com.example.HiveMind.HiveMind_Notification.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "notifications")
public class Notification {
    @Id
    private ObjectId id;
    private NotificationType type;
    private String title;
    private String message;
    private Status status;
    private LocalDateTime timeStamp = LocalDateTime.now();
    private ObjectId from;
    private ObjectId to;
    private String senderName;
    private String receiverName;
    private String senderEmail;
    private String receiverEmail;

    public enum Status {
        READ, UNWATCHED
    }

    public enum NotificationType {
        TEAM_REQUEST, CONNECTION_REQUEST, GROUP_CHAT, TWO_PERSON_CHAT, JOIN_TEAM_REQUEST, TASK_NOTIFICATION,AUTH,PASSWORD_RESET,CONNECTION_REQUEST_ACCEPTED,CONNECTION_REQUEST_REJECTED
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getFrom() {
        return from;
    }

    public void setFrom(ObjectId from) {
        this.from = from;
    }

    public ObjectId getTo() {
        return to;
    }

    public void setTo(ObjectId to) {
        this.to = to;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public String getReceiverEmail() {
        return receiverEmail;
    }

    public void setReceiverEmail(String receiverEmail) {
        this.receiverEmail = receiverEmail;
    }
}
