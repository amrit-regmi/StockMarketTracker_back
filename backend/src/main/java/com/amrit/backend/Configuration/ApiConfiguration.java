package com.amrit.backend.Configuration;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("api")
public class ApiConfiguration {
  @NonNull
  private String key;
  @NonNull
  private String endPoint ;
  private Map<String, String> companies = new HashMap<>() ;

  public String getkey(){
    return this.key;
  }
  public void setkey(String apiKey){
    this.key = apiKey;
  }
  public void setendPoint(String uri){
    this.endPoint = uri;
  }
  public String getendPoint(){
    return this.endPoint;
  }
  public Map<String, String> getcompanies(){
    return this.companies;
  }

  public void addCompany(String symbol, String name) {
    this.companies.put(symbol, name);
  }
  
  public void removeCompany(String symbol) {
    this.companies.remove(symbol);
  }
  
}
