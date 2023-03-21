const express = require("express"); 
const https = require("https");
const bodyParser = require("body-parser");  //inside "" is module

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // when use body-parser, this line required

app.get("/", function (req, res) {  //APi end point name => "/" variable should be unique name"
    res.sendFile(__dirname + "/index.html");
});
//-----------------------------------------

app.post("/getWeather", function (req, res) { //APi end point name => "/getWeather" should be unique name"
    console.log("Post request received.");
    const query = req.body.cityName;
    const apiKey = "";
    const url = "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + query + "&aqi=no";

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.current.temp_f;
            // const cityName = weatherData.location.name 
            const region = weatherData.location.region;
            const timeZone = weatherData.location.tz_id;
            const localTime = weatherData.location.localtime;
            const icon = weatherData.current.condition.icon;
            res.write("<h1>The temperature in " + query + ", " + region + " is " + temp + " degrees Fahrenheit.</h1>");
            res.write("<h2>The local time zone is " + timeZone + " /" + localTime + "</h2>");
            res.write("<img src=" + icon + ">");
        })
    })
})

app.listen(3000, function () {
    console.log("Sever is running on port 3000.");
})
