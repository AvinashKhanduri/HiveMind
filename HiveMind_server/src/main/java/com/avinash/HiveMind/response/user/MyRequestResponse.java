package com.avinash.HiveMind.response.user;

import org.bson.types.ObjectId;

import java.time.LocalDateTime;

public class MyRequestResponse {
    public MyRequestResponse(String id, String fromUserId, String toUserId, String status, LocalDateTime requestTime) {
        this.id = id;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.status = status;
        this.requestTime = requestTime;
    }

    private String id;
    private String fromUserId;
    private String toUserId;
    private String status;
    private LocalDateTime requestTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(String fromUserId) {
        this.fromUserId = fromUserId;
    }

    public String getToUserId() {
        return toUserId;
    }

    public void setToUserId(String toUserId) {
        this.toUserId = toUserId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(LocalDateTime requestTime) {
        this.requestTime = requestTime;
    }
}
