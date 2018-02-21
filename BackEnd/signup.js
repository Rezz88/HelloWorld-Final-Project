const { addToFile } = require('./tools');
const fs = require('fs-extra');
const tools = require('./tools')
const userDbPath = './database/userInfo.json';
const dbBarsPath = './database/BarsInfo.json';
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
    var sex = userInfo.sex;
    var email = userInfo.email;
    console.log(userInfo)
    //test to see if legit email else fuck you 
    if (!emailValidate(email)) {
        return ('Invalid email');
    }
    var randomNumber = Math.floor(Math.random() * 10000000)
    var userID = "userID" + randomNumber
    const buildObj = () => {
        var obj = {
            userID: {
                username,
                email,
                password,
                sex,
                age,
                ratings: []
            }
        };

        addToFile(userDbPath, obj);
        console.log('test')
        return true
    };

    //creates new user with all info to be filled on the site 
    const response = await fs.readFile(userDbPath, { String })
        .then(async data => {
            console.log('raw data: ', data)
            var result = JSON.parse(data.toString());
            console.log(result);
            let alreadyExist = false;
            if (result.length) {
                for (let id of Object.keys(result)) {
                    if (result[id].username === username) {
                        alreadyExist = true;
                    }
                }
                if (alreadyExist) {
                    // return 'User already exists';
                    return false;
                } else {
                    return await buildObj();
                }
            } else {
                return await buildObj();
            }
        }).catch(err => err);
    console.log(response)
    return response;
}

const login = async (userInfo) => {
    //sorts user data coming in
    // console.log(userInfo)
    var attemptUsername = userInfo.username;
    var attemptPass = userInfo.password;
    //checks to make sure username already exists in the db
    var dbUser = await fs.readFile(userDbPath, { String });
    dbUser = JSON.parse(dbUser.toString());
    // console.log(dbUser);
    var userAndPassCheck = false;  //true if both password and username are correct
    for (let id of Object.keys(result)) {
        if (dbUser[id].username === attemptUsername && dbUser[id].password === attemptPass) {
            userAndPassCheck = true;
            return userAndPassCheck;
        } else {
            return userAndPassCheck
        }
    }
}


module.exports = {
    login,
    signUp
}