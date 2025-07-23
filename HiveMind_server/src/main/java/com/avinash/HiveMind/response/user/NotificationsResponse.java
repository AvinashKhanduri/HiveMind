package com.avinash.HiveMind.response.user;

public class NotificationsResponse {
    public NotificationsResponse(String from, String to,String from_url,String id) {
        this.from = from;
        this.to = to;
        this.fromProfileUrl = from_url;
        this.id = id;
    }

    private String from;
    private String to;
//    private String title;
//    private String description;
    private String fromProfileUrl;
    private String id;

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }

//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }

    public String getFromProfileUrl() {
        return fromProfileUrl;
    }

    public void setFromProfileUrl(String fromProfileUrl) {
        this.fromProfileUrl = fromProfileUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
