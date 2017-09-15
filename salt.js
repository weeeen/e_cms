const crypto = require('crypto'); //native node module
const knex = require('knex')(require('./knexfile'));

module.exports = {
    saltHashPassword,
    createUser ({ username, password, level }) {
        console.log(`Add manger ${username} with password ${ password }`);
        const { salt, hash } = saltHashPassword(password);
        return knex('user').insert({
            username,
            encrypt_password: hash,
            salt,
            level
        }).debug()
    },
    authenticate({ username, password }) {
        console.log(`Authenticating manager ${ username }`);
        return knex('user').where({ username })
            .then(([user]) => {
                if (!user) return { success: false };
                const { hash } = saltHashPassword({
                    password,
                    salt: user.salt
                });
                return { success: hash === user.encrypt_password }
            })
    }
};

function saltHashPassword({ password, salt = randomString() }) {
    const hash = crypto.createHmac('sha512', salt).update(password);

    return {
        salt,
        hash: hash.digest('hex')
    }
}

const randomString = () => {
    return crypto.randomBytes(4).toString('hex')
};