package com.avinash.CoreService.sheduling;

import com.avinash.CoreService.repositorys.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class EventShedule {
    @Autowired
    private EventRepository eventRepository;

    @Scheduled(cron = "0 0 12 * * ?")
    public void updateEventStatus(){
        eventRepository.updateEvents();
    }

}

