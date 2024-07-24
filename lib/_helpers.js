const { faker } = require("@faker-js/faker");
const taiko = require("taiko");
const path = require("path");
const moment = require("moment");

const download_dir = process.env.file_download_path;

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

exports.getValue = value => {
  let numberOfIterations = 0;
  let subValue = "";
  while (value.includes("{") && value.includes("}") && numberOfIterations < value.length) {
    numberOfIterations++;
    subValue = value.substring(value.indexOf("{") + 1, value.indexOf("}"));
    value = value.replace("{" + subValue + "}", getDynamicValue(subValue));
  }
  return String(getDynamicValue(value));
};

exports.setFileDownloadPath = async () => {
  if (download_dir) {
    const file_download_dir = path.isAbsolute(`${download_dir}`) ? `${download_dir}` : process.cwd() + `/${download_dir}`;
    var downloadPath = path.resolve(__dirname, file_download_dir);
    await taiko.client().send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
  }
};

const getDynamicValue = value => {
  return process.env[value] || gauge.dataStore.scenarioStore.get(value) || getDate(value) || getFakeData(value) || value; 
};

const getDate = value => {
  if (value.startsWith("date.")) {
    const values = value.substring(value.indexOf(".") + 1).split(".");
    let date = new Date();
    if (values.length == 1) {
      moment(date).format(values[0])
      return moment(date).format(values[0]);
    } else if (values.length == 2) {
      date.setDate(date.getDate() + Number(values[0]));
      return moment(date).format(values[1]);
    }
  }
  return null;
};

/**
 * API Reference => https://fakerjs.dev/api/
 * Usage examples: phone.number, phone.number(+1 ###-###-####), person.firstName
 * @param {*} value 
 * @returns 
 */
const getFakeData = value => {
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
