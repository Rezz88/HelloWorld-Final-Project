const { addToFile } = require('../tools');
const fs = require('fs-extra');
const tools = require('../tools')
const userDbPath = './database/userInfo.json';
const dbBarsPath = './database/BarsInfo.json';
const dbImagesPath = './database/images';



theSorter = async (barQuery) => {
    var bars = {}
    var dbUser = await fs.readFile(userDbPath, { String });
    dbUser = JSON.parse(dbUser.toString());
    for (let id of Object.keys(dbUser)) {
        dbUser[id].age = parseInt(dbUser[id].age)
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
            avgAge.sum = Number(dbUser[id].age)
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
        var sum = Number(bars[id].sum)
        var people = bars[id].numberOfPeople
        bars[id]['averageAge'] = Math.floor(sum / people);
    }



    //console.log(barQuery)
    if (barQuery.value === 'people') {
        //console.log('youre here')
        if (barQuery.hiOrLow === 'high') {
            var relevantBarKeys = barQuery.placeIDs;
            var relevantBarLength = relevantBarKeys.length;

            sortedArray = []
            //console.log(relevantBarKeys.length)
            while (relevantBarLength > 0) {
                //console.log('aska', relevantBarLength)
                var highestValue = 0;
                var highestKey = 'N/A'
                for (var i = 0; i < relevantBarKeys.length; i++) {
                    //console.log('>>>>', relevantBarKeys.length)
                    if (bars[relevantBarKeys[i]]) {
                        if (bars[relevantBarKeys[i]].people > highestValue) {
                           // console.log('this is where you are at now', bars[relevantBarKeys[i]].people)
                            highestValue = bars[relevantBarKeys[i]].people
                            highestKey = i
                        }
                    }
                }

                if (highestKey === 'N/A') {
                    for (var ii = 0; ii < relevantBarKeys.length; ii++) {
                        sortedArray.push(relevantBarKeys[ii])
                    }
                    relevantBarKeys = []
                    relevantBarLength = 0;
                } else {
                    //console.log('asdas',relevantBarKeys)
                    relevantBarLength--;
                    sortedArray.push(relevantBarKeys[highestKey])
                    relevantBarKeys.splice(highestKey, 1);
                }

            }
            console.log('sortedArray', sortedArray)
            return sortedArray
        } else if (barQuery.hiOrLow === 'low') {
            var relevantBarKeys = barQuery.placeIDs;
            var relevantBarLength = relevantBarKeys.length;

            sortedArray = []
            //console.log('lennn',relevantBarKeys.length)
            while (relevantBarLength > 0) {
               // console.log('aska', relevantBarLength)
                var lowestValue = 500000000000;
                var lowestKey = 'N/A'
                for (var i = 0; i < relevantBarKeys.length; i++) {
                    //console.log('>>>>', relevantBarKeys.length)
                    if (bars[relevantBarKeys[i]]) {
                        if (bars[relevantBarKeys[i]].people < lowestValue) {
                            //console.log('this is where you are at now', bars[relevantBarKeys[i]].people)
                            lowestValue = bars[relevantBarKeys[i]].people
                            lowestKey = i
                        }
                    }
                }

                if (lowestKey === 'N/A') {
                    for (var ii = 0; ii < relevantBarKeys.length; ii++) {
                        sortedArray.push(relevantBarKeys[ii])
                    }
                    relevantBarKeys = []
                    relevantBarLength = 0;
                } else {
                    //console.log('asdas',relevantBarKeys)
                    relevantBarLength--;
                    sortedArray.push(relevantBarKeys[lowestKey])
                    relevantBarKeys.splice(lowestKey, 1);
                }

            }
            console.log('sortedArray', sortedArray)
            return sortedArray
        }
    } else if (barQuery.value === 'avgAge') {
        //console.log('youre here')
        if (barQuery.hiOrLow === 'high') {
            var relevantBarKeys = barQuery.placeIDs;
            var relevantBarLength = relevantBarKeys.length;

            sortedArray = []
            //console.log(relevantBarKeys.length)
            while (relevantBarLength > 0) {
                //console.log('aska', relevantBarLength)
                var highestValue = 0;
                var highestKey = 'N/A'
                for (var i = 0; i < relevantBarKeys.length; i++) {
                    //console.log('>>>>', relevantBarKeys.length)
                    if (bars[relevantBarKeys[i]]) {
                        if (bars[relevantBarKeys[i]].averageAge > highestValue) {
                           // console.log('this is where you are at now', bars[relevantBarKeys[i]].averageAge)
                            highestValue = bars[relevantBarKeys[i]].averageAge
                            highestKey = i
                        }
                    }
                }

                if (highestKey === 'N/A') {
                    for (var ii = 0; ii < relevantBarKeys.length; ii++) {
                        sortedArray.push(relevantBarKeys[ii])
                    }
                    relevantBarKeys = []
                    relevantBarLength = 0;
                } else {
                    //console.log('asdas',relevantBarKeys)
                    relevantBarLength--;
                    sortedArray.push(relevantBarKeys[highestKey])
                    relevantBarKeys.splice(highestKey, 1);
                }

            }
            console.log('sortedArray', sortedArray)
            return sortedArray
        } else if (barQuery.hiOrLow === 'low') {
            var relevantBarKeys = barQuery.placeIDs;
            var relevantBarLength = relevantBarKeys.length;

            sortedArray = []
            //console.log('lennn',relevantBarKeys.length)
            while (relevantBarLength > 0) {
               // console.log('aska', relevantBarLength)
                var lowestValue = 500000000000;
                var lowestKey = 'N/A'
                for (var i = 0; i < relevantBarKeys.length; i++) {
                    //console.log('>>>>', relevantBarKeys.length)
                    if (bars[relevantBarKeys[i]]) {
                        if (bars[relevantBarKeys[i]].averageAge < lowestValue) {
                            //console.log('this is where you are at now', bars[relevantBarKeys[i]].averageAge)
                            lowestValue = bars[relevantBarKeys[i]].averageAge
                            lowestKey = i
                        }
                    }
                }

                if (lowestKey === 'N/A') {
                    for (var ii = 0; ii < relevantBarKeys.length; ii++) {
                        sortedArray.push(relevantBarKeys[ii])
                    }
                    relevantBarKeys = []
                    relevantBarLength = 0;
                } else {
                    //console.log('asdas',relevantBarKeys)
                    relevantBarLength--;
                    sortedArray.push(relevantBarKeys[lowestKey])
                    relevantBarKeys.splice(lowestKey, 1);
                }

            }
            console.log('sortedArray', sortedArray)
            return sortedArray
        }
    } else if (barQuery.value === 'ratio') {
        //console.log('youre here')
        if (barQuery.hiOrLow === 'high') {
            var relevantBarKeys = barQuery.placeIDs;
            var relevantBarLength = relevantBarKeys.length;

            sortedArray = []
            //console.log(relevantBarKeys.length)
            while (relevantBarLength > 0) {
                //console.log('aska', relevantBarLength)
                var highestValue = 0;
                var highestKey = 'N/A'
                for (var i = 0; i < relevantBarKeys.length; i++) {
                    //console.log('>>>>', relevantBarKeys.length)
                    if (bars[relevantBarKeys[i]]) {
                        var ratio = bars[relevantBarKeys[i]].female / bars[relevantBarKeys[i]].people
                        //console.log('ratio', ratio)
                        if (ratio > highestValue) {
                           // console.log('this is where you are at now', ratio)
                            highestValue = ratio
                            highestKey = i
                        }
                    }
                }

                if (highestKey === 'N/A') {
                    for (var ii = 0; ii < relevantBarKeys.length; ii++) {
                        sortedArray.push(relevantBarKeys[ii])
                    }
                    relevantBarKeys = []
                    relevantBarLength = 0;
                } else {
                    //console.log('asdas',relevantBarKeys)
                    relevantBarLength--;
                    sortedArray.push(relevantBarKeys[highestKey])
                    relevantBarKeys.splice(highestKey, 1);
                }

            }
            console.log('sortedArray', sortedArray)
            return sortedArray
        } else if (barQuery.hiOrLow === 'low') {
            var relevantBarKeys = barQuery.placeIDs;
            var relevantBarLength = relevantBarKeys.length;

            sortedArray = []
            //console.log('lennn',relevantBarKeys.length)
            while (relevantBarLength > 0) {
               // console.log('aska', relevantBarLength)
                var lowestValue = 500000000000;
                var lowestKey = 'N/A'
                for (var i = 0; i < relevantBarKeys.length; i++) {
                    //console.log('>>>>', relevantBarKeys.length)
                    if (bars[relevantBarKeys[i]]) {
                        var ratio = bars[relevantBarKeys[i]].female / bars[relevantBarKeys[i]].people
                       // console.log('ratio', ratio)
                        if (ratio < lowestValue) {
                            //console.log('this is where you are at now', ratio)
                            lowestValue = ratio
                            lowestKey = i
                        }
                    }
                }

                if (lowestKey === 'N/A') {
                    for (var ii = 0; ii < relevantBarKeys.length; ii++) {
                        sortedArray.push(relevantBarKeys[ii])
                    }
                    relevantBarKeys = []
                    relevantBarLength = 0;
                } else {
                    //console.log('asdas',relevantBarKeys)
                    relevantBarLength--;
                    sortedArray.push(relevantBarKeys[lowestKey])
                    relevantBarKeys.splice(lowestKey, 1);
                }

            }
            console.log('sortedArray', sortedArray)
            return sortedArray
        }

    } 
    return bars;
}

module.exports = {
    theSorter
}

//make a filter for the amount of women that are in a bar ex: 100%female bar (only 2 ppl) or 40%female, but 60 of them