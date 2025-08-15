package com.avinash.CoreService.services.club;


import com.avinash.CoreService.dto.club.CreateClubDto;
import com.avinash.CoreService.dto.club.CreateClubMemberDto;
import com.avinash.CoreService.dto.event.CancleEventDto;
import com.avinash.CoreService.dto.event.CreateEventDto;
import com.avinash.CoreService.models.Club;
import com.avinash.CoreService.models.ClubMember;
import com.avinash.CoreService.models.Event;
import com.avinash.CoreService.models.User;
import com.avinash.CoreService.repositorys.ClubMemberRepository;
import com.avinash.CoreService.repositorys.ClubRepository;
import com.avinash.CoreService.repositorys.EventRepository;
import com.avinash.CoreService.repositorys.UserRepository;
import org.bson.types.ObjectId;
//import org.keycloak.jose.jwk.JWK;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ClubService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ClubMemberRepository clubMemberRepository;

    public ResponseEntity<?> createClub(CreateClubDto createClubDto){
       try{
           User user  = userRepository.findByUserName(SecurityContextHolder.getContext().getAuthentication().getName());
           if(user.getRoles().contains(User.UserRole.CLUB_HEAD) && user.getClub()==null){
               Club club = new Club();
               club.setName(createClubDto.getName());
               club.setDescription(createClubDto.getDescription());
               club.setDepartment(createClubDto.getDepartment());
               club.setUniversity(createClubDto.getUniversity());
               club.setContactDetails(createClubDto.getContactDetails());
               club.setClubHead(user);
               clubRepository.createClub(club);
               user.setClub(club);
               userRepository.saveUser(user);
               return ResponseEntity.ok("club created successfully");
           }else {
               if (user.getClub()!=null){
                   throw  new RuntimeException("You already have a club");
               }
               throw  new RuntimeException("You do not have any permission to create club");
           }

       }catch (Exception e){
           return ResponseEntity.badRequest().body(e.getMessage());
       }
    }

    public ResponseEntity<?> updateClubInfo(CreateClubDto createClubDto){
        User user = userRepository.findByUserName(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user.getRoles().contains(User.UserRole.CLUB_HEAD)){
            if(user.getClub()==null){
                return ResponseEntity.badRequest().body("You do not have any club pls create first");
            }
            Club club = user.getClub();
            if(createClubDto.getName()!=null){
                club.setName(createClubDto.getName());
            }
            if(createClubDto.getDepartment()!=null){
                club.setDepartment(createClubDto.getDepartment());
            }
            if(createClubDto.getDescription()!=null){
                club.setDepartment(createClubDto.getDepartment());
            }
            if(createClubDto.getUniversity()!=null){
                club.setUniversity(createClubDto.getUniversity());
            }
            if(createClubDto.getContactDetails()!=null){
                club.setContactDetails(createClubDto.getContactDetails());
            }
            club.setUpdatedAt(LocalDateTime.now());
            clubRepository.createClub(club);
            return ResponseEntity.ok("Club information updated successfully");
        }
        return ResponseEntity.badRequest().body("You are not authorize to update club information");
    }

    public ResponseEntity<?> createClubMember(CreateClubMemberDto createClubMemberDto){
        User user = userRepository.findByUserName(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user.getRoles().contains(User.UserRole.CLUB_HEAD)){
           if(user.getClub()!=null){
               Club club = user.getClub();
               ClubMember clubMember = new ClubMember();
               clubMember.setName(createClubMemberDto.getName());
               clubMember.setRole(createClubMemberDto.getRole());
               clubMember.setClub(club);
               clubMember.setSocialMedia(createClubMemberDto.getSocialMedia());
               clubMemberRepository.createClubMember(clubMember);
               club.getClubMembers().add(clubMember);
               clubRepository.createClub(club);
               return ResponseEntity.ok("Club member added successfully");
           }else {
               return ResponseEntity.badRequest().body("You do not have any club pls create a club first");
           }
        }
        return ResponseEntity.badRequest().body("You do not have permissions to create club members");
    }


    public ResponseEntity<?> removeClubMember(ObjectId id){
        try{
            ClubMember clubMember = clubMemberRepository.findClubMemberById(id);
            clubMemberRepository.deleteClubMember(clubMember);

            return ResponseEntity.ok("Club member deleted successfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    public ResponseEntity<?> createEvent(CreateEventDto createEventDto){
        User user = userRepository.findByUserName(SecurityContextHolder.getContext().getAuthentication().getName());
        if(user.getRoles().contains(User.UserRole.CLUB_HEAD)){
            if(user.getClub()!=null){
                Event event = new Event();
                Club club = user.getClub();
                event.setName(createEventDto.getName());
                event.setStatus(createEventDto.getStatus());
                event.setClub(club);
                event.setDescription(createEventDto.getDescription());
                event.setDate(createEventDto.getDate());
                eventRepository.createEvent(event);
                club.getEvents().add(event);
                clubRepository.createClub(club);
                return ResponseEntity.ok("Event created successfully");
            }
            return ResponseEntity.badRequest().body("You do not have any club pls create first to create a event");
        }
        return ResponseEntity.badRequest().body("You do not have any permissions to create events");
    }



    public ResponseEntity<?> cancelEvent(CancleEventDto cancleEventDto){
        Event event = eventRepository.findEventById(cancleEventDto.getEventId());
        if(event!=null){
            event.setCancel(true);
            event.setCancelReason(cancleEventDto.getReason());
            eventRepository.createEvent(event);
            return ResponseEntity.ok("event canceled successfully");
        }
        return ResponseEntity.badRequest().body("event not found");
    }

}
