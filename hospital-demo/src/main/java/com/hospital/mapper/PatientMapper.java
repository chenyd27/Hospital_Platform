package com.hospital.mapper;

import com.hospital.pojo.Patient;
import com.hospital.pojo.Reminder;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface PatientMapper {
    public Patient loginPatient(@Param("email") String email, @Param("password") String password);
    public Patient getPatientInfo(@Param("email") String email);

    public Patient getPatientbyId(@Param("patientId") int patientId);
    public List<Reminder> getReminderList(Patient patient);
    public int setReminderFinished(@Param("reminderId")int reminderId);

    public int setReminderOutdated(Reminder reminder);

    public int updatePatient(Patient patient);

}
