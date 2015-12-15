// defining globals for eslint
/*global theweather*/

var logger = require('loglevel');
var date = require('./date');

function update($widgets, $cityList, $updateTime) {
    $widgets.empty();
    $cityList.empty();
    $updateTime.text(date.lastUpdate());
}

// checked if localstorage empty
// if empty add  startup cities to localstorage
// and array of cities to load
// if not empty load to array the cities

function setLocalStorage() {
    if (localStorage && localStorage.getItem('cities')) {
        theweather.cities_widget = JSON.parse(localStorage["cities"]);
        logger.info('retrieved from localstorage');
        logger.debug(theweather.cities_widget);
    } else {
        localStorage.setItem('cities',JSON.stringify(theweather.cities_widget));
        logger.info('localstorage updated');
    }
}

exports.update = update;
exports.setLocalStorage = setLocalStorage;
