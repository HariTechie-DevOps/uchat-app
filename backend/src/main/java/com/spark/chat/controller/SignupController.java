package com.spark.chat.controller;

import com.spark.chat.dto.SignupRequest;
import com.spark.chat.dto.SignupResponse;
import com.spark.chat.entity.LanguagePreference;
import com.spark.chat.repository.LanguageRepository;
import com.spark.chat.services.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller; // Changed from RestController
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@Controller // Use @Controller so we can return both HTML and JSON
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class SignupController {

    private final SignupService service;

    @Autowired
    private LanguageRepository langRepo;

    public SignupController(SignupService service) {
        this.service = service;
    }

    // ==========================================
    // 1. PAGE ROUTING (Returns HTML)
    // ==========================================

    @GetMapping("/")
    public String showLanding() {
        return "forward:/landing.html"; // Your React Animation
    }

    @GetMapping("/login")
    public String showLogin() {
        return "forward:/signin.html";
    }

    @GetMapping("/verify")
    public String showOtp() {
        return "forward:/sendotp.html";
    }

    @GetMapping("/reset-password")
    public String showReset() {
        return "forward:/resetpassword.html";
    }

    @GetMapping("/choose-language")
    public String showLanguageSelection() {
        return "forward:/chooseyourlanguage.html";
    }

    // ==========================================
    // 2. API ENDPOINTS (Returns JSON Data)
    // Note: Use @ResponseBody on these methods
    // ==========================================

    @PostMapping("/api/signup")
    @ResponseBody
    public SignupResponse signup(@RequestBody SignupRequest request) {
        return service.handlesignup(request);
    }

    @PostMapping("/api/signin")
    @ResponseBody
    public SignupResponse signin(@RequestBody SignupRequest request) {
        return service.handleSignin(request); 
    }

    @GetMapping("/api/languages")
    @ResponseBody
    public List<String> getSupportedLanguages() {
        List<LanguagePreference> allPrefs = langRepo.findAll();
        if (allPrefs.isEmpty()) {
            return Arrays.asList("English", "Japanese", "Spanish", "French", "German", "Hindi", "Tamil");
        }
        return allPrefs.stream()
                .map(LanguagePreference::getLanguage)
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());
    }

    @PostMapping("/api/password/send-otp")
    @ResponseBody
    public SignupResponse sendOtp(@RequestBody Map<String, String> payload) {
        return service.sendOtp(payload.get("mobile"));
    }

    @PostMapping("/api/password/verify-otp")
    @ResponseBody
    public SignupResponse verifyOtp(@RequestBody Map<String, String> payload) {
        return service.verifyOtp(payload.get("mobile"), payload.get("otp"));
    }

    @PostMapping("/api/password/reset")
    @ResponseBody
    public SignupResponse resetPassword(@RequestBody Map<String, String> payload) {
        return service.updatePassword(payload.get("mobile"), payload.get("password"));
    }

    @PostMapping("/api/save-language")
    @ResponseBody
    public SignupResponse saveLanguage(@RequestBody Map<String, String> request) {
        String mobile = request.get("mobile");
        String language = request.get("language");

        LanguagePreference pref = langRepo.findByMobile(mobile)
                .orElse(new LanguagePreference());
        
        pref.setMobile(mobile);
        pref.setLanguage(language);
        langRepo.save(pref);

        return new SignupResponse(true, null, "Language saved successfully");
    }
}
