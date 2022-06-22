const model = require('../models/searchQueries');

exports.post = (req, res) => {
    let query = req.body.query;
    res.redirect(`search/${query}`);

    // model.findAll(query).then((data)=>{
    //     res.render('searchPage', {
    //         data: data,
    //         query: query
    // })
    // });
};

exports.getParams = (req, res) => {
    let query = req.params.query;

    model.findAll(query).then((data)=>{
        res.render('searchPage', {
            data: data,
            query: query
    })
    });
};