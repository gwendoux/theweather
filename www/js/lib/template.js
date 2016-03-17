var $ = require('jquery');
var logger = require('loglevel');
var helper = require('./helper');

function loadCity(city) {
    return '<div class="box-' + city + '">load city data ...</div>';
}

function widgetCity(res) {
    var widget_layout = [];
    widget_layout.push('<div id="' + res.city.id + '" class="weather-city-list">');
    widget_layout.push('<h2 class="city-name">' + res.city.name + ', <small>' + res.city.country + '</small></h2>');
    widget_layout.push('<div class="weather-status">');
    widget_layout.push('<i class="big wi wi-owm-' + res.list[0].weather[0].id + '"></i>');
    widget_layout.push('<h3 class="weather-description">' + res.list[0].weather[0].description + '</h3>');
    widget_layout.push('</div>');
    widget_layout.push('<div class="weather-info">');
    widget_layout.push('<p class="temperature"><i class="wi wi-thermometer"></i> ' + Math.round(res.list[0].main.temp) + '<small> °C</small></p>');
    widget_layout.push('<p class="humidity"><i class="wi wi-humidity"></small> ' + res.list[0].main.humidity + '<small> %</small></p>');
    widget_layout.push('</div>');
    widget_layout.push('</div>');

    return widget_layout.join('');
}

function cityList(res) {
    var list_layout = [];
    list_layout.push('<li class="city-list-item">');
    list_layout.push('<p>' + res.city.name + ', <small>' + res.city.country + '</small></p>');
    list_layout.push('<button data-city-id="' + res.city.id + '" class="btn-delete-city">&#9587;</button>');
    list_layout.push('</li>');

    return list_layout.join('');
}

function nothingToShow() {
    var layout = [];
    layout.push('<div class="city-list-none">');
    layout.push('<img class="city-list-none-img" src="img/sad-cloud.png" />');
    layout.push('<p>humm ... it’s better with at least one city</p>');
    layout.push('<a href="#" class="btn-settings-open">Add one and make a cloud happy</a>');
    layout.push('</div>');

    return layout.join('');
}

function message(type, text) {
    var message = [];
    message.push('<div class="msg msg-' + type + '">');
    message.push('<p class="msg-text">' + text + '</p>');
    message.push('</div>');

    return  message.join('');
}

function errorMessage(err) {
    $('main').prepend(
        message(
            'error',
            'Oups something went wrong'
        )
    );
    helper.timer($('.msg'), 1500);
    logger.debug(err);
}

exports.loadCity = loadCity;
exports.widgetCity = widgetCity;
exports.cityList = cityList;
exports.nothingToShow = nothingToShow;
exports.message = message;
exports.errorMessage = errorMessage;
