package com.avinash.CoreService.repositorys;

import com.avinash.CoreService.models.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public class TaskRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public void createTask(Task task){
        mongoTemplate.save(task);
    }

    public Task getTaskById(String taskId){
        return mongoTemplate.findById(taskId,Task.class);
    }


}
