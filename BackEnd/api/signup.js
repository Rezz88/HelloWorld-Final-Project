const { addToFile } = require('../tools');
const { FileWriteSync } = require('../tools');
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
    var loggedIn = userInfo.loggedIn;
    console.log(userInfo)
    //test to see if legit email else fuck you 
    if (!emailValidate(email)) {
        return ({ error: "Invalid E-mail" });
    }
    var randomNumber = Math.floor(Math.random() * 100000000000)
    var userId = "userId" + randomNumber
    const buildObj = () => {
        var obj = {};
        obj[userId] = {
            loggedIn,
            username,
            email,
            password,
            gender,
            age,
            whatBar: 'none'
        }
        addToFile(userDbPath, obj);
        console.log('test')
    };

    //creates new user with all info to be filled on the site 
    let verify = false;
    let errors;
    const response = await fs.readFile(userDbPath, { String })  //strange to put await and use .then however the data was compiled from two people and this was the fastest solution
        .then(async data => {
            //console.log(data)
            var result = JSON.parse(data.toString());
            //console.log('this is result: ', result)
            let alreadyExist = false;
            if (result) {
                //console.log('this is result again: ', result)
                for (let id of Object.keys(result)) {
                    if (result[id].username === username) {
                        console.log("test1")
                        errors = "Username Already Exists"
                        alreadyExist = true;
                    } else if (result[id].email === email) {
                        console.log("test2")
                        errors = "Email Already in Use"
                        alreadyExist = true;
                    }
                }
                if (alreadyExist) {
                    return 'User already exists';
                    return false;
                } else {
                    verify = true
                    console.log('builds object now!!')
                    return await buildObj();
                }
            } else {
                verify = true
                console.log('builds object now!!1')
                return await buildObj();
            }
        }).catch(err => err);
    console.log('this is the last respose: ', errors)
    if (verify) {
        return { response: true, uid: userId }
    } else if (errors != undefined) {
        return { error: errors };
    } else {
        return { error: "404 signup broken" }
    }
}

const login = async (userInfo) => {
    //console.log('this is user info! :  ', userInfo)
    var attemptUsername = userInfo.username;
    var attemptPass = userInfo.password;
    //checks to make sure username already exists in the db
    var dbUser = await fs.readFile(userDbPath, { String });
    //console.log('where: ',dbUser.toString());
    dbUser = JSON.parse(dbUser.toString());
    //console.log(dbUser);
    for (let id of Object.keys(dbUser)) {
        if (dbUser[id].username === attemptUsername && dbUser[id].password === attemptPass) {
            console.log('this is user logging in: ', dbUser[id])
            dbUser[id].loggedIn = true;
            FileWriteSync(userDbPath, JSON.stringify(dbUser));
            return { id: id, object: dbUser[id] };
        } else if (dbUser[id].username !== attemptUsername && dbUser[id].password === attemptPass) {
            return { error: "Incorrect Username" }
        } else if (dbUser[id].username === attemptUsername && dbUser[id].password !== attemptPass) {
            return { error: "Incorrect Password for This User" }
        }
    }
    return { error: "Incorrect Username" }
}

const logout = async (id) => {
    //console.log('this is user info! :  ', userInfo)
    var dbUser = await fs.readFile(userDbPath, { String });
    dbUser = JSON.parse(dbUser.toString());
    dbUser[id].loggedIn = false;
    console.log(dbUser[id].loggedIn)
    FileWriteSync(userDbPath, JSON.stringify(dbUser));
    return "good to go"
}

module.exports = {
    login,
    signUp,
    logout
}