package com.avinash.HiveMind.repositorys;

import com.avinash.HiveMind.models.Task;
import com.avinash.HiveMind.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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
