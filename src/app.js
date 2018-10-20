const config = require("../configurations/config.json");
const dataParser = require("./components/dataParser");
const solver = require("./components/solver");

dataParser.parseFileEntries(config.test.textFilePath)
  .then(request => {
    console.log("request", request);
    let solution = solver.solveRequest(request);
    console.log("solution", solution);
  })
  .catch(err => {
    console.error(err);
  });