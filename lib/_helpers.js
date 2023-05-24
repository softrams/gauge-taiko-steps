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
