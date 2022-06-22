const model = require('../models/dashboardQueries');

exports.default = (req,res)=>{
    res.redirect('/1'); //Redirect default to first page.
};

exports.page = (req, res) => {
    let perPage = 9 //Number of videos in a single page.
    let page = req.params.page || 1 //Current page number.

    model.findAll(perPage, page).then(data => {
        model.count().then(count => {
            res.render('homePage', {
                data: data,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        });
    })
};