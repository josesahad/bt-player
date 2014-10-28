var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var fs = require("fs")

var routes = require('./routes/index')
var albums = require('./routes/albums')
var songs = require('./routes/songs')
var search = require('./routes/search')

var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/search', search.search)

app.use('/albums', albums)

app.get('/albums/:albumId/songs', songs.getSongs)
app.get('/albums/:albumId/songs/:songId', songs.getSong)

module.exports = app;

