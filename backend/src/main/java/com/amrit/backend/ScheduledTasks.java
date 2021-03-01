package com.amrit.backend;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Properties;
import java.util.Set;
import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {
  private static final Logger logger = LoggerFactory.getLogger(Scheduled.class);
  @Autowired
  private AlphavantageApi api;
  private Properties companies = new Properties();

   //Fetch data every 24 hours 
  @Scheduled(fixedDelay = 24*60*60*1000)
  public void scheduleTaskWithFixedDelay() throws Exception {
    logger.info("Auto Api Fetching Initialised @ "+ LocalDateTime.now());
    try {
      InputStream is = getClass().getClassLoader().getResourceAsStream("companies.properties");
      companies.load(is);
        /**Get all the hardcoded company symbols */
        Set<String> companySymbols = companies.stringPropertyNames();
        for (String symbol : companySymbols) {
          fetchData("TIME_SERIES_INTRADAY", symbol); 
          pause(12); //Pausing 12 seconds before another query API quoata is 5 queries per min so 12sec sleep 
          
          fetchData("TIME_SERIES_DAILY", symbol);
          pause(12); //Pausing 12 seconds before another query API quoata is 5 queries per min so 12sec sleep 
         
          fetchData("GLOBAL_QUOTE",symbol);
          pause(12); //Pausing 12 seconds before another query API quoata is 5 queries per min so 12sec sleep 
        }
      } catch (InterruptedException ex) {
        logger.error("Ran into an error {}", ex);
        throw new IllegalStateException(ex);
    }
  }
    /**Helper method to sleep in seconds */
    public void pause(double seconds)
    {
      try {
          Thread.sleep((long) (seconds * 1000));
      } catch (InterruptedException e) {}
    }

    /**
     * Helper function to fetch data and wait and retry in case of errors 
     * @param function
     * @param symbol
     * @return
     * @throws Exception
     */
    private boolean fetchData(String function, String symbol  ) throws Exception {
      Boolean error = false;
      Integer errorCount = 0;

      do {
        try {
          logger.info("Fetching " +function +" data for "+ symbol +"  @ "+ LocalDateTime.now() );
          if(function == "TIME_SERIES_INTRADAY" || function =="TIME_SERIES_DAILY"){ 
            JsonNode data = api.fetchFinancialData( function, symbol, "60min", "full", true);
            if(!(data.has("Time Series (60min)" ) || data.has("Time Series (Daily)"))) {
              error = true;
            }
          }
  
          if(function == "GLOBAL_QUOTE" ){
            JsonNode data = api.fetchQuote(function, symbol, true);
              if(!data.has("Global Quote")) {
                System.out.println(data);
                error = true;
              }
            }
          
        } catch (Exception e) {
            error = true;
            logger.info(e.getMessage());
        }
        
        if(error  && errorCount < 2){
          errorCount =errorCount +1;
          logger.info(function +" failed for "+ symbol +"  @ "+ LocalDateTime.now() + " Retrying attempt: " + errorCount );
          pause(60);
        }else {
          error = false;
          errorCount= 0;
        }
      
      } while (error && errorCount < 1);

      if(error){ 
        logger.info(function +" repeateadly failed for "+ symbol +" , Skipping Now");
        return error;
      }
      return !error;
    } 

}


