const { addToFile } = require('../tools');
const { FileWriteSync } = require('../tools');
const fs = require('fs-extra');
const tools = require('../tools')
const userDbPath = './database/userInfo.json';
const dbBarsPath = './database/barsDb.json';
const dbMockData = './database/mockdata.json';
const dbImagesPath = './database/images';

pushNewDb = ()=> {
<<<<<<< HEAD
    var dbNewUsers = await fs.readFile(dbMockData, { String });
=======
    var dbNewUsers = fs.readFile(dbMockData, { String });
>>>>>>> efcb14cf21dc5f7c5dd7ec4fd266ec1ad2b2d400
    dbNewUsers = JSON.parse(dbNewUsers.toString());
    

}

module.exports = {
    doesItExist
}
