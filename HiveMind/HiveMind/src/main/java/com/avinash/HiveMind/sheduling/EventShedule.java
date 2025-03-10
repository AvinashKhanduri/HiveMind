package com.avinash.HiveMind.sheduling;

import com.avinash.HiveMind.models.Event;
import com.avinash.HiveMind.repositorys.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.chrono.ChronoLocalDate;
import java.util.List;

@Service
public class EventShedule {
    @Autowired
    private EventRepository eventRepository;

    @Scheduled(cron = "0 0 12 * * ?")
    public void updateEventStatus(){
        eventRepository.updateEvents();
    }

}

