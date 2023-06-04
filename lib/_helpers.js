const { faker } = require("@faker-js/faker");

exports.getValue = value => {
  let numberOfIterations = 0;
  let subValue = "";
  while (value.includes("{") && value.includes("}") && numberOfIterations < value.length) {
    numberOfIterations++;
    subValue = value.substring(value.indexOf("{") + 1, value.indexOf("}"));
    value = value.replace("{" + subValue + "}", getDynamicValue(subValue));
  }
  return getDynamicValue(value);
};

const getDynamicValue = value => {
  return process.env[value] || gauge.dataStore.scenarioStore.get(value) || this.getFakeData(value) || value; 
};

exports.parseString = text => {
  let result = text;
  try {
    result = JSON.parse(text);
  } catch (e) {}
  return result;
};

exports.getScenarioData = key => {
  return gauge.dataStore.scenarioStore.get(key) ? gauge.dataStore.scenarioStore.get(key) : key;
};

exports.storeScenarioData = (key, value) => {
  gauge.dataStore.scenarioStore.put(key, value);
};

/**
 * API Reference => https://fakerjs.dev/api/
 * Usage examples: phone.number, phone.number(+1 ###-###-####), person.firstName
 * @param {*} value 
 * @returns 
 */
exports.getFakeData = value => {
  const values = value.split(".");
  if (values.length <= 1) {
    return value;
  }
  const value1 = values[0].trim();
  let value2 = values[1].trim();
  if (faker.hasOwnProperty(value1)) {
    const args = value2.substring(value2.indexOf("(") + 1, value2.indexOf(")"));
    value2 = value2.replace("(" + args + ")", "")

    if (faker[value1].hasOwnProperty(value2)) {
      return args ? faker[value1][value2](isNaN(args) ? args : Number(args)) : faker[value1][value2]();
    }
    console.log(value2 + " property undefined in " + value1);
  }
  return null;
};
