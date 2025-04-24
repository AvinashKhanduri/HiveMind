package com.avinash.HiveMind.utils;

import com.avinash.HiveMind.models.User;
import com.avinash.HiveMind.response.user.ConnectionRequestResponse;
import com.avinash.HiveMind.services.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class Emails {
    @Autowired
    private EmailService emailService;

    public void sendVerificationEmail(User user, String code) {
        String subject = "Account Verification";
        String verificationCode = "VERIFICATION CODE " + code;
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            // Handle email sending exception
            e.printStackTrace();
        }
    }

    public void sendPasswordResetOtpMail(User user,String otp) {
        String subject = "Account Password Reset";
        String verificationCode = "VERIFICATION CODE " + otp;
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            // Handle email sending exception
            e.printStackTrace();
        }
    }

    public void sendConnectionRequestMail(User user,String message) {
        User sender = user;  // Assuming there's a way to get the user from the response object
        String fromUserName = user.getName();  // Assuming the response object has a fromUser field
        String subject = "Connection Request Received";
        String notificationTitle = "You have a new connection request!";

        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">" + notificationTitle + "</h2>"
                + "<p style=\"font-size: 16px;\">" + message + "</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Notification Details:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">From: " + fromUserName + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            // Handle email sending exception
            e.printStackTrace();
        }
    }

    public void sendTeamCreationMailToRequest(User from, User to) {
        String subject = to.getName()+" Accepted you request";
        String notificationTitle = "Congratulations on team creation!";
        String message = "Congratulations! You are now a valued member of Team" + from.getName()+
                "\n" +
                "We are thrilled to have you join us and look forward to achieving great things together. Your skills, enthusiasm, and fresh perspective will be a fantastic addition to our team.";
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">" + notificationTitle + "</h2>"
                + "<p style=\"font-size: 16px;\">" + message + "</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Notification Details:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">From: " + "HiveMind" + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(to.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            // Handle email sending exception
            e.printStackTrace();
        }
    }

    public void sendTeamInvitationFromLeader(User from, User to,String invitationMessage) {
        String subject = to.getName()+" you have a team invitationFrom team "+from.getTeam().getName();
        String notificationTitle = "You have a team invitation";
        String message = invitationMessage;
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">" + notificationTitle + "</h2>"
                + "<p style=\"font-size: 16px;\">" + message + "</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Notification Details:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">From: " + "HiveMind" + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(to.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            // Handle email sending exception
            e.printStackTrace();
        }
    }

    public void teamInvitationAcceptedEmail(User from, User to) {
        String subject = to.getName()+" Accepted you request";
        String notificationTitle = "Congratulations you have a new team member!";
        String message = "Congratulations! You have now a new team member" + from.getName();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">" + notificationTitle + "</h2>"
                + "<p style=\"font-size: 16px;\">" + message + "</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Notification Details:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">From: " + "HiveMind" + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(from.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            // Handle email sending exception
            e.printStackTrace();
        }
    }


    public String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}
