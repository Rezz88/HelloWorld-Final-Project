const signup = require('./api/signup');
const profile = require('./api/profile');
const barInfo = require('./api/barInfo');
const { fileread } = require('./tools');
const express = require('express');
const morgan = require('morgan');
const app = express();
const fs = require('fs');
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
app.use(bodyParser.raw({ type: '*/*', limit: '50mb' }))
app.use(morgan('dev'));
app.use(cookieParser());


app.get('/', (req, res) => {
    let allUsers = fileread('./database/userInfo.json');
    //console.log(req.cookies.uid)
    if (req.cookies) {
        let cookie = req.cookies.uid;
        console.log('this is cookie: ', cookie)
        let currentUser = allUsers[cookie]
        console.log('this is the current user blob!', currentUser)
        return res.send(currentUser)
    } else {
        return res.send({ cookies: false })
    }
})

app.post('/sign-up', async (req, res) => {
    const verify = await signup.signUp(JSON.parse(req.body.toString()));
    console.log("this is verify: ", verify);
    if (!req.cookie && verify.uid) {
        res.cookie('uid', verify.uid, { maxAge: 900000000 });
    }
    //console.log(verify.response)
    res.send(await verify)
    verify.response ? res.send(await { response: verify.response }) : res.send(await verify)
})

app.post('/login', async (req, res) => {
    let loginInfo = await signup.login(JSON.parse(req.body.toString()))
    
    if(typeof(loginInfo) === "object") {
        if(!req.cookie) {
            console.log('this is login info: ',loginInfo.id)
            res.cookie('uid', loginInfo.id, { maxAge: 900000000 })
        }
        res.send(await loginInfo.object)
    } else {
        res.send({signIn: false})
    }
})

app.post('/profile', async (req, res) => {
    res.send(await profile.profileAccess(JSON.parse(req.body.toString())));
})

app.post('/ratings', (req, res) => {
    res.send(ratings.userRatings(JSON.parse(req.body.toString())))
})

app.post('/bar-info', async (req, res) => {
    res.send(await barInfo.allInfo(JSON.parse(req.body.toString())));
})


app.listen(4000, console.log("We're a go!"))