package com.amrit.backend.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
  @CrossOrigin(origins = "http://localhost:8080")
  @GetMapping(value = {"/demo"})
  public String index() {
    return "index.html";
  }
  
}
