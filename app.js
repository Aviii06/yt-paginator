const { response } = require('express');
const express = require('express');
require('dotenv').config();
const app = express();
const XMLHttpRequest = require('xhr2');
const axios = require('axios');
const mongoose = require('mongoose');
const schema = require('./models/schema.js');
const { find } = require('./models/schema.js');


//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Port
const PORT = process.env.PORT || 5500;
//Constants
const dbRefreshRate = 5; // At the time database gets data

//Sleep function
const sleep = s => new Promise(res => setTimeout(res, s*1000));

//API URL
const API_KEY = process.env.API_KEY;
const key_word = 'sherlock';
url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${key_word}&type=video&key=${API_KEY}`;

//Connect to mongodb
const mongo_password = process.env.MONGO_PASSWORD;
const mongo_username = process.env.MONGO_USERNAME;
const dbURI = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.0uesip7.mongodb.net/yt-paginator?retryWrites=true&w=majority`;

mongoose.connect(dbURI).then((res)=>{
    console.log('connected to the database');
    app.listen(PORT, () =>
    console.log(`server started at ${PORT}`));
}).catch((err)=>{
    console.log(err);
}); 

//View engine 
app.set('view engine', 'ejs');
//To use css
app.use(express.static(__dirname + '/public'));

//API
const router = express.Router();

app.use('/',router);
router.get('/',(req,res)=>{
    res.redirect('/1');
})
router.get('/:page', (req, res) => {
    var perPage = 9
    var page = req.params.page || 1

    schema
        .find({})
        .sort({publishTime: -1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, data) {
            schema.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('homePage', {
                    data: data,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})
router.get('/search',(req,res)=>{
})

//Server 
function saveData(item, iter){
    let vidURL =  `https://www.youtube.com/watch?v=${item.id.videoId}`;
    let time = new Date(item.snippet.publishTime);

    const sch = new schema({
        videoTitle: item.snippet.title,
        description: item.snippet.description,
        thumbnailURL: item.snippet.thumbnails.high.url,
        videoURL: vidURL,
        publishTime: time,
    })

    sch.save().then()
    .catch(err=>{
        console.log(err);
    });
}

async function getItem(item){
    let vidURL = `https://www.youtube.com/watch?v=${item.id.videoId}`;
    let data = await schema.find({videoURL:vidURL});

    return data;
}
async function deleteAll(){
    await schema.deleteMany();
}

async function main(url){
    console.log('main working');
    await axios.get(url).then(res=>{
        let items = res.data.items;

        for(let item of items){
            getItem(item).then(data=>{
                if(data.length == 0){
                    saveData(item);
                }
            });
        }
    }).catch(err => console.log(err));

    await sleep(dbRefreshRate);
    main(url);
}
//main(url);