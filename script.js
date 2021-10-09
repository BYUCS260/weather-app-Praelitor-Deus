document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
        return;
    console.log(value);
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=7f55f2c6773a0a00a27420ad2c77b5f8";
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
        let results = "";
        results += '<h2>Weather in ' + json.name + "</h2>";
        for (let i=0; i < json.weather.length; i++) {
            results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h2>' + json.main.temp + " &deg;F</h2>"
        results += "<p>"
        for (let i=0; i < json.weather.length; i++) {
            results += json.weather[i].description
            if (i !== json.weather.length - 1)
                results += ", "
        }
        results += "</p>";
        document.getElementById("weatherResults").innerHTML = results;
    });

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=1c8210d59bbd9d8851e5101daa18812a";
    fetch(url2)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
        let forecast = "";
        forecast += "<hr>" + "<h1>Forecast</h1>";
        for (let i=0; i < json.list.length; i++) {
            if ((i == 0) || (moment(json.list[i - 1].dt_txt).format('MMMM Do YYYY') != moment(json.list[i].dt_txt).format('MMMM Do YYYY'))) {
                forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</h2>";
            }
            forecast += "<span class='time'>" + moment(json.list[i].dt_txt).format('h:mm a') + "</span>";
            forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
            forecast += "<span class='temp'>" +" Temperature: " + json.list[i].main.temp + "</span>";
            forecast += "<span class='feels-like'>" + "Feels like: " + json.list[i].main.feels_like + "</span>";
            forecast += "<span class='humidity'>" + "Humidity: " + json.list[i].main.humidity + "%" + "</span>";
            forecast += "<hr>";
        }
        document.getElementById("forecastResults").innerHTML = forecast;
    });
});
