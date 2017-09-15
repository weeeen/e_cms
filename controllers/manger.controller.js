const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));
const salt = require('../salt');

router.post('/createUser', (req, res) => {
    const username = req.body.user;
    const password = req.body.password;
    const level = req.body.level;

    salt.createUser({ username, password, level })
        .then(() => {
            res.send('success');
        }).catch(error => {
        console.log(error);
        res.send("error");
    });

});

router.post('/signIn', (req, res) => {
    const username = req.body.user;
    const password = req.body.password;
    salt.authenticate({ username, password })
        .then(({ success }) => {
            if (success) res.sendStatus(200);
            else res.sendStatus(401);
        })
});


module.exports = router;