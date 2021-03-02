package com.amrit.backend;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.amrit.backend.Controller.ApiController;
import com.fasterxml.jackson.databind.JsonNode;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;



@SpringBootTest(properties = {"api.key=demo","io.reflectoring.scheduling.enabled=false" })

public class ApiControllerTest { 
  @Autowired
  public ApiController apiController;
    @Test
    public void testIntraDayData() throws Exception { 
        JsonNode financialData = apiController.getFinancialData("TIME_SERIES_INTRADAY", "IBM", "5min", "full");
        assertAll("JsonResponse",
        ()-> assertNotNull(financialData.get("Meta Data")),
        ()-> assertNotNull(financialData.get("Time Series (5min)"))
        );
    }
    @Test
    public void testMonthlyData() throws Exception {
      JsonNode financialData = apiController.getFinancialData("TIME_SERIES_DAILY", "IBM", "60min", "full");
      assertAll("JsonResponse",
      ()-> assertNotNull(financialData.get("Meta Data")),
      ()-> assertNotNull(financialData.get("Time Series (Daily)"))
      );
    }
    
    @Test
    public void testSearch() throws Exception {
     // myconfiguration.setApiKey("nondemo");
      JsonNode searchResults = apiController.getSearch("SYMBOL_SEARCH", "tesco");
      assertEquals(searchResults.withArray("bestMatches").get(0).get("1. symbol").asText(),"TESO");
    }

    @Test
    public void quoteSearch() throws Exception {
     // myconfiguration.setApiKey("demo");
      JsonNode searchResults = apiController.getQuote("GLOBAL_QUOTE", "IBM");
      assertEquals(searchResults.path("Global Quote").get("01. symbol").asText(),"IBM");
    }

}
