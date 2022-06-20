const { response } = require('express');
const express = require('express');
require('dotenv').config();
const app = express();
const XMLHttpRequest = require('xhr2');
const axios = require('axios');

const API_KEY = process.env.API_KEY;
const key_word = 'sherlock';

url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${key_word}&type=video&key=${API_KEY}`;

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ENVs
const PORT = process.env.PORT || 5500;
app.listen(PORT, () =>
    console.log(`server started at ${PORT}`));

//Requests
const router = express.Router();

app.use('/',router);
router.get('/', (req, res) => {

    axios.get(url).then(r=>console.log(r)).catch(err => console.log(err));
    res.send('yo');
})