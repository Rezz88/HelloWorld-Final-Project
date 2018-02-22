const { addToFile } = require('../tools');
const fs = require('fs-extra');
const tools = require('../tools')
const userDbPath = './database/userInfo.json';
const dbBarsPath = './database/BarsInfo.json';
const dbImagesPath = './database/images';

profileAccess = (userInfo) => {
    const password = userInfo.password;
    const age = userInfo.age;
    const sex = userInfo.sex;
    const email = userInfo.email;

    const response = await fs.readFile(userDbPath, { String })
    .then( async data => {
        const allUserInfo = JSON.parse(data.toString());

    })
}

module.exports = {
    profileAccess
}