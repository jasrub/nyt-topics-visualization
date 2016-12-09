var express = require('express');
var convert = require('simple-csv-to-json');
var app = express();

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

var file = __dirname + '/chartData.csv';
var fixtureData = convert.CSVtoJSON( file );

var fs = require('fs');

fs.readFile(__dirname + '/data.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
});

app.locals.barChartHelper = require('./bar_chart_helper');

app.get('/', function(req, res) {
  res.render('index', { fixtureData: fixtureData });
});

app.listen(3000);
console.log('listening on port 3000');