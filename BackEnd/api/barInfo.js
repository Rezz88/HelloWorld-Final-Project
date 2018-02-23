const { addToFile } = require('../tools');
const { fileread } = require('../tools');
const fs = require('fs-extra');
const tools = require('../tools')
const userDbPath = './database/userInfo.json';
const dbBarsPath = './database/barInfo.json';
const dbImagesPath = './database/images';


const allInfo = async (barInfo) => {
    //sorts bar data coming in
    //should be an array of userID's
    var barId = barInfo.barId;
    var amount = barInfo.amount;
    var music = barInfo.music;
    var age = barInfo.age;
    var gender = barInfo.gender;
    console.log("this is bar info! ", barInfo)

    const buildObj = () => {
        var obj = {};
        obj[barId] = {
            rating: ratings,
            music,
            age,
            gender
        }
        addToFile(dbBarsPath, obj);
        //console.log('test')
        return true
    };

    //creates new user with all info to be filled on the site 
    const response = await fs.readFile(dbBarsPath, { String })
        .then(async data => {
            var result = JSON.parse(data.toString());
            var barExists = {};
            var barDoesNotExist = [];
            if (result) {
                for (let id of Object.keys(result)) {
                    if (id === barId) {
                        barExists[id] = result[id];
                        return barExists
                    } else {
                        await buildObj();
                    }
                }
            } else {
                await buildObj();
            }
        }).catch(err => err);
    if (response) {
        return barExists
    } else {
        return response
    }
}

userCheckIn = async (req, res, checkInInfo) => {
    //console.log('this is the checkin info ',checkInInfo)
    const barId = checkInInfo.barId
    const userId = req.cookies.uid;
    //console.log('this is the cookie! do I need the userID? who knows', userId)
    const dbUser = tools.FileReadSync(userDbPath)
    //console.log('dbuser before change: ',dbUser[userId])
    dbUser[userId].whatBar = barId;
    tools.FileWriteSync(userDbPath, dbUser);
    //console.log('dbuser after change: ',dbUser)
    //loop through all the users and see who is in the current bar at any time
}

barStats = (whatBar) => {
    let allAges = [];//add allAges.length to know how many people there are
    let maleToFemale = [];
    //let usersInBar = [];
    const barId = whatBar.barId;
    const userDb = tools.FileReadSync(userDbPath);
    for (let id of Object.keys(userDb)) {
        if (userDb.id.whatBar === barId) {
            allAges.push(Number(userDb.id.age))
            maleToFemale.push(userDb.id.gender)
        }
    }
    let femaleCounter = 0;
    let maleCounter = 0;
    let average = (array) => array.reduce((a, b) => a + b) / array.length;
    let meanAge = average(allAges); //average of the ages in a bar
    for (var i = 0; i < maleToFemale.length; i++) {
        maleToFemale[i] === "female" ? femaleCounter++ : maleCounter++
    }
    let percentage = (a, b) => {
        return { malePercent: b*100/(a+b), femalePercent: a*100/(a+b)}
    }
    let ratio = percentage(femaleCounter, maleCounter);
    return { people: allAges.length, averageAge: meanAge, ratio: ratio }
//ask if its better to do this real time by constantly writing to file or 
//to calculate it one by one, and never store the file 
//
}

module.exports = {
    allInfo,
    userCheckIn,
    barStats
}