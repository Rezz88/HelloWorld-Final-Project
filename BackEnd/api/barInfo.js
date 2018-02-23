const { addToFile } = require('../tools');
const { fileread } = require('../tools');
const fs = require('fs-extra');
const tools = require('../tools')
const userDbPath = './database/userInfo.json';
const dbBarsPath = './database/barsDb.json';
const dbImagesPath = './database/images';


const allInfo = async (barInfo) => {
    //sorts bar data coming in
    //should be an array of userID's
    var place_id = barInfo.place_id;
    var name = barInfo.name
    var music = barInfo.music;
    console.log("this is bar info! ", barInfo)
    console.log("place_id: ", barInfo.place_id)

    const buildObj = () => {
        var obj = {};
        obj[place_id] = {
            name,
            music
        }
        addToFile(dbBarsPath, obj);
        //console.log('test')
        return true
    };

    //creates new user with all info to be filled on the site 
    try {
        const data = await fs.readFile(dbBarsPath, { String })
        var result = JSON.parse(data.toString());
        console.log("test1: ", Object.keys(result))
        var barExists = false;
        if (Object.keys(result).length) {
            for (let id of Object.keys(result)) {
                if (id === place_id) {
                    barExists = true;
                } else {
                    console.log("we're buildin'")
                    await buildObj();
                }
            }
        } else {
            console.log("we're buildin'")
            await buildObj();
        }
    }
    catch (err) {
        console.log(err);
    }
    if (barExists) {
        return false
    } else {
        return true
    }
}

userCheckIn = (userId, checkInInfo) => {
    //console.log('this is the checkin info ',checkInInfo)
    const barId = checkInInfo.place_id
    console.log('this is the cookie! do I need the userID? who knows', userId)
    const dbUser = tools.FileReadSync(userDbPath)
    console.log('dbuser before change: ', dbUser[userId])
    dbUser[userId].whatBar = barId;
    tools.FileWriteSync(userDbPath, JSON.stringify(dbUser));
    console.log('dbuser after change: ', dbUser)
    //loop through all the users and see who is in the current bar at any time
}

barStats = (barId) => {
    let allAges = [];//add allAges.length to know how many people there are
    let maleToFemale = [];
    //let usersInBar = [];
    const userDb = tools.FileReadSync(userDbPath);
    //when users will check out of a bar, i need to reset it to "none" again. Not for this project but overall
    for (let id of Object.keys(userDb)) {
        if (userDb[id].whatBar === "none") {
            break
        }
        if (userDb[id].whatBar === barId) {
            allAges.push(Number(userDb[id].age))
            maleToFemale.push(userDb[id].gender)
        }
    }
    let femaleCounter = 0;
    let maleCounter = 0;
    let average = (array) => array.reduce((a, b) => a + b) / array.length;
    let meanAge = average(allAges); //average of the ages in a bar
    for (var i = 0; i < maleToFemale.length; i++) {
        maleToFemale[i].toLowerCase() === "female" ? femaleCounter++ : maleCounter++
    }
    let percentage = (a, b) => {
        return { malePercent: b * 100 / (a + b), femalePercent: a * 100 / (a + b) }
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