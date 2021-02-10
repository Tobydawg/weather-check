fetch("http://api.openweathermap.org/data/2.5/forecast?q=Nashville&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial")
    .then(function (response) {

        return response.json();
    })
    .then(function (data) {
        console.log(data);

        for (var i = 0; i < data.list.length; i++) {

            if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                var d = data.list[i].dt_txt;
                console.log(d)
                var dateConversion = moment(d.substring(0, 10)).format("dddd, MM-DD-YYYY");
                console.log(dateConversion);

                var dateForecast = document.getElementById("dateForecast")

                var dateEl = document.createElement("p");
                console.log(dateEl)

                dateEl.append(dateConversion);

                dateForecast.appendChild(dateEl);
                
            }
        };

    });
