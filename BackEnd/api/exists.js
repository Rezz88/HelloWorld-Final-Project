const { addToFile } = require('../tools');
const fs = require('fs-extra');
const tools = require('../tools')
const userDbPath = './database/userInfo.json';
const dbBarsPath = './database/barsDb.json';
const dbImagesPath = './database/images';

doesItExist = async (query) => {
    var dbBars = await fs.readFile(dbBarsPath, { String });
    dbBars = JSON.parse(dbBars.toString());
    for (let i = 0; i < query.length; i++) {    
        let barIds = Object.keys(dbBars)
        for (let j = 0; j < barIds.length; j++) {
            if (query[i].place_id === barIds[j] && query[i].place_id.length) {
                query[i]['exists'] = true
            } else {
                if (query[i]['exists']) {
                } else {
                    query[i]['exists'] = false
                }
            }
        }
    }


    console.log("this is the query! ", query)
    return query
}

module.exports = {
    doesItExist
}