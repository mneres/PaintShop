const config = require("../../configurations/config.json");
const textFileUtils = require("./textFileUtils");
const Solution = require("../models/solution");

class DataParser {

  isNumber(element) {
    element = parseInt(element);
    if (Number.isNaN(element)) {
      return false;
    }
    return true;
  }

  parseFileEntries(filePath) {
    return new Promise((resolve, reject) => {
      textFileUtils
        .readTextFile(filePath)
        .then(response => {
          let arr = response.split(/[\r\n]+/);
          const colorsNo = parseInt(arr.shift());
          const availableFinishes = Object.keys(config.availableFinishes).map(
            key => key
          );
          const customers = arr
            .map(row => {
              return row.split(/\s+/);
            })
            .map(element => {
              return element.reduce((accumulator, currentValue) => {
                if(this.isNumber(currentValue)) {
                  accumulator.push({ color: parseInt(currentValue) });
                } else if (availableFinishes.includes(currentValue)) {
                  accumulator[accumulator.length - 1].finish = currentValue;
                } else {
                  const previousObj = accumulator[accumulator.length - 1];
                  if(!previousObj.hasOwnProperty('finish') || !previousObj.hasOwnProperty('color')){
                    accumulator.pop();
                  }
                }
                return accumulator;
              }, []);
            });
          const solution = new Solution({ colorsNo, customers });
          return resolve(solution);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
}

module.exports = new DataParser();