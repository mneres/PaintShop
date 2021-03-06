const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const config = require("../../configurations/config");
const solver = require("../../src/components/solver");
const dataParser = require("../../src/components/dataParser");

const ERR_RETURN = "No solution exists";

describe("Solver->solveRequest()", () => {
  it("should retrieve G G G G M as result", done => {
    dataParser.parseFileEntries(config.test.textFilePath).then(request => {
      let solution = solver.solveRequest(request);
      try {
        expect(solution).to.be.equal("G G G G M");
        return done();
      } catch (ex) {
        return done(ex);
      }
    });
  });

  it("should retrieve error as result", done => {
    dataParser.parseFileEntries(config.test.textFilePath2).then(request => {
      let solution = solver.solveRequest(request);
      try {
        expect(solution).to.be.equal(ERR_RETURN);
        return done();
      } catch (ex) {
        return done(ex);
      }
    });
  });

  it("should retrieve G M G M G as result", done => {
    dataParser.parseFileEntries(config.test.textFilePath3).then(request => {
      let solution = solver.solveRequest(request);
      try {
        expect(solution).to.be.equal("G M G M G");
        return done();
      } catch (ex) {
        return done(ex);
      }
    });
  });

  it("should retrieve M M as result", done => {
    dataParser.parseFileEntries(config.test.textFilePath4).then(request => {
      let solution = solver.solveRequest(request);
      try {
        expect(solution).to.be.equal("M M");
        return done();
      } catch (ex) {
        return done(ex);
      }
    });
  });

  it("should retrieve M G G as result", done => {
    dataParser.parseFileEntries(config.test.textFilePath5).then(request => {
      let solution = solver.solveRequest(request);
      try {
        expect(solution).to.be.equal("M G G");
        return done();
      } catch (ex) {
        return done(ex);
      }
    });
  });

  it("should retrieve error as result", done => {
    dataParser.parseFileEntries(config.test.textFilePath6).then(request => {
      let solution = solver.solveRequest(request);
      try {
        expect(solution).to.be.equal(ERR_RETURN);
        return done();
      } catch (ex) {
        return done(ex);
      }
    });
  });
});
