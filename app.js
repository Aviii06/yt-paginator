//imports
const express = require('express');
const app = express();
require('dotenv').config();
const asyncServer = require('./server/asyncServer');
var util = require('util');
var encoder = new util.TextEncoder('utf-8');

//API URL
const API_KEYS = process.env.API_KEYS.split(", ");
const key_word = 'football';
let urls = [];
for (index in API_KEYS) {
    urls[index] = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${key_word}&type=video&key=${API_KEYS[index]}`;
}

//Async Server for fetching data from youtube API
if (process.env.RUN_ASYNC_SERVER == 1) {
    let curr = 0;
    asyncServer.main(urls, curr);
}

//Express configurations
app.use(express.json()); //Body parser
app.use(express.urlencoded({ extended: true })); //Body parser
const PORT = process.env.PORT || 8000; //Port
app.set('view engine', 'ejs'); //View engine 
app.use(express.static(__dirname + '/public/assets/')); //To use css

//Start Server
app.listen(PORT, () =>
    console.log(`server started at ${PORT}`));

//API
const rootRoute = require("./server/routers/rootRoute.js");
const searchRoute = require("./server/routers/searchRoute.js");

app.use('/', rootRoute);
app.use('/search', searchRoute);