const { addToFile } = require('../tools');
const { FileWriteSync } = require('../tools')
const fs = require('fs-extra');
const tools = require('../tools')
const userDbPath = './database/userInfo.json';
const dbBarsPath = './database/BarsInfo.json';
const dbImagesPath = './database/images';

profileAccess = async (id, userInfo) => {
    const password = userInfo.password;
    //const age = userInfo.age;
    //const gender = userInfo.gender;
    const email = userInfo.email;
    var dbUser = await fs.readFile(userDbPath, { String });
    dbUser = JSON.parse(dbUser.toString());
    //age ? dbUser[id].age = age : '';
    password ? dbUser[id].password = password : '';
    //gender ? dbUser[id].gender = gender : '';
    email ? dbUser[id].email = email : '';
    FileWriteSync(userDbPath, JSON.stringify(dbUser));
    return {status: "Profile Updated!"}
}

module.exports = {
    profileAccess
}