const { addToFile } = require('../tools');
const { FileWriteSync } = require('../tools');
const fs = require('fs-extra');
const tools = require('../tools')
const userDbPath = './database/userInfo.json';
const dbBarsPath = './database/barsDb.json';
const dbMockData = './database/mockdata.json';
const dbImagesPath = './database/images';

pushNewDb = ()=> {
    var dbNewUsers = await fs.readFile(dbMockData, { String });
    dbNewUsers = JSON.parse(dbNewUsers.toString());
    

}

module.exports = {
    doesItExist
}
