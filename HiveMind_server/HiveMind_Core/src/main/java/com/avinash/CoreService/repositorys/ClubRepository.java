package com.avinash.CoreService.repositorys;

import com.avinash.CoreService.models.Club;
import com.mongodb.client.result.DeleteResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ClubRepository {
    @Autowired
    private MongoTemplate mongoTemplate;

    public Club createClub(Club club){
        return mongoTemplate.save(club);
    }

    public Club findClubById(ObjectId id){
        return mongoTemplate.findById(id, Club.class);
    }

    public List<Club> findClubsByName(String name){
        Query query = new Query();
        query.addCriteria(Criteria.where("name").is(name));
        return mongoTemplate.find(query,Club.class);
    }

    public DeleteResult deleteClubById(Club club){
        return mongoTemplate.remove(club);
    }



}
