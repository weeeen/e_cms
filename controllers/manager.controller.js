const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const config = require('../config.json');
const knex = require('knex')(require('../knexfile'));

router.post('/saveEdit', jwt({ secret: config.secret }), (req, res) => {
    console.log(req.body);
    const post_title = req.body.title;
    const content = req.body.content;
    const creator = req.body.username;
    if (content.length > 2000) {
        //slice text
    }

    knex('post').insert({
        post_title,
        creator,
        show: true
    }).then(([result]) => {
        console.log(result);
        // knex('postDetail').insert({
        //
        // })
        res.send(200);
    }).catch(error => {
        console.log(error);
    });

});

module.exports = router;