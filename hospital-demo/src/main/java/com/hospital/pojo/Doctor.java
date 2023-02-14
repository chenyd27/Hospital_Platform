package com.hospital.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Doctor {
    private int doctorId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private List<Patient> patientList;
    private List<Reminder> reminderList;
}
