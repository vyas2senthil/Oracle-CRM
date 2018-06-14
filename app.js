require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');

//crm controller
const crmController = require('./public/controllers/crmController');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// User-Controller routing
app.use('/crm', crmController);

// Get - Middleware Serve up public/views folder
app.use('/', serveStatic('./public/views/', {'index': ['index.html', 'default.htm']}));

app.listen(process.env.LOCAL, function(){
    console.log(`Server started at port ${process.env.LOCAL}`); 
});

