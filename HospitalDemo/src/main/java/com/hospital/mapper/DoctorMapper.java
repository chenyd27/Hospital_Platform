package com.hospital.mapper;

import com.hospital.pojo.Doctor;
import com.hospital.pojo.Patient;
import com.hospital.pojo.Reminder;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import javax.print.Doc;
import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface DoctorMapper {
    public Doctor loginDoctor(@Param("email") String email, @Param("password") String password);
    public Doctor getDoctorInfo(@Param("email") String email);
    public Doctor basicInfo(@Param("email") String email);
    public List<Patient> getPatientList(Doctor doctor);
    public List<Reminder> getValidReminderList(Doctor doctor);
    public List<Reminder> getPastReminderList(Map<String,Object> map);
    public int addPatient(Map<String,Integer> map); // add a relationship with patient
    public int deletePatient(Map<String,Integer> map); // delete the relationship with patient
    public Patient getSinglePatient(@Param("email") String email);
    public Reminder getSingleReminder(@Param("reminderId") int reminderId);
    public int setReminderFinished(Reminder reminder);
    public int setReminderOutdated(Reminder reminder);
    public int updateReminder(Reminder reminder);
    public int addReminder(Reminder reminder);
    public int deleteSingleReminder(@Param("reminderId") int reminderId);
    public int deleteReminderbyPatient(@Param("patientId") int patientId);
    public List<Patient> getPatientsbySearch(@Param("query") String query);
}
