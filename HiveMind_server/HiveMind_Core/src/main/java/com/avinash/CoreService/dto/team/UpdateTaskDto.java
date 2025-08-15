package com.avinash.CoreService.dto.team;

import com.avinash.CoreService.models.Task;

import java.time.LocalDateTime;

public class UpdateTaskDto {
    private Task.TaskStatus taskStatus;
    private String taskId;
    private String userId;
    private String description;
    private LocalDateTime deadLine;
    private String title;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Task.TaskStatus getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(Task.TaskStatus taskStatus) {
        this.taskStatus = taskStatus;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDateTime getDeadLine() {  // Ensure this matches Task.getDeadLine()
        return deadLine;
    }

    public void setDeadLine(LocalDateTime deadLine) {  // Match Task.setDeadLine()
        this.deadLine = deadLine;
    }
}
