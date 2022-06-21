const mongoose = require('mongoose');
const schema = mongoose.Schema;

const videoInfoSchema = new schema({
    videoTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailURL: {
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        required: true
    },
    publishTime: {
        type: Date,
        required: true
    },
});

const VideoInfo = mongoose.model('VideoInfo', videoInfoSchema);
module.exports =VideoInfo;
