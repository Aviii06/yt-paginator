const schema = require('../database/schema.js');

//Gets all the data with a specific search query.
exports.findAll = async (query) => {
    return await schema.find({
        $or: [
            { description: { $regex: query, $options: "i" } },
            { videoTitle: { $regex: query, $options: "i" }, }
        ]
    })
        .sort({ publishTime: -1 });
}