const signup = require('./signup');
const { fileread } = require('./tools');
const express = require('express');
const morgan = require('morgan');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.raw({ type: '*/*', limit: '50mb' }))
app.use(morgan('dev'));


app.post('/signUp', async (req, res) => {
    res.send(await signup.signUp(JSON.parse(req.body.toString())));
})

app.post('/login', async (req, res) => {
    allUsers = fileread('./database/userInfo.json')
    res.send(await signup.login(JSON.parse(req.body.toString()), allUsers))
})

app.listen(4000, console.log("We're a go!"))