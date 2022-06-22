const mongoose = require('mongoose');

//MangoDb creds
const mongo_password = process.env.MONGO_PASSWORD;
const mongo_username = process.env.MONGO_USERNAME;
const dbURI = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.0uesip7.mongodb.net/yt-paginator?retryWrites=true&w=majority`;

//Connect to mongodb
mongoose.connect(dbURI).then((res)=>{
    console.log('connected to the database');
}).catch((err)=>{
    console.log(err);
}); 

module.exports = mongoose;