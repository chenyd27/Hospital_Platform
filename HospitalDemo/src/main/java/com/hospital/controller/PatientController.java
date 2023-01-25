package com.hospital.controller;

import com.hospital.mapper.PatientMapper;
import com.hospital.pojo.Patient;
import com.hospital.pojo.Reminder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PatientController {
    @Autowired
    PatientMapper patientMapper;

    static public Patient pt;
    @RequestMapping("/patient-reminder")
    public String getValidReminder(){
        Patient patient;
        if(pt == null){
            patient = patientMapper.loginPatient("825883367@qq.com","123");
            pt = patient;
        }
        else patient = pt;
        List<Reminder> reminderList = patientMapper.getReminderList(patient);
        return reminderList.size() + "";
    }
}
