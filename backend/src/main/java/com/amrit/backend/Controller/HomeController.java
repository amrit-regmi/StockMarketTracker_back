package com.amrit.backend.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
  @GetMapping(value = {"/demo"})
  public String index() {
    return "index.html";
  }
  
}
