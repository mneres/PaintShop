const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const config = require("../../configurations/config");

const dataParser = require("../../src/components/dataParser");

describe("DataParser->parseFileEntries()", () => {
  it("should parse file entries and match colors number", done => {
    dataParser.parseFileEntries(config.test.textFilePath).then(request => {
      let colorsNo = request.getColorsNo();
      try {
        expect(colorsNo).to.be.equal(5);
        done();
      } catch (ex) {
        done(ex);
      }
    });
  });

  it("should parse file entries and match customer array", done => {
    dataParser.parseFileEntries(config.test.textFilePath).then(request => {
      let customerPreferences = Array.from(request.getCustomerPreferences());
      try {
        expect(customerPreferences.length).to.be.equal(3);
        done();
      } catch (ex) {
        done(ex);
      }
    });
  });
});
