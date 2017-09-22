const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const config = require('../config.json');
const knex = require('knex')(require('../knexfile'));

router.post('/saveEdit', jwt({ secret: config.secret }), (req, res) => {
    const post_title = req.body.title;
    const content = req.body.content;
    const creator = req.body.username;
    let show;
    if (req.body.show === 1) {
        show = true;
    } else {
        show = false;
    }

    const chunk = 5; //limit text length
    let sequence = 1; //text chunk order
    const textChunk = [];

    //slice text
    if (content.length > chunk) {

        sequence = Math.ceil(content.length / chunk);
    }

    for (let i = 0; i < sequence; i++) {
        textChunk.push(content.slice((i * chunk), (i * chunk) + chunk));
    }

    console.log(textChunk);

    knex('post').insert({
        post_title,
        creator,
        show
    }).then(([result]) => {
        console.log(result);
        for (let i = 0; i < sequence; i++) {
            knex('postDetail').insert({
                post_id: result,
                sequence: i,
                postDetail_text: textChunk[i]
            }).then(() => {
                if (i === (sequence - 1)) {
                    res.send('add successfully');
                }
            })
        }
    }).catch(error => {
        console.log(error);
    });

});

router.get('/postAll', jwt({ secret: config.secret }), (req, res) => {
    knex.select().table('post')
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(401);
        })
});

router.get('/getPostData/:id', (req, res) => {
    const post_id = req.params.id;
    let text = '';
    knex('postDetail').where({ post_id })
        .then(result => {
            console.log(result);
            for (let i = 0; i < result.length; i ++) {
                let chunk = result.find(item => item.sequence === i);
                console.log(chunk.sequence);
                text += chunk.postDetail_text;
            }

            res.json(text);
        }).catch(error => {
            console.log(error);
            res.sendStatus(401);
    })
});

module.exports = router;