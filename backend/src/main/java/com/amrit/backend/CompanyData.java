package com.amrit.backend;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CompanyData {
  private static final Logger logger = LoggerFactory.getLogger(CompanyData.class);
  private String symbol;
  private String dataPath;

  public CompanyData(String symbol){
    this.symbol = symbol;
    this.dataPath = "data/"+symbol;
  }

  public void setDataPath(String path){
    this.dataPath = path;
  }

  public String readData(String dataType) throws Exception {
    String file = dataPath+"/"+dataType+"_data.json"; 
    Path path = Paths.get(file);
    /**If the data doesnot exist return null value  */
    if(!Files.exists(path)){
      return null;
    }
    
    Stream<String> lines = Files.lines(path);
    String data = lines.collect(Collectors.joining("\n"));
    lines.close();
    return data;
    

}

  public void writeData(String dataType, String data) {
    try {
      String content = data;
      File directory = new File(dataPath);
      
      if (! directory.exists()){
        directory.mkdirs();
      }
      File file = new File(dataPath+"/"+dataType+"_data.json");

      if(!file.exists()){
        file.createNewFile();
      }

      FileWriter fw = new FileWriter(file.getAbsoluteFile());
      BufferedWriter bw = new BufferedWriter(fw);
      bw.write(content);
      bw.close();

      logger.info( dataType + "_data saved for " + symbol + " @"+ dataPath );

  } catch (IOException e) {
    logger.info(e.getMessage());
  }

  }
  
}
