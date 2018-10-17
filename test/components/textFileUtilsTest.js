"use strict";

const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const config = require("../../configurations/config");

const TextFileUtils = require("../../src/components/textFileUtils");

describe("TextFileUtils->readTextFilebyUrl()", () => {
  it("should throw error", () => {
    const textFileUtils = new TextFileUtils();
    return assert.isRejected(
      textFileUtils.readTextFile(),
      "File path is not defined"
    );
  });

  it("should throw error due to invalid path", () => {
    const textFileUtils = new TextFileUtils();
    return assert.isRejected(textFileUtils.readTextFile("/invalid/path"));
  });

  it("should read text file by url and result should not be empty", () => {
    const textFileUtils = new TextFileUtils();
    return expect(
      textFileUtils.readTextFile(config.test.textFilePath)
    ).to.eventually.not.equal("");
  });
});