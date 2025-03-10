package com.avinash.HiveMind.dto.team;

import org.bson.types.ObjectId;

public class HandleNewMemberRequestDto {
    private String requestId;
    private String status;

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
