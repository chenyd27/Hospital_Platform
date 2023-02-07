package com.hospital.controller;

import com.hospital.mapper.PatientMapper;
import com.hospital.pojo.Patient;
import com.hospital.pojo.Reminder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class PatientController {
    @Autowired
    PatientMapper patientMapper;

    static public Patient pt;
    @RequestMapping("/patient-reminder")
    public Map<String,Object> getValidReminder(@RequestBody Map<String,Object> map){
        Patient patient = patientMapper.getPatientInfo((String) map.get("email"));
        List<Reminder> reminderList = patientMapper.getReminderList(patient);
        Collections.sort(reminderList,(a1,a2)->{
            return a2.getPriority() - a1.getPriority();
        });
        Map<String,Object> objectMap = new HashMap<>();
        boolean flag = false;
        if(reminderList != null) flag = true;
        objectMap.put("flag",flag);
        objectMap.put("reminderList",reminderList);
        return objectMap;
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

    @RequestMapping("/login-patient")
    public Map<String,Object> login(@RequestBody Map<String,Object> map){
        Patient patient = patientMapper.loginPatient((String)map.get("email"),(String) map.get("password"));
        boolean flag = false;
        if(patient != null){
            flag = true;
            List<Reminder> reminderList = patientMapper.getReminderList(patient);
            patient.setReminderList(reminderList);
        }
        Map<String,Object> hashmap = new HashMap<>();
        hashmap.put("flag",flag);
        hashmap.put("patient",patient);
        return hashmap;
    }
    @RequestMapping("/patient-finished")
    public Map<String,Object> updateFinished(@RequestBody Map<String,Object> map){
        Patient patient = patientMapper.getPatientbyId((int) map.get("patientId"));
        int res = patientMapper.setReminderFinished((int)map.get("reminderId"));
        int priority = (int) map.get("priority");
        if(priority == 1) patient.setLowPriority(patient.getLowPriority() - 1);
        if(priority == 2) patient.setMiddlePriority(patient.getMiddlePriority() - 1);
        if(priority == 3) patient.setHighPriority(patient.getHighPriority() - 1);
        patientMapper.updatePatient(patient);
        Map<String,Object> objectMap = new HashMap<>();
        objectMap.put("res",res);
        return objectMap;
    }
    @RequestMapping("/patient-outdated")
    public Map<String,Object> updateOutdated(@RequestBody Map<String,Object> map) {
        Patient patient = patientMapper.getPatientbyId((int) map.get("patientId"));
        List<Reminder> reminderList = patientMapper.getReminderList(patient);
        Date today = Calendar.getInstance().getTime();
        for (Reminder reminder : reminderList) {
            Date date = reminder.getDate();
            Calendar c = Calendar.getInstance();
            c.setTime(date);
            c.add(Calendar.HOUR_OF_DAY, reminder.getDeadline());
            Date newdate = c.getTime();
            if (newdate.getTime() < today.getTime()) {
                patientMapper.setReminderOutdated(reminder);
                if (reminder.getPriority() == 1) {
                    patient.setLowPriority(patient.getLowPriority() - 1);
                } else if (reminder.getPriority() == 2) {
                    patient.setMiddlePriority(patient.getMiddlePriority() - 1);
                } else {
                    patient.setHighPriority(patient.getHighPriority() - 1);
                }
                patientMapper.updatePatient(patient);
            }
        }
        Map<String, Object> hashmap = new HashMap<>();
        hashmap.put("reminderList", reminderList);
        return hashmap;
    }
}
