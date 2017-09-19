const config = require('./config.json');
module.exports = {
    client: 'mysql',
    connection: {
        user: config.dbUser,
        password: config.dbPassword,
        database: config.db
    }
};