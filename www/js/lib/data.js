// defining globals for eslint
/*global theweather*/

var $ = require('jquery');
var logger = require('loglevel');
var config = require('./config');
var template = require('./template');
var helper = require('./helper');

function load(city, $my_city, $cityList) {
    $.ajax({
        url: config.openweather_api,
        jsonp: 'callback',
        dataType: 'jsonp',
        cache: false,
        data: {
            id: city,
            units: 'metric',
            appid: config.openweather_api_key
        },
        success: function(res) {
            $my_city.html(template.widgetCity(res));
            $cityList.append(template.cityList(res));
        },
        error: function(err) {
            template.errorMessage(err);
            $my_city.html(template.nothingToShow());
        }
    });
}

function add($widgets, $cityList, city) {
    $.ajax({
        url: config.openweather_api,
        jsonp: 'callback',
        dataType: 'jsonp',
        cache: false,
        data: {
            q: city,
            units: 'metric',
            appid: config.openweather_api_key
        },
        success: function(res) {
            logger.debug('res', res);
            // checked if this city is already added
            if (theweather.cities_widget.indexOf(res.id) >= 0) {
                logger.info('already in base');
                var msg = res.name + ', ' + res.sys.country + ' is already added';
                $('main').prepend(
                    template.message('error',msg)
                );
                helper.timer($('.msg'), 1500);
            } else {
                theweather.cities_widget.push(res.id);

                localStorage.setItem('cities',JSON.stringify(theweather.cities_widget));

                logger.debug(theweather.cities_widget);
                logger.info('localstorage updated');

                if (theweather.cities_widget.length > 0) {
                    $('.city-list-none').remove();
                }

                $cityList.prepend(template.cityList(res));
                $widgets.append(template.loadCity(res.id));
                $('.box-' + res.id).html(template.widgetCity(res));

                $('main').prepend(
                    template.message(
                        'good',
                        res.name + ', ' + res.sys.country + ' is added'
                    )
                );

                helper.timer($('.msg'), 1500);
            }
            $('.search-city').val('');
        },
        error: function(err) {
            template.errorMessage();
            $('.search-city').val('');
        }
    });
}

function remove(city) {
    theweather.cities_widget = $.grep(theweather.cities_widget, function(value) {
        return value != city;
    });

    localStorage.setItem('cities',JSON.stringify(theweather.cities_widget));
    logger.info('localstorage updated');

}

exports.load = load;
exports.add = add;
exports.remove = remove;
