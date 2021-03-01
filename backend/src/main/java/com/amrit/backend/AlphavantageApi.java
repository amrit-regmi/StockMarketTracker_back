package com.amrit.backend;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

import com.amrit.backend.Configuration.ApiConfiguration;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AlphavantageApi {
  private final RestTemplate dataFetcher = new RestTemplate();
  private final ObjectMapper mapper = new ObjectMapper();
  private final ApiConfiguration config;
    @Autowired 
    public AlphavantageApi(ApiConfiguration config) {
        this.config = config;
    }

  /**
   * Fetches intraday data if the api doesnot respond with properly formatted data return the  cached comapny data if exist.
   * @param function alphavantage api function
   * @param symbol company symbol 
   * @param interval data interval  1min, 5min, 15min, 30min, 60min for function "TIME_SERIES_INTRADAY", null for  TIME_SERIES_DAILY
   * @param outputsize full or compact
   * @param checkCache if the cache should be checked for failsafe and update
   * @return JsonNode 
   * @throws Exception
   */
  public JsonNode fetchFinancialData(String function, String symbol, String interval, String outputsize ,boolean checkCache) throws Exception {
      String url;
      if (function == "TIME_SERIES_INTRADAY"){
        url = config.getEndPoint() + "function=" +function +"&symbol=" + symbol + "&interval=" + interval + "&outputsize=" + outputsize + "&apikey=" + config.getApiKey();
      }
      else {
        interval = "Daily";
        url = config.getEndPoint() + "function=" +function +"&symbol=" + symbol  + "&outputsize=" + outputsize + "&apikey=" + config.getApiKey();
      }

    /**First fetch data from aplphavantage  */
    String result = dataFetcher.getForObject(url, String.class);
    JsonNode data = mapper.readTree(result);

    /**If the checkCache is not true return the response from server as is*/
    if(!checkCache) return data;

    /**Get saved data if exist */
    CompanyData cachedCompany = new CompanyData(symbol);
    String savedData =  cachedCompany.readData(interval);

    /**If the cached company data exist and fetched data is not valid return saved data */
    if(savedData != null && !data.has("Time Series ("+interval+")")){
        JsonNode savedData_json = mapper.readTree(savedData);
        return savedData_json; 
    } 

    /**If fetched data is valid check with saved data */
    if(data.has("Time Series ("+interval+")")){
      if(savedData != null){
        JsonNode savedData_json = mapper.readTree(savedData);
        
        /**Compare the saved data with fetched  data and save if newer data */
        SimpleDateFormat dateFormat =new SimpleDateFormat("yyyy-MM-dd");
        if(function == "TIME_SERIES_INTRADAY" ) dateFormat.applyPattern("yyyy-MM-dd hh:mm:ss"); 
        
        Date savedDate =  dateFormat.parse(savedData_json.path("Meta Data").get("3. Last Refreshed").asText());
        Date dataDate =  dateFormat.parse(data.path("Meta Data").get("3. Last Refreshed").asText());
       
        if(savedDate.before(dataDate)){
          cachedCompany.writeData(interval, result);
        }
      } 
      else{//If nosaved data 
        cachedCompany.writeData(interval, result);
      }
    }
    
    /**Return the response as it is */
    return data;
  }

   /**
   * Fetches global quote for the given company if the api doesnot respond with properly formatted data return the  cached comapny data if exist.
   * @param function alphavantage api function 
   * @param symbol company symbol
   * @param checkCache if the cache should be checked for failsafe and update
   * @return JsonNode 
   * @throws Exception
   */
  public JsonNode fetchQuote(String function,String symbol ,boolean checkCache) throws Exception {
    String url = config.getEndPoint()+"function="+function+"&symbol="+ symbol +"&apikey=" + config.getApiKey();
    String result = dataFetcher.getForObject(url, String.class);
    JsonNode data = mapper.readTree(result);

    /**If the checkCache is not true return the response from server as is*/
    if(!checkCache) {
      return data;
    }

    /**Get saved data if exist */
    CompanyData cachedCompany = new CompanyData(symbol);
    String savedData =  cachedCompany.readData("Quote");

    /**If the cached company data exist and fetched data is not valid return saved data */
    if(savedData != null && !data.has("Global Quote")){
        JsonNode savedData_json = mapper.readTree(savedData);
        return savedData_json; 
    } 

    /**If the data is valid */
    if(data.has("Global Quote")){
      if(savedData != null){
        JsonNode savedData_json = mapper.readTree(savedData);
        /**Compare the saved data with fetched  data and save if newer data */
        SimpleDateFormat dateFormat =new SimpleDateFormat("yyyy-MM-dd");
        Date savedDate =  dateFormat.parse(savedData_json.get("07. latest trading day").asText());
        Date dataDate =  dateFormat.parse(data.path("Meta Data").get("07. latest trading day").asText());
       
        if(savedDate.before(dataDate)){
          cachedCompany.writeData("Quote", result);
        }
      } 
      else{//If nosaved data 
        cachedCompany.writeData("Quote", result);
      }
    }
    return data;

  }

/**
 * Search the company information using keywords fall back to hardcoded results if fail 
 * @param function alphavantage Api function
 * @param keyword serach keyword
 * @return Json
 */
  public JsonNode search(String function, String keyword) throws JsonMappingException, JsonProcessingException {
    String url = config.getEndPoint() + "function="+function+"&keywords =" + keyword + "&apikey=" + config.getApiKey();
    String result = dataFetcher.getForObject(url, String.class);

    JsonNode data = mapper.readTree(result);

    /**
     * If the search was not successfull check if the search matches hardcoded
     * companies
     */
    if (data.get("bestMatch") == null) {
      JsonNode matches = searchInHardCodedCompany(keyword);
      
      //Return the search result only if there is a match 
      if(matches.get("bestMatches").size() > 0){
        return matches;
      }
    }
    return data;
  }

  public void setApi(String api) {

  }

  /**
   * Search the if the keyword matches the company stored in companies property 
   * @keyword keyword to search 
   * @return Json nodewith mathed results  on Array onbestMatches key,if no match bestMatch has empty array
   * */
  private JsonNode searchInHardCodedCompany(String keyword) {
    Properties companies = new Properties();
    ObjectNode result = mapper.createObjectNode();
    ArrayNode arrayNode = mapper.createArrayNode();

    result.set("bestMatches",arrayNode);
   
    try {
      InputStream is = getClass().getClassLoader().getResourceAsStream("companies.properties");
      companies.load(is);
      companies.forEach((k,v) -> {
        if(k.toString().toLowerCase().contains(keyword) || v.toString().toLowerCase().contains(keyword)){
          ObjectNode match = mapper.createObjectNode();
          match.put("1. symbol", v.toString());
          match.put("2. name", k.toString());
          match.put("4. region", "United States");
          arrayNode.add(match);          
        }
      });
    } catch (IOException e) {
      System.out.println(e.getMessage());
    }

    JsonNode newResult = result.deepCopy();
    return newResult;
    
  }  
}


