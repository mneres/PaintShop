const config = require("../../configurations/config.json");

const availableFinishes = config.availableFinishes;

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
      result[preference.color - 1] &&
      (result[preference.color - 1].unique || preference.unique) &&
      result[preference.color - 1].finish !== preference.finish
    ) {
      return false;
    }
    result[preference.color - 1] = {...result[preference.color - 1], preference};
    return true;
  });

  if(!isResultValid){
    return null;
  }
  return result;
}

class Solver {
  constructor() {}

  solveRequest(request) {
    let sortedPreferences = sortPreferences(request.getCustomerPreferences());
    let test = sortedPreferences.map(preference => preference[0]);
    return validateResult(request.getColorsNo(), test);
  }
}

module.exports = new Solver();
