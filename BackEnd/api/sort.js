const { addToFile } = require('../tools');
const fs = require('fs-extra');
const tools = require('../tools')
const userDbPath = './database/userInfo.json';
const dbBarsPath = './database/BarsInfo.json';
const dbImagesPath = './database/images';



theSorter = async (barArray) => {
    var bars = {}
    var dbUser = await fs.readFile(userDbPath, { String });
    dbUser = JSON.parse(dbUser.toString());
    for (let id of Object.keys(dbUser)) {
        //console.log(dbUser[id].gender.toLowerCase())
        if (!bars[dbUser[id].whatBar]) {
            let genderObj = { male: 0, female: 0 };
            let avgAge = { sum: 0, numberOfPeople: 0 };
            if (dbUser[id].gender.toLowerCase() === 'male') {
                genderObj.male = 1;
            }
            else {
                genderObj.female = 1;
            }
            bars[dbUser[id].whatBar] = genderObj;
            bars[dbUser[id].whatBar]['people'] = 1;
            avgAge.sum = dbUser[id].age
            avgAge.numberOfPeople = 1
            bars[dbUser[id].whatBar]['sum'] = avgAge.sum
            bars[dbUser[id].whatBar]['numberOfPeople'] = avgAge.numberOfPeople
        } else {
            //console.log(bars)
            let genderObj = bars[dbUser[id].whatBar];
            let avgAge = bars[dbUser[id].whatBar];
            if (dbUser[id].gender.toLowerCase() === 'male') {
                ++genderObj.male;
            }
            else {
                ++genderObj.female;
            }
            ++bars[dbUser[id].whatBar]['people']
            avgAge.sum = Number(avgAge.sum + dbUser[id].age);
            ++avgAge.numberOfPeople;
        }
    }
    for (let id of Object.keys(bars)) {
        var sum = bars[id].sum
        var people = bars[id].numberOfPeople
        bars[id]['averageAge'] =  Math.floor(sum/people);
    }
    console.log(bars)

    
    return bars;
}

module.exports = {
    theSorter
}