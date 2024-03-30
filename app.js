const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

      res.sendFile(__dirname + "/index.html");
        
       });

       app.post("/",function(req,res){
        
    const query = req.body.cityName;
    const apiKey = "dc964df3953172ba6333fe5486659c4d";
    const unit = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit; 

    https.get(url,function(response){
        console.log(response.statusCode);

       response.on("data",function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imgUrl = "http://openweathermap.org/img/w/" + icon  + ".png";
        
        
        res.write("The Temperature in "+query+" is " + temp +" degrees celcius.");
        res.write("The weather condition in shimla : " + weatherDescription);
        res.write("<img src=" + imgUrl + ">");
        res.send();

       });

    });


});



app.listen(4000,function(){
    console.log("Server is running on port 4000.");
});