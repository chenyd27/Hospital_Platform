package com.hospital.controller;

//为什么甚至路径都一样，还是com.github.shyiko.***，
// 因为com.zendesk这个包，里面包了个com.github.shyiko.***这玩意，我怀疑是收购关系
import com.github.shyiko.mysql.binlog.BinaryLogClient;
import com.github.shyiko.mysql.binlog.event.*;
import com.hospital.controller.PatientController;
import com.hospital.mapper.PatientMapper;
import com.hospital.pojo.Patient;
import com.hospital.pojo.Reminder;
import com.hospital.service.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

//此类可以监控MySQL库数据的增删改
@RestController
@Slf4j
public class MysqlBinLogClient implements ApplicationRunner {

    @Autowired
    PatientMapper patientMapper;

    @Autowired
    WebSocketService webSocketService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        new Thread(() -> {
            connectMysqlBinLog();
        }).start();

    }

    /**
     * 连接mysqlBinLog
     */
    public void connectMysqlBinLog() {
        log.info("monitor BinLog");

        //自己MySQL的信息。host，port，username，password
        BinaryLogClient client = new BinaryLogClient("34.121.44.223", 3306, "cyd", "ccbysq520");

        client.setServerId(100);

        client.registerEventListener(event -> {
            EventData data = event.getData();
            TableMapEventData tableMapEventData = new TableMapEventData();
            // main method
            if(data instanceof WriteRowsEventData ){
                // && PatientController.pt != null  && Integer.parseInt(Arrays.stream(((WriteRowsEventData) data).getRows().get(0)).toArray()[1].toString()) == PatientController.pt.getPatientId()
                int index = Integer.parseInt(Arrays.stream(((WriteRowsEventData) data).getRows().get(0)).toArray()[2].toString());
                webSocketService.sendMessage(index + "");
            }
            //表数据发生修改时触发
            /**
             * if (data instanceof UpdateRowsEventData) {
             *                 System.out.println("Update:");
             *                 System.out.println(data.toString());
             *                 //表数据发生插入时触发
             *             } else if (data instanceof WriteRowsEventData) {
             *                 WriteRowsEventData writeRowsEventData = (WriteRowsEventData)data;
             *                 System.out.println("Insert:");
             *                 System.out.println(data.toString());
             *                 //表数据发生删除后触发
             *             } else if (data instanceof DeleteRowsEventData) {
             *                 System.out.println("Delete:");
             *                 System.out.println(data.toString());
             *             }
             * **/
        });
        try {
            client.connect();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/patient-monitor")
    public String getValidReminder(){
        Patient patient = PatientController.pt;
        List<Reminder> reminderList = patientMapper.getReminderList(patient);
        System.out.println(reminderList.size());
        return reminderList.size() + "";
    }
}
