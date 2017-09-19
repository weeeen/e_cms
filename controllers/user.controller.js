const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));
const salt = require('../salt');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

router.post('/signIn', (req, res) => {
    const username = req.body.user;
    const password = req.body.password;
    salt.authenticate({ username, password })
        .then(({ success, user }) => {
            if (success) {
                res.json({
                    user_id: user.id,
                    username: user.username,
                    token: jwt.sign({ sub: (user.id + user.username) }, config.secret)
                })
            }
            else res.sendStatus(401);
        })
});

module.exports = router;