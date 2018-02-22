const funky = require('./funky');
const { fileread } = require('./tools');
const express = require('express');
const morgan = require('morgan');
const app = express()

app.use(express.static('database/images'))

var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.raw({ type: '*/*', limit: '50mb' }))
app.use(morgan('dev'));

app.post('/signUp', async (req, res) => {
    res.send(await funky.signUp(JSON.parse(req.body.toString())));
})

app.post('/login', async (req, res) => {
    allUsers = fileread('./database/userInfo.json')
    res.send(await funky.login(JSON.parse(req.body.toString()), allUsers))
})

app.post('/toSell', (req, res) => {
    res.send(funky.createListing(JSON.parse(req.body.toString()),req ,res ));
})

app.post('/toBuy', (req, res) => {
    res.send(funky.buyItem(JSON.parse(req.body.toString())));
})

app.get('/main', (req, res) => {
    res.send(funky.mainPage());
})

app.post('/addToCart', (req, res) => {
    res.send(funky.addToCart(JSON.parse(req.body.toString())));
})

app.post('/cart', (req, res) => {
    res.send(funky.inCart(JSON.parse(req.body.toString())));
})

app.post('/profile', (req, res) => {
    res.send(funky.profilePage(JSON.parse(req.body.toString())));
})

app.post('/removeFromCart', (req, res) => {
    res.send(funky.removeFromCart(JSON.parse(req.body.toString())));
})

app.post('/upics', (req, res) => {
    res.send(funky.addImg(req));
})

app.post('/editProfile', (req, res) => {
    res.send(funky.editProfile(JSON.parse(req.body.toString())));
})

app.post('/deleteItem', (req, res) => {
    res.send(funky.deleteItem(JSON.parse(req.body.toString())));
})

app.listen(4001, console.log("We're a go!"))

