const config = require("../../configurations/config.json");
const textFileUtils = require("./textFileUtils");
const Request = require("../models/request");
const Preference = require("../models/preference");

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
          const customerPreferences = arr
            .map(row => {
              return row.split(/\s+/);
            })
            .map(element => {
              return element.reduce((accumulator, currentValue) => {
                if(this.isNumber(currentValue)) {
                  accumulator.push(new Preference(parseInt(currentValue)));
                } else if (availableFinishes.includes(currentValue)) {
                  accumulator[accumulator.length - 1].setFinish(currentValue);
                }
                return accumulator;
              }, []);
            });
          const request = new Request(colorsNo, customerPreferences);
          return resolve(request);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
}

module.exports = new DataParser();