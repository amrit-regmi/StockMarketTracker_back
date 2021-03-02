package com.amrit.backend;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

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
      if (function.equals("TIME_SERIES_INTRADAY")){
        url = config.getendPoint() + "function=" +function +"&symbol=" + symbol + "&interval=" + interval + "&outputsize=" + outputsize + "&apikey=" + config.getkey();
      }
      else {
        interval = "Daily";
        url = config.getendPoint() + "function=" +function +"&symbol=" + symbol  + "&outputsize=" + outputsize + "&apikey=" + config.getkey();
      }

      /**First fetch data from aplphavantage  */
      String result = dataFetcher.getForObject(url, String.class);
      JsonNode data = mapper.readTree(result);

      /**If the checkCache is not true return the response from server as is*/
      if(!checkCache) return data;

      /**If the compnay is one of hardoced companies */
      if(searchInHardCodedCompany(symbol).size() > 0 ) { //demo key is used during test we want to allow her efor testing
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
          
          /**If saved data doesnot exist write to file and return */
          if(savedData == null){
            cachedCompany.writeData(interval, result);
            return data;
          }

          JsonNode savedData_json = mapper.readTree(savedData);
          
          /**Compare the saved data with fetched  data and save if newer data */
          SimpleDateFormat dateFormat =new SimpleDateFormat("yyyy-MM-dd");
          if(function.equals("TIME_SERIES_INTRADAY") ) dateFormat.applyPattern("yyyy-MM-dd hh:mm:ss"); 
          
          Date savedDate =  dateFormat.parse(savedData_json.path("Meta Data").get("3. Last Refreshed").asText());
          Date dataDate =  dateFormat.parse(data.path("Meta Data").get("3. Last Refreshed").asText());
          
          /**If saved data is older than the fetched data save */
          if(savedDate.before(dataDate)){
            cachedCompany.writeData(interval, result);
          }
        }
      }
      /**Return the data as is  */
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
    String url = config.getendPoint()+"function="+function+"&symbol="+ symbol +"&apikey=" + config.getkey();
    String result = dataFetcher.getForObject(url, String.class);
    JsonNode data = mapper.readTree(result);

    /**If the checkCache is not true return the response from server as is*/
    if(!checkCache ) {
      return data;
    }

    /**If the compnay is one of hardoced companies */
    if(searchInHardCodedCompany(symbol).size() > 0 ) { 
      /**Get saved data if exist */


      CompanyData cachedCompany = new CompanyData(symbol);
      String savedData =  cachedCompany.readData("Quote");

      /**If the cached company data exist and fetched data is not valid return saved data */
      if(savedData != null && !data.has("Global Quote")){      
          JsonNode savedData_json = mapper.readTree(savedData);
          return savedData_json; 
      } 

      /**If the data is valid */
      if(data.has("Global Quote")) {

        /**If saved data doesnot exist write to file and return */
        if(savedData == null){
          cachedCompany.writeData("Quote" ,result);
          return data;
        }
        
        JsonNode savedData_json = mapper.readTree(savedData); 
        /**Compare the saved data with fetched  data and save if newer data */
        SimpleDateFormat dateFormat =new SimpleDateFormat("yyyy-MM-dd");
        Date savedDate =  dateFormat.parse(savedData_json.path("Global Quote").get("07. latest trading day").asText());
        Date dataDate =  dateFormat.parse(data.path("Global Quote").get("07. latest trading day").asText());
      
         /**If saved data is older than the fetched data save */
        if(savedDate.before(dataDate)){
          cachedCompany.writeData("Quote", result);
        }
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
    String url = config.getendPoint() + "function="+function+"&keywords=" + keyword + "&apikey=" + config.getkey();
    String result = dataFetcher.getForObject(url, String.class);

    JsonNode data = mapper.readTree(result);

    /**
     * If the search was not successfull check if the search matches hardcoded
     * companies
     */
    if (data.get("bestMatch") == null) {
      ArrayList<String[]> matches = searchInHardCodedCompany(keyword);
      
      //If the local search returns a match 
      if(matches.size() > 0){
        ObjectNode wrapper = mapper.createObjectNode();
        ArrayNode node = mapper.createArrayNode();
        wrapper.set("bestMatches",node);

        matches.forEach( k-> {
          ObjectNode match = mapper.createObjectNode();
          match.put("1. symbol", k[0]);
          match.put("2. name", k[1]);
          match.put("3. type","Equity");
          match.put("4. region", "United States");
          node.add(match);     
        });

        JsonNode t = wrapper.deepCopy();
        return t;       
      }
    }
    return data;
  }

  /**
   * Search the if the keyword matches the company stored in companies property 
   * @keyword keyword to search 
   * @return Arraylist[symbol,name] with matches
   * */
  private ArrayList<String[]> searchInHardCodedCompany(String keyword) {
    Map<String,String> companies = config.getcompanies();
    ArrayList<String[]> matches = new ArrayList<String[]>();
      companies.forEach((k,v) -> {
        if(k.toLowerCase().contains(keyword.toLowerCase()) || v.toLowerCase().contains(keyword.toLowerCase())){
          String[] data =new String []{k,v};
          matches.add(data);     
        }
      });
    return matches;
  }  
}


