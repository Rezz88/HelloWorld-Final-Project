const { addToFile } = require('../tools');
const fs = require('fs-extra');
const tools = require('../tools')
const userDbPath = './database/userInfo.json';
const dbBarsPath = './database/barInfo.json';
const dbImagesPath = './database/images';

const allInfo = async (barInfo) => {
    //sorts bar data coming in
    var visitors = barInfo.visitors; //should be an array of userID's
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
                    } else {
                        await buildObj();
                    }
                }
            } else {
                await buildObj();
            }
        }).catch(err => err);
    if (response) {
        return { response: response, existingBars: barExists, nonExistingBars: barDoesNotExist }
    } else {
        return response
    }
}

module.exports = {
    allInfo
}