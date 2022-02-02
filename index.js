const express = require("express");
const bodyParser = require('body-parser');
const router = require('./rutas/network');
const initDB = require('./components/db');
const app = express();

const port = 3000;
app.use(bodyParser.json({
    limit: '20mb'
}));
app.use(bodyParser.urlencoded({
    limit: '20mb',
    extended: true
}));
app.use(router);




app.listen(port, ()=>{
    console.log('puerto', port);
});

initDB();