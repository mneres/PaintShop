const dataParser = require("./components/dataParser");
const solver = require("./components/solver");

const usage = `
  Usage:
  ${process.argv[0]} ${process.argv[1]} <inputFile>
`;

const inputFile = process.argv[2];

if (!inputFile) {
  console.error('Missing input file argument');
  console.log(usage);
  return;
}

dataParser.parseFileEntries(inputFile)
  .then(request => {
    let solution = solver.solveRequest(request);
    console.log(solution);
  })
  .catch(err => {
    console.error(err);
  });

