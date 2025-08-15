package com.avinash.CoreService.dto.event;

import org.bson.types.ObjectId;

public class CancleEventDto {
    private ObjectId eventId;
    private String reason;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public ObjectId getEventId() {
        return eventId;
    }

    public void setEventId(ObjectId eventId) {
        this.eventId = eventId;
    }
}
