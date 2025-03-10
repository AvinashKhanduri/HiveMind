package com.avinash.HiveMind.dto.event;

import com.avinash.HiveMind.models.Event;

import java.time.LocalDate;

public class CreateEventDto {
    private String name;
    private String description;
    private LocalDate date;
    private String posterUrl;
    private Event.Event_Status status;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public Event.Event_Status getStatus() {
        return status;
    }

    public void setStatus(Event.Event_Status status) {
        this.status = status;
    }
}
