const express = require('express');
require('dotenv').config();
const app = express();

const API_KEY = process.env.API_KEY;

url = `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${API_KEY}&part=snippet,contentDetails,statistics,status`;

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
    res.send(url);
});