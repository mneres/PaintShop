const config = require("../configurations/config.json");
const dataParser = require("./components/dataParser");

dataParser.parseFileEntries(config.test.textFilePath)
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });