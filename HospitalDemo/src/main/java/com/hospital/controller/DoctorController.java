package com.hospital.controller;

import com.hospital.mapper.DoctorMapper;
import com.hospital.pojo.Doctor;
import com.hospital.pojo.Patient;
import com.hospital.pojo.Reminder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class DoctorController {
    @Autowired
    DoctorMapper doctorMapper;

    @RequestMapping("/doctor-login")
    public Map<String, Object> login(){
        Doctor doctor = doctorMapper.loginDoctor("yic192@pitt.edu","123");
        boolean flag = false;
        if(doctor != null){
            flag = true;
            doctor.setPatientList(doctorMapper.getPatientList(doctor));
            doctor.setReminderList(doctorMapper.getValidReminderList(doctor));
        }
        Map<String, Object> map = new HashMap<>();
        map.put(doctor.getEmail(),doctor);
        map.put("flag",flag);
        return map;
    }

    @RequestMapping("/doctor-info")
    public Map<String, Object> getInfo(){
        Doctor doctor = doctorMapper.getDoctorInfo("yic192@pitt.edu");
        Map<String, Object> map = new HashMap<>();
        boolean flag = false;
        if(doctor != null){
            flag = true;
            doctor.setPatientList(doctorMapper.getPatientList(doctor));
            map.put(doctor.getEmail(), doctor);
        }
        map.put("flag",flag);
        return map;
    }

    @RequestMapping("/doctor-pastreminders")
    public Map<String, Object> getPastReminders(){
        Map<String, Object> map = new HashMap<>();
        Date today = new Date();
        map.put("hours",72);
        map.put("doctorId",1);
        map.put("today",today);
        List<Reminder> reminderList = doctorMapper.getPastReminderList(map);
        Map<String,Object> hashmap = new HashMap<>();
        boolean flag = false;
        if(reminderList != null){
            flag = true;
            hashmap.put("pastList",reminderList);
        }
        hashmap.put("flag", flag);
        return hashmap;
    }

    @RequestMapping("/doctor-addpatient")
    public String addPatient(){
        Map<String,Integer> map = new HashMap<>();
        Patient patient = doctorMapper.getSinglePatient("15919173224@163.com");
        if(patient == null) return "nullpatient";
        map.put("patientId", patient.getPatientId());
        map.put("doctorId",2);
        int res = doctorMapper.addPatient(map);
        return res > 0 ? "add" : "error";
    }

    @RequestMapping("/doctor-deletepatient")
    public String deletePatient(){
        Patient patient = doctorMapper.getSinglePatient("18011784578@163.com");
        Doctor doctor = doctorMapper.getDoctorInfo("yic192@pitt.edu");
        Map<String,Integer> map = new HashMap<>();
        map.put("patientId",patient.getPatientId());
        map.put("doctorId",doctor.getDoctorId());
        int res = doctorMapper.deletePatient(map);
        return res > 0 ? "deleted" : "error";
    }

    @RequestMapping("/doctor-addreminder")
    public String addReminder(){
        Reminder reminder = new Reminder();
        reminder.setContent("3333333");
        reminder.setDeadline(3);
        reminder.setDoctorId(1);
        reminder.setPatientId(1);
        reminder.setDate(Calendar.getInstance().getTime());
        reminder.setPriority(3);
        int res = doctorMapper.addReminder(reminder);
        return res > 0 ? "addreminder" : "error";
    }

    @RequestMapping("/doctor-updateReminder")
    public String updateReminder(){
        Reminder reminder = doctorMapper.getSingleReminder(1);
        reminder.setContent("11111");
        int res = doctorMapper.updateReminder(reminder);
        return res > 0 ? "update" : "error";
    }

    @RequestMapping("/doctor-outdated")
    public String handleOudated(){
        Doctor doctor = doctorMapper.getDoctorInfo("yic192@pitt.edu");
        List<Reminder> reminders = doctorMapper.getValidReminderList(doctor);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat();
        Date today = Calendar.getInstance().getTime();
        for(Reminder reminder : reminders){
            Date date = reminder.getDate();
            Calendar c = Calendar.getInstance();
            c.setTime(date);
            c.add(Calendar.HOUR_OF_DAY,reminder.getDeadline());
            Date newdate = c.getTime();
            System.out.println(newdate);
            if(newdate.getTime() < today.getTime()){
                doctorMapper.setReminderOutdated(reminder);
            }
        }
        return "outdated";
    }

    @RequestMapping("/doctor-finished")
    public String handleFinished(){
        Reminder reminder = doctorMapper.getSingleReminder(5);
        int res = doctorMapper.setReminderFinished(reminder);
        return res > 0 ? "finished" : "error";
    }
}
