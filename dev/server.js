var express = require ('express');
var morgan = require('morgan');
var path = require('path');
const app_dir_path = __dirname;
// var bodyParser = require('body-parser');
// var cities = require('./data/city.list');

var app = express();
// var jsonParser = bodyParser.json();

app.use(morgan('dev'));
app.use(express.static(path.join(app_dir_path, '..', 'www')));

//app.use(bodyParser.urlencoded({ extended: true }));

/*app.use('/api/place/', jsonParser, function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    // res.end(JSON.stringify(cities, null, 2));
    res.end(cities);
});*/

app.set('port', process.env.PORT || 8014);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
