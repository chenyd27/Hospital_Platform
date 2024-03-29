package com.hospital.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
// 全局配置类 —— 配置跨域请求
@Configuration // 配置类注解
// 继承一个跨域请求的类
public class WebConfig extends WebMvcConfigurationSupport {
    // 跨域请求方法,类似拦截操作！
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 允许的路径
                .allowedOriginPatterns("*") // 请求来源
                .allowedMethods("GET","POST","OPTION","DELETE","PUT") // 允许的请求方法
                .allowCredentials(true) // 是否允许携带参数
                .maxAge(3600); // 最大请求时间
    }
}