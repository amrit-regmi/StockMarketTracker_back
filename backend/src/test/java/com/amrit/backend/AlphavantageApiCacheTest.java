package com.amrit.backend;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.amrit.backend.Configuration.ApiConfiguration;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest(properties = {"io.reflectoring.scheduling.enabled=false" })
public class AlphavantageApiCacheTest {
  @Autowired
  public AlphavantageApi api;
  @Autowired ApiConfiguration apiConfig;
    @AfterEach
    public void removeIBM() throws IOException {
      apiConfig.removeCompany("IBM");
      FileUtils.deleteDirectory(new File("alphavantageApiData/IBM"));
    }
    
    @Test 
    public void api_Request_For_Hardcoded_Companies_are_Stored_in_cache() throws Exception {
      apiConfig.addCompany("IBM", "IBM");
      apiConfig.setkey("demo");

      JsonNode financialData = api.fetchFinancialData("TIME_SERIES_INTRADAY", "IBM", "5min", "full" ,true);
      String file = "alphaVantageAPiData/IBM/5min_data.json"; 
      
      Path path = Paths.get(file);
      assertEquals(Files.exists(path),true);
        
      CompanyData cachedCompany = new CompanyData("IBM");
      String savedData =  cachedCompany.readData("5min");

      ObjectMapper mapper = new ObjectMapper();
      assertEquals(mapper.readTree(savedData), financialData);
    } 
  
    @Test
    public void failed_api_Request_For_Company_not_in_Cache_Should_not_Have_Data() throws Exception { 
        apiConfig.setkey("FakeKey");
        JsonNode financialData = api.fetchFinancialData("TIME_SERIES_INTRADAY", "IBM", "5min", "full",true);
        assertAll("JsonResponse",
        ()-> assertNull(financialData.get("Meta Data")),
        ()-> assertNull(financialData.get("Time Series (5min)"))
        );

        String file = "alphaVantageAPiData/IBM/5min_data.json"; 
         Path path = Paths.get(file);
       
      
        assertEquals(Files.exists(path),false);
    }

    @Test
    public void api_Request_For_Company_in_Cache_Should_always_respond_with_Data() throws Exception { 
      apiConfig.addCompany("IBM", "IBM");
      apiConfig.setkey("demo");
      
      JsonNode financialData = api.fetchFinancialData("TIME_SERIES_INTRADAY", "IBM", "5min", "full",true);
      assertAll("JsonResponse",
        ()-> assertNotNull(financialData.get("Meta Data")),
        ()-> assertNotNull(financialData.get("Time Series (5min)"))
      );

      String file = "alphaVantageAPiData/IBM/5min_data.json"; 
      Path path = Paths.get(file);
      assertEquals(Files.exists(path),true);

      apiConfig.setkey("fakeKey");
      JsonNode newfinancialData = api.fetchFinancialData("TIME_SERIES_INTRADAY", "IBM", "5min", "full",true);
      
      assertAll("JsonResponse",
        ()-> assertNotNull(newfinancialData.get("Meta Data")),
        ()-> assertNotNull(newfinancialData.get("Time Series (5min)"))
      );

      
  }
}
