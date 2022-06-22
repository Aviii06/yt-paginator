const axios = require('axios');
const schema = require('./database/schema.js');

//Sleep function
const sleep = s => new Promise(res => setTimeout(res, s * 1000));

//Constants
const dbRefreshRate = process.env.DB_REFRESH_RATE; // At the time database gets data.

//This functions saves the data into the data base.
function saveData(item) {
    let vidURL = `https://www.youtube.com/watch?v=${item.id.videoId}`;
    let time = new Date(item.snippet.publishTime);

    const sch = new schema({
        videoTitle: item.snippet.title,
        description: item.snippet.description,
        thumbnailURL: item.snippet.thumbnails.high.url,
        videoURL: vidURL,
        publishTime: time,
    })

    if (process.env.SAVE_TO_DATA == 1) {
        sch.save().then()
            .catch(err => {
                console.log(err);
            });
    }
}

//This function gets data from the database.
async function getItem(item) {
    let vidURL = `https://www.youtube.com/watch?v=${item.id.videoId}`;
    let data = await schema.find({ videoURL: vidURL });

    return data;
}

//This to delete all the data from the database.
async function deleteAll() {
    await schema.deleteMany();
}

//This is the main funciton of the server whcih runs over and over.
exports.main = async function main(urls, curr) {
    console.log('Async Server is running');

    await axios.get(urls[curr]).then(res => {
        let items = res.data.items;
        for (let item of items) {
            getItem(item).then(data => {
                if (data.length == 0) {
                    console.log(item);
                    saveData(item);
                }
            });
        }
    }).catch(err => {
        curr = (curr + 1)%urls.length;
        console.log(err);
    });

    await sleep(dbRefreshRate);
    main(urls, curr);
}