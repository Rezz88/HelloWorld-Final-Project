const { addToFile } = require('../tools');
const fs = require('fs-extra');
const tools = require('../tools')
const userDbPath = './database/userInfo.json';
const dbBarsPath = './database/barsDb.json';
const dbImagesPath = './database/images';


const signUp = async (userInfo) => {
    const emailValidate = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }
    //sorts user data coming in
    var username = userInfo.username;
    var password = userInfo.password;
    var age = userInfo.age;
    var gender = userInfo.gender;
    var email = userInfo.email;
    var barLocation = userInfo.barLocation
    console.log(userInfo)
    //test to see if legit email else fuck you 
    if (!emailValidate(email)) {
        return ('Invalid email');
    }
    var randomNumber = Math.floor(Math.random() * 100000000000)
    var userId = "userId" + randomNumber
    const buildObj = () => {
        var obj = {};
        obj[userId] = {
            loggedIn: true,
            username,
            email,
            password,
            gender,
            age,
            whatBar: 'none'
        }
        addToFile(userDbPath, obj);
        console.log('test')
        return userId
    };

    //creates new user with all info to be filled on the site 
    const response = fs.readFile(userDbPath, { String })
        .then(async data => {
            //console.log(data)
            var result = JSON.parse(data.toString());
            //console.log('this is result: ', result)
            let alreadyExist = false;
            if (result) {
                //console.log('this is result again: ', result)
                for (let id of Object.keys(result)) {
                    //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', result[id].username)
                    if (result[id].username === username || result[id].email === email) {
                        console.log('username/email exists!')
                        alreadyExist = true;
                    }
                }
                if (alreadyExist) {
                    // return 'User already exists';
                    return false;
                } else {
                    console.log('builds object now!!')
                    return await buildObj();
                }
            } else {
                console.log('builds object now!!')
                return await buildObj();
            }
        }).catch(err => err);
    //console.log('this is the last respose: ', response)
    if (response) {
        return { response: true, uid: userId }
    } else {
        return { response: false };
    }
}

const login = async (userInfo) => {
    console.log('this is user info! :  ', userInfo)
    var attemptUsername = userInfo.username;
    var attemptPass = userInfo.password;
    //checks to make sure username already exists in the db
    var dbUser = await fs.readFile(userDbPath, { String });
    console.log('where: ',dbUser.toString());
    dbUser = JSON.parse(dbUser.toString());
    console.log(dbUser);
    for (let id of Object.keys(dbUser)) {
        if (dbUser[id].username === attemptUsername && dbUser[id].password === attemptPass) {
            return { id: id, object: dbUser[id] };
        }
    }
    return { userAndPassCheck: false }
}

module.exports = {
    login,
    signUp
}