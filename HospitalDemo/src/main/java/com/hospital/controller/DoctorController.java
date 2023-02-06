package com.hospital.controller;

import com.hospital.mapper.DoctorMapper;
import com.hospital.pojo.Doctor;
import com.hospital.pojo.Patient;
import com.hospital.pojo.Reminder;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class DoctorController {
    @Autowired
    DoctorMapper doctorMapper;

    @RequestMapping("/doctor-login-origin")
    public Map<String,Object> loginPage(@RequestBody Map<String,String> map){
        Doctor doctor1 = doctorMapper.loginDoctor(map.get("email"),map.get("password"));
        boolean flag = false;
        if(doctor1 != null) flag = true;
        Map<String,Object> objectMap = new HashMap<>();
        objectMap.put("doctor",doctor1);
        objectMap.put("flag",flag);
        return objectMap;
    }

    @RequestMapping("/doctor-login")
    public Map<String, Object> login(@RequestBody Map<String,String> resmap){
        Doctor doctor = doctorMapper.loginDoctor(resmap.get("email"),resmap.get("password"));
        boolean flag = false;
        if(doctor != null){
            flag = true;
            doctor.setPatientList(doctorMapper.getPatientList(doctor));
            doctor.setReminderList(doctorMapper.getValidReminderList(doctor));
        }
        Map<String, Object> map = new HashMap<>();
        map.put("doctor",doctor);
        map.put("flag",flag);
        return map;
    }

    @RequestMapping("/doctor-info")
    public Map<String, Object> getInfo(@RequestBody Map<String,Object> resmap){
        Doctor doctor = doctorMapper.getDoctorInfo((String) resmap.get("email"));
        Map<String, Object> map = new HashMap<>();
        boolean flag = false;
        if(doctor != null){
            flag = true;
            List<Patient> patients = doctorMapper.getPatientList(doctor);
            patients.sort((a,b)->{
                if(a.getHighPriority() != b.getHighPriority()) return b.getHighPriority() - a.getHighPriority();
                else if(a.getMiddlePriority() != b.getMiddlePriority()) return b.getMiddlePriority() - a.getMiddlePriority();
                else return b.getLowPriority() - a.getLowPriority();
            });
            /**
             for(Patient patient : patients){
             patient.setHighPriority(doctorMapper.countHighPriority(patient));
             patient.setLowPriority(doctorMapper.countLowPriority(patient));
             patient.setMiddlePriority(doctorMapper.countMiddlePriority(patient));
             doctorMapper.updatePatient(patient);
             }
             */
            doctor.setPatientList(patients);
            map.put("doctor", doctor);
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
    public Map<String,Object> addReminder(@RequestBody Map<String,Object> map){
        System.out.println(map);
        Reminder reminder = new Reminder();
        reminder.setContent((String) map.get("reminderContent"));
        reminder.setDeadline(Integer.parseInt((String) map.get("duration")));
        reminder.setDoctorId((int)map.get("doctorId"));
        reminder.setPatientId(Integer.parseInt((String) map.get("patientId")));
        reminder.setDate(Calendar.getInstance().getTime());
        reminder.setPriority((int)map.get("priority"));
        Patient patient = doctorMapper.getSinglePatientById(reminder.getPatientId());
        if(reminder.getPriority() == 1){
            patient.setLowPriority(patient.getLowPriority() + 1);
        }else if(reminder.getPriority() == 2){
            System.out.println(reminder.getPriority());
            patient.setMiddlePriority(patient.getMiddlePriority() + 1);
        }else{
            patient.setHighPriority(patient.getHighPriority() + 1);
        }
        doctorMapper.updatePatient(patient);
        int res = doctorMapper.addReminder(reminder);
        Map<String,Object> hashMap = new HashMap<>();
        if(res > 0) hashMap.put("flag",true);
        else hashMap.put("flag",false);
        return hashMap;
    }

    @RequestMapping("/doctor-updateReminder")
    public String updateReminder(){
        Reminder reminder = doctorMapper.getSingleReminder(1);
        reminder.setContent("11111");
        int res = doctorMapper.updateReminder(reminder);
        return res > 0 ? "update" : "error";
    }

    @RequestMapping("/doctor-outdated")
    public Map<String, Object> handleOudated(@RequestBody Map<String,Object> resmap){
        Doctor doctor = doctorMapper.getDoctorInfo((String) resmap.get("email"));
        List<Reminder> reminders = doctorMapper.getValidReminderList(doctor);
        Date today = Calendar.getInstance().getTime();
        for(Reminder reminder : reminders){
            Date date = reminder.getDate();
            Calendar c = Calendar.getInstance();
            c.setTime(date);
            c.add(Calendar.HOUR_OF_DAY,reminder.getDeadline());
            Date newdate = c.getTime();
            if(newdate.getTime() < today.getTime()){
                doctorMapper.setReminderOutdated(reminder);
                Patient patient = doctorMapper.getSinglePatientById(reminder.getPatientId());
                if(reminder.getPriority() == 1){
                    patient.setLowPriority(patient.getLowPriority() - 1);
                }else if(reminder.getPriority() == 2){
                    patient.setMiddlePriority(patient.getMiddlePriority() - 1);
                }else{
                    patient.setHighPriority(patient.getHighPriority() - 1);
                }
                doctorMapper.updatePatient(patient);
            }
        }
        Map<String,Object> map = new HashMap<>();
        map.put("outdated",true);
        return map;
    }

    @RequestMapping("/doctor-finished")
    public String handleFinished(){
        Reminder reminder = doctorMapper.getSingleReminder(5);
        int res = doctorMapper.setReminderFinished(reminder);
        return res > 0 ? "finished" : "error";
    }
    @RequestMapping("/doctor-outdated-reminder")
    public Map<String,Object> getOutdatedReminderByPatient(@RequestParam("patientId") String patientId){
        List<Reminder> list = doctorMapper.getReminderOutdatedBySinglePatient(Integer.parseInt(patientId));
        Map<String,Object> hashmap = new HashMap<>();
        boolean flag = false;
        if(list != null) flag = true;
        hashmap.put("flag",flag);
        hashmap.put("outdatedReminderList",list);
        return hashmap;
    }

}
