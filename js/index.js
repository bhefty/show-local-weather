if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude + ',' + position.coords.longitude);
  })
} else {
  loadWeather("Austin, TX", "");
}

$(document).ready(function() {
  setInterval(loadWeather, 1000);
});

var sunShower = '<div class="icon sun-shower"><div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div></div>';

var thunderStorm = '<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>';

var cloudy = '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';

var flurries = '<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>';

var sunny = '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';

var rainy = '<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>';

var sunCloud = '<div class="icon sun-cloud"><div class="cloud"></div><div class="sun"><div class="rays"></div></div></div>';

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      unit = this.unit;
      unit = unit.toUpperCase();
      city = weather.city;
      region = weather.region;
      temp = weather.temp + '&deg;' + ' ' + unit;
      altTemp = weather.alt.temp + '&deg; C';
      weatherCurrent = weather.currently;
      image = weather.image;

      //weather code icon
      switch (weather.code) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "17":
        case "37":
        case "38":
        case "39":
        case "45":
        case "47":
          animated = thunderStorm;
          break;
        case "5":
        case "6":
        case "7":
        case "8":
        case "10":
        case "13":
        case "14":
        case "15":
        case "16":
        case "18":
        case "41":
        case "42":
        case "43":
        case "46":
          animated = flurries;
          break;
        case "9":
        case "11":
        case "12":
        case "40":
          animated = rainy;
          break;
        case "19":
        case "20":
        case "21":
        case "22":
        case "23":
        case "24":
        case "25":
        case "26":
          animated = cloudy;
          break;
        case "27":
        case "28":
        case "29":
        case "30":
        case "44":
          animated = sunCloud;
          break;
        case "31":
        case "32":
        case "33":
        case "34":
        case "36":
          animated = sunny;
          break;
        case "35":
          animated = sunShower;
          break;
        default:
          animated = image;
      }

      $("#location").text(city + ', ' + region);
      $("#temperature").html(temp);
      //$("#temperature").html(altTemp);
      $("#weatherCurrent").text(weatherCurrent);
      $("#animation").html(animated);
    },
    error: function(error) {
      $(".error").html('<p>' + error + '</p>');
    }
  });
}
