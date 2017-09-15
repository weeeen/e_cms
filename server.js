const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
   res.setHeader('Access-Control-Allow-Methods', 'PUT, PUT, OPTIONS, DELETE, GET');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, charset, Authorization');
   res.header('Access-Control-Allow-Credentials', true);
   next();
});

app.use('/manger', require('./controllers/manger.controller'));


app.listen(3000, () => {
    console.log('Server running on port 3000');
});