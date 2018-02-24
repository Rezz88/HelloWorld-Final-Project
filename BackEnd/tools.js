const fs = require('fs-extra');

const fileread = (filename) => {
    var contents = JSON.parse(fs.readFileSync(filename));
    return contents;
};

addToFile = (toRead, toAdd) => {
    var buff = fs.readFileSync(toRead);
    var data = JSON.parse(buff, (key, value) => {
        return value && value.type === 'Buffer' ? Buffer.from(value.data) : value;
    });
    //console.log('this is toAdd ',toAdd)
    for (let key in toAdd) {
        data[key] = toAdd[key]
    }
    //console.log(data)
    fs.writeFileSync(toRead, JSON.stringify(data));
    // changed to only display the current user that signed up
    return toAdd;
};


genPID = () => {
    return Math.floor(Math.random() * 100000000)
}

function FileReadSync(filePath) {
    var contents = fs.readFileSync(filePath);
    return JSON.parse(contents.toString());
}
function FileWriteSync(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

toObject = (arr) => {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        if (arr[i] !== undefined) rv[i] = arr[i];
    return rv;
}



module.exports = {
    fileread,
    addToFile,
    genPID,
    FileReadSync,
    FileWriteSync,
    toObject
};