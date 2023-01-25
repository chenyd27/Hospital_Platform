package com.hospital.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient {
    private int patientId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private List<Reminder> reminderList;
}
