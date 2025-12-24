package com.hanji.hanji_craft.presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Locale;

@Controller
public class HomeController {

    @Autowired
    private MessageSource messageSource;

    @GetMapping("/")
    public String home(Model model, Locale locale) {
        String title = messageSource.getMessage("site.title", null, locale);
        String subtitle = messageSource.getMessage("site.subtitle", null, locale);

        model.addAttribute("title", title);
        model.addAttribute("subtitle", subtitle);
        return "index";
    }

    @GetMapping("/lang")
    public String changeLanguage(@RequestParam("lang") String lang) {
        return "redirect:/?lang=" + lang;
    }
}