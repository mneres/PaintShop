const config = require("../../configurations/config.json");
const Preference = require("../models/preference");

const availableFinishes = config.availableFinishes;

const ERR_RESULT = "No solution exists";
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

function sortCustomerByFinish(a, b) {
  if (availableFinishes[a.getFinish()] < availableFinishes[b.getFinish()]) {
    return -1;
  }
  if (availableFinishes[a.getFinish()] > availableFinishes[b.getFinish()]) {
    return 1;
  }
  return a.getColor() - b.getColor();
}

function sortPreferences(preferences) {
  let sortedPreferences = preferences
    .map(customerPreferences => customerPreferences.sort(sortCustomerByFinish))
    .map(customerPreferences => {
      if (customerPreferences.length === 1) {
        customerPreferences[0].setUnique(true);
      }
      return customerPreferences;
    });
  return sortedPreferences;
}

function validateResult(colors, preferences) {
  let result = Array.from({ length: colors }, i => null);
  const isResultValid = preferences.every(preference => {
    if (
      result[preference.getColor() - 1] &&
      (result[preference.getColor() - 1].getUnique() || preference.getUnique()) &&
      result[preference.getColor() - 1].getFinish() !== preference.getFinish()
    ) {
      //Solution not valid
      return false;
    }

    if(result[preference.getColor() - 1] && 
      !result[preference.getColor() - 1].getUnique()){
        //In case the solution is valid and value should not be overwritten
        return true;
      }

    result[preference.getColor() - 1] = preference;
    return true;
  });

  if (!isResultValid) {
    return null;
  }
  const finishToFillEmpty = Object.keys(availableFinishes)[0];

  result = result.map((element, index) => {
    if (element) {
      return element;
    }
    return new Preference(index + 1, finishToFillEmpty);
  });

  return result;
}

function convertResultToString(result) {
  if (!result) {
    return ERR_RESULT;
  }
  return result.map(r => r.getFinish()).join(" ");
}

class Solver {
  constructor() {}

  solveRequest(request) {
    const sortedPreferences = sortPreferences(request.getCustomerPreferences());
    const combinations = sortedPreferences.reduce(
      (acc, preference) => {
        let calc = acc * preference.length;
        return calc;
      }, 1
    );

    if(combinations > MAX_SAFE_INTEGER){
      return ERR_RESULT;
    }

    let validatedResult = null;
    let lengths = sortedPreferences.map(preference => preference.length);

    for (let i = 0; i < combinations; i++) {
      let x = i;
      const preferencesIndexes = lengths.map(length => {
        const index = x % length;
        x = Math.floor(x / length);
        return index;
      });
      const result = preferencesIndexes.map(
        (index, line) => sortedPreferences[line][index]
      );
      validatedResult = validateResult(request.getColorsNo(), result);
      if (validatedResult) {
        break;
      }
      continue;
    }

    return convertResultToString(validatedResult);
  }
}

module.exports = new Solver();
