const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const config = require("../../configurations/config");

const dataParser = require("../../src/components/dataParser");

describe("DataParser->parseFileEntries()", () => {
  it("should parse file entries and match colors number", () => {
    dataParser.parseFileEntries(config.test.textFilePath)
    .then(request => {
      let colorsNo = request.getColorsNo();
      expect(colorsNo).to.be.equal(5);
    });
  });

  it("should parse file entries and match customer array", () => {
    dataParser.parseFileEntries(config.test.textFilePath)
    .then(request => {
      let customerPreferences = Array.from(request.getCustomerPreferences());
      expect(customerPreferences.length).to.be.equal(3);
    });
  });
});