package com.avinash.CoreService.repositorys;

import com.avinash.CoreService.models.Event;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public class EventRepository {
    @Autowired
    private MongoTemplate mongoTemplate;

    public Event createEvent(Event event){
        return mongoTemplate.save(event);
    }

    public Event findEventById(ObjectId id){
        return mongoTemplate.findById(id,Event.class);
    }

    public List<Event> findEventsByStatus(Event.Event_Status status){
        Query query = new Query();
        query.addCriteria(Criteria.where("status").is(status));
        return mongoTemplate.find(query,Event.class);
    }

    public UpdateResult updateEvents(){
        Query query  = new Query();
        query.addCriteria(Criteria.where("status").is(Event.Event_Status.UPCOMMING).and("date").lt(LocalDate.now()));

        Update update = new Update();
        update.set("status", Event.Event_Status.CONDUCTED);
        return mongoTemplate.updateMulti(query,update,Event.class);
    }

    public DeleteResult deleteEvent(Event event){
        return mongoTemplate.remove(event);
    }

}
