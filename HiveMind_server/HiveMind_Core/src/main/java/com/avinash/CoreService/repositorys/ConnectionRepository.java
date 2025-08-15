package com.avinash.CoreService.repositorys;

import com.avinash.CoreService.models.ConnectionRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public class ConnectionRepository {
    @Autowired
    private MongoTemplate mongoTemplate;

    public ConnectionRequest createConnectionRequest(ConnectionRequest connectionRequest){
        return mongoTemplate.save(connectionRequest);
    }

    public ConnectionRequest findConnectionRequestById(String id){
        ObjectId objectId = new ObjectId(id);
        return mongoTemplate.findById(objectId, ConnectionRequest.class);
    }
}
