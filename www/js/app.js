// defining globals for eslint
/*global theweather*/

// log settings
var logger = require('loglevel');
logger.setLevel("TRACE");

// modules
var $ = require('jquery');
var init = require('./lib/init');
var template = require('./lib/template');
var data = require('./lib/data');
var helper = require('./lib/helper');

// http://addyosmani.com/blog/essential-js-namespacing/
(function(window) {
    //define your applications root namespace
    window.theweather = {
        cities_widget: [2992166, 2246452, 4407066]
    };
})(window);

(function() {
    'use strict';

    $(document).ready(function() {
        var $widgets = $('#widgets');
        var $settings = $('#settings');
        var $cityList = $('.city-list');
        var $updateTime = $('.update-time time');

        // initialize app with localstorage
        init.setLocalStorage();
        // initialize layout
        init.update($widgets, $cityList, $updateTime);


        if (theweather.cities_widget.length === 0) {
            $widgets.html(template.nothingToShow());
        }

        // loaded content
        $.each(theweather.cities_widget, function(i, city) {
            $widgets.append(template.loadCity(city));
            data.load(city, $('.box-' + city), $cityList);
        });

        // Add a new city
        //
        // TODO:
        // need to be improved by adding an autocomplete
        // to suggest cities.
        // need to find an better api than geomap

        $('.btn-add-city').on('click', function() {
            var city = $('.search-city').val();
            if (!city) {
                $('main').prepend(
                    template.message(
                        'error',
                        'You need to search sommething'
                    )
                );
                helper.timer($('.msg'), 1500);
                return false;
            }
            data.add($widgets, $cityList, city);
        });

        // delete city

        $(document).on('click', '.btn-delete-city', function() {

            var city = $(this).attr('data-city-id');
            // removed selected id from array
            data.remove(city);

            $('main').prepend(
                template.message(
                    'good',
                    $(this).prev().text() + ' is removed'
                )
            );
            helper.timer($('.msg'), 1500);
            if (theweather.cities_widget.length === 0) {
                $widgets.html(template.nothingToShow());
            }
            $('.box-' + city).remove();
            $(this).parent().remove();
        });


        // switched pages

        $('.btn-settings-open').on('click', function() {
            $settings.removeClass('hide');
            $widgets.addClass('hide');
        });


        $('.btn-settings-close').on('click', function() {
            $settings.addClass('hide');
            $widgets.removeClass('hide');
        });

        // handled keypress events

        $('#q').keypress(function(event) {
            if (event.which == 13) {
                $('.btn-add-city').click();
            }
        });

    });
}()); // Immediately-Invoked Function Expression (IIFE)
