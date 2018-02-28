const { addToFile } = require('../tools');
const fs = require('fs-extra');
const tools = require('../tools')
const userDbPath = './database/userInfo.json';
const dbBarsPath = './database/barsDb.json';
const dbImagesPath = './database/images';

doesItExist = async (query) => {
    // console.log("this is the query>>>>>>>>>>>>>>>>>>>>>.", query)
    var dbBars = await fs.readFile(dbBarsPath, { String });
    dbBars = JSON.parse(dbBars.toString());
    //console.log('test1',dbBars)
    for (let i = 0; i < query.length; i++) {    
        let barIds = Object.keys(dbBars)
        //console.log('this is barIds: ',barIds)
        for (let j = 0; j < barIds.length; j++) {
            if (query[i].place_id === barIds[j] && query[i].place_id.length) {
                //console.log('this is placeId! ', query[i].place_id);
                query[i]['exists'] = true
            } else {
                if (query[i]['exists']) {
                    //console.log("it exists")
                } else {
                    query[i]['exists'] = false
                }
            }

        }


        //        for (let barId of Object.keys(dbBars)) {
        // if (query[i].place_id === barId) {
        //     query[i]['exists'] = true
        //     console.log(query[i].place_id)
        //     break;
        // } else {
        //     if (query[i]['exists'] = true) {
        //         //console.log('exists!')
        //         break;
        //     } else {
        //         //console.log('wrong!')
        //         query[i]['exists'] = false
        //     }
    }


    console.log("this is the query! ", query)
    return query
}

module.exports = {
    doesItExist
}