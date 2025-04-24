package com.avinash.HiveMind.dto.user;

import org.bson.types.ObjectId;

public class ConnectionDto {


    private String to;

    private String message;


    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
