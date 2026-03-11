package com.serenity.serenityai.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String home() {
        return "Serenity AI Backend Running Successfully";
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Serenity AI";
    }
}