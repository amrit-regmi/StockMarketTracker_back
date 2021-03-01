package com.amrit.backend.Controller;
import com.amrit.backend.AlphavantageApi;
import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/")
public class ApiController {
  @Autowired
  AlphavantageApi api;
  
  @GetMapping(path="/query", produces = "application/json")
  public JsonNode getFinancialData(@RequestParam String function, String symbol, @RequestParam(required = false) String interval, String outputsize) throws Exception {
    JsonNode data = api.fetchFinancialData(function, symbol, interval, outputsize, true);
    return data;
  }

  @GetMapping(path="/quote", produces = "application/json")
  public JsonNode getQuote(@RequestParam String function, @RequestParam String symbol ) throws Exception {
    JsonNode data = api.fetchQuote(function, symbol,true);
    return data;
  }
  
  @GetMapping(path="/search", produces = "application/json")
  public JsonNode getSearch(@RequestParam String function, @RequestParam String keyword) throws Exception {
    JsonNode data = api.search(function,keyword);
    return data;
  }
}
