package com.avinash.CoreService.controllers;

import com.avinash.CoreService.dto.club.CreateClubDto;
import com.avinash.CoreService.dto.club.CreateClubMemberDto;
import com.avinash.CoreService.dto.event.CancleEventDto;
import com.avinash.CoreService.dto.event.CreateEventDto;
import com.avinash.CoreService.services.club.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/club")
@RestController
public class ClubController {
    @Autowired
    private ClubService clubService;

    @PostMapping("/create")
    public ResponseEntity<?> createClub(@RequestBody  CreateClubDto createClubDto){
        return clubService.createClub(createClubDto);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateClub(@RequestBody CreateClubDto createClubDto){
        return clubService.updateClubInfo(createClubDto);
    }

    @PostMapping("/create-member")
    public ResponseEntity<?> createClubMember(@RequestBody CreateClubMemberDto createClubMemberDto){
        return clubService.createClubMember(createClubMemberDto);
    }

    @PostMapping("/create-event")
    public ResponseEntity<?> createClubMember(@RequestBody CreateEventDto createEventDto){
        return clubService.createEvent(createEventDto);
    }

    @PutMapping("/cancel-event")
    public ResponseEntity<?> cancelEvent(CancleEventDto cancleEventDto){
        return clubService.cancelEvent(cancleEventDto);
    }

}
