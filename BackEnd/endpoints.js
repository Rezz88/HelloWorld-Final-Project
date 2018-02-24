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


app.post('/cookie', (req, res) => {
    let allUsers = fileread('./database/userInfo.json');
    console.log('SimonTest')
    //console.log('this is your uid if you have a cookie: ',req.cookies)
    console.log('test1', req.cookies)
    if (Object.keys(req.cookies).length !== 0) {
        let cookie = req.cookies.uid;
        
        console.log('this is cookie: ', cookie)
        
        if(allUsers[cookie]){
            let currentUser = allUsers[cookie]
            console.log('this is the current user blob!', currentUser)
            console.log('asd1')
            console.log(currentUser)
            return res.send(currentUser)
        }else{
            // #SpecialError1
            // In some rare and unexpected cases,
            // Cookie.uid don't match anything in the database
            // We would then delete the cookie and send that there were no cookie
            res.clearCookie('uid')
            console.log('SpecialError1')
            return res.send({ cookies: false })
        }
    } else {
        console.log('you get no cookies')
        return res.send({ cookies: false })
    }
})


app.post('/sign-up', async (req, res) => {
    const verify = await signup.signUp(JSON.parse(req.body.toString()));
   // verify = {}
    //verify.uid = 'chimpanzee'
    // console.log("this is verify: ", verify);
    // console.log("this is cookie", req.cookies)
    if (verify.uid) {
        res.cookie('uid', verify.uid, { maxAge: 9000000000 });
        // res.send('asd')
        // console.log();
    }
    // console.log(verify.response)
    verify.response ? res.send(await { response: verify.response }) : res.send(await verify)
})

app.post('/login', async (req, res) => {
    let loginInfo = await signup.login(JSON.parse(req.body.toString()))
    console.log('this is loginInfo',loginInfo.userAndPassCheck)
    if(loginInfo.userAndPassCheck) {
        if(!req.cookies.uid) {
            //console.log('this is login info: ',loginInfo.id)
            res.cookie('uid', loginInfo.id, { maxAge: 900000000 })
        }
        res.send(loginInfo.object)
    } else {
        res.send({signIn: false})
    }
})

app.post('/profile', async (req, res) => {
    res.send(await profile.profileAccess(JSON.parse(req.body.toString())));
})
app.post('/check-in', (req, res) => {
    console.log('this is cookies: ', req.cookies)
    let userId = req.cookies.uid
    res.send( barInfo.userCheckIn(userId, JSON.parse(req.body.toString())));
})

app.post('/bar-info', async (req, res) => {
    res.send(await barInfo.allInfo(JSON.parse(req.body.toString())));
})

app.get('/bar-stats/:id', async (req, res) => {
    const bar = await barInfo.barStats(req.params.id);
    console.log(bar);
    res.send(bar);
})

app.listen(4000, console.log("We're a go!"))