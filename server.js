const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static('dist'));
app.use(bodyParser.json());

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
   res.setHeader('Access-Control-Allow-Methods', 'PUT, PUT, OPTIONS, DELETE, GET');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, charset, Authorization');
   res.header('Access-Control-Allow-Credentials', true);
   next();
});

app.use('/creator', require('./controllers/creator.controller')); //after create initial users, delete this line
app.use('/godMode', express.static(path.join(__dirname + '/dist'))); //after create initial users, delete this line

app.use('/user', require('./controllers/user.controller'));
app.use('/manager', require('./controllers/manager.controller'));
app.use('/manager/*', express.static(path.join(__dirname + '/dist')));

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        console.log('Unauthorized');
        res.status(401).send('invalid token...');
    }
    next();
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});