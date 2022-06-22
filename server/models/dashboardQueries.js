const schema = require('../database/schema.js');

//Gets all the data from database.
exports.findAll = async (perPage, page) => {
    return await schema
        .find({})
        .sort({ publishTime: -1 })
        .skip((perPage * page) - perPage)
        .limit(perPage);
}

//Counts total number of data in our database.
exports.count = async () => {
    return await schema.count();
}