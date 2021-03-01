package com.amrit.backend.Configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "api")
public class ApiConfiguration {
  @NonNull
  private String key = "RNRIZOC320RX5DKN";
  @NonNull
  private String endPoint = "https://www.alphavantage.co/query?";

  public String getApiKey(){
    return this.key;
  }
  public void setApiKey(String apiKey){
    this.key = apiKey;
  }
  public void setEndPoint(String uri){
    this.endPoint = uri;
  }

  public String getEndPoint(){
    return this.endPoint;
  }
}
