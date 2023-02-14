package com.hospital.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reminder {
    private int reminderId;
    private int patientId;
    private int doctorId;
    private String content;
    private Date date;
    private int priority;
    private int state;
    private int deadline;
    private String patientFirstName;
    private String patientLastName;
    private String doctorFirstName;
    private String doctorLastName;
    private String doctorEmail;
    private String patientEmail;
}
