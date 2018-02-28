const { addToFile } = require('../tools');
const { FileWriteSync } = require('../tools');
const fs = require('fs-extra');
const tools = require('../tools')
const userDbPath = './database/userInfo.json';
const dbBarsPath = './database/barsDb.json';
const dbMockPath = './database/fakenews.json';
const transitionDb = './database/transition.json';
const dbImagesPath = './database/images';

pushNewDb = async () => {

    var dbBars = await fs.readFile(dbBarsPath, { String });
    dbBars = JSON.parse(dbBars.toString());

    var dbNewUsers = await fs.readFile(dbMockPath, { String });
    dbNewUsers = JSON.parse(dbNewUsers.toString());

    //format users db
    dbNewUsers.forEach(obj => {
        //console.log('this is the object coming out')
        var randomNumber = Math.floor(Math.random() * 100000000000)
        var userId = "userId" + randomNumber
        var old_key = Object.keys(obj)
        //console.log('old_key; ', old_key)
        if (old_key[0] !== userId) {
            Object.defineProperty(obj, userId,
                Object.getOwnPropertyDescriptor(obj, old_key[0]));
            delete obj[old_key[0]];
        }
        //console.log('>>>>>',obj)
    })
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.",dbNewUsers)

    //set whatbar for users
    var idx = 0;
    Object.keys(dbBars).forEach(bar => {
        const rand = Math.floor(Math.random() * (130 - 50 + 1)) + 50;
        for(var i = 0; i < rand; i++) {
            var userId = Object.keys(dbNewUsers[idx])[0];
            dbNewUsers[idx] = { [userId]: { ...dbNewUsers[idx][userId], whatBar: bar } };
            idx++;
        }
    });
     console.log(dbNewUsers);

    // create formatted users map
    var usersMap = dbNewUsers.reduce((acc, curr, i) => {
        console.log('youre in', i)
        const userId = Object.keys(curr)[0];
        return { ...acc, [userId]: curr[userId] };
    }, {});

    console.log(usersMap);
    fs.writeFile(transitionDb, JSON.stringify(usersMap));
}

module.exports = {
    pushNewDb
}
