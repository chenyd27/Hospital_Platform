package com.hospital.controller;

import com.hospital.mapper.PatientMapper;
import com.hospital.pojo.Patient;
import com.hospital.pojo.Reminder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class PatientController {
    @Autowired
    PatientMapper patientMapper;

    static public Patient pt;
    @RequestMapping("/patient-reminder")
    public String getValidReminder(@RequestParam("email") String email){
        Patient patient;
        if(pt == null){
            patient = patientMapper.loginPatient("825883367@qq.com","123");
            pt = patient;
        }
        else patient = pt;
        List<Reminder> reminderList = patientMapper.getReminderList(patient);
        return reminderList.size() + "";
    }
    @RequestMapping("/patient-reminder-doctor")
    public Map<String,Object> getReminderFromDoctor(@RequestBody Map<String, Object> hashMap){
        Patient patient = patientMapper.getPatientInfo((String) hashMap.get("email"));
        List<Reminder> reminderList = patientMapper.getReminderList(patient);
        boolean flag = false;
        int highPriority = 0;
        int middlePriority = 0;
        int lowPriority = 0;
        if(reminderList != null) flag = true;
        Map<String,Object> map = new HashMap<>();
        for(Reminder reminder : reminderList){
            if(reminder.getPriority() == 1){
                lowPriority++;
            }else if(reminder.getPriority() == 2){
                middlePriority++;
            }else{
                highPriority++;
            }
        }
        map.put("flag",flag);
        map.put("highPriority",highPriority);
        map.put("middlePriority",middlePriority);
        map.put("lowPriority",lowPriority);
        map.put("patient",patient);
        return map;
    }
}
